var EXPOSE=(function(){
	var o1,p1;
	var UNIT=function EXPOSE(object,qpropertyName){
		/*console.log(object[qpropertyName].type);*/
		o1=object;
		p1=qpropertyName;
		return UNIT;
	}
	UNIT.THROUGH=function(context,qpropertyName){
		if(context[qpropertyName]==undefined){
			QProperty.call(context,[qpropertyName]);
		}
		o1[p1].afterSet0=function(value){
			try{
			context[qpropertyName].afterSet(value);
			context[qpropertyName].Set(value);
			}catch(err){}
		}
		context[qpropertyName].afterSet0=function(value){
			try{
				o1[p1].afterSet(value);
				o1[p1].Set(value);
			}catch(err){}
		}
		context[qpropertyName](o1[p1]());
	}
	UNIT.FEED=function(){
		console.log(o1,p1);
		return UNIT;
	}
	return UNIT;
})();
/**
 * 
 * EXPOSE Example
 * 
 * 
		var Application=(function(){
			var CLASS=function ASD(){
				var _THIS=this;
				Widget.call(_THIS);
				var frm=new Widget().View(MAKE.iframe({},{width:'100%',height:'640px'}));
				var date=new DateInput();
				
				
				// in the end you can choose which properties to expose (usually View(s)
				//    ,Parent(s) Data(s) etc. - to be able to instantiate the application
				//    ( use it as an application fragment ) 
				//    in other laouts, contexts etc
				// 
				EXPOSE(date,'View').THROUGH(this,'dView');
				EXPOSE(date,'Parent').THROUGH(this,'dParent');
			}
			WidgetStatic.call(CLASS);
			return CLASS;
		})();
 *
 */

var PATCH=(function(){
	var o1,p1;
	var UNIT=function EXPOSE(object,propertyName){
		o1=object;
		p1=propertyName;
		return UNIT;
	}
	UNIT.THROUGH=function(context,qpropertyName){
		QProperty.call(context,[propertyName]);
		context[qpropertyName].afterSet0=function(value){
			o1[p1].Set(value);
		}
		context[qpropertyName](o1[p1]());
	}
	UNIT.FEED=function(){
		console.log(o1,p1);
		return UNIT;
	}
	return UNIT;
})();