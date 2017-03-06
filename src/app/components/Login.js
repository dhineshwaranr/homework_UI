import React from "react";
import {Router} from 'react-router';
import {browserHistory} from 'react-router'

import URL from "../components/config/Constants";
import Ajax from "../components/helpers/Ajax_Helpers";
import DOM from "../components/helpers/DOM_Helpers";

export class Login extends  React.Component {

    constructor() {
        super()
        this.state={
            username:'',
            password:''
        };
    }


    onLoginHandler(e) {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        });
    }

    doLogin(event) {
        var _router = this.context.router;
        var _this = this;
        event.preventDefault();
        var data = {};
        debugger
        data.username = this.state.username;
        data.password = this.state.password;
        var login = Ajax.login(URL.apiAuth, data);
        login.done(function(obj) {
            localStorage.setItem("pala_token",obj.token);
            var currentUser = Ajax.getCall(URL.profile);
            currentUser.done(function(obj){
                localStorage.setItem("pala_current_user",JSON.stringify(obj));
            }).fail(function(obj){

            });
            browserHistory.push('/portal');
            DOM.alert($("#success"), "Welcome! Login Successfull")
        }).fail(function(obj) {
            debugger
            var message = obj.responseJSON.message;
            DOM.alert($("#failed"), message)
        })
    }

    forgotPassword() {
        browserHistory.push('/forgot-password');
    }

    render() {
        return (
            <div className="row">
                <div className="Absolute-Center is-Responsive">
                    <div className="loginDiv">
                        <div className="form-group">
                            <input type="text" className="form-control" name="username" id="userName" placeholder="User Name" onChange={(event) => this.onLoginHandler(event)}/>
                        </div>
                        <div id="logo-container"></div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={(event) => this.onLoginHandler(event)}/>
                        </div>

                    </div>
                    <input type="button" className="btn btn-default col-lg-4 col-sm-4 col-md-4 col-xs-5" value="Submit" onClick={() => this.doLogin(event)} />
                    <input type="button" className="btn btn-default col-lg-4 col-sm-4 col-md-4 col-xs-5" value="Forgot Password" onClick={() => this.forgotPassword()} />
                </div>
            </div>
        );
    }
}