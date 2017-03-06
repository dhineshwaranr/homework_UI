import React from "react";
import {Link} from "react-router";
import {browserHistory} from 'react-router'

import Ajax from "../../components/helpers/Ajax_Helpers";

export class Header extends React.Component{

    logout(){
        Ajax.logout();
        browserHistory.push('/');
    }

    render() {
        return(
            <nav className="navbar navbar-default headerNav">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to={"/portal/dashboard"} activeStyle={{color:"red"}}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to={"/leaves/leave-apply"} activeClassName={"active"}><span className="glyphicon glyphicon-user"></span></Link>
                            </li>
                            <li>
                                <Link to={"/portal/user/10"} activeClassName={"active"}>User Id</Link>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={this.logout} >Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}