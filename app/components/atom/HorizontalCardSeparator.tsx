import {
    getFontSizeByWindowHeight
} from '@/style/theme';
import { StyleSheet, View } from 'react-native';

type HorizontalCardSeparatorType = {
    w?: any;
    mv?: any;
    mb?: any;
    mt?: any;
    testID?: string;
};

const HorizontalCardSeparator = ({
    w = StyleSheet.hairlineWidth,
    mb,
    mt,
    mv,
}: HorizontalCardSeparatorType) => (
    <View
        style={[
            mv && {
                marginVertical: getFontSizeByWindowHeight(mv),
            },
            mt && { marginTop: getFontSizeByWindowHeight(mt) },
            mb && { marginBottom: getFontSizeByWindowHeight(mb) },
        ]}
        testID="horizontal-card-separator"
    // height={0.5}
    />
);

export default HorizontalCardSeparator;
