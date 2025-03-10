function createOverlay(selectedText, isDirectQuery = false) {
  removeOverlay();
  
  // Create overlay container
  overlay.id = 'x-plain-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2147483647;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;
  
  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  `;
  
  const title = document.createElement('h2');
  title.textContent = isDirectQuery ? 'Explain with Perplexity' : 'Ask Perplexity a Question';
  title.style.margin = '0';
  
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.cssText = `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  `;
  closeButton.onclick = removeOverlay;
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  const selectedTextDisplay = document.createElement('div');
  selectedTextDisplay.style.cssText = `
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    max-height: 100px;
    overflow-y: auto;
    font-style: italic;
  `;
  selectedTextDisplay.textContent = `Selected text: "${selectedText}"`;
  
  let questionInput;
  if (!isDirectQuery) {
    questionInput = document.createElement('div');
    questionInput.style.marginBottom = '15px';
    
    const label = document.createElement('label');
    label.textContent = 'Your question:';
    label.style.display = 'block';
    label.style.marginBottom = '5px';
    
    const input = document.createElement('textarea');
    input.id = 'x-plain-question-input';
    input.style.cssText = `
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      min-height: 80px;
    `;
    input.placeholder = 'Enter your question about the selected text...';
    
    questionInput.appendChild(label);
    questionInput.appendChild(input);
  }
  
  const actions = document.createElement('div');
  actions.style.cssText = `
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  `;
  
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.cssText = `
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    cursor: pointer;
  `;
  cancelButton.onclick = removeOverlay;
  
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.style.cssText = `
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background-color: #4285f4;
    color: white;
    cursor: pointer;
  `;
  submitButton.onclick = () => {
    if (isDirectQuery) {
      chrome.runtime.sendMessage({
        action: 'openPerplexity',
        query: selectedText
      });
    } else {
      const questionInputElement = document.getElementById('x-plain-question-input');
      const question = questionInputElement.value.trim();
      
      if (question) {
        chrome.runtime.sendMessage({
          action: 'openPerplexity',
          query: `${question} "${selectedText}"`
        });
      }
    }
    
    removeOverlay();
  };
  
  actions.appendChild(cancelButton);
  actions.appendChild(submitButton);
  
  content.appendChild(header);
  content.appendChild(selectedTextDisplay);
  if (!isDirectQuery && questionInput) {
    content.appendChild(questionInput);
  }
  content.appendChild(actions);
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  if (!isDirectQuery) {
    setTimeout(() => {
      const input = document.getElementById('x-plain-question-input');
      if (input) {
        input.focus();
      }
    }, 100);
  }
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      removeOverlay();
    }
  });
}

function removeOverlay() {
  const overlay = document.getElementById('x-plain-overlay');
  if (overlay) {
    overlay.remove();
  }
}

function getSelectedText() {
  return window.getSelection().toString().trim();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'directQuery') {
    createOverlay(message.text, true);
  } else if (message.action === 'askQuestion') {
    createOverlay(message.text, false);
  } else if (message.action === 'getSelectedText') {
    sendResponse({ selectedText: getSelectedText() });
  }
  
  return true;
}); 