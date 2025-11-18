# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native specific rules
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep interface com.facebook.react.bridge.** { *; }
-keep public class com.facebook.react.bridge.** { *; }

# Hermes Engine (if using)
-keep class com.facebook.hermes.** { *; }

# Your app package - IMPORTANT
-keep class com.yourcompany.groceryapp.** { *; }
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver

# Expo modules
-keep class expo.** { *; }
-keep class com.expo.** { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Debugging - remove in production
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
