var ARC=(function(){
	var CLASS=function ARC(target,onchange){
		var _THIS=this;
		var instances=[];
		_THIS.hasInstance=function(target){
			for(var i=0;i<instances.length;i++){
				if(instances[i].target==target)return true;
			}
			return false;
		}
		_THIS.removeInstance=function(instance){
			var i=CLASS.indexOfInstance(instance);
			if(i==-1)throw "error";
			console.log(i);
			console.log(instances.splice(i,1));
			console.log(instances);
		}
		_THIS.addInstance=function(reg){
			instances[instances.length]=reg
			console.log(instances);
		}
		_THIS.getInstance=function(target,onchange){
			for(var i=0;i<instances.length;i++){
				if(instances[i].target==target){
					var inst=instances[i].instance;
					inst.Parent(target.offsetParent);
					return inst;
				}
			}
			var instance=new TimeInput(target,onchange)
			instances[instances.length]={target:target,instance:instance}
			return instance;
		}
		_THIS.Instances=function(){
			return instances;
		}
		_THIS.indexOfInstance=function(instance){
			for(var i=0;i<instances.length;i++){
				if(instances[i].instance==instance)return i; 
			}
			return -1;
		}
	}
})();

var Input=(function(){
	var CLASS=function Input(target,onchange){
		var _THIS=this;
		Widget.call(this);
		this.kill=function(){
			_THIS.Parent().removeChild(_THIS.View());
			CLASS.removeInstance(_THIS)
		}
		this.View(MAKE.div());
		function __constructor(_target){
		}
		__constructor(target);
		CLASS.addInstance({target:target,instance:_THIS})
	}
	ARC.call(CLASS);
	return CLASS;
})()