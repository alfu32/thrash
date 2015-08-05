var QMethod=(function(){
	var CLASS=function QMethod(procedure){
    	Base.call(this,['QMethod']);
		var _METHOD;
		this[procedure.name]=function(args){
			_METHOD.beforeCall(args);
			procedure(args);
			_METHOD.afterCall(args);
		};
		this[procedure.name].type="QMethod";
		_METHOD=this[call.name];
		_METHOD.afterCall=function(args){}
		_METHOD.beforeCall=function(args){}
		
	};
	return CLASS;
})();