import React,{Component} from 'react'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'

export default class SignInOrSignUp extends Component{
    constructor(props) { 
        super(props)
        this.state = {
            selected: "signUp"
        }
    }
    switchSelect(e) {
        this.setState({
            selected: e.target.value,
            formData: {
                username: '',
                password: '',
                email: ''
            }
        })
    }
    render(){
        return (
            <div className="signInOrSignUp">
                <nav >
                    <label><input type="radio" value="signUp"
                        checked={this.state.selected === "signUp"}
                        onChange={this.switchSelect.bind(this)}
                    /> 注册</label>
                    <label><input type="radio" value="signIn"
                        checked={this.state.selected === "signIn"}
                        onChange={this.switchSelect.bind(this)}
                    /> 登录</label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.props.formData}
                            onSubmit={this.props.onSignUp.bind(this)}
                            onChange={this.props.onChange.bind(this)}
                        />
                        : <SignInForm formData={this.props.formData}
                            onSubmit={this.props.onSignIn.bind(this)}
                            onChange={this.props.onChange.bind(this)}
                            onForgotPassword={this.props.onForgotPassWord.bind(this)}
                        />
                    }
                </div>
            </div>
        )
    }
}
   
  