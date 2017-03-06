import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute, Redirect } from "react-router";

import { Root } from "../app/Root";
import { Dashboard } from "./components/core/Dashboard";
import { LeaveApply } from "./components/leaves/LeaveApply";
import { Login } from "./components/Login";
import {Ajax} from "./components/helpers/Ajax_Helpers";
import {ForgotPassword} from "./components/core/ForgotPassword";
import {LeaveTypes} from "./components/leaves/LeaveTypes";

//https://github.com/reactjs/react-router-tutorial/tree/master/lessons
class App extends React.Component {
    render() {
        return(
            <Router history={browserHistory}>
                <Redirect from='/portal' to='/portal/dashboard' />
                <Route path="/" component={Login} />
                <Route path="portal" component={Root}>
                    <Route path="dashboard" component={Dashboard}/>
                </Route>
                <Route path="leaves" component={Root}>
                    <Route path="leave-apply" component={LeaveApply} />
                    <Route path="leave-types" component={LeaveTypes} />
                </Route>
                <Route path={"users"} component={LeaveApply}/>
                <Route path={"forgot-password"} component={ForgotPassword} />
                <Route path={"logout"} />
            </Router>
    );
    }
}

browserHistory.listen(function(ev) {
    if(!(!!localStorage.getItem('pala_token'))) {
    }
    //console.log('listen', ev.pathname);
});

function requireAuth(nextState, replace) {
    debugger
    if (!Ajax.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

render(<App/>, window.document.getElementById("app"));