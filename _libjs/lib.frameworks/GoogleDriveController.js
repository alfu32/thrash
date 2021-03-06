/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/21/12
 * Time: 1:39 AM
 * To change this template use File | Settings | File Templates.
 */
function GoogleDriveController(){
    var gdriveController=this;
    var statusController=new DetailedCellViewController();
    statusController.IconBackground("../../_libimg/google/drive_icon_inactive_x32.png",0);
    statusController.view.style.cursor="pointer";
    statusController.view.addEventListener("click",function(event){
        if(client.authState<3){
            Authenticate();
            return;
        }
        fileDialog=new FileDialogController(gdriveController);
        fileDialog.show();
        fileDialog.Title("Export");
        fileDialog.list();
    },false);
    this.setMessage=statusController.Message;
    this.setDetail=statusController.Detail;
    this.setIcon=statusController.Icon;
    fileManager.addEntry(
        statusController,0
    );
var client={authState:0,authDriver:function(){}}
    var config = {
        'client_id': '783772708515.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/drive'
    };
    var userInfo;
    client.authDriver(new Dropbox.Drivers.Redirect());
    if(client.authState<3){
        statusController.Detail("click to login to googleDrive")
    }else{
        Authenticate();
    }
    function Authenticate() {
        gapi.auth.authorize(config, function() {
            console.log('login complete');
            console.log(gapi.auth.getToken());
            client.authState=3;
            //statusController.Message(userInfo.name);
            statusController.Detail("logged in");
            statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
            statusController.IconBackground("../../_libimg/google/drive_icon_active_x32.png",0);
            statusController.layout();
        });
    }
    function _auth(){
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);
        client.authenticate(function(error, client) {
            if (error) {
                // Replace with a call to your own error-handling code.
                //
                // Don't forget to return from the callback, so you don't execute the code
                // that assumes everything went well.
                return showError(error);
            }

            // Replace with a call to your own application code.
            //
            // The user authorized your app, and everything went well.
            // client is a Dropbox.Client instance that you can use to make API calls.
            //doSomethingCool(client);
            client.getUserInfo(function(error, userInfo){

            })
        });
    }
    var showError = function(error) {
        if (window.console) {  // Skip the "if" in node.js code.
            console.error(error);
        }
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.ERROR);
        switch (error.status) {
            case 401:
                statusController.Detail("token expired, refresh page")
                // If you're using dropbox.js, the only cause behind this error is that
                // the user token expired.
                // Get the user through the authentication flow again.
                break;

            case 404:

                statusController.Detail("folder not found")
                // The file or folder you tried to access is not in the user's Dropbox.
                // Handling this error is specific to your application.
                break;

            case 507:
                statusController.Detail("you're over your Dropbox quota ")
                // The user is over their Dropbox quota.
                // Tell them their Dropbox is full. Refreshing the page won't help.
                break;

            case 503:
                statusController.Detail("try again later")
                // Too many API requests. Tell the user to try again later.
                // Long-term, optimize your code to use fewer API calls.
                break;

            case 400:
                statusController.Detail("Bad input parameter");
                break; // Bad input parameter
            case 403:
                statusController.Detail("Bad OAuth request.");
                break;  // Bad OAuth request.
            case 405:
                statusController.Detail("Request method not expected");
                break;  // Request method not expected
            default:
                statusController.Detail("App has a Bug, tell developper");
                break;
            // Caused by a bug in dropbox.js, in your application, or in Dropbox.
            // Tell the user an error occurred, ask them to refresh the page.
        }
    };
    this.getUserInfo=function(callback){
        client.getUserInfo(function(error, userInfo) {
            if (error) {
                return showError(error);  // Something went wrong.
            }

            callback(userInfo);
        });
    }
    this.readFile=function(fileName,callback){
        statusController.Detail("loading "+fileName);
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);
        client.readFile(fileName, function(error, data) {
            if (error) {
                return showError(error);  // Something went wrong.
            }else{
                statusController.Detail(fileName+" loaded")
                statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
                callback(error,fileName,data);
            }// data has the file's contents
        });
    }
    this.writeFile=function(fileName,contents,callback){
        statusController.Detail("writing "+fileName);
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);
        client.writeFile(fileName,contents, function(error, stat) {
            if (error) {
                return showError(error);  // Something went wrong.
            }else{
                statusController.Detail(fileName+" saved");
                statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
                callback(error,stat);
            }
            //alert("File saved as revision " + stat.revisionTag);
        });
    }
    this.mkdir=function(dirName,callBack){
        statusController.Detail("make '"+dirName+"'");
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);

        client.mkdir(dirName, function(error, stat) {
            if (error) {
                return showError(error);  // Something went wrong.
            }else{
                statusController.Detail(dirName+" made");
                statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
                callBack(error,stat);
            }
            //alert("Your Dropbox contains " + entries.join(", "));
        });
    }
    this.listDir=function(dir,callback){
        statusController.Detail("requesting contents of '"+dir+"'");
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);

        client.readdir(dir, function(error,entries, stat,entriesStat) {
            if (error) {
                return showError(error);  // Something went wrong.
            }else{
                statusController.Detail(dir+" listed")
                statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
                callback(error, entries,stat,entriesStat);
            }
            //alert("Your Dropbox contains " + entries.join(", "));
        });
    }
    this.delete=function(file,callback){
        statusController.Detail("deleting '"+file+"'");
        statusController.Icon(GoogleDriveController.ICON_RESOURCE.LOADING);

        client.delete(file, function(error, stat) {
            if (error) {
                return showError(error);  // Something went wrong.
            }else{
                statusController.Detail(file+" deleted");
                statusController.Icon(GoogleDriveController.ICON_RESOURCE.EMPTY);
                callback(error,stat);
            }
            //alert("Your Dropbox contains " + entries.join(", "));
        });
    }
}
GoogleDriveController.ICON_RESOURCE={
    EMPTY:"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D",
    ERROR:"../../_libimg/ios/IL_MinusLine.png",
    LOADING:"../../_libimg/icon_loading.gif"

}
GoogleDriveController.constructor=GoogleDriveController;
GoogleDriveController.prototype=new ViewController();