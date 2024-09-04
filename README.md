# Cookie Manager

A React-based cookie manager popper that allows users to manage their consent preferences for cookies on a website. The popper includes options for managing functional, analytics, and marketing cookies, with a user-friendly interface that adapts to different screen sizes.

## Features

- **Functional Cookies:** Necessary for the website to function and cannot be turned off.
- **Analytics Cookies:** Used to count visits and traffic sources, measure performance, and improve the site.
- **Marketing Cookies:** Enable marketing messages, personalized content, and targeted ads.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Material-UI**: UI library for styling components.
- **universal-cookie**: Library for managing cookies in the browser.
- **MUI Accordion**: Used for expandable sections in the cookie manager.
- **MUI Switch**: Customized switches for toggling cookie preferences.

## Setup

1. Clone the repository.
2. Install dependencies with `npm install` or `yarn install`.
3. Run the project locally using `npm start` or `yarn start`.

## File Structure

- `App.js`: The main component that handles the cookie manager popper and its logic.
- `windowSizeListener.js`: A custom hook to detect window size changes and apply responsive styles.

## Customization

You can customize the appearance of the cookie manager by modifying the `styles` object in `App.js`:

- **root**: Main container style.
- **mobileRoot**: Styles applied when the screen width is less than 600px.
- **IOSSwitch**: Custom-styled switch component.

## How It Works

- **Initial Setup**: On the first visit, the user is prompted to set their cookie preferences. If no preferences are set, the popper will appear.
- **LocalStorage**: The user's preferences are saved in `localStorage` and will persist across sessions.
- **Cookie Consent**: When the user submits their preferences, the consent is stored in a cookie and sent to Google Tag Manager (GTM) using the `gtag` function.

## Usage

1. **Managing Preferences**: Users can toggle preferences for analytics and marketing cookies via the switch components.
2. **Saving Preferences**: The preferences are saved by clicking the "Save Preferences" button.
3. **Viewing Preferences**: Users can view and modify their preferences at any time by reopening the cookie manager.

## Example Usage

```jsx
import React from "react";
import App from "./App";

function CookieManager() {
  return <App />;
}

export default CookieManager;