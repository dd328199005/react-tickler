import React, {Component} from 'react'
import './TodoInput.css'
class TodoInput extends Component {
    render(){
        return (
            <input type="text" value={this.props.content} className="TodoInput"
                        onKeyUp={this.submit.bind(this)}
                        onChange={this.changeTitle.bind(this)}/>
                    )
    }
    submit(event){
        if (event.key === 'Enter') {
            this.props.onSubmit(event)
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}
export default TodoInput