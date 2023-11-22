import './shim';
import 'text-encoding-utf-8';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Routes from './screens/Routes';
// import TranscationDetails from './screens/TranscationDetails';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './Store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast  from 'react-native-toast-message';
import TranscationDetails from './screens/components/WalletScreens/TranscationDetails';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <Routes />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </PersistGate>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
