# Build Android APK (No EAS Account)

This project can produce an Android APK without logging into EAS. The approach is:

1. Generate native Android project files with Expo prebuild (creates an `android/` folder).
2. Build an APK using Gradle.

## Prerequisites

- Node + npm installed.
- Android Studio installed (for Android SDK + Platform Tools).
- Java 17 (typical requirement for modern React Native/Gradle).

Environment setup usually needed:

- `ANDROID_HOME` (Android SDK path)
- `PATH` includes Android platform-tools

## 1) Install dependencies

```bash
npm install
```

## 2) Generate the Android project (creates `android/`)

This repo currently does not include an `android/` directory, so generate it:

```bash
npx expo prebuild -p android
```

Note: Running prebuild again can overwrite manual edits inside `android/`. If you customize Gradle files, prefer doing it once and committing `android/`, or use Expo config/plugins.

## 3) Build a debug APK (quickest)

```bash
cd android
./gradlew assembleDebug
```

APK output:

- `android/app/build/outputs/apk/debug/app-debug.apk`

## 4) Build a release APK (shareable)

### 4.1 Generate a signing keystore

From the repo root:

```bash
keytool -genkeypair -v \
  -storetype JKS \
  -keystore android/app/my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

Do not commit the keystore file.

### 4.2 Add signing secrets to `android/gradle.properties`

Create or edit `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.jks
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_store_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

Do not commit real passwords. Use local-only values or CI secrets.

### 4.3 Wire signing into `android/app/build.gradle`

Open `android/app/build.gradle` and ensure your `android { ... }` block includes something like:

```gradle
android {
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release
      // minifyEnabled true/false depending on your needs
    }
  }
}
```

### 4.4 Build the release APK

```bash
cd android
./gradlew assembleRelease
```

APK output:

- `android/app/build/outputs/apk/release/app-release.apk`

## Optional: Build an AAB (Play Store)

```bash
cd android
./gradlew bundleRelease
```

Bundle output:

- `android/app/build/outputs/bundle/release/app-release.aab`

## Notes

- You do not need `eas build` or an EAS account for any of the steps above.
- If you change Expo config in `app.json` (example: `androidNavigationBar`), rebuild/reinstall the Android app to see those changes.

