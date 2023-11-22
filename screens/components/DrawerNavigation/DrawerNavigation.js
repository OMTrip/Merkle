import * as React from 'react';
import {Button, View} from 'react-native';
import {
  DrawerToggleButton,
  createDrawerNavigator,
} from '@react-navigation/drawer';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerComponent() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      defaultStatus="open"
      screenOptions={dprops => {
        const {navigation} = dprops;
        return {
          swipeEdgeWidth: 300,
          swipeEnabled: true,
          headerLeft: () => {
            return <DrawerToggleButton />;
          },
        };
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
