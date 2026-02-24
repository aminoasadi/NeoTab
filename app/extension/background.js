chrome.runtime.onInstalled.addListener(() => {
  console.log('NeoTab Extension Installed');
  
  // Initialize default storage if needed
  chrome.storage.local.get(['bookmarks', 'todos', 'notes'], (result) => {
    if (!result.bookmarks) {
      chrome.storage.local.set({
        bookmarks: [
          { id: 1, title: 'Neo Core', url: 'https://example.com' },
          { id: 2, title: 'Google', url: 'https://google.com' }
        ]
      });
    }
    if (!result.todos) {
      chrome.storage.local.set({ todos: [] });
    }
    if (result.notes === undefined) {
      chrome.storage.local.set({ notes: '' });
    }
  });
});
