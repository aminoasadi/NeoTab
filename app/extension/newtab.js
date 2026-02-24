// --- Utilities ---
const $ = (id) => document.getElementById(id);

// --- Date & Time (Jalali) ---
function updateDateTime() {
  const now = new Date();
  
  // Time
  const timeStr = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  $('current-time').textContent = timeStr;

  // Date
  const dateStr = new Intl.DateTimeFormat('fa-IR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(now);
  $('current-date').textContent = dateStr;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// --- Search ---
const searchInput = $('search-input');
const searchForm = $('search-form');
const searchEngine = $('search-engine');
const clearSearch = $('clear-search');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  const engine = searchEngine.value;
  
  if (!query) return;

  let url = '';
  if (engine === 'google') url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  else if (engine === 'bing') url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  else if (engine === 'duckduckgo') url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;

  window.location.href = url;
});

searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) {
    clearSearch.classList.remove('hidden');
  } else {
    clearSearch.classList.add('hidden');
  }
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearSearch.classList.add('hidden');
  searchInput.focus();
});

// Keyboard shortcut for search
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
});

// --- Bookmarks ---
function renderBookmarks(bookmarks) {
  const container = $('bookmarks-container');
  container.innerHTML = '';
  
  bookmarks.forEach((bm, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';

    const a = document.createElement('a');
    a.href = bm.url;
    a.className = 'bookmark-item';
    
    // Use Google's favicon service
    const img = document.createElement('img');
    try {
      const urlObj = new URL(bm.url);
      img.src = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch(e) {
      img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxsaW5lIHgxPSIxMiIgeTE9IjIiIHgyPSIxMiIgeTI9IjIyIi8+PHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTBhMTUuMyAxNS4zIDAgMCAxLTQgMTBhMTUuMyAxNS4zIDAgMCAxLTQtMTBhMTUuMyAxNS4zIDAgMCAxIDQtMTB6Ii8+PC9zdmc+';
    }
    img.alt = '';
    
    const span = document.createElement('span');
    span.textContent = bm.title;
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-bookmark';
    delBtn.innerHTML = '✕';
    delBtn.title = 'حذف';
    delBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      bookmarks.splice(index, 1);
      chrome.storage.local.set({ bookmarks }, () => renderBookmarks(bookmarks));
    });

    a.appendChild(img);
    a.appendChild(span);
    a.appendChild(delBtn);
    wrapper.appendChild(a);
    container.appendChild(wrapper);
  });
}

$('add-bookmark-btn').addEventListener('click', () => {
  const title = prompt('نام سایت:');
  if (!title) return;
  let url = prompt('آدرس سایت (URL):');
  if (!url) return;
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  chrome.storage.local.get(['bookmarks'], (result) => {
    const bookmarks = result.bookmarks || [];
    bookmarks.push({ id: Date.now(), title, url });
    chrome.storage.local.set({ bookmarks }, () => renderBookmarks(bookmarks));
  });
});

// --- Todos ---
function renderTodos(todos) {
  const list = $('todo-list');
  list.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      chrome.storage.local.set({ todos }, () => renderTodos(todos));
    });
    
    const span = document.createElement('span');
    span.textContent = todo.text;
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-todo';
    delBtn.innerHTML = '&times;';
    delBtn.title = 'حذف';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      chrome.storage.local.set({ todos }, () => renderTodos(todos));
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

$('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('todo-input');
  const text = input.value.trim();
  if (!text) return;
  
  chrome.storage.local.get(['todos'], (result) => {
    const todos = result.todos || [];
    todos.push({ text, completed: false });
    chrome.storage.local.set({ todos }, () => {
      input.value = '';
      renderTodos(todos);
    });
  });
});

// --- Notes ---
const notesArea = $('quick-notes');
let noteTimeout;

notesArea.addEventListener('input', () => {
  clearTimeout(noteTimeout);
  noteTimeout = setTimeout(() => {
    chrome.storage.local.set({ notes: notesArea.value });
  }, 500);
});

// --- Initialization ---
chrome.storage.local.get(['bookmarks', 'todos', 'notes'], (result) => {
  if (result.bookmarks) renderBookmarks(result.bookmarks);
  if (result.todos) renderTodos(result.todos);
  if (result.notes !== undefined) notesArea.value = result.notes;
});

// --- Weather (Mock/Placeholder) ---
// In a real scenario, fetch from OpenWeatherMap using a stored API key
$('weather-temp').textContent = '۲۴°';
$('weather-desc').textContent = 'تهران - آفتابی';
