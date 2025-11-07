import { View, ViewStyle } from 'react-native'
import React from 'react'
import { Text } from '@atom';

type DetailsProps = {
    top: Record<string, any>;
    bottom?: Record<string, any>;
    topStyles?: ViewStyle;
    bottomStyles?: ViewStyle;
    mapData?: Record<string, any>;
    topUi?: React.ReactNode;
    bottomUi?: React.ReactNode;
    boldKeys?: string[];
}

export default function Details({
    top,
    bottom,
    topStyles,
    bottomStyles,
    mapData,
    topUi,
    bottomUi,
    boldKeys = ['total']
}: DetailsProps) {

    return (
        <View className='bg-surfaceBase flex rounded-[14px] p-[10px]' >
            {topUi && topUi}
            <View className='flex-col justify-between items-center px-4 py-2' style={topStyles}>
                {Object.entries(top || {}).map(([key, value]) => {
                    let KeyName = mapData && mapData[key] ? mapData[key] || key : key

                    if (!value || value === null || value === undefined) {
                        return null;
                    }

                    return (
                        <View key={key} className='flex-row justify-between items-center w-full mb-2'>
                            <Text variant='medium14' className='text-textPrimary'>{KeyName}</Text>
                            <Text variant='regular16' className='text-textPrimary font-semibold text-base'>
                                {value}
                            </Text>
                        </View>
                    )
                })}
            </View>

            <View className='flex-col bg-shadingLight rounded-[14px] justify-between items-center px-4 py-2' style={[{ alignItems: 'flex-end' }, bottomStyles]}>
                {
                    Object.entries(bottom || {}).map(([key, value]) => {
                        let KeyName = mapData && mapData[key] ? mapData[key] || key : key

                        return (
                            <View key={key} className='flex-row justify-between items-center w-full mb-2'>
                                <Text variant='medium14' className='text-textPrimary'
                                    style={[{
                                        ...(boldKeys.includes(key) && {
                                            fontWeight: 'bold',
                                            fontSize: 18
                                        })
                                    }]}>
                                    {KeyName}
                                </Text>
                                <Text variant='regular16' className='text-textPrimary font-semibold text-base'
                                    style={{
                                        ...(boldKeys.includes(key) && {
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        })
                                    }}>
                                    {value}
                                </Text>
                            </View>
                        )
                    })}
            </View>
            {bottomUi && bottomUi}
        </View>
    )
}