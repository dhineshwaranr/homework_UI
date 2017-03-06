import React from "react";
import { browserHistory } from "react-router";
import {Tabs, Tab} from 'react-bootstrap-tabs';

import URL from "../../components/config/Constants";
import Ajax from "../../components/helpers/Ajax_Helpers";
import DOM from "../../components/helpers/DOM_Helpers";

export class LeaveApply extends React.Component {

    constructor() {
        super()
        this.state = {
            userLeaveBalInfo: {},
            allAppliedLeaves: [],
            description: '',
            halfDay: '',
            isCompOff: '',
            noOfDays: '',
            reason: '',
            leaveType: ''

        }
    }

    componentDidMount() {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem("pala_current_user"));
        var getUserLeaveBalInfo = Ajax.getCall(URL.userLeaveBalanceInfo+"/"+currentUser.id);
        var getAllLeaveType = Ajax.getCall(URL.leaveType);

        getUserLeaveBalInfo.done(function(obj) {
            _this.setState({
                userLeaveBalInfo : obj
            });
        })
        getAllLeaveType.done(function(obj) {
            var output = '';
            $.each(obj,function(index, el) {
                output += '<option class="results" value="'+el.id+'">'+el.description+'</option>';

            });
            $("#allLeaveTypeSelect").append(output);
        })
        this.getUserAppliedLeaveHistory(currentUser);

    }

    getUserAppliedLeaveHistory(currentUser) {
        var _this = this;
        var getUserAppliedLeaveInfo = Ajax.getCall(URL.userLeaveApply+"/"+currentUser.id);
        getUserAppliedLeaveInfo.done(function(obj){
            _this.setState({
                allAppliedLeaves : obj
            });
        })
    }

    navigation() {
        browserHistory.push("/dashboard");
    }

    onChangeInputHandler(e) {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        });
    }

    applyLeave(event) {
        var _this = this;
        event.preventDefault();
        var currentUser = JSON.parse(localStorage.getItem("pala_current_user"));
        var data = {};
        data.description= this.state.description;
        data.fromDt= $("#fromdatepicker input").val();;
        data.toDt= $("#todatepicker input").val();;
        data.halfDay= this.state.halfDay;
        data.isCompOff= this.state.isCompOff;
        data.noOfDays= this.state.noOfDays;
        data.reason= this.state.reason;
        data.leaveType= $("#allLeaveTypeSelect").val();
        data.user = currentUser.id;
        var applyLeave = Ajax.postCall(URL.userLeaveApply,data);
        applyLeave.done(function(){
            var currentUser = JSON.parse(localStorage.getItem("pala_current_user"));
            _this.getUserAppliedLeaveHistory(currentUser);
        }).fail(function(){

        });
    }

    selectTab(lable) {
        console.log(lable);
    }

    render() {
        var bindAppliedLeave = this.state.allAppliedLeaves.map(function(item, index){
           var name = item.user.firstname +" "+ item.user.lastname;
           return(
               <div key={index} className="appliedLeaveHistoryWrapper">
                   <div className="row">
                       <div className="col-lg-2">
                          <div className="row">
                              <div className="col-lg-12 title">{name}</div>
                              <div className="col-lg-12 value">{item.user.id}</div>
                          </div>
                       </div>
                       <div className="col-lg-2">
                           <div className="row">
                               <div className="col-lg-12 title">Leave Type</div>
                               <div className="col-lg-12 value">{item.leaveType}</div>
                           </div>
                       </div>
                       <div className="col-lg-2">
                           <div className="row">
                               <div className="col-lg-12 title">No of Days</div>
                               <div className="col-lg-12 value">{item.noOfDays}</div>
                           </div>
                       </div>
                       <div className="col-lg-2">
                           <div className="row">
                               <div className="col-lg-12 title">From</div>
                               <div className="col-lg-12 value">{item.fromDt}</div>
                           </div>
                       </div>
                       <div className="col-lg-2">
                           <div className="row">
                               <div className="col-lg-12 title">To</div>
                               <div className="col-lg-12 value">{item.toDt}</div>
                           </div>
                       </div>
                       <div className="col-lg-2">
                           <div className="row">
                               <div className="col-lg-12 title">Status</div>
                               <div className="col-lg-12 value">{item.leaveStatus}</div>
                           </div>
                       </div>
                   </div>
               </div>
           );
        });
        return (
            <div className="leavesPanel">
            <Tabs onSelect={(index, label) => this.selectTab(label)}>
                <Tab label="Apply Leave">
                    <div className="leaveApplyTab">
                        <div className="row">
                            <h4>Leave Info</h4>
                            <div className="row leave-bal-wraper">
                                <div className="leave-bal-cl"><span>{this.state.userLeaveBalInfo.totalClCount}</span></div>
                                <div className="leave-bal-el"><span>{this.state.userLeaveBalInfo.totalElCount}</span></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h4>Apply Leave</h4>
                                <form id="leaveApply" className="form-horizontal">
                                    <div className="form-group">
                                        <div className='col-sm-4 compoff-type'>
                                            <div className="col-sm-12 checkbox">
                                                <label><input type="checkbox" name="isCompOff" value="1" onChange={(event) => this.onChangeInputHandler(event)}/>Apply for Compoff</label>
                                            </div>
                                            <div className="checkbox col-sm-12">
                                                <label><input type="checkbox" name="halfDay" value="1" onChange={(event) => this.onChangeInputHandler(event)}/>Half day</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className='col-sm-4'>
                                            <label htmlFor="sel1">LeaveType</label>
                                            <select className="form-control" id="allLeaveTypeSelect" name="leaveType" onChange={(event) => this.onChangeInputHandler(event)}>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className='col-sm-2'>
                                            <div id="fromdatepicker" className="input-group date" data-date-format="mm-dd-yyyy">
                                                <label>From</label>
                                                <input className="form-control" type="text" readOnly name="fromDt" onChange={(event) => this.onChangeInputHandler(event)}/>
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div className='col-sm-2'>
                                            <div id="todatepicker" className="input-group date" data-date-format="mm-dd-yyyy">
                                                <label>To</label>
                                                <input className="form-control" type="text" readOnly name="toDt" onChange={(event) => this.onChangeInputHandler(event)}/>
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-4">
                                            <label htmlFor="noOfDays">No of Day's</label>
                                            <input type="text" className="form-control" id="noOfDays" name="noOfDays" onChange={(event) => this.onChangeInputHandler(event)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-4">
                                            <label htmlFor="reason">Reason</label>
                                            <input type="text" className="form-control" id="reason" name="reason" onChange={(event) => this.onChangeInputHandler(event)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-2">
                                            <input type="button" className="form-control" value="Apply" onClick={(event) => this.applyLeave(event)}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <h4>Applied Leave History</h4>
                            {bindAppliedLeave}
                        </div>
                    </div>
                </Tab>
                <Tab label="Leave History">Tab 2 content</Tab>
            </Tabs>
            </div>
        );
    }
}
