window.IDS={};window.CLASSES={};TAGS={}
PARSE_DOM=function PARSE_DOM(node){
        	if(node.id!=undefined){
        		if(window.IDS[node.id]==undefined)window.IDS[node.id]=[];
        		window.IDS[node.id][window.IDS[node.id].length]=node;
        	}
        	if(node.className!=undefined){
        		if(window.CLASSES[node.className]==undefined)window.CLASSES[node.className]=[];
        		window.CLASSES[node.className][window.CLASSES[node.className].length]=node;
        	}
        	if(node.className!=undefined){
        		if(window.TAGS[node.tagName]==undefined)window.TAGS[node.tagName]=[];
        		window.TAGS[node.tagName][window.TAGS[node.tagName].length]=node;
        	}
        	for(var c=0;c<node.children.length;c++){
        		PARSE_DOM(node.children[c]);
        	}
        }
_WINDOW={
	names:{}
	,diffs:{}
	,scanInit:function(){
		for(var i in window){this.names[i]=i}
	}
	,scanDiff:function(){
		var diff={};
		for(var i in window){if(!(i in this.names))diff[i]=i}
		this.diffs={};
		this.diffs=diff;
		return diff;
	}
	
}
