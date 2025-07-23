import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

type keyboardScrollViewType = KeyboardAwareScrollViewProps & {
  children: React.ReactNode;
};

const KeyboardScrollView = ({ children, ...rest }: keyboardScrollViewType) => {
  return <KeyboardAwareScrollView
    enableOnAndroid
    enableAutomaticScroll
    keyboardShouldPersistTaps="handled"
    bounces={false}
    style={{
      flexGrow: 1,
      flex: 1,
    }}
    extraHeight={Platform.OS === 'android' ? 250 : 80}
    extraScrollHeight={Platform.OS === 'android' ? 200 : 30}
    enableResetScrollToCoords={false}
    keyboardOpeningTime={0}
    scrollEnabled={true}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      flexGrow: 1,
      ...(rest.contentContainerStyle || {}),
    }}
    {...rest}>
    {children}
  </KeyboardAwareScrollView>;
};

export default KeyboardScrollView;
