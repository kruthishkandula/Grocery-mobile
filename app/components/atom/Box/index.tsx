import React from 'react'
import { View } from 'react-native'

export default function Box({ children, className, style }: { children?: React.ReactNode, className?: string, style?: any }) {
    return (
        <View className={`${className}`} style={style}>
            {children}
        </View>
    )
}