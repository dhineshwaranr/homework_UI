import React from "react";

import URL from "../../components/config/Constants";
import Ajax from "../../components/helpers/Ajax_Helpers";
import DOM from "../../components/helpers/DOM_Helpers";

export class LeaveTypes extends  React.Component {

    constructor() {
        super()

        this.state = {
            description: '',
            name: '',
            allLeaveTypes:[]
        };
    }

    handleChange(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    componentDidMount() {
        var _this = this;
        var getAllLeaveType = Ajax.getCall(URL.leaveType);
        getAllLeaveType.done(function(obj) {
            _this.setState({
                allLeaveTypes : obj
            })
        }).fail(function(obj) {
            DOM.alert($("#failed"), message)
        })
    }

    addLeaveType(e){
        e.preventDefault();
        var _this = this;
        var data = {};

        data.description = this.state.description;
        data.name = this.state.name;
        var save_leave_type = Ajax.postCall(URL.leaveType, data);
        save_leave_type.done(function(obj) {
            Ajax.formReset("#leaveTypes");
            DOM.alert($("#success"), "Leave Type Added")
            _this.componentDidMount();
        }).fail(function(obj) {
            DOM.alert($("#failed"), message)
        })
    }

    render() {
        var bindLeaveTypeTable = this.state.allLeaveTypes.map(function(item, index){
            return(
                <tr key={index}>
                    <td>{item.leaveTypeName}</td>
                    <td>{item.description}</td>
                </tr>
            );
        });
        return (
            <div>
                <div role="alert" className="alert alert-success alert-top" id="success">
                    <span className="alert-msg"></span>
                </div>
                <h3>Leave Types</h3>
                <div className="row">
                    <form className="form-horizontal" id="leaveTypes" >
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="email">Description:</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="description" name="description" onChange={(event) => this.handleChange(event)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="pwd">Leave Type Name:</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="name" name="name" onChange={(event) => this.handleChange(event)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-2">
                                <input type="submit" className="btn btn-default" value="Add" onClick={(event) => this.addLeaveType(event)}/>
                            </div>
                        </div>
                    </form>
                </div>
                <hr />
                <div className="row">
                    <div className="leaveTypeList" id="leaveTypeList">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Leave Type Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                                {bindLeaveTypeTable}
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        );
    }
}