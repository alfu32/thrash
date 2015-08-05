var Table=(function(){
    var CLASS=function Table(){
        var _THIS=this;

        QProperty.call(this,['Gateway']);

        this.BeforeInsert=function(ref,index){}
        this.BeforeUpdate=function(ref,index){}
        this.BeforeDelete=function(ref,index){}
        this.BeforeFetch=function(ref,index){}

        this.OnSuccess=function(ref,index){}
        this.OnError=function(ref,index){}

        var oldRow=[],oldRowIndex=0;
        this.Insert=function(_rowData){
            if(_THIS.Gateway().Insert(_THIS,_rowData)){
                _THIS.BeforeInsert(_THIS)
                oldRow=_rowData;
                oldRowIndex=_THIS.body.length;
                _THIS.body[oldRowIndex]=_rowData;
                _THIS.OnSuccess()(_THIS,oldRowIndex)
            }else{
                _THIS.OnError()(_THIS,_rowData,oldRowIndex);
            }
            return _THIS;
        }
        this.Update=function(_rowData,_rowIndex){
            if(_THIS.Gateway().Update(_THIS,_rowData,_rowIndex)){
                _THIS.BeforeUpdate(_THIS)
                oldRow=_THIS.body[_rowIndex];
                oldRowIndex=_rowIndex;
                _THIS.body[_rowIndex]=_rowData;
                _THIS.OnSuccess()(_THIS,rowIndex,oldRow);
            }else{
                _THIS.OnError()(_THIS,rowIndex,oldRow);
            }
            return _THIS;
        }
        this.Delete=function(_rowIndex){
            if(_THIS.Gateway().Delete(_THIS,_rowIndex)){
                _THIS.BeforeDelete(_THIS);
                oldRowIndex=0;
                oldRow=_THIS.body.splice(_rowIndex)
                _THIS.OnSuccess()(_THIS,rowIndex,oldRow);
            }else{
                _THIS.OnError()(_THIS,rowIndex,oldRow);
            }
            return _THIS;
        }
        this.Fetch=function(){
            if(_THIS.Gateway().Fetch(_THIS)){
                _THIS.BeforeFetch(_THIS);
                oldRowIndex=0;
                oldRow=_THIS.body[0];
                _THIS.OnSuccess()(_THIS,rowIndex,oldRow);
            }else{
                _THIS.OnError()(_THIS,rowIndex,oldRow);
            }
            return _THIS;
        }

        this.init=function(_data){

            _THIS.name=data[0][1]||'';
            _THIS.primary=data[0][2]||null;
            _THIS.encoding=data[0][3];
            _THIS.access=data[0][4];

            _THIS.names=_data[1];
            _THIS.ids=_data[2];
            _THIS.types=_data[3];
            _THIS.values=_data[4];
            _THIS.access=_data[5];
            _THIS.body=_data.splice(6,_data.length-5);
            return _THIS;
        };
        this.initFromString=function(string){
            var rawTable=deserializeTable(string)
        }
        this.name='';
        this.primary=null;
        this.encoding='';
        this.access='';
        this.names=[];
        this.types=[];
        this.values=[];
        this.access=[];
        this.body=[[]];
    };
    return CLASS;
})();
var Server=(function(){
    var CLASS=function(){
        var _THIS=this;
        var _getXMLHTTPObject=function(){
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                return new ActiveXObject('Microsoft.XMLHTTP')
            } else {
                _error("Could not create XMLHttpRequest on this browser");
                return null;
            }
        }
        QProperty.call(this,['Address']);
        QProperty.call(this,['Sync']);
        _THIS.Sync(true);
        QProperty.call(this,['OnLoad']);
        _THIS.OnLoad(function(response){});
        QProperty.call(this,['OnError']);
        _THIS.OnError(function(response){});
        QProperty.call(this,['Method']);
        _THIS.Method('GET');
        this.send=function(data){
            var ajax=_getXMLHTTPObject();
            if(!_THIS.Sync()){
            	ajax.onreadystatechange=function(){
	                if (ajax.readyState==4 && xmlhttp.status==200){
	                    _THIS.OnLoad()(ajax)
	                }
	            }
            }
            var _data="";
            for(var i in data){
                _data+=i+"="+data[i]+"&"
            }
            if(_THIS.Method()=='POST'){
                ajax.open('POST',_THIS.Address(),_THIS.Sync());
                ajax.send(_data);
            }else{
                ajax.open('GET',_THIS.Address()+"?"+_data,_THIS.Sync());
                ajax.send();
            }
        }
    }
    return CLASS;
})();

var TableGetaway=(function(){
    var CLASS=function TableGetaway(){
        var _THIS=this;
        QProperty.call(this,['Server']);
        QProperty.call(this,['Command']);
        this.Command({Insert:'',Delete:'',Update:'',Fetch:''})
        QProperty.call(this,['OnAfterInsert']);
        QProperty.call(this,['OnAfterErase']);
        QProperty.call(this,['OnAfterUpdate']);
        QProperty.call(this,['OnAfterFetch']);
        _THIS.OnAfterInsert(function(response){})
        _THIS.OnAfterErase(function(response){})
        _THIS.OnAfterUpdate(function(response){})
        _THIS.OnAfterFetch(function(response){})
        
        this.Insert=function(table,row){
            var data={cmd:_THIS.Command().Insert}
            for(var i=0;i<table.ids.length;i++){
                //data['old_'+table.ids[i]]=table.body[rowIndex]
                data[table.ids[i]]=row[i];
            }
            var respose=_THIS.Server().send(data)
            if(response.substr(0,2)=='OK'){
            	return true;
            }else{
            	return false;
            }
        }
        this.Delete=function(table,rowIndex){
            var data={cmd:_THIS.Command().Delete}
            for(var i=0;i<table.ids.length;i++){
                data['old_'+table.ids[i]]=table.body[rowIndex][i]
                //data[table.ids[i]]=row[i];
            }
            var respose=_THIS.Server().send(data);
            if(response.substr(0,2)=='OK'){
                return true;
            }else{
                return false;
            }
        }
        this.Update=function(table,rowData,rowIndex){
            var data={cmd:_THIS.Command().Update}
            for(var i=0;i<table.ids.length;i++){
                data['old_'+table.ids[i]]=table.body[rowIndex][i]
                data[table.ids[i]]=row[i];
            }
            var respose=_THIS.Server().send(data)
            if(response.substr(0,2)=='OK'){
                return true;
            }else{
                return false;
            }
        }
        this.Fetch=function(table){
            var data={cmd:_THIS.Command().Fetch}
            var respose=_THIS.Server().send(data)
            if(response.substr(0,2)=='OK'){
                table.initFromString(response)
                return true;
            }else{
                return false;
            }
        }
    };
    return CLASS;
})();
