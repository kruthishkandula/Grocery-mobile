import { DarkStatusBar } from "@/components/molecule/StatusBar";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ThemedSafeArea = ({ children }: { children: React.ReactNode }) => {
    const { colors, theme } = useTheme();
    let isDark = theme == 'dark'
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'web' ? 0 : top,
                paddingBottom: Platform.OS === 'web' ? 0 : bottom,
                backgroundColor: colors?.surfaceOverlay,
            }}
        >
            <StatusBar
                style={isDark ? "light" : "dark"}
                backgroundColor={colors?.surfaceOverlay}
            />
            {children}
        </View>
    );
};