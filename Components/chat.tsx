import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, ListRenderItem } from "react-native";
import { ChatItem, RenderChatItem } from "./chatItem";
import Style from "./Style";
import Socket from "./Socket";

type ChatProps = 
{
    username : string;
    image : string;

}


const Chat = ({username, image} : ChatProps) => {

    let [chatInput , setChatInput] = useState("");
    let [chatItemList, setchatItemList] = useState<ChatItem[]>([]);
    

    useEffect(() => {
      (async () => {
        try{
          if(Socket.state == "Disconnected"){
            await Socket.start();
          }
        }
        catch(err){
          console.log(err);
        }
      })();
      Socket.on("ReceiveMessage" , (chatitem) => {
        setchatItemList((chatItemList) => {
          if(chatItemList.find((i) => i.id == chatitem.id)) 
            return chatItemList;
          return [...chatItemList, chatitem];
        });
      });

    }),[];

    const renderItem : ListRenderItem<ChatItem> = ({item}) => 
    (
        <RenderChatItem chatItem = {item} username = {username}></RenderChatItem>
    );
    return (
        <View style={Style.container}>
            <FlatList
                inverted
                data = {chatItemList.sort((a,b) => b.timeStamp - a.timeStamp)} // data soted by the time stamp.
                keyExtractor = {(item) => item.id}  // unique id for each chat.
                renderItem = {renderItem}
            ></FlatList>
        <View style={Style.sendSection}>
            <TextInput
              style={Style.chatTextInput}
              value={chatInput}
              onChangeText={(text) => setChatInput(text)}
            ></TextInput>
            <Button
              title="Send"
              onPress={async() => { 
                
                await Socket.invoke("SendMessage", {
                  id: Math.random().toString(36).substring(7),
                  text: chatInput,
                  image: image,
                  timeStamp: Date.now(),
                  by: username,
                },);
                setChatInput("");
              }}
            ></Button>
          </View>
        </View>
      );
};

export default Chat;




