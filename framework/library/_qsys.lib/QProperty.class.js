var QProperty=(function(){
	var CLASS=function QProperty(name){
		
		if(CLASS.registry[name]==undefined)CLASS.registry[name]=[];
		CLASS.registry[name].push(this);
		
    	Base.call(this,['QProperty']);
		var property;
		var _PROPERTY;
		this[name]=function(_value){
			if(arguments.length>0){
				property=_value;
				_PROPERTY.afterSet(property);
				_PROPERTY.afterSet0(property);
				_PROPERTY.afterSet_ByRef({ref:property});
				return this;
			}else{
				_PROPERTY.beforeGet(property);
				_PROPERTY.beforeGet_ByRef(property);
				return property;
			}
		}
		this[name].Set=function(value){
			//console.log("["+name+"]=",value);
			property=value;
		}
		this[name].type="QProperty";
		_PROPERTY=this[name];
		_PROPERTY.beforeSet=function(value){}
		_PROPERTY.afterSet=function(value){}
		_PROPERTY.afterSet0=function(value){}
		_PROPERTY.afterSet1=function(value){}
		_PROPERTY.afterSet_ByRef=function(ref){}
		_PROPERTY.beforeGet=function(value){}
		_PROPERTY.beforeGet_ByRef=function(ref){}
	};
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