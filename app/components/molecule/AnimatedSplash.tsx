import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

const AnimatedSplash = ({ onFinish }: any) => {
    const animationRef = useRef(null);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    useEffect(() => {
        // Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();

        // Start the animation
        if (animationRef.current) {
            animationRef.current?.play();
        }
    }, []);

    const handleAnimationFinish = () => {
        setIsAnimationFinished(true);
        // Hide the default splash screen
        SplashScreen.hideAsync();
        // Call the onFinish callback to show main app
        if (onFinish) {
            onFinish();
        }
    };

    useEffect(() => {
        if (__DEV__) {
            SplashScreen.hideAsync();
            onFinish && onFinish()
        }
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                ref={animationRef}
                source={require('../../assets/animations/splash.json')} // Your animated JSON file
                style={styles.animation}
                autoPlay
                loop={false} // Set to true if you want it to loop
                onAnimationFinish={handleAnimationFinish}
                resizeMode="cover"
            />
        </View>
    );
};

export default AnimatedSplash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9f99d', // Example background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: width * 0.8, // Adjust size as needed
        height: height * 0.4, // Adjust size as needed
    },
});