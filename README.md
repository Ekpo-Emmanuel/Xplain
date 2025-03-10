# X-Plain with Perplexity

A Chrome extension that allows you to explain selected text or ask questions about it using Perplexity AI.

## Features

- **Explain with Perplexity**: Select text on any webpage and get an explanation directly from Perplexity AI.
- **Ask Custom Questions**: Select text and ask specific questions about it.
- **Context Menu Integration**: Right-click on selected text to access the extension features.
- **In-page Overlay**: Interact with the extension without leaving the current page.
- **Popup Interface**: Access the extension features from the toolbar.

## Technology Stack

- **React**: For building the user interface components
- **TypeScript**: For type safety and better developer experience
- **Chrome Extension API**: For browser integration
- **CSS**: For styling the components

## Project Structure

- `public/`: Contains static files and Chrome extension specific files
  - `manifest.json`: Chrome extension configuration
  - `background.js`: Background script for the extension
  - `content.js`: Content script that runs on webpages
  - `icon*.png`: Extension icons
- `src/`: Contains React components and TypeScript files
  - `components/`: React components
  - `types/`: TypeScript type definitions
  - `App.tsx`: Main React component
  - `index.tsx`: Entry point for React

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Building for Production

```
npm run build
```

This will create a `build` directory with the extension files.

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `build` directory

## Usage

1. Select text on any webpage
2. Right-click and choose "Explain with Perplexity" or "Ask Perplexity a Question"
3. For custom questions, enter your question in the overlay
4. Click "Submit" to open Perplexity with your query

## License

MIT

## Acknowledgements

- Perplexity AI for their powerful question-answering service
