import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ActionSheetIOS, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/HomeScreen';
import Add from '../screens/Add';
import { Button } from 'react-native';
import { logout } from '../components/Firebase/firebase';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack() {
  async function handleSignOut() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Системээс гарах уу",
        options: ["Үгүй", "Тийм",],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          try {
             logout();
          } catch (error) {
            console.log(error);
          }
        }
      }
    );


  
  }

  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Нүүр хуудас" component={HomeScreen} /> */}
      <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: 'Нүүр хуудас',
    headerRight: () => (
      <Button title="Гарах" onPress={handleSignOut} />
    ),
  })}/>
<Stack.Screen
  name="Add"
  component={Add}
  options={({ navigation }) => ({
    title: 'Мэдээлэл илгээх',
    headerRight: () => (
      <Button title="Гарах" onPress={handleSignOut} />
    ),
  })}/>
    </Stack.Navigator>
    
  );
}
