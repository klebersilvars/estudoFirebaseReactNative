import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnect'


export default function App() {

  async function inserirDados() {

    await firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        alert('Usuário cadastrado em nosso banco de dados.')
      }).catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Senha fraca, tem que ter pelo menos 6 caracteres')
        } else if (error.code === 'auth/email-already-exists') {
          alert('Esse e-mail já foi cadastrado.')
        }
      })
  }

  async function logarUser() {
    await firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(()=> {
      alert('Usuario logado com sucesso, input preenchido')
    })
    .catch((error)=> {
      alert(error)
    })
  }

  async function deslogarUser() {
    await firebase.auth().signOut()
    .then(()=> {
      setEmail('')
      setPass('')
    }).catch((error)=> {
      alert('usuário não foi deslogado por algum motivo')
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


      <View style={{ width: '100%', height: 200, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>

        <Text>Area de acesso</Text>

        <TextInput
          style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
          placeholder='Digite seu e-mail'
          onChangeText={(texto) => { setEmail(texto) }}
        />


        <TextInput
          placeholder='Digite sua senha'
          style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
          keyboardType='visible-password'
          onChangeText={(texto) => { setPass(texto) }}
        />

        <Button title='Logar' onPress={logarUser}/>
        <Button title='Deslogar User' onPress={deslogarUser}/>

      </View>


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
