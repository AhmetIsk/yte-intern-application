import React from "react"
import history from "../../history";
import LogInComponent from "../../LogInComponent";
import AuthenticationService from "../service/AuthenticationService";

class LogInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.handleChangeClick = this.handleChangeClick.bind(this)
        this.handleChangeClick2 = this.handleChangeClick2.bind(this)
    }


    // burayı değiştirmedim
    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({
            [name]: value
        })
    }

    handleChangeClick() {
        history.push('/home');
    }

    handleChangeClick2() {
        history.push('/signUp');
    }

    loginClicked() {
        //in28minutes,dummy
        // if(this.state.username==='ahmetIsk' && this.state.password==='dummy'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/home`)
        //     this.setState({showSuccessMessage:true})
        //     this.setState({hasLoginFailed:false})
        // }
        // else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/home`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

        // AuthenticationService
        //     .executeJwtAuthenticationService(this.state.username, this.state.password)
        //     .then((response) => {
        //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        //         this.props.history.push(`/home`)
        //     }).catch(() => {
        //     this.setState({ showSuccessMessage: false })
        //     this.setState({ hasLoginFailed: true })
        // })

    }

    render() {
        return (
            <div className="center-page">
                <LogInComponent
                    handleChange={this.handleChange}
                    handleChangeClick={this.handleChangeClick}
                    handleChangeClick2={this.handleChangeClick2}
                    loginClicked={this.loginClicked}
                    data={this.state}
                />

            </div>
        )
    }
}
export default LogInContainer;