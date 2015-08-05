var QConstantProperty=(function(){
	var CLASS=function QConstantProperty(name){
    	Base.call(this,['QConstantProperty']);
		var property,property_set=false;
		var _PROPERTY;
		this[name]=function(_value){
			if(arguments.length>0){
				if(!property_set){
					property=_value;
					_PROPERTY.afterSet(property);
					_PROPERTY.afterSet0(property);
					_PROPERTY.afterSet_ByRef({ref:property});
					property_set=true;
					return this;
				}else{
					return property;
				}
			}else{
				_PROPERTY.beforeGet(property);
				_PROPERTY.beforeGet_ByRef(property);
				return property;
			}
		}
		this[name].Set=function(value){
			//console.log("["+name+"]=",value);
			property=value;
			property_set=true;
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
	return CLASS;
})();