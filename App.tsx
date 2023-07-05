import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Chat from './Components/chat';
import PersonalInfo from './Components/PersonalInfo';
import Style from './Components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";


export default function App() {
  const storageUserNamekey = " chatapp-username";
  const storageImageKey = "chatapp-image";
  const [username , setUsername] = useState("");
  const [image, setImage] = useState("");
  const [isloading, setIsLoading] = useState(true);

  const fetchPersonalData = async () => 
  {
    let fetchUsername = await AsyncStorage.getItem(storageUserNamekey);
    let userName = fetchUsername == null ? "" : fetchUsername;
    let fetchedImage = await AsyncStorage.getItem(storageImageKey);
    let image = fetchedImage == null ? "" : fetchedImage;
    setUsername(userName);
    setImage(image);
  }

  const onPersonalInfoClosed = async (name : string, image: string) => {
    setUsername(name);
    await AsyncStorage.setItem (storageUserNamekey, name);
    setImage(image);
    await AsyncStorage.setItem (storageImageKey, image);
  } 

  const handleFinish = () => {
    // Handle finish event
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    // Handle error
    console.error(error);
  };

  if(isloading) 
  {
    return(

      <AppLoading startAsync = {fetchPersonalData} onFinish = {handleFinish} onError={handleError}></AppLoading>

    )

  }

  let activeComponent = username != ""? (
    < Chat username = {username} image = {image}></Chat>
  ) : (
    <PersonalInfo onClosed = {onPersonalInfoClosed}></PersonalInfo>
  )
  return (
    <SafeAreaView style={Style.container}>
      {activeComponent}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

