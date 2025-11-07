import { Button, DynamicHeader, KeyboardScrollView, ThemedSafeArea } from '@/components/atom';
import { FormField } from '@/components/atom/Input/FormField';
import { useAuth } from '@/context/AuthContext';
import { showAlert } from '@/store/alert/alerts';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileForm = {
    username: string;
    email: string;
    phonenumber: string;
    profile_image?: string;
};

const ProfileSettings = () => {
    const { goBack } = useNavigation();
    const { userDetails, } = useAuth();
    const [photo, setPhoto] = useState<string>(userDetails?.profile_image || '');
    const [uploading, setUploading] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isDirty, isValid, isSubmitting },
    } = useForm<ProfileForm>({
        defaultValues: {
            username: userDetails?.username || '',
            email: userDetails?.email || '',
            phonenumber: userDetails?.phonenumber || '',
            profile_image: userDetails?.profile_image || '',
        },
        mode: 'onChange',
    });

    // Image picker handler
    const handlePickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission required', 'Please allow access to your photos.');
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });
            if (!result.canceled && result.assets?.[0]?.uri) {
                setPhoto(result.assets[0].uri);
                setValue('profile_image', result.assets[0].uri, { shouldDirty: true });
            }
        } catch (err) {
            Alert.alert('Error', 'Could not pick image.');
        }
    };

    // Save handler
    const onSave = async (data: ProfileForm) => {
        setUploading(true);
        console.log('data----', data)
        try {
            // If you have an upload API, upload the photo here and get the URL
            // For now, just usse the local uri or existing url
            //   await updateProfile({
            //     ...data,
            //     profile_image: photo,
            //   });
            showAlert({
                title: 'Profile updated successfully',
                message: 'Your profile has been updated successfully.',
                type: 'success',
                duration: 2000,
            });
            goBack()
        } catch (err) {
            showAlert({
                title: 'Failed to update profile',
                message: 'Failed to update profile. Please try again.',
                type: 'error',
                duration: 2000,
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <ThemedSafeArea>
            <View style={{ flex: 1 }}>
                <DynamicHeader variant="back" title="Profile Settings" />
                <KeyboardScrollView
                    extraScrollHeight={Platform.OS === 'android' ? 250 : 30}
                >
                    <View className='bg-surfaceBase' style={[styles.container]}>
                        <View style={styles.avatarSection}>
                            <TouchableOpacity onPress={handlePickImage} style={styles.avatarWrapper}>
                                <Image
                                    source={
                                        photo
                                            ? { uri: photo }
                                            : { uri: `https://res.cloudinary.com/groceryplus/image/upload/v1751821502/strapi-uploads/medium_4dd412ae78096ed1c65d9291d5d3d2aaf4f6f87f_da01dbd2c6.png` }
                                    }
                                    style={styles.avatar}
                                />
                                <View style={styles.editIcon}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <Text className='text-textSecondary' style={styles.avatarText}>Tap to change photo</Text>
                        </View>
                        <View style={styles.form}>
                            <FormField
                                control={control}
                                name="username"
                                placeholder="Username"
                                autoCapitalize="none"
                                returnKeyType="next"
                                inputType="username"
                                maxLength={25}
                                blurOnSubmit={false}
                            />
                            <FormField
                                control={control}
                                name="email"
                                placeholder="Email"
                                inputType="email"
                                required
                                maxLength={50}
                            />
                            <FormField
                                control={control}
                                name="phonenumber"
                                placeholder="Phone"
                                inputType="phone"
                                required
                                maxLength={15}
                            />
                        </View>
                        <Button
                            title="Save"
                            onPress={handleSubmit(onSave)}
                            loading={isSubmitting || uploading}
                            disabled={!isDirty || !isValid || uploading}
                            className="rounded-[8px]"
                            style={styles.saveButton}
                        />
                    </View>
                </KeyboardScrollView>
            </View>
        </ThemedSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 18,
        textAlign: 'center',
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarWrapper: {
        position: 'relative',
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#FF894F',
        width: 100,
        height: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        resizeMode: 'cover',
    },
    editIcon: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: '#FF894F',
        borderRadius: 12,
        padding: 4,
        zIndex: 2,
    },
    avatarText: {
        marginTop: 8,
        fontSize: 13,
    },
    form: {
        marginBottom: 24,
        gap: 16,
        zIndex: 1
    },
    saveButton: {
        marginTop: 8,
    },
});

export default ProfileSettings;