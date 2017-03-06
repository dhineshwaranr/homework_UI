import React from "react";

import { Header } from  "./components/navigation/Header";
import { SideNavigation } from  "./components/navigation/SideNavigation";


export class Root extends React.Component {
    render() {
        return(
            <div>
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-lg-1">
                        <SideNavigation />
                    </div>
                    <div className="col-lg-11">
                        <div role="alert" className="alert alert-success alert-top" id="success">
                            <span className="alert-msg"></span>
                        </div>
                        <div role="alert" className="alert alert-danger alert-top" id="failed">
                            <span className="alert-msg"></span>
                        </div>
                        <div className="alert alert-info alert-top" id="info">
                            <span className="alert-msg"></span>
                        </div>
                        {this.props.children}
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}