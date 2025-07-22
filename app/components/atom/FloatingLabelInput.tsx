import React, { useRef, useState } from 'react';
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import IconSymbol from './IconSymbol';

export interface FloatingLabelInputProps extends Omit<TextInputProps, 'autoCapitalize' | 'returnKeyType'> {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: any;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    error?: string;
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'none' | 'previous' | 'default';
    inputFocusedColor?: string;
    inputType?: 'email' | 'username' | 'phone' | 'password' | 'default';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const getInputPropsByType = (inputType: string | undefined) => {
    switch (inputType) {
        case 'email':
            return { keyboardType: 'email-address', autoCapitalize: 'none', icon: { name: 'email-outline', iconSet: 'MaterialCommunityIcons' } };
        case 'username':
            return { keyboardType: 'default', autoCapitalize: 'none', icon: { name: 'account-outline', iconSet: 'MaterialCommunityIcons' } };
        case 'phone':
            return { maxLength: 10, keyboardType: 'phone-pad', autoCapitalize: 'none', icon: { name: 'phone-outline', iconSet: 'MaterialCommunityIcons' } };
        case 'password':
            return { keyboardType: 'default', autoCapitalize: 'none', icon: { name: 'lock-outline', iconSet: 'MaterialCommunityIcons', secureTextEntry: true }, isPassword: true };
        default:
            return { keyboardType: 'default', autoCapitalize: 'none', icon: undefined };
    }
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    autoCapitalize = 'none',
    error,
    onFocus,
    onBlur,
    onSubmitEditing,
    returnKeyType = 'default',
    inputFocusedColor = '#FF894F',
    inputType = 'default',
    leftIcon,
    rightIcon,
    ...rest
}) => {
    let input_height = 70;
    let input_placeholder_color = '#212121'
    let input_focused_color = inputFocusedColor || '#FF9800'
    let input_bg_color = '#FFFFFF'
    let input_border_color = '#212121'
    let input_error_border_color = '#EF4444'

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
    const inputRef = useRef<TextInput>(null);

    React.useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const inputProps = getInputPropsByType(inputType);
    const isPassword = inputType === 'password' || inputProps.isPassword;
    const effectiveSecureTextEntry = isPassword ? !showPassword : secureTextEntry;
    const hasLeftIcon = leftIcon !== undefined || !!inputProps.icon;
    const LeftIcon = leftIcon !== undefined ? leftIcon : inputProps.icon ? (
        <TouchableOpacity onPress={() => inputRef.current?.focus()} activeOpacity={0.7} style={{ marginLeft: 12 }}>
            <IconSymbol
                name={inputProps.icon.name}
                iconSet={inputProps.icon.iconSet}
                size={22}
                color={isFocused ? input_focused_color : input_placeholder_color}
            />
        </TouchableOpacity>
    ) : null;
    const RightIcon = isPassword ? (
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={{ marginRight: 12 }}>
            <IconSymbol
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                iconSet="MaterialCommunityIcons"
                size={22}
                color={isFocused ? input_focused_color : input_placeholder_color}
            />
        </TouchableOpacity>
    ) : rightIcon;

    const isLabelFloated = isFocused || value;
    const labelStyle = {
        position: 'absolute' as const,
        left: 0,
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [input_height / 3, -8],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: isFocused ? input_focused_color : input_placeholder_color,
        paddingHorizontal: 4,
        zIndex: isLabelFloated ? 4 : 2,
        backgroundColor: input_bg_color,
    };


    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
                {hasLeftIcon && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, height: '100%', zIndex: 10 }}>
                        {LeftIcon}
                    </View>
                )}
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={effectiveSecureTextEntry}
                    keyboardType={keyboardType || inputProps.keyboardType}
                    autoCapitalize={autoCapitalize || inputProps.autoCapitalize}
                    onFocus={e => { setIsFocused(true); onFocus && onFocus(e); }}
                    onBlur={e => { setIsFocused(false); onBlur && onBlur(e); }}
                    style={{
                        borderWidth: isFocused ? 2 : 0.2,
                        borderColor: error ? input_error_border_color : isFocused ? inputFocusedColor : input_border_color,
                        borderRadius: 8,
                        paddingVertical: input_height / 4,
                        paddingHorizontal: (RightIcon || LeftIcon) ? 40 : 12,
                        fontSize: 16,
                        backgroundColor: input_bg_color,
                        zIndex: -100,
                        height: input_height,
                        elevation: 1,
                        shadowColor: isFocused ? input_border_color : '#212121',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                    }}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    maxLength={inputProps.maxLength}
                    {...rest}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => inputRef.current?.focus()}
                    style={{ position: 'absolute', left: hasLeftIcon ? 44 : 12, top: 0, height: '100%', zIndex: 11 }}
                >
                    <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
                </TouchableOpacity>
                {RightIcon && (
                    <View style={{ position: 'absolute', right: 0, height: '100%', justifyContent: 'center', zIndex: 10 }}>
                        {RightIcon}
                    </View>
                )}
            </View>
            {error && <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error}</Text>}
        </View>
    );
};

export default FloatingLabelInput;
