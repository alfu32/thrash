var HTMLTemplateFactory=(function(){
	var CLASS=function HTMLTemplateFactory(_html){
    	Base.call(this,['HTMLTemplateFactory']);
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

var XTemplate=(function(){
	function _nodeMap(node,text){
    	Base.call(this,['XTemplate']);
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
	var PROTOTYPE=function XTemplate(){
		var _THIS=this;
		Widget.call(_THIS);
		var d;
		_THIS.View(d=MAKE.div({className:'XTemlpate'}));
		_THIS.Parent.afterSet=function(_parent){
			try{
				_parent.appendChild(_THIS.View());
				renderView(_THIS.View());
			}catch(err){}
		}
		QProperty.call(_THIS,['HTML']);
		_THIS.HTML.afterSet=function(text){
			_THIS.View().innerHTML=text;
			renderView(_THIS.View());
		}
		QProperty.call(_THIS,['Data']);
		_THIS.Data.afterSet=function(data){
			renderView(_THIS.View());
		}
		_THIS.Data.set=function(array){
			for(var k in array){_THIS.Data()[k]=array[k]}
			renderView(_THIS.View());
		}
		var renderView=function(node){
			var data=_THIS.Data();
			if(node.attributes!=null){
				var attrs=node.attributes;
				for(var i=0;i<attrs.length;i++){
					var nn=attrs[i].name+"";
					/*_console.log(nn);*/
					for(var d in data){
						var r=new RegExp('##'+d+'##','gi');
						if((""+attrs[i].nodeValue).search(r)>-1){
							if(nn.substr(0,2)=='on'){
								attrs[i].nodeValue='';
								node.addEventListener(nn.substr(2),(function(_data,_d){return function(event){_data[_d]()}})(data,d),true);
							} else {
								attrs[i].nodeValue=(attrs[i].nodeValue).replace('##'+d+'##',data[d]);
							}
						}
					}
				}
			}
			for(var n in node){
				try{
					var temp=node[n];
				}catch(err){
					continue;
				}
				if(node[n]===null)continue;
				if(true){
					for(var d in data){
					var r=new RegExp('##'+d+'##','gi');
						if((""+node[n].nodeValue).search(r)>-1){
							node[n].nodeValue=(node[n].nodeValue).replace('##'+d+'##',data[d]);
						}
					}
				}
			}
			for(var i=0;i<node.children.length;i++){
				/*console.log(node.childNodes[i].nodeType,node.childNodes[i]);*/
				renderView(node.children[i]);
			}
		}
	};
	WidgetStatic.call(PROTOTYPE);
	return PROTOTYPE;
})();

var QTemplate=(function(){
	var PROTOTYPE=function TTemplate(){
    	Base.call(this,['QTemplate']);
		var _THIS=this;
		Widget.call(_THIS);
		var d;
		_THIS.View(d=MAKE.div({className:'XTemlpate'}));
		_THIS.Parent.afterSet=function(_parent){
			try{
				_parent.appendChild(_THIS.View());
				injectData(_THIS.View());
			}catch(err){}
		}
		QProperty.call(_THIS,['HTML']);
		_THIS.HTML("")
		_THIS.HTML.afterSet=function(text){
			var _text=document.getElementById(text);
			_text=_text?_text.innerHTML:text;
			_THIS.View().innerHTML=_text;
			injectData(_THIS.View());
		}
		QProperty.call(_THIS,['Data']);
		_THIS.Data({})
		_THIS.Data.afterSet=function(data){
			injectData(_THIS.View());
		}
		_THIS.Data.set=function(array){
			for(var k in array){_THIS.Data()[k]=array[k]}
			injectData(_THIS.View());
		}
		QProperty.call(_THIS,['Listeners']);
		_THIS.Listeners({})
		_THIS.Listeners.afterSet=function(data){
			injectListeners(_THIS.View());
		}
		var injectData=function(node){
			var data=_THIS.Data();
			var view=_THIS.View();
			for(var n in data){
				var targetElements=document.getElementsByName(n);
				for(var i=0;i<targetElements.length;i++){
					var element=targetElements[i];
					switch(element.tagName.toUpperCase()){
						case 'A':
							try{
								element.href=data[n];
							}catch(error){
								_console.log(data[n]);
							}
							break;
						case 'INPUT':
							try{
								element.value=data[n];
							}catch(error){
								_console.log(data[n]);
							}
							break;
						case 'TEXTAREA':
							element.value=data[n];
							break;
						case 'SELECT':
							if(typeof(data[n])=="string"){
								//NOT ARRAY -> set Value, set selected
								//element.value=data[n];
								for(var j=0;j<element.length;j++){
									if(element[j].value==data[n]){
										element.selectedIndex=j;
									}
								}
							}else{
								//IS ARRAY or HASH/OBJECT -> set Children
								while(element.length>0){element.removeChild(element[element.length-1]);}
								for(var j in data[n]){
									var option=document.createElement('option');
									option.value=j;option.innerHTML=data[n][j];
									element.appendChild(option);
								}
							}
							break;
						case 'OPTION':
							for(var j in data[n]){
								element.value=j;element.innerHTML=data[n][j];
							}
							break;
						default:
							element.innerHTML=data[n];
					}
				}
			}
		}
		var injectListeners=function(node){
			var funcs=_THIS.Listeners();
			var view=_THIS.View();
			for(var n in funcs){
				var targetElements=document.getElementsByName(n);
				var listeners=funcs[n];
				for(var i=0;i<targetElements.length;i++){
					var element=targetElements[i];
					for(var slot in listeners){
						var listener=listeners[slot];
						var prefix='';
						if(slot.substr(0,2)!='on'){
							prefix='on';
						}
						
						element[prefix+slot]=listener;//'operator=' is getter/setter, so the listener reference will be copied;
						
					}
				}
			}
		}
	};
	WidgetStatic.call(PROTOTYPE);
	return PROTOTYPE;
})();
XTemplate_test=function(){
	var asd=new XTemplate()
	.HTML("<div class='##CLN0##'><div style='cursor:pointer' class='##CLN1##'>the ##IHT2##</div><div class='##CLN1##' onclick='##BCLICK1##'>"
			+"and the ##IHT3##</div><div rel='##REL##' class='##CLN1##'>and the ##IHT4##</div><div class='##CLN1##' onclick='##BCLICK0##'>##IHT5##</div></div>")
	.Data({BCLICK0:function(event){alert('eeeeeeeeeee')},BCLICK1:function(event){alert('oooooooooooooo')},REL:'some_relation',CLN0:'WRAPPER'
		,CLN1:'Item',IHT2:'text1',IHT3:'text2',IHT4:'text3',IHT5:'text4'})
	.Parent(document.body);
	return asd;
}
