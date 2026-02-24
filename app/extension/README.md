# NeoTab Chrome Extension

A Neo-modern, minimal, premium dashboard for your Chrome New Tab.

## Features
- Floating header with Jalali Date & Time
- Centered Internet Search (Google, Bing, DuckDuckGo)
- Quick Bookmarks with Favicons (Add, Delete)
- Todo List (persisted)
- Quick Notes (auto-saved)
- RTL Layout (Persian)
- Dark Mode support

## Installation Instructions

1. Download or clone this folder (`/extension`).
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle switch in the top right corner).
4. Click on the **Load unpacked** button in the top left corner.
5. Select the `/extension` folder.
6. Open a new tab in Chrome to see NeoTab in action!

## Note on Weather Widget
To enable real weather data, you would need to add an OpenWeatherMap API key in the extension settings (to be implemented) and update the fetch logic in `newtab.js`.

## Architecture
- Pure HTML + CSS + Vanilla JS
- Manifest V3
- No external CDN dependencies
- Secure Content Security Policy (CSP)
