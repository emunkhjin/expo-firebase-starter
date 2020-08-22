//sda ajillaj bna
//4 tsagiih

import React, { Component, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,

  TouchableOpacity,
  TouchableHighlight,
  View,
  Alert,
  Picker,
  SafeAreaView, ScrollView
} from 'react-native';
//import { Text, Button, Input } from 'react-native-ui-kitten'
import {
  Text,
  Button,
  Icon,
  Card,
  Input,
  Layout,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
  Tooltip,
  Divider,
  ButtonGroup,
  IndexPath,
} from '@ui-kitten/components';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import * as firebase from 'firebase';
import * as Font from 'expo-font';
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";

import "firebase/firestore";
import { string } from "yup";
import { FontAwesome5 } from '@expo/vector-icons'; 



console.disableYellowBox = true;


const firebaseConfig = {
  apiKey: "AIzaSyA8yEtEb43d9vKJ68QevCceu025047Xd6Q",
  authDomain: "iroad-d0ce7.firebaseapp.com",
  databaseURL: "https://iroad-d0ce7.firebaseio.com",
  projectId: "iroad-d0ce7",
  storageBucket: "iroad-d0ce7.appspot.com",
  messagingSenderId: "1094036965431",
  appId: "1:1094036965431:web:1bc7ad3bce265a8f7fd7b2"
};




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


let addItem = item => {
    const dbh = firebase.firestore().collection("Report");
    var username = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    dbh.add({
      name: item,
      date: new Date(),
      uid: username,
      email: userEmail,
      //location: text,
      //photo: App.state.image, 
    });
  };


  
export default class App  extends React.Component {


  state = {
    location: null,
    image: null,
    uploading: false,
    name: '',
    text: '',
    duureg: '',
    latitude: '', 
    longtitude: '',
    selectedOption: '',
  };

  // findCoordinates = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const location = JSON.stringify(position);

  //       this.setState({ location });
  //     },
  //     error => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };


  
  async componentDidMount() {

    
 

    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    let initialLoad = true;
    this.setState({loading: true});

    // const dbh = firebase.firestore().collection("Evdrel");
    // var username = firebase.auth().currentUser.uid;
    // var userEmail = firebase.auth().currentUser.email;
    // dbh.add({
    //   name: item,
    //   date: new Date(),
    //   uid: username,
    //   email: userEmail,
    //   //location: text,
    //   //photo: App.state.image, 
    // });


    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        const latitude = JSON.stringify(position.coords.latitude);
        const longtitude = JSON.stringify(position.coords.longitude);
        this.setState({ location, latitude, longtitude });
        
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );



    firebase.firestore().collection("Evdrel").on('value', (snapshot) => {
      this.setState({text: snapshot.val() && snapshot.val().text});

      if (initialLoad) {
        this.setState({loading: false});
        initialLoad = false;
      }
    });



  }



  render() {
    let { image } = this.state;
    
    return (
      //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'row' }}>
        <Layout style={{ alignItems: 'center', justifyContent: 'row'}} level='1'>
        <Text category='h4' style={{margin:2,}}>Мэдээлэл илгээх</Text>
          <Card style={styles.card} status='danger'>
            <Text>Байгаа зургаа илгээх бол  <FontAwesome5 name="image" size={20} color="black" />, зураг дарж оруулах бол <FontAwesome5 name="camera" size={20} color="black" /> дээр дарна уу. Мөн дэлгэрэнгүй мэдээллээ "Мэдээлэл" хэсэгт бичнэ үү. Баярлалаа.</Text>
          </Card>
        </Layout>
{/* 
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
        
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Example: Upload ImagePicker result
          </Text>
        )} */}

      {/* <Select
        selectedIndex={this.state.duureg}
        onSelect={index => { this.setState({duureg}) }}>
        <SelectItem title='Багануур дүүрэг'/>
        <SelectItem title='Багахангай дүүрэг'/>
        <SelectItem title='Налайх дүүрэг'/>
        <SelectItem title='Баянзүрх дүүрэг'/>
        <SelectItem title='Сүхбаатар дүүрэг'/>
        <SelectItem title='Чингэлтэй дүүрэг'/>
        <SelectItem title='Баянгол дүүрэг'/>
        <SelectItem title='Хан-Уул дүүрэг'/>
        <SelectItem title='Сонгинохайрхан дүүрэг'/>
      </Select> */}

 
        
<React.Fragment>
    <View style={styles.details}>
    
    
    </View>
    <Select
    style={styles.catt}
        selectedIndex={this.state.selectedOption}
        placeholder="Дүүрэг сонгох"
        
        selectedIndex={this.state.selectedOption}
        onSelect={(value) => this.setState({ selectedOption: value })}>
        <SelectItem title='Багануур дүүрэг' value='Багануур дүүрэг'/>
        <SelectItem title='Багахангай дүүрэг' value='Багахангай дүүрэг'/>
        <SelectItem title='Налайх дүүрэг' value='Налайх дүүрэг'/>
        <SelectItem title='Баянзүрх дүүрэг' value='Баянзүрх дүүрэг'/>
        <SelectItem title='Сүхбаатар дүүрэг' value='Сүхбаатар дүүрэг'/>
        <SelectItem title='Чингэлтэй дүүрэг' value='Чингэлтэй дүүрэг'/>
        <SelectItem title='Баянгол дүүрэг' value='Баянгол дүүрэг'/>
        <SelectItem title='Хан-Уул дүүрэг' value='Хан-Уул дүүрэг'/>
        <SelectItem title='Сонгинохайрхан дүүрэг' value='Сонгинохайрхан дүүрэг'/>

      </Select>
    <Input
           
           textStyle={{ minHeight: 64 }}
            placeholder='Мэдээлэл энд дарж бичнэ үү'
            style={{ margin: 20 }}
            onChangeText={text => { this.setState({text}) }}
          //onSubmitEditing={this._saveValue}
          status='danger'
          value={this.state.text}
          style={styles.textInput}
    />
    <View style={styles.controlContainer}>
    <ButtonGroup style={styles.buttonGroup} status='basic'>
        <Button onPress={this._pickImage}>
        {/* Pick */}
      
        <FontAwesome5 name="image" size={50} color="black" />
         
        </Button>
        
          <Button onPress={this._takePhoto}
          appearance='outline'>
          {/* Take */}
          
          <FontAwesome5 name="camera" size={50} color="black" />
           
          </Button>
    </ButtonGroup>
    </View>
    {this._maybeRenderImage()}
    

          
<Card>
<MapView
        style={styles.mapStyle}
        showsUserLocation
        followsUserLocation
        mapType="satellite"
        showsTraffic
      />
  </Card>

          <Button style={{alignSelf: 'stretch',height:70,}}
           appearance='outline'
    onPress={this._saveValue}
    >
      Мэдээлэл илгээх
      </Button>

  </React.Fragment>
        {this._maybeRenderUploadingOverlay()}
        <StatusBar barStyle="default" />
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="small" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 400,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 400, height: 300 }} />
        </View>

        {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text> */}
      </View>
    );
  };


  _saveValue = async () => {
    
    
    try {
      this.setState({loading: true});
      var username = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;

      await firebase.firestore().collection("Evdrel").add({ 
        text: this.state.text,
        photo: this.state.image,
        date: new Date(),
       uid: username,
       email: userEmail,
       bairshil: this.state.location,
       complete: false,
       latitude: this.state.latitude,
       longtitude: this.state.longtitude,
       cat: this.state.selectedOption.toString(),
       
       });

       //return navigation.navigate("Home");
      

    } catch(e) {
      alert(e)
    } finally {
      this.setState({loading: false});
      alert('Amjilttai');
    }
  }

  _maybeRenderLoadingOverlay = () => {
    if (this.state.loading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
          <ActivityIndicator
            color="#fff"
            animating
            size="large"
          />
        </View>
      );
    }
  }

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };


}
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

 
const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    card: {
      margin: 2,
    },
    mapStyle: {
      width: 400,
      height: 200,
    },
    buttonGroup: {
      margin: 2,
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    card: {
      margin: 2,
    },
    controlContainer: {
      borderRadius: 6,
      margin: 2,
      padding: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#E63946',
      
    },
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      //backgroundColor: 'pink',
      //marginHorizontal: 20,
    },
    catt: {
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
  });
  