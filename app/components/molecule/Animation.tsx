import { animations, AnimationTypes } from '@/constants/animations';
import LottieView, { LottieViewProps } from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type AnimationProps = {
    name: AnimationTypes,
} & LottieViewProps;

export default function Animation({ name, ...rest }: AnimationProps) {
    const ref = React.useRef<any>(null);

    return (
        <View style={styles.container}>
            <LottieView
                ref={ref}
                style={styles.animation}
                autoPlay
                loop={true} // Set to true if you want it to loop
                resizeMode="cover"
                {...rest}
                source={animations[name]}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});
