var QProperty=(function(){
	var CLASS=function QProperty(name){
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
		this[name].type="QProperty";
		this.Set=function(value){
				property=_value;
		}
		_PROPERTY=this[name];
		_PROPERTY.afterSet=function(value){}
		_PROPERTY.afterSet0=function(value){}
		_PROPERTY.afterSet_ByRef=function(ref){}
		_PROPERTY.beforeGet=function(value){}
		_PROPERTY.beforeGet_ByRef=function(ref){}
	};
	return CLASS;
})();
