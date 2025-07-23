import { images, ImagesType } from '@/constants/images';
import { CMS_URL } from '@/utility/config';
import { Image as ExpoImage, ImageSource } from 'expo-image';
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';



type CachedImageProps = {
  name: string | ImagesType; // URL or local image name
  style?: StyleProp<ImageStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  width?: number; // Optional width prop
  height?: number; // Optional height prop
  size?: number; // Optional size prop
};

const CachedImage: React.FC<CachedImageProps> = ({
  name,
  style,
  contentFit = 'cover',
  width, // Default width
  height, // Default height
  size = 100, // Default size
}) => {

  // Determine if name is a URL or a local image key
  const isUrl = name?.startsWith('http://') || name?.startsWith('https://');
  const isStrapiUrl = name?.startsWith('/uploads')
  const source: ImageSource = isUrl ? { uri: name } : isStrapiUrl ? { uri: `${CMS_URL}${name}` } : images[name as ImagesType];


  if (!source) {
    // Optionally render a fallback image or null
    return null;
  }

  return (
    <ExpoImage
      source={source}
      style={[{ width: (width || size), height: (height || size) }, style]}
      contentFit={contentFit}
      cachePolicy="memory-disk"
    />
  );
};

export default CachedImage;