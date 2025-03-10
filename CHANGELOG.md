# Changelog

## [Unreleased - v2.0.0]
### Planned Features
- Contextual Information (surrounding text)
- Summarization option
- Keyboard shortcuts support
- Custom styling options
- Response history tracking

## [1.0.0] - Current Version (React TypeScript Rewrite)
- Complete rewrite of the extension using React and TypeScript
- Improved component-based architecture
- Added type safety with TypeScript
- Enhanced UI with React components
- Better state management
- Improved error handling
- More maintainable codebase structure
- Added proper TypeScript type definitions for Chrome API
- Fixed TypeScript declaration syntax for Chrome API
- Added cross-env for cross-platform build compatibility
- Created SVG icons for better scaling
- Enhanced UI with modern design principles:
  - Improved typography and spacing
  - Added subtle animations and transitions
  - Enhanced visual feedback for user interactions
  - Added loading indicators with animations
  - Improved error messaging
  - Character count and truncation warnings
  - Better button styling with hover/active states
- Fixed content script messaging errors:
  - Added robust error handling for message passing
  - Implemented dynamic content script injection
  - Added fallback behavior for unsupported tabs
  - Improved cross-origin communication
  - Fixed chrome.action.openPopup() error with proper fallback
- Maintained all functionality from the original extension:
  - Direct query to Perplexity
  - Custom question with selected text
  - In-page overlay for interaction
  - Context menu integration

## [1.0.1] - Previous Version Bug Fixes (JavaScript Version)
- Removed OpenAI integration to focus solely on Perplexity AI
- Fixed overlay not appearing when using "Ask Perplexity a Question"
- Improved content script injection and error handling
- Enhanced message passing between background and content scripts
- Updated UI to reflect Perplexity-only functionality
- Increased z-index to ensure overlay visibility
- Added better DOM element checks and error handling
- Improved cleanup of overlay elements

## [1.0.0] - Initial Release (JavaScript Version)
- Initial project setup
- Created manifest.json with required permissions
- Added background service worker with context menu setup
- Created basic popup UI for question input
- Added API configuration and service
- Implemented basic API integration
- Added direct query to Perplexity website with auto-submit
- Improved welcome experience with clear instructions
- Changed Ask Question feature to use in-page overlay instead of new window

## Project Plan

### Phase 1: React TypeScript Setup
- [x] Create React TypeScript project
- [x] Set up development environment
- [x] Configure manifest.json for Chrome extension
- [x] Create component structure

### Phase 2: Core Extension Components
- [x] Implement background script
- [x] Implement content script
- [x] Create popup component
- [x] Add TypeScript type definitions

### Phase 3: Feature Implementation
- [x] Implement text selection detection
- [x] Create context menu integration
- [x] Implement direct query functionality
- [x] Implement custom question functionality
- [x] Add overlay UI

### Phase 4: Styling and UI
- [x] Style popup component
- [x] Style overlay UI
- [x] Add responsive design
- [x] Improve user experience

### Phase 5: Testing and Deployment
- [ ] Test in different browsers
- [ ] Fix any compatibility issues
- [ ] Package for Chrome Web Store
- [ ] Create documentation
- [ ] Release v1.0.0 