import { useThemeContextActions } from '@/Themes';
import { getThemeColors } from '@/Themes/theme-config';

const useTheme = () => {
    const { theme } = useThemeContextActions();
    const colors = getThemeColors(theme);

    return {
        colors
    }
}

export default useTheme