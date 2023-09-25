import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

/** When adding navigation to the project run these scrips: 
 * npm i @react-navigation/native
 * npm i @react-navigation/native-stack
 *  */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator() //opretter et object, til at lægge en side på en anden side når man navigere


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

  //const staticNotes = [{key: 1, name: 'mo'}, {key:2, name: 'stacks'}]


  function addNote(item){
    //alert('you typed ' + text)
    setNotes(
      [...notes, {key:notes.length, name: text}]
    )
  }

  function goTODetailPage (item) {
    navigation.navigate('DetailPage', {message:item})
    //alert({message:item.name})
  }
  return (
    <View style={styles.container}>
      <Text>Welcome to your note-app</Text>
      <TextInput style={styles.textInput} onChangeText={(txt) => setText(txt)} />
      <Button title='Add note' onPress={addNote}></Button>
      
      <FlatList  
      data={notes}
      renderItem={(note) => <Button title={note.item.name} onPress={() => goTODetailPage(note.item)}/>}
      />
      <StatusBar style="auto" />
    </View>
  ) 
}


const DetailPage = ({navigation, route}) => {
  const message = route.params?.message // '?' = denne linje skal ikke køre med mindre params har en værdig
  return(
    <View>
      <Text>{message.name}</Text>
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
