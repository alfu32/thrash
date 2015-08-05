var ChainOfResponsibility=(function(){
	var CLASS=function ChainOfResponsability(){
		Base.call(this,['ChainOfResponsability']);
		var array={length:0};
		var _THIS=this;
		_THIS.add=function(f){
			if(f.name==undefined)array[array.length]=f;
			else array[f.name]=f;
			array.length+=1;
		}
		_THIS.remove=function(f){
			//array[array.length]=f;
		}
		_THIS.feedObject=function(object){
			for(var i=0;i<array.length;i++){
				if(i=="length")continue;
				if(typeof(array[i])!="function"){
					array[i](object);
				}
			}
		}
	}
	return CLASS;
})();