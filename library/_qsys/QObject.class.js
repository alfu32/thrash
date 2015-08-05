var QObject=(function(){
    var CLASS=function QObject(){
    }
    CLASS.STRICT=1;
    CLASS.PERMISSIVE=2;
    CLASS.getMorphObjectIntoClass=function(object,Class,method){
    	var newObject=new Class;
    	var strict=method==CLASS.STRICT
    	for(var selector in object){
    		var s=object[selector];
    		var to=typeof(s);
    		if(strict && to!=typeof(newObject[selector]))continue;
    		switch(to){
    		case "undefined":
    			break;
    		case "function":
    			if(s.type!==undefined)if(s.type=="QProperty")
    				newObject[selector](object[selector]());
    			break;
    		case "object":
    		case "boolean":
    		case "number":
    		case "string":
    		case "xml":
    			newObject[selector]=object[selector];
    			break;
    		default:
    			break;
    		}
    	}
    	return newObject;
    }
    CLASS.Union=function(obj){
    	var u={}
    	for(var a=0;a<arguments.length;a++){
    		var obj1=arguments[a];
	    	for(var i in obj1){
	    		u[i]=obj1[i];
	    	}
    	}
    	return u;
    }
    CLASS.Intersection=function(obj1,obj2,method){
    	var all=CLASS.Union(obj1,obj2)
    	var strict=method==CLASS.STRICT;
    	var intersect={}
    	for(var i in all){
    		if(obj1[i]!=undefined && obj2[i]!=undefined){
    			if(strict){
    				if(typeof(obj1[i])==typeof(obj2[i])){
    					intersect[i]=all[i];
    				}
    			}else{
    				intersect[i]=all[i];
    			}
    		}
    	}
    	return intersect;
    }
    CLASS.Difference=function(obj1,obj2){
    	var diff={}
    	for(var i in obj1){
    		if(obj2[i]==undefined){
				diff[i]=obj1[i];
			}
    	}
    	return diff;
    }
    
    return CLASS;
    })();