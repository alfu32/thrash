var QEnum=(function(){
	var PROTOTYPE=function(dict){
    	Base.call(this,['QEnum']);
		var _THIS=this;
		var _THIS_STRING="";
		this.ValueForKey=function(key){
			console.log('"'+key+'"')
			return _THIS.KV()[key]
		}
		this.KeysForValue=function(value){
			//console.log('searching:'+value);
			var i=0,keys=[];
			var KV=_THIS.KV();
			for(var j in KV){
				//console.log(KV[j]==value);
				if(KV[j]==value){
					keys[keys.length]=j+"";
					//console.log('found : ',j,value,KV[j]);
					return j+"";
				}
			}
			return '';
		}
		QProperty.call(_THIS,['OnDatasetChanged']);
		_THIS.OnDatasetChanged(function(_qenum){
			
		})
		QProperty.call(this,['KV']);
		this.KV.afterSet=function(value){
			_THIS_STRING="";
			for(var i in value){
				_THIS_STRING+=i+"::"+value[i]+","
			}
			_THIS.OnDatasetChanged()(_THIS);
		}
		this.KV(dict);
		this.KV.beforeGet=function(value){
			
		}
		QProperty.call(this,['Add']);
		this.Add.afterSet=function(value){
			var old=_THIS.KV();
			for(var i in value){
				_THIS.KV()[i]=value[i]
			}
			_THIS.OnDatasetChanged()(_THIS);
		}
		_THIS.toString=function(){
			return _THIS_STRING;
		}
	}
	PROTOTYPE.union=function(qe1,qe2){
		var map=joinMaps(qe1,qe2);
		return map;
	}
	PROTOTYPE.intersect=function(qe1,qe2){
		var m1=qe1;
		var m2=qe2;
		var map={};
		for(var i in m1){
			if(i in m2)map[i]=m1[i]
		}
		return map;
	}
	PROTOTYPE.difference=function(qe1,qe2){
		var m1=qe1;
		var m2=qe2;
		var map={};
		for(var i in m1){
			if(!(i in m2))map[i]=m1[i];
		}
		return map;
	}
	return PROTOTYPE
})();