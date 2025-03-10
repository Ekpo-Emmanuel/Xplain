import React, { useState } from 'react';
import './Popup.css';

interface PopupProps {
  selectedText: string;
}

const Popup: React.FC<PopupProps> = ({ selectedText }) => {
  const [question, setQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDirectQuery = () => {
    if (!selectedText) {
      alert('Please select some text on the page first.');
      return;
    }

    setIsLoading(true);
    chrome.runtime.sendMessage(
      { action: 'openPerplexity', query: selectedText },
      () => {
        setIsLoading(false);
        window.close(); 
      }
    );
  };

  const handleAskQuestion = () => {
    if (!selectedText) {
      alert('Please select some text on the page first.');
      return;
    }

    if (!question.trim()) {
      alert('Please enter a question.');
      return;
    }

    setIsLoading(true);
    chrome.runtime.sendMessage(
      { action: 'openPerplexity', query: `${question} "${selectedText}"` },
      () => {
        setIsLoading(false);
        window.close(); 
      }
    );
  };

  const textLength = selectedText?.length || 0;
  const isTextTooLong = textLength > 500;
  const displayText = selectedText 
    ? (selectedText.length > 150 ? `${selectedText.substring(0, 150)}...` : selectedText)
    : '';

  return (
    <div className="popup-container">
      <h1 className="popup-title">X-Plain with Perplexity</h1>
      
      {selectedText ? (
        <div className="selected-text">
          <h3>Selected Text {textLength > 0 && <span>({textLength} characters)</span>}</h3>
          <p>{displayText}</p>
          {isTextTooLong && (
            <p style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '8px' }}>
              Note: Long selections may be truncated by Perplexity
            </p>
          )}
        </div>
      ) : (
        <div className="no-selection">
          <p>No text selected. Please select some text on the page.</p>
        </div>
      )}

      <div className="action-buttons">
        <button 
          className="direct-query-btn"
          onClick={handleDirectQuery}
          disabled={!selectedText || isLoading}
        >
          {isLoading ? (
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" />
              </svg>
              Loading...
            </span>
          ) : (
            'Explain with Perplexity'
          )}
        </button>
      </div>

      <div className="question-container">
        <h3>Ask a Custom Question:</h3>
        <textarea
          className="question-input"
          placeholder="Enter your question about the selected text..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!selectedText || isLoading}
        />
        <button
          className="ask-question-btn"
          onClick={handleAskQuestion}
          disabled={!selectedText || !question.trim() || isLoading}
        >
          {isLoading ? (
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" />
              </svg>
              Loading...
            </span>
          ) : (
            'Ask Question'
          )}
        </button>
      </div>

      <div className="footer">
        <p>Powered by</p>
        <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer">Perplexity AI</a>
      </div>
    </div>
  );
};

export default Popup; 