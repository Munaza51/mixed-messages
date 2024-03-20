import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// User Registration 
import firebase from 'firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Handle successful registration
        console.log('User registered successfully');
      })
      .catch((error) => {
        // Handle registration errors
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

// Messaging Functionality (using Firebase Realtime Database)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageRef = firebase.database().ref('messages');
    messageRef.on('value', (snapshot) => {
      const messageList = snapshot.val();
      setMessages(messageList);
    });
  }, []);

  const handleSendMessage = () => {
    firebase.database().ref('messages').push({
      text: message,
      sender: firebase.auth().currentUser.uid,
      timestamp: Date.now()
    });
    setMessage('');
  };

  return (
    <View>
      {messages.map((msg) => (
        <Text key={msg.timestamp}>{msg.text}</Text>
      ))}
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatScreen;


