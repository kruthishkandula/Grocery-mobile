import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

function useBackHandler(handler: () => boolean) {
	useFocusEffect(
		useCallback(() => {
			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				handler,
			);
			return () => subscription.remove();
		}, [handler]),
	);
}

export default useBackHandler;
