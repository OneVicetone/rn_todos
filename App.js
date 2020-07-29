import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements'

export default function App() {
  const { container, logoText, inputTodos, addTodoView, todoList, addButtonStyle, listOperateIcon } = styles
  const [todo, setTodo] = useState('')
  const [todosList, setTodosList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const renderList = ({ item, index }) => {
    return (
      <ListItem key={item.label + index} title={item.label} bottomDivider rightElement={todoRightEle(item.isEnd, index)} />
    )
  }

  const getInputValue = val => {
    setTodo(val)
  }

  const addTodoToList = () => {
    if (todo.trim() === '') {
      return alert('请输入内容')
    }
    setIsLoading(true)
    setTimeout(() => {
      const todoObj = {
        label: todo,
        isEnd: false
      }
      setTodosList([todoObj, ...todosList])
      setTodo('')
      setIsLoading(false)
    }, 1000)
  }

  const todoRightEle = (isEnd, index) => {
    const iconName = isEnd ? 'cube-send' : 'check'
    return (
      <View style={{ flexDirection: 'row' }}>
          <Icon style={listOperateIcon} name={iconName} onPress={() => operateTodo(index)} />
        <Icon style={listOperateIcon} name="close" onPress={() => removeTodo(index)} />
      </View>
    )
  }

  const removeTodo = index => {
    const arr = JSON.parse(JSON.stringify(todosList))
    arr.splice(index, 1)
    setTodosList(arr)
  }

  const operateTodo = (index) => {
    const arr = JSON.parse(JSON.stringify(todosList))
    arr[index].isEnd = !arr[index].isEnd
    setTodosList(arr)
  }

  return (
    <View style={container}>
      <StatusBar style="auto" />
      <Text style={logoText}>Todos</Text>
      <View style={addTodoView}>
        <TextInput style={inputTodos} value={todo} placeholder="请输入需要添加的任务" onChangeText={getInputValue} editable={!isLoading} />
        <Button title="添加" onPress={addTodoToList} buttonStyle={addButtonStyle} loading={isLoading} />
      </View>
      <View style={todoList}>
        <FlatList data={todosList} renderItem={renderList} keyExtractor={item => item} />
      </View>
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
  logoText: {
    fontSize: 40,
    paddingBottom: 20
  },
  addTodoView: {
    width: '100%',
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: 'nowrap'
  },
  inputTodos: {
    width: '75%',
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingLeft: 10,
    borderRadius: 4,
  },
  todoList: {
    width: '100%',
    height: 400,
  },
  addButtonStyle: {
    width: 80,
    height: 40,
    fontSize: 12,
  },
  listOperateIcon: {
    marginHorizontal: 10
  }
});
