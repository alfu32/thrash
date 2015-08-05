var HTMLTemplateFactory=(function(){
	var CLASS=function HTMLTemplateFactory(_html){
		this.makeInstance=function(map){
			var o=new Widget();
			o.Map={};
			QProperty.call(o,['View']);
			var d=window.MAKE.div();
			d.innerHTML=_html;
			d.className="HTMLTemplate";
			for(var i in map){
				QProperty.call(o,[i+""]);
				o.Map[i+""]=CLASS.nodeMap(d,"##"+i+"##");
				o[i+""].afterSet=(function(_map,_i,_o){
					return function(_value){
						var _map=_o.Map[_i+""];
						for(var j=0;j<_map.length;j++){
							_map[j].nodeValue=_value;
						}
					};
				})(map,i,o)
				if(map[i])o[i+""](map[i]);
			};
			
			o.View(d.childNodes[0]);
			return o;
		};
	};
	CLASS.nodeMap=function _nodeMap(node,text){
		var map=[];
		var r=new RegExp(text,'gi');
		if(node.attributes!=null){
			var attrs=node.attributes;
			for(var i=0;i<attrs.length;i++){
				if((""+attrs[i].nodeValue).search(text)>-1){
					map[map.length]=attrs[i+""];
				}
			}
		}
		if(node.nodeType!=1){
			if((""+node.nodeValue)==(text))map[map.length]=node;
		}
		for(var i=0;i<node.childNodes.length;i++){
			map=map.concat(CLASS.nodeMap(node.childNodes[i],text));
		}
		return map;
	};
	return CLASS;
})();