import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type keyboardWrapperType = {
  children: React.ReactNode;
};

const KeyboardWrapper = ({ children }: keyboardWrapperType) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardWrapper;
