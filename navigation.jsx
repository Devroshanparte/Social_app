import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenus from './components/menu/ScreenMenus'

const Rootnavigation = () => {
  return (
    <AuthProvider>
        <ScreenMenus/>
    </AuthProvider>
  )
}

export default Rootnavigation