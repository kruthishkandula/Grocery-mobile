import { animations, AnimationTypes } from '@/constants/animations';
import LottieView, { LottieViewProps } from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from '../atom';

type AnimationProps = LottieViewProps & {
    source?: string;
    name: AnimationTypes,
    title?: string, // Optional prop to indicate if it's a text animation
    message?: string, // Optional prop to indicate if it's a text animation
    containerStyle?: ViewStyle
};

export default function Animation({ name, ...rest }: AnimationProps) {
    const ref = React.useRef<any>(null);

    return (
        <View style={[styles.container, rest?.containerStyle]}>
            {animations[name] && <LottieView
                ref={ref}
                style={styles.animation}
                autoPlay
                loop={true} // Set to true if you want it to loop
                resizeMode="cover"
                {...rest}
                source={animations[name]}
            />}
            <View className='gap-4 px-4' >
                {rest.title && (
                    <Text className='text-textPrimary' variant="bold18" style={{ textAlign: 'center', marginTop: 10 }}>
                        {rest.title}
                    </Text>
                )}
                {rest.message && (
                    <Text className='text-textPrimary' variant='regular12' style={{ textAlign: 'center', marginTop: 5 }}>
                        {rest.message}
                    </Text>
                )}
            </View>
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
