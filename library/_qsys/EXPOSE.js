EXPOSE=(function (){
	var oo,on;
	var UNIT=function (object,qpropName){
		oo=object; on=qpropName;
		return UNIT;
	}
	UNIT.THROUGH=function(object,qpropName){
		QProperty.call(object,[qpropName]);
		object[qpropName].afterSet0=function(value){
			oo[on].Set(value);
			oo[on].afterSet(value);
		}
		oo[on].afterSet0=function(value){
			object[qpropName].Set(value);
			object[qpropName].afterSet(value);
		}
		return UNIT;
	}
	return UNIT;
})();
