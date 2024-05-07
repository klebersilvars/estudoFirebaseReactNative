import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnect'
import Listagem from './src/components/Listagem/Listagem';


export default function App() {

  async function inserirDados() {
    //inserindo dados com uma key gerada automaticamente
    if (nome != '' & cargo != '') {
      let usuarios = await firebase.database().ref('usuarios')
      let chave = usuarios.push().key
      usuarios.child(chave).set({
        nome: nomeUser,
        cargo: cargo,
        chave: chave
      })
      alert('Usuário gerado com sucesso')

    }
  }
  useEffect(() => {
    async function pegaDado() {

      await firebase.database().ref('usuarios').on('value', (snapshot) => {
        setUsuarios([])
        snapshot.forEach((index) => {
          let data = {
            key: index.key,
            nome: index.val().nome,
            cargo: index.val().cargo
          }
          setUsuarios(oldArray => [...oldArray, data].reverse())
        })
        setLoading(false)
      })

    }


    pegaDado()

  }, [])

  const [nome, setNome] = useState('Carregando usuário...')
  const [cargo, setCargo] = useState('')
  const [nomeUser, setNomeUser] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Usuário logado: {nome}</Text>
      <TextInput
        placeholder='Digite seu nome'
        style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
        onChangeText={(texto) => { setNomeUser(texto) }}
      />

      <TextInput
        placeholder='Digite seu cargo'
        style={{ borderWidth: 1, borderColor: 'black', width: '50%', height: 40, marginBottom: 20, }}
        onChangeText={(texto) => { setCargo(texto) }}
      />

      <Button title='Inserir dados' onPress={inserirDados} />

      <View style={{ width: '90%', height: '50%', borderWidth: 1, marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 17 }}>Usuários cadastrados</Text>

        {loading ?

          (
          <ActivityIndicator color='#121212' size={45} />
          )
          :
          (
          <FlatList
            keyExtractor={item => item.key}
            data={usuarios}
            renderItem={({ item }) => (<Listagem data={item} />)}
          />
          )


        }

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
