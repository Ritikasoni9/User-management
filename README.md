# User Management App

React Native (Expo) app demonstrating a simple user directory with a login gate, Redux state, and React Navigation (Stack + Bottom Tabs).

## Features

- **Login gate** (dummy auth): Login is simulated in [`useAuth`](/src/hooks/useAuth.ts) and the session is rehydrated from AsyncStorage on app start.
- **Bottom tabs**: Directory (user list) and Profile.
- **User directory**: Paginated user list (infinite scroll) using the ReqRes API.
- **User detail + edit**: Detail screen and edit screen via Stack navigation.
- **Polished UI**: Theme utilities and responsive helpers.
- **Safe area / system bars**: Root safe-area provider + Android navigation bar background configured to avoid white strips on older devices.

## Tech Stack

- **Framework**: Expo (React Native)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **Networking**: Axios
- **UI Scaling**: Custom responsive utils
- **Testing**: Jest & @testing-library/react-native

## Project Structure

```text
/src
  /components     # Reusable UI components
  /hooks          # Custom React hooks (useUsers)
  /navigation     # Navigation configuration
  /redux          # Redux slices and store config
  /screens        # App screens (Login, Directory, Profile, Detail, Edit)
  /services       # API client and service functions
  /utils          # Responsive scaling and helpers
  /__tests__      # Unit tests
```

## Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

For sharing Android builds, this project uses **EAS Build** (recommended).

### Install

```bash
npm install
```

### Run

```bash
npm start
```

### Dummy Login Credentials

- Email: `admin@example.com`
- Password: `admin123`

### Android System Navigation Bar Note

If you change settings in [`app.json`](/app.json) (for example `androidNavigationBar` colors), you typically need to rebuild/reinstall the Android app for them to apply.

## Build With EAS (APK To Share)

To build an APK in the cloud and share it: [`docs/BUILD_WITH_EAS.md`](/docs/BUILD_WITH_EAS.md).

## Build Android APK (No EAS) (Optional)

If you do not want to use EAS, you can still build an APK locally: [`docs/BUILD_APK_NO_EAS.md`](/docs/BUILD_APK_NO_EAS.md).

## Testing

Typecheck:

```bash
npx tsc -p tsconfig.json --noEmit
```

Unit tests:

```bash
npm test
```

Note: depending on your Node/Jest setup, React Native's ESM packages may require additional Jest config to run all suites.

## License
This project is for demonstration purposes.
