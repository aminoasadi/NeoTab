chrome.runtime.onInstalled.addListener(() => {
  console.log('NeoTab Extension Installed');
  
  // Initialize default storage if needed
  chrome.storage.local.get(['bookmarks', 'todos', 'notes'], (result) => {
    if (!result.bookmarks) {
      chrome.storage.local.set({
        bookmarks: [
          { id: 1, title: 'Neo Core', url: 'https://example.com' },
          { id: 2, title: 'صدور ثالث', url: 'https://example.com/sales' },
          { id: 3, title: 'صدور بدنه', url: 'https://example.com/body' },
          { id: 4, title: 'استعلام‌ها', url: 'https://example.com/inquiry' },
          { id: 5, title: 'گزارش کمیسیون', url: 'https://example.com/reports' },
          { id: 6, title: 'پشتیبانی', url: 'https://example.com/support' }
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
