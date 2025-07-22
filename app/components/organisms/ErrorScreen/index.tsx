import Box from '@atom/Box';
import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

const ErrorScreen = ({ errorMessage, onRetry }: any) => {
    return (
        <Box style={styles.container}>
            <Text style={styles.errorText}>Something went wrong!</Text>
            {errorMessage && <Text style={styles.details}>{errorMessage}</Text>}
            <Button title="Retry" onPress={onRetry} />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#721c24',
        marginBottom: 10,
    },
    details: {
        fontSize: 14,
        color: '#721c24',
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default ErrorScreen;
