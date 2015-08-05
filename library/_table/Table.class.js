var EvalLogicalExpression=(function(){
	var CLASS=function EvalLogicalExpression(logicalExpr){
		//this.func=function(v){};
		var _THIS=this;
		var __constructor=function(lE){
			var r=new RegExp('[\(\)\&\|]','gi')
			var b=lE.replace(r,'#').split(/\#/gi);
			var expr=logicalExpr;
			for(var i=0;i<b.length;i++){
				if(b[i]=="")continue;
				expr=expr.replace(b[i],"(v=='"+b[i]+"')");
			}
			expr=expr.replace(/\|/gi,'+').replace(/\&/gi,'*');
			expr="return ("+expr+')==1;'
			console.log(expr);
			//var f=new Function('v',"return ("+expr+');');
			_THIS.func=new Function('v',expr);//.bind(this);
			//replace %word% that are not & or |
			//with (%word%==v)
		}
		__constructor(logicalExpr);
	}
	return CLASS;
})();

var Table=(function (){
    var CLASS=function Table(data){
        var _THIS=this;
        var string=serializeTable(data);

        var shadow=deserializeTable(string).splice(5);
        var rows=deserializeTable(string)||[];
        var names=data[0]||[];
        var types=data[1]||[];
        var values=data[2]||[];
        var access=data[3]||[];
        var t_codes=data[4]||[];
        var columns={};
        this.height=(data.length-5)||0;
        this.width=t_codes.length||0;

        QProperty.call(this,['BeforeUpdate']);
        _THIS.BeforeUpdate(function(OLD,NEW){
        });

        QProperty.call(this,['AfterUpdate']);
        _THIS.AfterUpdate(function(OLD,NEW){});

        QProperty.call(this,['BeforeInsert']);
        _THIS.BeforeInsert(function(NEW){});

        QProperty.call(this,['AfterInsert']);
        _THIS.AfterInsert(function(NEW){});

        QProperty.call(this,['BeforeDelete']);
        _THIS.BeforeDelete(function(OLD){});

        QProperty.call(this,['AfterDelete']);
        _THIS.AfterDelete(function(OLD){});

        this.select=function(matchFunction){
            var r=[];
            var m=matchFunction||function(){return true};

            for(var i=0;i<this.height;i++){
                if(matchFunction(rows[i])){
                    r[r.length]=rows[i];
                }
            }

            return r;
        }

        this.update=function(row,index){
            _THIS.BeforeUpdate(rows[index],row);

            _THIS.AfterUpdate(rows[index],row);
            return _THIS;
        }

        this.insert=function(row){
            _THIS.BeforeInsert(rows[index],row);

            _THIS.AfterInsert(rows[index],row);
            return _THIS;
        }

        this.delete=function(index){
            _THIS.BeforeDelete(rows[index]);

            _THIS.AfterDelete(rows[index]);
            return _THIS;
        }

        this.init=function(dataString){
             shadow=deserializeTable(dataString).splice(5);
             rows=deserializeTable(dataString)||[];
             names=rows[0]||[];
             types=rows[1]||[];
             values=rows[2]||[];
             access=rows[3]||[];
             t_codes=rows[4]||[];

            rows=deserializeTable(dataString);
            rows.splice(0,5);
            for(var i=0;i<this.height;i++){
                for(var j=0;j<t_codes.length;j++){
                    if(columns[t_codes[j]]==undefined){
                        columns[t_codes[j]]=[]
                    }
                    columns[t_codes[j]][columns[t_codes[j]].length]=rows[i][j];
                }
            }

            this.height=(rows.length)||0;
            this.width=t_codes.length||0;

            return _THIS;
        }
    }
    return CLASS;
})();

var RemoteTable=(function (){
    var CLASS=function RemoteTable(data){
        var _THIS=this;
        var TABLE=new Table();
        this.remote='server.php';
        this.remoteMethod='POST';
        this.remoteSelect={com:'select'}
        this.remoteInsert={com:'insert'}
        this.remoteUpdate={com:'update'}
        this.remoteDelete={com:'delete'}

        TABLE.BeforeUpdate(function(OLD,NEW){
            var comBody=fuseDict(mapTable(TABLE.t_codes,OLD),mapTable(TABLE.t_codes,NEW),'old_','new_');
            var rsp=SERVER.requestTable(this.remote,comBody,function(tx){});

        });

        TABLE.AfterUpdate(function(OLD,NEW){});
        TABLE.BeforeInsert(function(NEW){});
        TABLE.AfterInsert(function(NEW){});
        TABLE.BeforeDelete(function(OLD){});
        TABLE.AfterDelete(function(OLD){});

        this.select=function(matchFunction){
            var r=[];
            var m=matchFunction||function(){return true};

            for(var i=0;i<this.height;i++){
                if(matchFunction(rows[i])){
                    r[r.length]=rows[i];
                }
            }

            return r;
        }

        this.update=function(row,index){
            TABLE.update(row,index);
            return _THIS;
        }

        this.insert=function(index){
            TABLE.insert(index);
            return _THIS;
        }

        this.delete=function(index){
            TABLE.delete(row,index);
            return _THIS;
        }

        this.init=function(dataString){
            TABLE.init(dataString);
            return _THIS;
        }
    }
    return CLASS;
})();
/*
var Table=(function NAMESPACE_TABLE(){
    var CLASS=function Table(_name){
    	var _THIS=this;
    	this.name=_name||"noname";
    	this.head={};
    	this.body=[];
    	this.columns={};
    	this.ranges={}
    	this.order=new ChainOfResponsibility();
    	this.filter=new ChainOfResponsibility();
    	this.initHeaders=function Table_initHeaders(_headerString){
    		var _h=_headerString.split("\n")
			for(var index=0;index<_h.length;index++){
				var value=_h[index]+"";
				if(value=='') continue;
				var h=value.split(":");
				//trim() string
				var val=(h[1]).replace(/^\s+|\s+$/g, '');
				
				if(((h[0]+"").indexOf('Table'))!=-1){
					val=val.split("|");
					_THIS.head[h[0]]=val;
				}
			}
    		return this;
    	}
    	this.initColumns=function Table_initColumns(){
    		for(var c=0;c<_THIS.head["Table-Head-Names"].length;c++){
				var name=_THIS.head["Table-Head-Names"][c];
				_THIS.columns[name]=[];
				_THIS.ranges[name]={}
				for(var r=0;r<_THIS.body.length;r++){
					if(_THIS.ranges[name][_THIS.body[r][c]]==undefined)_THIS.ranges[name][_THIS.body[r][c]]=[]
					_THIS.columns[name][r]=_THIS.body[r][c];
					_THIS.ranges[name][_THIS.body[r][c]].push(r);
				}
			}
    		return this;
    	}
    	this.viewRowsThatContainString=function(str){
    		//var vals=containsString.split(";");
    		var expr=new EvalLogicalExpression(str);
    		var t=new Table(_name);
    		for(var r=0;r<_THIS.body.length;r++){
    			var s=_THIS.body[r].join("~").indexOf(str);
    			if(s!=-1)t.body[t.body.length]=_THIS.body[r];
    		}
    		t.head=_THIS.head;
    		t.initColumns();
    		return t;
    	}
    	this.initWithStrings=function(_headerString,_bodyString){
    		_THIS.initHeaders(_headerString)
			_THIS.body=StringToArray(_bodyString);
			_THIS.body.splice(0,1);
			_THIS.initColumns();
			
			return this;
    	}
    	this.initFromRequest=function(_xmlHttpSync){
    		var bString=_xmlHttpSync.responseText;
			var hString=_xmlHttpSync.getAllResponseHeaders();
			_THIS.initWithStrings(hString,bString);
			return this;
    	}
    	this.updateFromRequest=function(){
    		if (xmlHttpSync!=null)
			xmlHttpSync=null;
			
			xmlHttpSync = GetHttpObject();
			xmlHttpSync.open(method,url,false)
			if (method.toUpperCase()=="POST") {
				xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			}
			xmlHttpSync.send(headers);
			this.initFromRequest(xmlHttpSync);
			return this;
    	}
    }
    CLASS.TYPES=(function(){
	    return {
			//"Number":[Number,NumberInput,NumberOutput]
			//,"Double":[Number,NumberInput,NumberOutput]
			//,"String":[String,TextInput,TextOutput]
	    	//,"Blob":[function(){},undefined,TextOutput]
			//,
			"JSO":[function(v){var f=new Function("return "+v+";");this.object=f();},undefined,undefined]
	    	//,"Date":[Date,DateInput,DateOutput]
	    	//,"Array":[Array,ListInput,ListOutput]
	    	//,"Enum":[Array,OptionInput,OptionListOutput]
	    	//,"Dict":[Object,KVEditor,KVEditor]
	    	//,"Matrix":[Array,TableEditor,TableEditor]
	    	,"JSOP":[function(){},undefined,undefined]
	    	//,"LatLng":[function(){},GoogleMapInput,GoogleMapInput]
	    	//,"GeoPath":[function(){},GoogleMapInput,GoogleMapInpu]
	    	//,"Path":[function(){},CanvasInput,CanvasInput]
	    }
    })()
    CLASS.FILTERS={
        ALL:function(){
            return function(column,columnType,columnIndex,row,rowIndex,value){return true}
        }
        ,LIMIT:function(rowIndex1,rowIndex2){
            return function(column,columnType,columnIndex,row,rowIndex,value){
                return rowIndex>rowIndex1 && rowIndex<rowIndex2
            }
        }
        ,LIKE:function(value){
            return function(column,columnType,columnIndex,row,rowIndex,value){
                var r=new RegExp(value,"gi");
                return value.toString().match(r);
            }
        }
    };
    CLASS.ORDER={
        ASC:function rule(row1,row2){
            var a=row1.join("_");
            var b=row2.join("_");
            return a>b?1:a==b?0:-1;
        }
        ,DESC:function rule(row1,row2){
            var a=row1.join("_");
            var b=row2.join("_");
            return a<b?1:a==b?0:-1;
        },
        _ASC:function(column){
            var _rule=function(v0,v1){
                return v0>v1?1:v0==v1?0:-1;
            }
            return _rule;
        },
        _DESC:function(column){
            var _rule=function(v0,v1){
                return v0<v1?1:v0==v1?0:-1;
            }
            return _rule;
        }
    }
    return CLASS;
})();*/