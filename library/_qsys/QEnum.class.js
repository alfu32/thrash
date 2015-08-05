var QEnum=(function(){
	var CLASS=function(dict){
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
		QProperty.call(this,['KV']);
		this.KV.afterSet=function(value){
			_THIS_STRING="";
			for(var i in value){
				_THIS_STRING+=i+"::"+value[i]+","
			}
		}
		this.KV(dict);
		this.KV.beforeGet=function(value){
			
		}
		_THIS.toString=function(){
			return _THIS_STRING;
		}
	}
	return CLASS
})();