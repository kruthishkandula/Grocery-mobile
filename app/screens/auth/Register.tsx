import { useToast } from '@/components/atom/ToastProvider';
import { useAuth } from '@/context/AuthContext';
import { goBack } from '@/navigation/RootNavRef';
import { Button, Text } from '@atom';
import { FormField } from '@atom/Input/FormField';
import KeyboardScrollView from '@/components/atom/Wrapper/KeyboardSrollView';
import AuthScreenWrapper from '@atom/Wrapper/AuthScreenWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().nonempty({
    message: "This field is required",
  }).min(3, 'Username required'),
  password: z.string().nonempty({
    message: "This field is required",
  }).min(6, 'Password must have at least 6 characters'),
  confirmpassword: z.string().nonempty({
    message: "This field is required",
  }).min(6, 'Password must have at least 6 characters'),
  email: z.string().nonempty({
    message: "This field is required",
  }).email('Enter a valid email'),
  phonenumber: z.string().nonempty({
    message: "This field is required",
  }).min(8, 'Enter a valid phone number'),
}).refine(
  schema => {
    return schema.password === schema.confirmpassword;
  },
  {
    message: 'Passwords do not match',
    path: ['confirmpassword'],
  },
);

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register({ navigation }: any) {
  const { register } = useAuth();
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  
  const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
      phonenumber: '',
    },
    mode: 'onChange',
  })

  const { showToast } = useToast();

  const onSubmit = async (data: any) => {
    const success = await register({ ...data, role: 'user' });
    if (!success) alert('Registration failed');

    navigation.replace('login');
    showToast({
      type: 'success',
      title: 'Registration Successful',
      message: 'You have successfully registered. Please login to continue.',
      duration: 2000,
      top: true,
      close: true,
    });
  };

  return (
    <AuthScreenWrapper
      illustrationSource={require('@/assets/images/register.png')}
      gradientColors={["#fff", "#fff", "#fff"]}
      size={180} // Reduced size to give more space for form
    >
      <KeyboardScrollView 
        contentContainerStyle={styles.scrollContent}
        extraScrollHeight={Platform.OS === 'android' ? 250 : 30} // Override for this screen
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant='bold20' style={styles.title}>
              Welcome Onboarding
            </Text>
            <Text variant='light12' style={styles.subtitle}>
              Create your account to get started
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <FormField 
              required 
              inputType='username' 
              control={control} 
              name="username" 
              placeholder="Username" 
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            <FormField 
              required 
              inputType='email' 
              control={control} 
              name="email" 
              placeholder="Email" 
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() => phoneInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            <FormField 
              required 
              inputType='phone' 
              control={control} 
              name="phonenumber" 
              placeholder="Phone Number" 
              ref={phoneInputRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
              keyboardType="phone-pad"
            />
            <FormField 
              required 
              inputType='password' 
              control={control} 
              name="password" 
              placeholder="Password" 
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            <FormField 
              required 
              inputType='password' 
              control={control} 
              name="confirmpassword" 
              placeholder="Confirm Password" 
              ref={confirmPasswordInputRef}
              returnKeyType="done"
              secureTextEntry
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              disabled={!isValid} 
              title="Register" 
              onPress={handleSubmit(onSubmit)} 
              loading={isSubmitting} 
              className="rounded-[4px]" 
            />
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => goBack()}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardScrollView>
    </AuthScreenWrapper>
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
    marginBottom: 16,
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center', 
    color: '#666',
    marginBottom: 16,
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#ef4444',
  }
});