import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // Perform navigation if the react navigation is ready to handle actions
        //    @ts-ignore
        navigationRef.navigate(name, params);
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export function replace(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // Perform navigation if the react navigation is ready to handle actions
        //    @ts-ignore
        navigationRef.dispatch(StackActions.replace(name, params));
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }
}

export function resetNavigation() {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            })
        );
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }

};