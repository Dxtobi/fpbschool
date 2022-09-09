import React, { Component } from 'react'
import { loginUser } from '../../../actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export class Login extends Component {

    state = {
        email: "",
        password: "",
        redirect: false,
        error:{}
    }

  componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      this.setState({error:nextProps.error})
  }

    
    componentDidMount() {
        this.setState({ redirect: this.props.auth.isAdmin })
        console.log(this.props.auth.isAdmin)
    }
    
    render() {
        if (this.props.auth.isAdmin) {
            return <Redirect to="/adm" />
        }
        return (
            <div className="login_admin">
                {this.state.error.email && <div style={{color:'red'}}>{this.state.error.email}</div>}
                <input className="login_input" type="email" placeholder="enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                />

{this.state.error.password && <div style={{color:'red'}}>{this.state.error.password}</div>}
                <input className="login_input" type="password" placeholder="enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    const data = {
                        password: this.state.password,
                        email: this.state.email,
                    }
                    this.props.loginUser(data)
                }} className="login_input_button" >Login</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error:state.errors
})

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
