import { IconSymbol, Text } from '@/components/atom';
import useAlertStore, { AlertType } from '@/store/alert/alertStore';
import {
    alertCornerRadius,
    alertError,
    alertInfo,
    alertSuccess,
    alertWarning,
    globalWhite,
} from '@/style-dictionary-dist/momoStyle';
import { fontFamily, gpsh, gpsw } from '@/style/theme';
import { onCommonLinkPress } from '@/utility/utility';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';


export const AlertContent = ({
    message,
    onHide,
}: {
    message: AlertType;
    onHide: any;
}) => {
    const {
        duration,
        type,
        zIndex,
        title,
        close,
        nothing,
        top,
        onLinkPress = null,
        onPress = null,
    } = message;

    const FADE_DURATION = 300; // ms

    const animationValue = useRef(new Animated.Value(0)).current;
    const barAnim = useRef(new Animated.Value(1)).current; // 1 = full width, 0 = empty

    const { removeAlert: removeMessage, addAlert: showAlert } = useAlertStore();

    let alertColor = alertSuccess;
    switch (type) {
        case 'error':
            alertColor = alertError;
            break;
        case 'warning':
            alertColor = alertWarning;
            break;
        case 'info':
            alertColor = alertInfo;
            break;
        case 'success':
            alertColor = alertSuccess;
            break;
        case 'nothing':
            alertColor = 'transparent';
            break;
        default:
            break;
    }

    function renderIcon() {
        return (
            <View>
                {type === 'error' || type === 'warning' ? (
                    <IconSymbol color="white" name="warning" size={24} />
                ) : type === 'success' ? (
                    <IconSymbol color="white" name="success" size={24} />
                ) : (
                    <IconSymbol color="white" iconSet='Feather' name="info" size={24} />
                )}
            </View>
        );
    }

    function renderMessage() {
        return (
            <View
                style={{
                    flex: close ? 0.9 : 1,
                }}>
                {title && (
                    <Text style={{
                        fontSize: gpsw(12),
                        lineHeight: gpsw(13),
                        color: globalWhite,
                        marginBottom: gpsw(2),
                    }}>
                        {title}
                    </Text>
                )}
                {!onLinkPress ? (
                    <Text
                        style={{
                            fontSize: gpsw(9.5),
                            lineHeight: gpsw(13),
                            color: globalWhite,
                            fontFamily: fontFamily('Regular'),
                        }}
                    >
                        {message.message}
                    </Text>
                ) : (
                    <Markdown
                        onLinkPress={(e: any) => {
                            onLinkPress && (onPress ? onPress() : onCommonLinkPress(e));
                            return true;
                        }}

                        style={{
                            link: {
                                // textAlign: 'center',
                                fontSize: gpsw('9.8'),
                                lineHeight: gpsh('13'),
                                color: globalWhite,
                                fontFamily: fontFamily('Regular'),
                                fontWeight: 'bold',
                                textDecorationLine: 'none',
                                // fontWeight: 'bold',
                            },
                            body: {
                                fontSize: gpsw('9.8'),
                                lineHeight: gpsh('13'),
                                color: globalWhite,
                                fontFamily: fontFamily('Regular'),
                            },
                        }}>
                        {message.message}
                    </Markdown>
                )}
            </View>
        );
    }

    const [showBar, setShowBar] = useState(false);

    useEffect(() => {
        if (!close) {
            // Fade in
            Animated.timing(animationValue, {
                toValue: 1,
                duration: FADE_DURATION,
                useNativeDriver: true,
            }).start(() => {
                // After fade-in, show bar and start bar animation
                setShowBar(true);
                barAnim.setValue(1);
                Animated.timing(barAnim, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: false,
                }).start();

                // After duration, hide bar and fade out
                setTimeout(() => {
                    setShowBar(false);
                    Animated.timing(animationValue, {
                        toValue: 0,
                        duration: FADE_DURATION,
                        useNativeDriver: true,
                    }).start(() => {
                        onHide();
                    });
                }, duration);
            });
        } else {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: FADE_DURATION,
                useNativeDriver: true,
            }).start();
        }

        return () => {};
    }, []);

    // Bar width interpolation
    const barWidth = barAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: alertColor,
                        alignItems: title ? 'flex-start' : 'center',
                        opacity: nothing ? 0 : animationValue,
                        zIndex: 100 - zIndex!,
                    },
                    top ? { top: gpsh(50) } : { bottom: gpsh(20) },
                ]}>
                <View
                    style={{
                        alignItems: 'center',
                        gap: gpsw(10),
                        flexDirection: 'row'
                    }}>
                    {renderIcon()}
                    {renderMessage()}
                </View>
                {close && (
                    <TouchableOpacity
                        testID="alert-dismiss-button"
                        style={{
                            height: '100%',
                            width: '12%',
                            justifyContent: title ? 'flex-start' : 'center',
                            alignSelf: 'stretch',
                        }}
                        onPress={() => {
                            removeMessage()
                        }}>
                        <IconSymbol name="close" color="white" size={24} />
                    </TouchableOpacity>
                )}
                {/* Duration Bar */}
                {!close && showBar && (
                    <View style={styles.barContainer}>
                        <Animated.View
                            style={[
                                styles.durationBar,
                                { width: barWidth, backgroundColor: 'rgba(0,0,0,0.2)' }
                            ]}
                        />
                    </View>
                )}
            </Animated.View>
        </>
    );
};

const Alert = () => {
    const { removeAlert: removeMessage, addAlert: showAlert, alerts: messages } = useAlertStore();

    return (
        <>
            {messages?.length > 0 && messages.map((messg, index) => {
                const { message, duration } = messg;
                const msg: AlertType = {
                    ...messg,
                    duration: duration * (index + 1),
                    zIndex: (index + 1) * 10,
                };
                return (
                    <AlertContent
                        onHide={() => {
                            removeMessage();
                        }}
                        key={message}
                        message={msg}
                    />
                );
            })}
        </>
    );
};

export default Alert;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'orange',
    },
    container: {
        flex: 1,
        flexGrow: 1,
        padding: gpsw(12),
        paddingRight: gpsw(13),
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: 'orange',
        borderRadius: gpsw(alertCornerRadius),
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    title: { color: 'white', fontWeight: 'bold' },
    description: { color: 'white' },
    barContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 1.5,
        height: 4,
        borderBottomLeftRadius: gpsw(alertCornerRadius),
        borderBottomRightRadius: gpsw(alertCornerRadius),
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    durationBar: {
        zIndex: 200,
        height: '100%',
    },
});

