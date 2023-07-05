import React, { useState } from "react";
import { TextInput, Button, View, Image, Text } from "react-native";
import ImageChooser from "./ImageChooser";
import Style from "./Style";

type PersonalInfoProps = 
{
  onClosed : (name:string, image: string) => void;
}
const PersonalInfo = ({onClosed} : PersonalInfoProps)  => 
{
    const [name, setName] = useState("");
    const [image,setImage] = useState("");
    
    return(

        <View  style = {Style.personalInfoContainer}>
            <Image style = {Style.logo} 
            source = {require("../assets/Chat-icon-1.png")}></Image>
            <View  style = {Style.enterYourName}>
                <Text>Please Enter Your Name</Text>
                
                <TextInput 
                onChangeText = {(text) => setName(text)} value = {name}
                /> 
            </View>
            <ImageChooser onChangeImage= {(image) => setImage(image)}></ImageChooser>
            <Button title = "Start Chatting !" onPress ={() => onClosed(name,image)} ></Button>
        </View>


    );

};

export default PersonalInfo;