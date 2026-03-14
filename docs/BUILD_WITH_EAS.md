# Build With EAS (APK To Share)

Use this when you want EAS to build an Android APK in the cloud so you can share it easily.

## 1) Install EAS CLI

```bash
npm i -g eas-cli
```

Or use npx (no global install):

```bash
npx eas --version
```

## 2) Login and verify account

```bash
eas login
eas whoami
```

## 3) Initialize EAS in this repo

From the project root:

```bash
eas init
```

This links the project to your Expo account and typically writes an EAS project id into `app.json` / `app.config.*`.

## 4) Build a shareable APK (internal distribution)

This repo includes an `apk` build profile in [`eas.json`](/eas.json).

```bash
eas build -p android --profile apk
```

When it finishes, EAS will print a build URL. Open it and download the APK, then share it.

## 5) Optional: Build for Play Store (AAB)

```bash
eas build -p android --profile production
```

## Notes / Common Issues

- If you previously used another EAS account on this machine, always re-check with `eas whoami`.
- First-time Android release builds may ask about credentials. If you don't have a keystore yet, EAS can generate and manage it for you (recommended for most cases).

