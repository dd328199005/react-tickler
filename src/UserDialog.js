import React, {Component} from 'react'
import './UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail} from './leanCloud.js'
import SignInOrSignUp from './SignInOrSignUp.js'
import ForgotPassWord from './ForgotPassword.js'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                username: '',
                password: '',
                email: ''
            }
        }
    }
   
    signUp(e){
        e.preventDefault();
        let {email, username  , password} = this.state.formData
        let success = (user) => {
            this.props.onSignUp(user)
        }
        let error = error => {
            switch (error.code) {
                case 202:
                    alert('用户名已被注册')
                    break;
                default:
                    alert('error')
                    break;
            }
        }
        let correctNumber = email.match(/\d{3,}@\w?\.com/)
        if (correctNumber){signUp(email, username, password, success, error)}else{alert('格式错误')}
        
    }
    signIn(e){
        e.preventDefault();
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn(user)
        }
        let error = error => {
            switch (error.code) {
                case 210:
                    alert('用户名密码不匹配')
                    break;
                default:
                    alert('用户名密码不匹配')
                    break;
            }
        }
        signIn(username, password, success, error)
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    showForgotPassWord(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = "forgotPassWord"
        this.setState(stateCopy)
    }

    resetPassWord(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }

    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }

    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab ==="signInOrSignUp"? 
                    <SignInOrSignUp
                        formData={this.state.formData}
                        onChange={this.changeFormData.bind(this)}
                        onSignIn={this.signIn.bind(this)}
                        onSignUp={this.signUp.bind(this)}
                        onForgotPassWord={this.showForgotPassWord.bind(this)}
                    />
                    :
                        <ForgotPassWord
                        formData={this.state.formData}
                        onChange={this.changeFormData.bind(this)}
                        onSubmit={this.resetPassWord.bind(this)}
                        toSignIn={this.returnToSignIn.bind(this)}
                    />}
                </div>
            </div>
        )
    }
}

