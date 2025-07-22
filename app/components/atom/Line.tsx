import React from 'react'
import { View } from 'react-native'

export default function Line({ w = 0.5, className }: { w?: number, className?: string }) {
    return (
        <View className='flex flex-row' >
            <View className={`flex-1 w-full h-[${w}] bg-black border-sm ${className}`} />
        </View>
    )
}