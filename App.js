import { app, database } from './firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore'

/** When adding navigation to the project run these scrips: 
 * npm i @react-navigation/native
 * npm i @react-navigation/native-stack
 *  */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator() //opretter et object, til at lægge en side på en anden side når man navigere

  //alert(JSON.stringify(database, null, 4))

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen name='ListPage' component={ListPage} />

        <Stack.Screen name='DetailPage' component={DetailPage}/>


      </Stack.Navigator>


    </NavigationContainer>

  );
}

const ListPage = ({navigation, route}) => { //route to send data, navigation kan kalde på navigate
  const [text, setText] = useState('')

  const [notes, setNotes] = useState([])

  const [values, loading, error] = useCollection(collection(database, "notes"))

  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id})) //for hvert element i collection bliver mappet værdien fra noget til andet. Her skal vi have et ekstra id

  //const staticNotes = [{key: 1, name: 'mo'}, {key:2, name: 'stacks'}]

  async function addNoteToDb(newNoteToDb) {
    await addDoc(collection(database, "notes"), 
    {
      text: newNoteToDb
    })
  }

  async function addNote(item){
    //alert('you typed ' + text)
    setNotes(
      [...notes, {key:notes.length, name: text}]
    )
    await addNoteToDb(text)
  }

  function goTODetailPage (item) {
    navigation.navigate('DetailPage', {message:item})
    //alert({message:item.name})
  }

  async function deleteNote(id){
    //alert(`You successfully deleted note with id: ${id}`);
    await deleteDoc(doc(database, "notes", id))
  }
  return (
    <View style={styles.container}>

      <Text>Welcome to your note-app</Text>
      <TextInput style={styles.textInput} onChangeText={(txt) => setText(txt)} />
      <Button title='Add note' onPress={addNote}></Button>
      
      <FlatList  
      data={data}
      renderItem={(note) => 
      <>
      <Button title={note.item.text} onPress={() => goTODetailPage(note.item)} />
      <TouchableOpacity onPress={() => deleteNote(note.item.id)}>
      <Image
        style={{ width: 30, height: 30 }}
        source={{ uri: 'https://img.icons8.com/quill/100/filled-trash.png' }}
        alt="delete"
      />
      </TouchableOpacity>
      </>
    }
      />
      <StatusBar style="auto" />
    </View>
  ) 
}


const DetailPage = ({navigation, route}) => {
  const message = route.params?.message // '?' = denne linje skal ikke køre med mindre params har en værdig
  return(
    <View>
      <Text>{message.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'lightblue'
  }
});
