import React from 'react'

class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            data: new Date(),
            test:1
        }
       
        console.log('我已经在 constructor 里将 props 和 state 初始化好了')
    }
    componentWillMount(){
        this.setState({
            data: new Date(),
            test: 'compenentWillMount'
        })
        console.log('将要挂在')
    }
    render() {
       
        console.log("渲染")
        return (
            <div>
                <h1>Hello, {this.props.name}</h1>
                <h2>{this.state.data.toString()}</h2>
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            data: new Date(),
            test: "componentDidMount"
        })
        console.log("done")
    }
}
// function Welcome(props) {
// return <h1>Hello, {props.name}</h1>;
// }

export default Welcome