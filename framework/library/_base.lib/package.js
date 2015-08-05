
PACKAGE=function(name){
	Base.call(this,['PACKAGE']);
	path=name.split('.');
	ppath=[];script="";
	for(var i=0;i<path.length;i++){
		ppath[ppath.length]=path[i];
		try{
			if(eval(ppath.join('.'))==undefined){
				eval(ppath.join('.')+"={};")
				script+=ppath.join('.')+"={};;";
			}
		}catch(err){
			eval(ppath.join('.')+"={};")
			script+=ppath.join('.')+"={};;;;";
		}
	}
	return eval(name);
}

CHECK_DEPENDENCIES=function(vararg,location){
	for(var i in vararg){
		try{
			eval(vararg[i]);
		}catch(err){
			alert(["DEPENDECY NOT MET ::",'@ '+i+' - '+vararg[i],'REASON :: ',err.message].join('\n'));
		}
	}
}