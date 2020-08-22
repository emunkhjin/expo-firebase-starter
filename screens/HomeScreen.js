
import { WebView } from 'react-native-webview';
import React from 'react';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  useStatusBar('dark-content');
  const navigation = useNavigation() 

  return (
    <View style={styles.container}>
            <Button title="Add" onPress={() => navigation.navigate('Add')} />
            
            <WebView
  source={{ uri: 'https://iroad.netlify.app/' }}
  startInLoadingState={true}
  renderLoading={() => (
    <ActivityIndicator
      color='black'
      size='large'
      style={{flex: 1}}
    />
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})