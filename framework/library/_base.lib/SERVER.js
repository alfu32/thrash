try{
	Base.call(this,['SERVER']);
}catch(error){
Base=(function(){
    var CLASS=function Base(name){
		if(CLASS.registry[name]==undefined)CLASS.registry[name]=[];
		/*if(CLASS.registry[name].indexOf(this)==-1)CLASS.registry[name].push(this);*/
		CLASS.registry[name].push(this);
    }
    CLASS.registry={}
    CLASS.registry.usage=function(){
    	var usage=[];
    	for(var n in CLASS.registry){
    		usage[usage.length]=n+"="+CLASS.registry[n].length
    	}
    	return usage.join("&");
    }
    return CLASS;
    })();
}

function GetHttpObject(){
	Base.call(this,['SERVER']);
	var tmp_object=null;
	try {
		tmp_object=new XMLHttpRequest();
	} catch (e) {
		try {
			tmp_object=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				tmp_object=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return null;
			}
		}
	} return tmp_object;
}
var CallText2=(function(){
	Base.call(this,['SERVER']);
	return function CallText_2(method,url,param) {
		var xmlHttpSync = GetHttpObject();
		if (method.toUpperCase()=="POST") {
			xmlHttpSync.open(method,url,false)
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttpSync.send(serializeDict(param,'=','&'));//,function(t){return encodeURI(t);}
		}else{
			xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),false);
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttpSync.send(null);
		} return xmlHttpSync.responseText;
	}
})();
var CallText2_async=(function(){
	Base.call(this,['SERVER']);
	return function CallText_2_async(method,url,param,callbacks) {
		var xmlHttpSync = GetHttpObject();
			var tout
			var aaa=function onprogress(){
				try{
					callbacks.onprogress(xmlHttpSync);
				}catch(err){}
				tout=setTimeout(function(){aaa();},125);
			}
			aaa();
			
			xmlHttpSync.onreadystatechange=function(){
				if (xmlHttpSync.readyState==4){
					if (xmlHttpSync.status==200){
						callbacks.onsuccess(xmlHttpSync.responseText);
					}else{
						callbacks.onerror(xmlHttpSync);
					}
					clearTimeout(tout);
				}
			}
			
		if (method.toUpperCase()=="POST") {
			xmlHttpSync.open(method,url,true);
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttpSync.send(serializeDict(param,'=','&'));//,function(t){return encodeURI(t);}
			
		}else{
			xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),true);
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttpSync.send(null);
		}
		return xmlHttpSync;
	}
})();
var CallBin2=(function(){
	Base.call(this,['SERVER']);
	return function CallBin_2(method,url,param) {
		var xmlHttpSync = GetHttpObject();
		if (method.toUpperCase()=="POST") {
			xmlHttpSync.open(method,url,false)
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xmlHttpSync.send(serializeDict(param,'=','&'));
		}else{
			xmlHttpSync.open(method,url+'?'+serializeDict(param,'=','&'),false);
			xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xmlHttpSync.send(null);
		} return xmlHttpSync.responseText;
	}
})();
SERVER=(function SERVER_UNIT(){
	Base.call(this,['SERVER1']);
	var UNIT={};
	UNIT.onfinishedloading=(function onfinishedloading_clojure(){return function onfinishedloading_default(tx){}})();
	
	UNIT.requestTable_async=function SERVER_requestTable_async(applicationName,paramBody,callbacks,_ROW,_COL){
		var ROW=_ROW||";";
		var COL=_COL||"|";
		var tx=CallText2_async('POST',applicationName,paramBody
			,{
				onsuccess:function(text){
					/*callbacks.onsuccess(deserializeTable(tx.responseText.substr(3)));*/
						if(tx.responseText.substr(0,2)=='OK'){
					
						callbacks.onsuccess(deserializeTable(tx.responseText.substr(2+ROW.length)),COL,ROW);
					}else{
						callbacks.onsuccess(deserializeTable(tx.responseText,COL,ROW));
					}
				}
				,onerror:function(xmlhttp){
					callbacks.onerror(xmlhttp)
				}
				,onprogress:function(xmlhttp){
					try{
						callbacks.onprogress(xmlhttp);
					}catch(err){}
				}
			});
	}
	
	UNIT.requestString_async=function SERVER_requestString_async(applicationName,paramBody,callbacks,_ROW,_COL){
		var tx;
		var ROW=_ROW||";";
		var COL=_COL||"|";
		tx=CallText2_async('POST',applicationName,paramBody
			,{
				onsuccess:function(){
					/*callbacks.onsuccess(tx.responseText.substr(3));*/
					
					if(tx.responseText.substr(0,2)=='OK'){
						callbacks.onsuccess(tx.responseText.substr(2+ROW.length));
					}else{
						callbacks.onerror(tx.responseText);
					}
				}
				,onerror:function(){
					callbacks.onerror(tx);
				}
			});
	}
	UNIT.requestTable=function SERVER_requestTable(applicationName,paramBody,transform,_ROW,_COL){
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		var ROW=_ROW||";";
		var COL=_COL||"|";
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined){
					tx=transform(tx);
				}
				tx=tx.substr(2+ROW.length);
				UNIT.onfinishedloading(tx);
				try{
					tab=deserializeTable(tx,COL,ROW);
				}catch (err){// SERVER_requestTable_level3
					tab=[['response'],['3-deserialization-error - mismatched response'],err.message];
				}
			}else{
				if(transform!=undefined){
					tx=transform(tx);
				}
				tab=[['response'],['2-request-error']];
			}
		}else{
			tab=[['response'],['0-com-error']];
			if(transform!=undefined){
				tx=transform(tx);
			}
		}
		return tab;
	}
	
	UNIT.requestString=function SERVER_requestString(applicationName,paramBody,transform,_ROW,_COL){
		var ROW=_ROW||";";
		var COL=_COL||"|";
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined){
					tx=transform(tx)
				}
				tab=tx.substr(2+ROW.length);
				UNIT.onfinishedloading(tx);
			}else{
				tab='2-request-error';
			}
		}else{
			tab='0-com-error';
		}
		return tab;
	}
	UNIT.requestEnum=function SERVER_requestEnum(applicationName,paramBody,transform,_ROW,_COL){
		var ROW=_ROW||"|";
		var COL=_COL||"=";
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				if(transform!=undefined){
					tx=transform(tx)
				}
				tab=tx.substr(2+ROW.length);
				tab=deserializeDict(tab,COL,ROW);
				UNIT.onfinishedloading(tx);
				/* console.log(tab);*/
			}else{
				tab='2-request-error';
			}
		}else{
			tab='0-com-error';
		}
		return tab;
	}
	UNIT.requestDictionary=function SERVER_requestDictionary(applicationName,paramBody,transform,_ROW,_COL){
		var ROW=_ROW||";";
		var COL=_COL||"|";
		var tx=CallText2('POST',applicationName,paramBody);
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				tx=tx.substr(2+ROW.length);
				try{
					if(transform!=undefined){
						tx=transform(tx)
					}
					tab=deserializeDict(tx,COL,ROW);
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
	UNIT.send=function SERVER_send(applicationName,paramBody,transform,onerror,_ROW,_COL){
		var ROW=_ROW||";";
		var COL=_COL||"|";
		var tx;
		try{
			tx=CallText2('POST',applicationName,paramBody);
		}catch(err){
			/* transform(new Error('COM_ERROR 0 - server interface error'))*/
			onerror('COM_ERROR 0 - server interface error')
			return ('COM_ERROR 0 - server interface error')
		}
		var tab;
		if(tx!=undefined){
			if(tx.substr(0,2)=='OK'){
				tx=tx.substr(2+ROW.length);
				try{
					if(transform!=undefined)tx=transform(tx)
					tab=deserializeDict(tx,COL,ROW);
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
})();
