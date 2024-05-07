import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnect'


export default function App() {

  async function inserirDados() {
   
      await firebase.auth().createUserWithEmailAndPassword(email, pass)
       .then(()=> {
        alert('Usuário cadastrado em nosso banco de dados.')
       }).catch((error)=> {
        if(error.code === 'auth/weak-password') {
          alert('Senha fraca, tem que ter pelo menos 6 caracteres')
        }else if( error.code === 'auth/email-already-exists') {
          alert('Esse e-mail já foi cadastrado.')
        }
       })
  
        
  }
  

  const [email, setEmail] = useState('Carregando usuário...')
  const [pass, setPass] = useState('')
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Digite seu e-mail'
        style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
        keyboardType='email-address'
        onChangeText={(texto) => { setEmail(texto) }}
      />

      <TextInput
        placeholder='Digite sua senha'
        style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
        keyboardType='visible-password'
        onChangeText={(texto) => { setPass(texto) }}
      />

      <Button title='Inserir dados' onPress={inserirDados} />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
