# Firefox Extension Project

This project is a Firefox extension that interacts with the websites 1xbet.kz and olimpvet.kz. It allows users to fetch data from these sites and manipulate the DOM based on the received data.

## Project Structure

```
firefox-extension-project
├── src
│   ├── background.js       # Background script for handling messages and data fetching
│   ├── content.js         # Content script for interacting with the web pages
│   └── manifest.json      # Manifest file defining the extension's metadata and permissions
├── package.json           # npm configuration file for dependencies and scripts
└── README.md              # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd firefox-extension-project
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Load the extension in Firefox**:
   - Open Firefox and navigate to `about:debugging`.
   - Click on "This Firefox" and then "Load Temporary Add-on".
   - Select the `manifest.json` file from the `src` directory.

## Usage Guidelines

- The extension will automatically interact with the specified websites when they are loaded.
- You can modify the content script (`content.js`) to change how the extension interacts with the web pages.
- The background script (`background.js`) can be updated to change how data is fetched and processed.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.