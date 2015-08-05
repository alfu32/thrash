var SProperty=(function(){
	var _uid='GLOBAL',_parent='GL',_pkg='GLOBAL',_ifc='VARS.php';
	var CLASS=function SProperty(name){
    	Base.call(this,['SProperty']);
		var property;
		var _PROPERTY;
		this[name]=function(_value){
			if(arguments.length>0){
				SERVER.requestString(_ifc,{'op':'set','package':_pkg,'parent':_parent,'var_name':name,'var_value':_value})
				property=_value;
				_PROPERTY.afterSet(property);
				_PROPERTY.afterSet0(property);
				_PROPERTY.afterSet_ByRef({ref:property});
				return this;
			}else{
				property=SERVER.requestString(_ifc,{'op':'get','package':_pkg,'parent':_parent,'var_name':name});
				_PROPERTY.beforeGet(property);
				_PROPERTY.beforeGet_ByRef(property);
				return property;
			}
		}
		this[name].Set=function(value){
			SERVER.requestString(_ifc,{'op':'set','package':_pkg,'var_name':name,'var_value':value})
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
	CLASS.register=function(_user,_package,__parent,_interface){
		_uid=_user;_pkg=_package;_ifc=_interface;_parent=__parent;
	}
	return CLASS;
})();