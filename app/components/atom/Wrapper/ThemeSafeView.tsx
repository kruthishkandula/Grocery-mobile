import useTheme from "@/hooks/useTheme";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ThemedSafeArea = ({ children }: { children: React.ReactNode }) => {
    const { colors } = useTheme();
    const { top, bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'web' ? 0 : top, paddingBottom: Platform.OS === 'web' ? 0 : bottom, backgroundColor: colors?.bg }} >
            {children}
        </View>
    )
};