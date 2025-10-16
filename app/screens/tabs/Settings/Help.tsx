import { FormField, IconSymbol, KeyboardScrollView, Text, ThemedSafeArea } from '@/components/atom';
import { gpsh, gpsw } from '@/style/theme';
import DynamicHeader from '@atom/DynamicHeader';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { default as React, } from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import z from 'zod';

const loginSchema = z.object({
    username: z.string().min(3, 'Username required'),
    password: z.string().min(6, 'Password min 6 chars'),
});

type LoginForm = z.infer<typeof loginSchema>;

const getChatTimeStamp = (timestamp: string) => {
    return dayjs(timestamp).format('MMM D, YYYY | HH:mm A');
}

export default function Help() {
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

    const user = { id: 1, name: "John snow", isUser: true };
    let messages = [
        { id: 1, message: "How can I reset my password?", name: "John snow", timestamp: "2023-10-01T12:00:00Z" },
        { id: 2, message: "How can I reset my password?", name: "John brown", timestamp: "2023-10-01T12:00:00Z" },
    ]?.map(msg => ({
        ...msg,
        isUser: msg.name === user.name
    }));
    const chatCard = (item: any) => {
        let is_user = item?.isUser
        return (
            <View key={item.id} style={{
                backgroundColor: is_user ? 'lightgreen' : 'lightblue',
                borderRadius: 20,
                marginVertical: gpsh(5),
                padding: 20,
                alignItems: is_user ? 'flex-end' : 'flex-start'
            }}>
                <Text variant='bold18' style={{
                    fontSize: gpsh(14)
                }} >{item.name}</Text>
                <Text variant='regular12' >{item.message}</Text>
                <Text variant='light12' style={{ alignSelf: is_user ? 'flex-start' : 'flex-end', fontSize: gpsh(8) }}>{getChatTimeStamp(item.timestamp)}</Text>
            </View>
        )
    }
    return (
        <ThemedSafeArea>
            <View className="flex-1 pb-20">
                <DynamicHeader variant='back' title='Help & Support' />
                {/* <View className="flex-1 items-center justify-center bg-white px-6">
                    <Text className="text-2xl font-bold mb-2">Help & Support</Text>
                    <Text className="text-base text-gray-600 text-center">
                        For any help, contact us at support@groceryplus.com or visit our FAQ section in the app.
                    </Text>
                </View> */}


                {/* chat screen */}
                <View style={{ flex: 1, marginTop: gpsh(20) }}>
                    <KeyboardScrollView
                        contentContainerStyle={styles.scrollContent}
                        extraScrollHeight={Platform.OS === 'android' ? 250 : 30} // Override for this screen
                    >
                        <FlatList
                            style={{
                                flex: 1,
                                flexGrow: 2
                            }}
                            data={messages}
                            renderItem={({ item }) => chatCard(item)}
                            keyExtractor={item => item.id.toString()}
                        />
                        <FormField
                            control={control}
                            name="message"
                            placeholder="Send Message..."
                            autoCapitalize="none"
                            returnKeyType="next"
                            inputType="username"
                            maxLength={25}
                            rightIcon={<IconSymbol name='send' />}
                            inputStyling={{
                                input_border_color: 'black',
                                input_placeholder_color: 'gray',
                                input_focused_color: 'black',
                                input_bg_color: 'white',
                                input_error_border_color: 'red'
                            }}
                            inp={{
                                paddingHorizontal: 40
                            }}
                        />
                    </KeyboardScrollView>
                </View>

            </View>
        </ThemedSafeArea>
    );
}


const styles = StyleSheet.create({
    scrollContent: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 20
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