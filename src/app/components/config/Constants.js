var dev = "http://localhost:9001/";
var devIp = "http://127.0.0.1:9001/"
var path = "";

var isDev = true;
var isDevIp = false;

if(isDev == true){
    path = dev;
}else if(isDevIp == true){
    path = devIp;
}

module.exports = {
    "apiAuth" : path+"auth",
    "profile" : path+"user",
    "leaveType" : path+"leavetype",
    "userLeaveBalanceInfo" : path+"leavesinfo",
    "userLeaveApply" : path+"leaveApply"
}