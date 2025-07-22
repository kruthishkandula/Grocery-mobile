import WebViewScreen from '@/components/organisms/Webview/webview'
import React from 'react'
import { View } from 'react-native'

const AdminWebview = () => {
  return (
    <View className='flex-1' >
      <WebViewScreen link='https://groceryadminportal.onrender.com' header={'Admin Portal'} />
    </View>
  )
}

export default AdminWebview