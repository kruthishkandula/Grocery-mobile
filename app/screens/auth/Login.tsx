import Loader from '@/components/molecule/Loader/OverLayLoader';
import { useAuth } from '@/context/AuthContext';
import useTheme from '@/hooks/useTheme';
import { Button, Text, ThemedSafeArea } from '@atom';
import { FormField } from '@atom/Input/FormField';
import KeyboardScrollView from '@/components/atom/Wrapper/KeyboardSrollView';
import AuthScreenWrapper from '@atom/Wrapper/AuthScreenWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useRef, use, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import z from 'zod';
import { showAlert } from '@/store/alert/alerts';

const loginSchema = z.object({
  username: z.string().min(3, 'Username required'),
  password: z.string().min(6, 'Password min 6 chars'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login({ navigation }: any) {
  const { login } = useAuth();
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleLogin = async (formData: LoginForm) => {
    try {
      setLoading(true);
      await login(formData.username, formData.password);
    } catch (error: any) {
      if (error?.message == "Invalid credentials.") {
        setError('username', { message: 'Invalid username or password' });
        return;
      }
      setError('username', { type: 'manual', message: 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    return () => {
      reset();
    }
  }, []);

  return (
    <ThemedSafeArea>
      <AuthScreenWrapper
        illustrationSource={require('@/assets/images/login.png')}
        gradientColors={[colors?.bg, colors?.bg]}
        size={250} // Reduced size for more form space
      >
        <KeyboardScrollView
          contentContainerStyle={styles.scrollContent}
          extraScrollHeight={Platform.OS === 'android' ? 250 : 30} // Override for this screen
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text variant='bold20' style={styles.title}>
                Login
              </Text>
              <Text variant='light12' style={styles.subtitle}>
                Welcome back! Please enter your credentials to continue.
              </Text>
            </View>

            <View style={styles.formContainer}>
              <FormField
                control={control}
                name="username"
                placeholder="Username"
                autoCapitalize="none"
                returnKeyType="next"
                inputType="username"
                maxLength={25}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                blurOnSubmit={false}
              />
              <FormField
                ref={passwordInputRef}
                control={control}
                name="password"
                placeholder="Enter password"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                inputType="password"
                maxLength={25}
                onSubmitEditing={handleSubmit(handleLogin)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                disabled={!isValid}
                title="Login"
                onPress={handleSubmit(handleLogin)}
                loading={loading}
                className="rounded-[4px]"
              />
              <Text style={styles.registerText}>
                Don't have an account?{' '}
                <Text style={styles.registerLink} onPress={() => {
                  navigation?.navigate('register')
                }}>
                  Register
                </Text>
              </Text>


              <Text style={styles.registerText}>
                Login as Admin?{' '}
                <Text style={styles.registerLink} onPress={() => {
                  navigation?.navigate('adminportal')
                }}>
                  Admin Login
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardScrollView>
        <Loader open={loading} />
      </AuthScreenWrapper>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 40 : 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  registerLink: {
    color: '#ef4444',
  }
});