
var ConnectionData=(function(){
    var CLASS=function ConnectionData(_method,_applicationAddress,_command){
    	var _THIS=this;
    	this.method=_method.toUpperCase()||'GET';
    	this.addr=_applicationAddress||'undefined_application.php';
    	this.requestBody={};
    	for(var i in _command)this.requestBody[i]=_command[i];
    };
    return CLASS;
})();
var Link=(function(){
    var CLASS=function Link(connectionData){
    	var _THIS=this;
    	QProperty.call(this,['TargetReference'])
    	QProperty.call(this,['OnSuccess'])
    	QProperty.call(this,['OnError'])
	    this.connection=connectionData||new ConnectionData();
		this.makeRequest=function _upload(data){
			var requestBody={};
			for(var i in _THIS.connection.requestBody){requestBody[i]=(_THIS.connection.requestBody[i])}
			for(var i in data){requestBody[i]=(data[i])}
			response=(CallText2(this.connection.method.toUpperCase(),_THIS.connection.addr,requestBody));
			
        	if(response.substr(0,2)=='OK'){
        		//console.log(_THIS.TargetReference())
        		_THIS.OnSuccess()(response.substr(3),_THIS.TargetReference());
        		return true;
			}else{
        		_THIS.OnError()(response);
        		return false;
    		}
		};
    };
    return CLASS;
})();

var TableRemoteLinkModel=(function(){
    var CLASS=function TableRemoteLinkModel(){
    	var _THIS=this;
    	QProperty.call(this,['Data'])
    	this.Data([])
		this.download=function _download(){
			DATA=StringToArray(_THIS.Link);
        	DATA=[];
        	if(DATA[0][0]=='OK')
        		DATA.splice(0,1)
		};
		this.upload=function _upload(rowData){
			var requestBody={};
			for(var i in _THIS.Uplink.requestBody){requestBody[i]=_THIS.Uplink.requestBody[i]}
			for(var i in rowData){requestBody[i]=rowData[i]}
			DATA=StringToArray(CallText2(this.Uplink.method.toUpperCase(),_THIS.Uplink.addr,requestBody));
        	DATA=[];
        	if(DATA[0][0]=='OK')
        		DATA.splice(0,1);
		};
    };
    return CLASS;
})();