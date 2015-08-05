function GetHttpObject(){
	var tmp_object=null;
	try
	{
		tmp_object=new XMLHttpRequest();
	}
	catch (e)
	{
		try
		{
			tmp_object=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				tmp_object=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return null;
			}
		}
	}
	return tmp_object;
}
var CallText2=(function(){
	return function CallText_2(method,url,param)
	{
        var xmlHttpSync = GetHttpObject();
		  if (method.toUpperCase()=="POST") {
            xmlHttpSync.open(method,url,false)
			   xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(serializeDict(param,'=','&'));
		  }else{
            xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),false)
            xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(null);
        }
		return xmlHttpSync.responseText;
	}
})();
var CallBin=(function(){
	return function CallBin(method,url,param)
	{
        var xmlHttpSync = GetHttpObject();
		  if (method.toUpperCase()=="POST") {
            xmlHttpSync.open(method,url,false)
			   xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(serializeDict(param,'=','&'));
		  }else{
            xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),false)
            xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(null);
        }
		return xmlHttpSync.responseText;
	}
})();
var CallXML=(function(){
	return function CallBin(method,url,param)
	{
        var xmlHttpSync = GetHttpObject();
		  if (method.toUpperCase()=="POST") {
            xmlHttpSync.open(method,url,false)
			   xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(serializeDict(param,'=','&'));
		  }else{
            xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),false)
            xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlHttpSync.send(null);
        }
		return xmlHttpSync.responseXml;
	}
})();

SERVER=(function SERVER_UNIT(){
	var UNIT={};
	UNIT.onfinishedloading=(function onfinishedloading(){return function onfinishedloading_default(tx){}})();
	
	UNIT.requestTable=function SERVER_requestTable(applicationName,paramBody,transform){
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined)tx=transform(tx)
				tx=tx.substr(3);
				UNIT.onfinishedloading(tx);

				try{
					tab=deserializeTable(tx);
				}catch (err){//SERVER_requestTable_level3
					tab=[['response'],['3-deserialization-error - mismatched response']];
				}
			}else{
				tab=[['response'],['2-request-error']];
			}
		}else{
			tab=[['response'],['0-com-error']]
		}
		return tab;
	}
	
	UNIT.requestString=function SERVER_requestString(applicationName,paramBody,transform){
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined)tx=transform(tx)
				tab=tx.substr(3);
				UNIT.onfinishedloading(tx);
			}else{
				tab='2-request-error';
			}
		}else{
			tab='0-com-error';
		}
		return tab;
	}
	UNIT.requestEnum=function SERVER_requestEnum(applicationName,paramBody,transform){
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined)tx=transform(tx)
				tab=tx.substr(3);
				tab=deserializeDict(tab,'=','|');
				UNIT.onfinishedloading(tx);
				//console.log(tab);
			}else{
				tab='2-request-error';
			}
		}else{
			tab='0-com-error';
		}
		return tab;
	}
	UNIT.requestDictionary=function SERVER_requestDictionary(applicationName,paramBody,transform){
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				tx=tx.substr(3);
				try{
					if(transform!=undefined)tx=transform(tx)
					tab=deserializeDict(tx);
					UNIT.onfinishedloading(tx)
				}catch(err){
					tab={'response':'3-deserialization-error - mismatched response'};
				}
			}else{
				tab={'response':'2-request-error'};
			}
		}else{
			tab={'response':'0-com-error'};
		}
		return tab;
	}
	UNIT.send=function SERVER_send(applicationName,paramBody,transform,onerror){
		var tx;
		try{
			tx=CallText2('POST',applicationName,paramBody);
		}catch(err){
			//transform(new Error('COM_ERROR 0 - server interface error'))
			onerror('COM_ERROR 0 - server interface error')
			return ('COM_ERROR 0 - server interface error')
		}
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				tx=tx.substr(3);
				try{
					if(transform!=undefined)tx=transform(tx)
					tab=deserializeDict(tx);
					UNIT.onfinishedloading(tx)
				}catch(err){
					transform(new Error('COM_ERROR 3 - mismatched response'))
					tab={'response':'3-deserialization-error - mismatched response'};
				}
			}else{
				transform(new Error('COM_ERROR 2 - server interface error'))
				tab={'response':'2-request-error'};
			}
		}else{
			transform(new Error('COM_ERROR 1 - communication error'))
			tab={'response':'1-com-error'};
		}
		return tab;
	}
	return UNIT;
})()
