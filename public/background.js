// Background script for X-Plain Chrome Extension

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'directQuery',
    title: 'Explain with Perplexity',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'askQuestion',
    title: 'Ask Perplexity a Question',
    contexts: ['selection']
  });
});

function safelySendMessage(tabId, message) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => true,
  })
  .then(() => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.log("Content script not ready yet, injecting it now.");
        
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        })
        .then(() => {
          setTimeout(() => {
            chrome.tabs.sendMessage(tabId, message);
          }, 100);
        })
        .catch(err => console.error("Error injecting content script:", err));
      }
    });
  })
  .catch(err => {
    console.error("Cannot execute scripts in this tab:", err);
    
    if (message.action === 'directQuery') {
      const query = encodeURIComponent(message.text);
      chrome.tabs.create({ url: `https://www.perplexity.ai/?q=${query}` });
    } else if (message.action === 'askQuestion') {
      alert("Cannot open overlay in this tab. Please use the extension popup or try on a different page.");
    }
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;
  
  if (!selectedText || !tab.id) {
    return;
  }

  if (info.menuItemId === 'directQuery') {
    safelySendMessage(tab.id, {
      action: 'directQuery',
      text: selectedText
    });
  } else if (info.menuItemId === 'askQuestion') {
    safelySendMessage(tab.id, {
      action: 'askQuestion',
      text: selectedText
    });
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openPerplexity') {
    const query = encodeURIComponent(message.query);
    const url = `https://www.perplexity.ai/?q=${query}`;
    chrome.tabs.create({ url });
  }
  
  return true;
}); 