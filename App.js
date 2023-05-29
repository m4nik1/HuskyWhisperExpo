import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen.js'
import { useState } from 'react';
import { NativeBaseProvider } from 'native-base'

export default function App() {
  const [screen, setScreen] = useState('Home')

  return (
    // if this code doesnt work I'm going to die
    <NativeBaseProvider>
      <HomeScreen />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
