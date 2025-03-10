import React, { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/Popup';

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'getSelectedText' },
          (response) => {
            if (response && response.selectedText) {
              setSelectedText(response.selectedText);
            }
          }
        );
      }
    });
  }, []);

  return (
    <div className="App">
      <Popup selectedText={selectedText} />
    </div>
  );
};

export default App;
