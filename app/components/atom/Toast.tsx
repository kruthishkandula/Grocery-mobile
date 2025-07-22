import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const COLORS = {
  success: '#22c55e',
  error: '#ef4444',
  info: '#3b82f6',
  warning: '#f59e42',
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  type?: ToastType;
  duration?: number;
  close?: boolean;
  title?: string;
  message: string;
  onLinkPress?: () => boolean;
  top?: boolean;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type = 'info',
  duration = 3000,
  close = true,
  title,
  message,
  onLinkPress,
  top = false,
  onClose,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose && onClose();
    });
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: COLORS[type] || COLORS.info },
        top ? styles.top : styles.bottom,
        { opacity: fadeAnim },
      ]}
    >
      <View style={{ flex: 1 }}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Markdown
          style={{
            body: markdownStyles.body,
            link: markdownStyles.link,
          }}
          onLinkPress={onLinkPress}
        >
          {message}
        </Markdown>
      </View>
      {close && (
        <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 4,
    zIndex: 9999,
    minHeight: 60,
    maxWidth: Dimensions.get('window').width - 32,
  },
  top: {
    top: 48,
  },
  bottom: {
    bottom: 48,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  closeBtn: {
    marginLeft: 12,
    padding: 4,
  },
  closeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const markdownStyles = {
  body: { color: '#fff', fontSize: 14 },
  link: { color: '#fff' },
};

export default Toast;
