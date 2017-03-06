import React from "react";

import URL from "../../components/config/Constants";
import Ajax from "../../components/helpers/Ajax_Helpers";
import DOM from "../../components/helpers/DOM_Helpers";

export class Dashboard extends  React.Component {

    componentDidMount() {
        var user = Ajax.getCall(URL.profile);
        user.done(function(obj) {
            debugger
            var message = "Welcome "+obj.firstname+"!";
            DOM.alert($("#success"), message)
        }).fail(function(obj) {
            var message = obj.responseJSON.message;
            DOM.alert($("#failed"), message)
        })
    }

    render() {
        return (
            <div>
                <h3>Dashboard123</h3>
            </div>
    );
    }
}