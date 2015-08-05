try{
	Base.call(this,['Base']);
}catch(error){
Base=(function(){
    var CLASS=function Base(name){
		if(CLASS.registry[name]==undefined)CLASS.registry[name]=[];
		/*if(CLASS.registry[name].indexOf(this)==-1)CLASS.registry[name].push(this);*/
		CLASS.registry[name].push(this);
    }
    CLASS.registry={}
    CLASS.registry.usage=function(){
    	var usage=[];
    	for(var n in CLASS.registry){
    		if(CLASS.registry[n].length>1)usage[usage.length]=n+"="+CLASS.registry[n].length;
    	}
    	return usage.join("&");
    }
    return CLASS;
    })();
}