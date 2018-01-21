import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import AV from './leanCloud.js'
import UserDialog from './UserDialog'
import { getCurrentUser, signOut, TodoModel } from './leanCloud'


// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!',
//   chen:'hah'
// }).then(function (object) {
//   alert('LeanCloud Rocks!');
// })




class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user, todos => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
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
        <h1>{this.state.user.username || '我'}的待办
            {this.state.user.id? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
                     onSubmit={this.addTodo.bind(this)}
                     onChange={this.changeTitle.bind(this)}
                     />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null :
         <UserDialog onSignUp={this.onSignUpOrOnSignIn.bind(this)}
                     onSignIn={this.onSignUpOrOnSignIn.bind(this)}
        />}
      </div>
    );
  }
  componentDidUpdate(){
    
  }
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignUpOrOnSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))//直接修改的话可能不会引起变化
    stateCopy.user = user
    this.setState(stateCopy)
  }
 
  deleteTodo(e,todo){
    TodoModel.destroy(todo.id, ()=>{
      todo.deleted = true
      this.setState(this.state)
    })
    
  }

  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, ()=>{
      this.setState(this.state)
    },error => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
   TodoModel.create(newTodo, id =>{
     newTodo.id = id
    this.state.todoList.push(newTodo)
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }, (error) => {
      console.log(error)
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
