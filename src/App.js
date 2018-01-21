import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import AV from './leanCloud.js'
import UserDialog from './UserDialog'


// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!',
//   chen:'hah'
// }).then(function (object) {
//   alert('LeanCloud Rocks!');
// })


let id = 0;
function  idMacker() {
    id +=1
    return id 
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      newTodo: '',
      todoList: []
    }
  }
  render(){
    let todos = this.state.todoList.map((item, index) =>{
      return(
        <li key={index}>
          <TodoItem todo={item} 
                    onToggle={this.toggle.bind(this)}
                    onDelete={this.deleteTodo.bind(this)}
          />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
                     onSubmit={this.addTodo.bind(this)}
                     onChange={this.changeTitle.bind(this)}
                     />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        <UserDialog onSignUp={this.onSignUp.bind(this)}/>
      </div>
    );
  }
  componentDidUpdate(){
    
  }
  onSignUp(user){
    this.state.user = user
    this.setState(this.state)
  }

  deleteTodo(e,todo){
    todo.deleted = true
    this.state.todoList = this.state.todoList.filter((item)=>{
      return !item.deleted 
    })
    this.setState(this.state)
    
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    
  }

  addTodo(event){
    this.state.todoList.push({
      id: idMacker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    
  }

  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
    
  }
}

export default App;
