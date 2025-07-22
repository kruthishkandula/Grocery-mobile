// Dynamic icon component supporting multiple icon libraries

import { icons as customIcons, IconType as CustomIconType } from '@/constants/icons';
import * as ExpoIcons from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Create a union type of all available icon sets
type IconSet = keyof typeof ExpoIcons;

// Extended mapping that includes both icon set and icon name
type IconMappingEntry = {
  iconSet: IconSet;
  iconName: string;
};

// Define the mapping for SF Symbol-like names
const MAPPING: Record<string, IconMappingEntry> = {
  'house.fill': { iconSet: 'MaterialIcons', iconName: 'home' },
  'paperplane.fill': { iconSet: 'MaterialIcons', iconName: 'send' },
  'chevron.left.forwardslash.chevron.right': { iconSet: 'MaterialIcons', iconName: 'code' },
  'chevron.right': { iconSet: 'MaterialIcons', iconName: 'chevron-right' },
  'heart.fill': { iconSet: 'AntDesign', iconName: 'heart' },
  'star.fill': { iconSet: 'FontAwesome', iconName: 'star' },
  'person.crop.circle': { iconSet: 'Ionicons', iconName: 'person-circle-outline' },
  'search': { iconSet: 'AntDesign', iconName: 'search1' },
  // Add more mappings as needed
};

// Create direct access types for each icon set
type IconSetMap = {
  [K in IconSet]: {
    name: string;
    set: K;
  };
};

// Type for user-provided icon props
type IconProps =
  | { name: keyof typeof MAPPING }
  | { name: string; iconSet: IconSet };

/**
 * An icon component that supports:
 * 1. SF Symbol-like naming (mapped to appropriate icon libraries)
 * 2. Direct usage of any @expo/vector-icons icon
 */
function IconSymbol({
  name,
  iconSet,
  size = 24,
  color = 'black',
  style,
  weight,
}: {
  name: string | CustomIconType | IconProps['name'];
  iconSet?: IconSet | string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {


  // 1. Check for custom icons first
  if ((customIcons as any)[name]) {
    const CustomIcon = (customIcons as any)[name];

    return (
      <CustomIcon
        width={size}
        height={size}
        fill={color}
        style={style}
      />
    );
  }

  // 2. Expo icons
  let iconToRender;
  let iconSetToUse;

  // Case 1: Direct iconSet + name usage
  if (iconSet && ExpoIcons[iconSet]) {
    iconToRender = name;
    iconSetToUse = iconSet;
  }
  // Case 2: SF Symbol-like mapping
  else if (MAPPING[name]) {
    const mapping = MAPPING[name];
    iconToRender = mapping.iconName;
    iconSetToUse = mapping.iconSet;
  }
  // Case 3: Fallback to search in available icon sets
  else {
    // Try to find in common icon sets
    const commonSets: IconSet[] = ['AntDesign', 'MaterialIcons', 'Ionicons', 'FontAwesome'];

    for (const set of commonSets) {
      try {
        // Check if this icon exists in the set
        if (ExpoIcons[set].glyphMap && ExpoIcons[set].glyphMap[name]) {
          iconSetToUse = set;
          iconToRender = name;
          break;
        }
      } catch (e) {
        // Ignore errors when checking
      }
    }

    // If still not found
    if (!iconSetToUse) {
      console.warn(`Icon mapping not found for: ${name}. Please specify 'iconSet' prop.`);
      return null;
    }
  }

  // Dynamically select the icon component based on the mapping
  const IconComponent = ExpoIcons[iconSetToUse];

  return (
    <IconComponent
      name={iconToRender}
      size={size}
      color={color}
      style={style}
    />
  );
}

export default IconSymbol;