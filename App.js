import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform
} from "react-native";
import { AppLoading } from "expo";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import Todo from "./ToDo";
import uuidv1 from "uuid/v1";

const { heigh, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    // abc
    loadedToDos: false,
    toDos: {}
  };
  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"placeholder"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <Todo text={"hidd"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  _addToDo = () => {
    const { newToDo } = this.state;
    // 'abc'
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            // 1234
            isCompleted: false,
            text: newToDo,
            // abc
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          // newTodo : abc
          // loadedTodos: true,
          // toDos: {}

          newTodo: "",
          // newTodo : ""

          toDos: {
            ...prevState.toDos,
            // {}
            ...newToDoObject
            // [123]: {
            // id: 123
            // isCompleted:false
            // text: abc
            // createdAt: Date.now()
            //
          }
        };
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "400",
    marginTop: 30,
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: { shadowColor: "rgb(50, 50, 50)" },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
