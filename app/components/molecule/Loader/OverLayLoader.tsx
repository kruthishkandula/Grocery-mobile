import { Text } from '@atom';
import { globalSunshineYellow } from '@/style-dictionary-dist/momoStyle';
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native';
import Modal from 'react-native-modal';

type loaderType = {
    open: boolean;
    setModalVisible?: any;
    // children: (renderProps: any) => ReactNode;
    children?: ReactNode;
    swipe?: boolean;
    transparent?: boolean;
    animationIn?: string;
    animationOut?: string;
    text?: string;
    closeOnBackdropPress?: boolean;
    animationInTiming?: number;
    animationOutTiming?: number;
};

const Loader = ({
    open,
    setModalVisible,
    children,
    swipe = false,
    transparent,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    closeOnBackdropPress = false,
    text,
    ...props
}: loaderType) => {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight =
        Platform.OS === 'ios' ? Dimensions.get('window').height : 99999999999999;
    const { goBack } = useNavigation();

    return (
        <Modal
            style={{ margin: 0, flex: 1 }}
            hideModalContentWhileAnimating={true}
            onBackButtonPress={() => {
                setModalVisible && setModalVisible(false);
            }}
            isVisible={open}
            statusBarTranslucent={Platform?.OS == 'android'}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            animationOutTiming={1}
            animationInTiming={1}
            backdropTransitionOutTiming={1}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            useNativeDriverForBackdrop={true}
            useNativeDriver={true}
            {...props}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <ActivityIndicator color={globalSunshineYellow} size={'large'} />
                {text && <Text variant='bold20' className='text-center mt-[10px] text-text2 text-[16px]'>{text}</Text>}
            </View>
        </Modal>
    );
};

export default Loader;
