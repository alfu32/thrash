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
/*
var Table=(function NAMESPACE_TABLE(){
    var CLASS=function Table(name,_matrix,_primaryKey){
        var _THIS=this;
        var matrix=_matrix||[[]];
        var names=matrix.splice(0,1)[0];
        var types=matrix.splice(0,1)[0];
        var primaryIndex=_primaryKey==undefined?"key":typeof(_primaryKey)=='number'?names[_primaryKey]:_primaryKey;

        var rows=matrix;
        var columns={};
        for(var i=0;i<names.length;i++){
            var _name=names[i];
            columns[_name]={};
            columns[_name].type=types[i];
            columns[_name].data=[];
            for(var k=0;k<rows.length;k++){columns[_name].data[k]=rows[k]||defaults[k]}
        }
        this.getMatrixView=function(_booleanFilteringRules,_orderingRule){
            var booleanFilteringRules=_booleanFilteringRules||[CLASS.FILTERS.ALL];
            var orderingRule=_orderingRule||[CLASS.ORDER.ASC];
            var _names=[],namesLength=0;
            var _types=[],typesLength=0;
            var _rows=[],rowsLength=0;
            var m=[_names,_types,_rows];
            var r=0;
            for(var i=0;i<rows.length;i++){
                var c=0;
                var boolFilter=booleanFilteringRules[i]||booleanFilteringRules[0];
                for(var j=0;j<rows[i].length;j++){
                    if(boolFilter(names[j],types[j],j,rows[i],i,rows[i][j])){
                        if(_names[c]==undefined){
                            _names[c]=names[j];
                            _types[c]=types[j];
                        }
                        if(_rows[r]==undefined){_rows[r]=[]}
                        _rows[r][c]=rows[i][j]
                        c++;
                    }
                }
                if(c)r++;
            }
            _rows.sort(orderingRule);
            return m;
        }
        this.Filter=function(_booleanFilteringRules,_orderingRule){
            var m=this.getMatrixView(_booleanFilteringRules,_orderingRule);
            return new Table(name+'_view',m,_primaryKey);
        }
    }
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
})();