import React from "react"
import SignIn from "./SignIn";
import history from "../../history";
import LogInComponent from "../../LogInComponent";

class LogInContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeClick = this.handleChangeClick.bind(this)
        this.handleChangeClick2 = this.handleChangeClick2.bind(this)
    }

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

    render() {
        return (
            <div className="center-page">
                <LogInComponent
                    handleChange={this.handleChange}
                    handleChangeClick={this.handleChangeClick}
                    handleChangeClick2={this.handleChangeClick2}
                    data={this.state}
                />

            </div>
        )
    }
}
export default LogInContainer;