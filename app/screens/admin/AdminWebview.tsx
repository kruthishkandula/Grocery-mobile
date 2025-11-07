import WebViewScreen from '@/components/organisms/Webview/webview'
import { ADMIN_WEB_URL } from '@/utility/config'
import React from 'react'
import { View } from 'react-native'

const AdminWebview = () => {
  return (
    <View className='flex-1' >
      <WebViewScreen link={ADMIN_WEB_URL} header={'Admin Portal'} />
    </View>
  )
}

export default AdminWebview