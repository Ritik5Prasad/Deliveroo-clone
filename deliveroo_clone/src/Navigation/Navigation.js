import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import {store} from '../Redux/store';
import {Provider} from 'react-redux';
import BasketScreen from '../screens/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            options={{
              presentation: 'fullScreenModal',
            }}
            name="PreparingOrderScreen"
            component={PreparingOrderScreen}
          />
           <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: 'fullScreenModal',
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Navigation;
