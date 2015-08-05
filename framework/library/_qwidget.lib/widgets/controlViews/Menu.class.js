var Node=(function() {
	var CLASS = function Node(level) {
    	Base.call(this,['Node']);
		var _THIS = this;
		Widget.call(this);
		_THIS.xml=new XML();
		QProperty.call(this,['ParentNode']);
		_THIS.ParentNode(null)
		QProperty.call(this,['Children']);
		_THIS.Children([])
		QProperty.call(this,['OnClickItem']);
		_THIS.OnClickItem(function(_xmlNode,_widget){})
		QProperty.call(this,['OnHoverItem']);
		_THIS.OnHoverItem(function(_xmlNode,_widget){})
		
		QProperty.call(this,['StructureXML']);
		_THIS.StructureXML(_THIS.xml.parseXml("<item layout='horizontal' haschildren='true'>"
			+"<item name='File ...' layout='vertical' haschildren='true'>"
				+"<item name='New Ctrl-N' onclick='file_new'></item>"
				+"<item name='Open Ctrl-O' onclick='file_open'></item>"
				+"<item name='Save Ctrl-S' onclick='file_save'></item>"
				+"<item name='Properties Ctrl-M' onclick='file_properties' layout='vertical' haschildren='true'>"
					+"<item name='Font ...' onclick='prop_font'></item>"
					+"<item name='Color ...' onclick='prop_font'></item>"
					+"<item name='Background ...' onclick='prop_font'></item>"
					+"<item name='Settings ...' onclick='prop_font'></item>"
				+"</item>"
				+"<item name='Quit Ctrl-Q' onclick='file_save'></item>"
			+"</item>"
			+"<item name='Edit' layout='vertical' haschildren='true'>"
				+"<item name='Cut Ctrl-X' onclick='selection_cut'></item>"
				+"<item name='Copy Ctrl-C' onclick='selection_copy'>"
				+"</item><item name='Paste Ctrl-V' onclick='selection_paste'></item>"
			+"</item>"
			+"<item name='Help' onclick='show_help'></item>"
			+"<item name='About' onclick='show_about'></item>"
		+"</item>").childNodes[0]);
		_THIS.StructureXML.afterSet=function(_xmldoc){
			renderNode(_xmldoc,level||0);
		}
		_THIS.Parent.afterSet=function(_parentNode){
			_parentNode.appendChild(_THIS.View());
			renderNode(_THIS.StructureXML());
		}
		var title,childrenParentView;
		_THIS.View(
			MAKE.table({},{},[
			    MAKE.tbody({},{},[
			        MAKE.tr({},{},[title=MAKE.td({colSpan:'1'},{cursor:'pointer'},[])])
				    ,MAKE.tr({},{},[childrenParentView=MAKE.td({colSpan:'2'},{},[])])
				])
			])
		)
		_THIS.renderView=function(){
			renderNode(_THIS.StructureXML());
		}
		var renderNode=function(xmlNode){
			title.innerHTML=xmlNode.getAttribute('name');
			var listItems=[];
			var layout;
			for(var i=0;i<xmlNode.childNodes.length;i++){
				var child=xmlNode.childNodes[i];
				var item
				if(child.childNodes.length>0){
					listItems[listItems.length]=new Node((level||0)+1).StructureXML(child)
					//console.log('LEVEL '+level+' : ('+child.getAttribute('name')+')', child)
				}else{
					listItems[listItems.length]=new Widget().View(MAKE.div({innerHTML:child.getAttribute('name')}))
					//console.log('LEVEL '+level+' : ', child)
				}
			}
			CLASS.clearView(childrenParentView);
			if(xmlNode.hasAttribute('layout') && xmlNode.getAttribute('layout')=='horizontal'){
				layout=new HLayout().Align('left').VAlign('top').Children(listItems).Parent(childrenParentView)
			}else{
				layout=new VLayout().Align('left').VAlign('top').Children(listItems).Parent(childrenParentView);
			}
			var VISIBLE=false;
			title.onclick=(function(){
				if(!VISIBLE){
					layout.View().style.display='';
					VISIBLE=true;
				} else {
					layout.View().style.display='none';
					VISIBLE=false;
				}
				//console.log(VISIBLE);
				/*
				var x=title.offsetLeft;
				var y=title.offsetTop;*/
				var x=GET.X(title);
				var y=GET.Y(title);
				//console.log(title);
				SET.css(layout.View(),{
					position:'absolute'
					,top:y+'px'
					,left:x+'px'
				})
				if(xmlNode.hasAttribute('layout') && xmlNode.getAttribute('layout')=='vertical'){
					// ALIGN BOTTOM
					y+=title.offsetHeight
				}else{
					// ALIGN RIGHT
					x+=title.offsetWidth
				}
				SET.css(layout.View(),{
					position:'absolute'
					,top:y+'px'
					,left:x+'px'
				})
			})
			if(level>0)SET.css(layout.View(),{position:'absolute',display:'none'})
			//children.appendChild()
			return _THIS;
		}
	}
    WidgetStatic.call(CLASS);
	return CLASS;
})();
var Menu2=(function() {
	var CLASS = function Menu2() {
    	Base.call(this,['Menu2']);
		var _THIS = this;
		Widget.call(this);
		_THIS.xml=new XML();
		QProperty.call(this,['Children']);
		_THIS.Children([])
		QProperty.call(this,['OnClickItem']);
		_THIS.OnClickItem(function(_xmlNode,_widget){})
		QProperty.call(this,['OnHoverItem']);
		_THIS.OnHoverItem(function(_xmlNode,_widget){})
		
		QProperty.call(this,['StructureXML']);
		_THIS.StructureXML(_THIS.xml.parseXml("<item layout='horizontal' haschildren='true'>"
			+"<item name='File ...' layout='vertical' haschildren='true'>"
				+"<item name='New Ctrl-N' onclick='file_new'></item>"
				+"<item name='Open Ctrl-O' onclick='file_open'></item>"
				+"<item name='Save Ctrl-S' onclick='file_save'></item>"
				+"<item name='Properties Ctrl-M' onclick='file_properties' layout='vertical' haschildren='true'>"
					+"<item name='Font ...' onclick='prop_font'></item>"
					+"<item name='Color ...' onclick='prop_font'></item>"
					+"<item name='Background ...' onclick='prop_font'></item>"
					+"<item name='Settings ...' onclick='prop_font'></item>"
				+"</item>"
				+"<item name='Quit Ctrl-Q' onclick='file_save'></item>"
			+"</item>"
			+"<item name='Edit' layout='vertical' haschildren='true'>"
				+"<item name='Cut Ctrl-X' onclick='selection_cut'></item>"
				+"<item name='Copy Ctrl-C' onclick='selection_copy'>"
				+"</item><item name='Paste Ctrl-V' onclick='selection_paste'></item>"
			+"</item>"
			+"<item name='Help' onclick='show_help'></item>"
			+"<item name='About' onclick='show_about'></item>"
		+"</item>"));
		_THIS.StructureXML.afterSet=function(_xmldoc){
			renderLeaf(_xmldoc.childNodes[0],_THIS.Parent(),null,null);
		}
		_THIS.Parent.afterSet=function(_parentNode){
			renderLeaf(_THIS.StructureXML().childNodes[0],_parentNode,null,null);
		}
		var renderLeaf=function(_xmlNode,_parentNodeView,prev_dsp,prev_layout){
			var display=(_xmlNode.hasAttribute('layout') && _xmlNode.getAttribute('layout')=='horizontal')?'horizontal':'vertical'
			var layout=(display=='horizontal')?new HLayout().VAlign('top'):new VLayout()
			
			var Children=[]
			for(var i=0;i<_xmlNode.childNodes.length;i++){
				var child=_xmlNode.childNodes[i];
				var childDisplay=(child.hasAttribute('layout') && child.getAttribute('layout')=='horizontal')?'horizontal':'vertical'
				var widget
				widget=new Widget()
					.View(MAKE.div({
						innerHTML:child.getAttribute('name')
					},{
						cursor:'pointer'
						,background:'#DDF'
						,padding:"4px"
						,verticalAlign:'top'
						,borderBottom:(child.hasAttribute('haschildren') 
								&& child.getAttribute('haschildren')=='true')?'3px solid #FFF':'3px solid #FFF'
					})
				);
				
				SET.attr(widget.View(),{
					onclick:(function(c,w,l){
						return function(){
							if(c.hasAttribute('haschildren') 
								&& c.getAttribute('haschildren')=='true'){
								//var vv=w.View().children[1],v=vv.children;
								//while(v.length>0)vv.removeChild(vv.children[0]);
								if(c.visible==undefined || c.visible){
									if(c.isRendered==undefined){
										c.isRendered=renderLeaf(c,w.View(),display,layout);
									}
									l=c.isRendered;
									c.visible=false;
									l.View().style.display=''
								}else{
									c.visible=true;
									l.View().style.display='none'
								}
							}
							_THIS.OnClickItem()(c,w,l);
						}
					})(child,widget,layout)
					,onmouseover:(function(c,w,l){
						return function(){
							_THIS.OnHoverItem()(c,w,l);
							SET.css(w.View(),{
								backgroundColor:'#FFF'
								//,borderBottom:(child.hasAttribute('haschildren') 
								//&& child.getAttribute('haschildren')=='true')?'3px solid #CCF':'3px solid #DFF'
							})
						}
					})(child,widget,layout)
					,onmouseout:(function(c,w,l){
						return function(){
							SET.css(w.View(),{
								backgroundColor:'#DDF'
								//,borderBottom:(child.hasAttribute('haschildren') 
								//&& child.getAttribute('haschildren')=='true')?'3px solid #08F':'3px solid #08F'
							})
						}
					})(child,widget,layout)
				})
				Children[Children.length]=widget;
			}
			_THIS.View(layout.Children(Children).View());
			if(_parentNodeView!=null){
				if(prev_layout!=null){
					var x=GET.X(_parentNodeView);
					var y=GET.Y(_parentNodeView);
					
					if(prev_dsp=='horizontal'){
						// ALIGN BOTTOM
						y+=_parentNodeView.offsetHeight
					}else{
						// ALIGN RIGHT
						x+=_parentNodeView.offsetWidth
					}
					SET.css(layout.View(),{
						position:'absolute'
						,top:y+'px'
						,left:x+'px'
					})
					/*SET.attr(layout.View().parentNode,{
						onmouseout:(function(c,w,l){
								return function(){
									c.visible=true;
									layout.View().style.display='none'
								}
						})(child,widget,layout)
					})*/
				}
				layout.Parent(document.body);
			}
			else{
				layout.Parent(document.body);
			}
			return layout;
		}
	}
    WidgetStatic.call(CLASS);
	return CLASS;
})();
var Menu = (function() {
	var CLASS = function Menu() {
    	Base.call(this,['Menu']);
		var _THIS = this;
		Widget.call(this);
		_THIS.Parent.afterSet=function(_parent){
			renderView();
			_parent.appendChild(_THIS.View());
		}
		var view;
		this.View(view = MAKE.div({
			align : 'center'
		}))
		var makeMenu=function(data){
			var ch=[];var v;
			for(var i in data){
				if(HAS.properties(data[i])){//} && (typeof(data[i])!="function")){
					var c=new VLayout(),d;
					var smnu=makeMenu(data[i]);
					c.Visible(false)
					c.Children(smnu)
					v=new Widget()
						.View(d=MAKE.div({
							innerHTML:i
							,onmousedown:(function(submenu){
								return function(event){
									if(submenu.Visible()){
										submenu.hide()
									}else{
										submenu.show();
										var p=GET.Box(this);
										p={x:this.offsetLeft+this.offsetWidth,y:this.offsetTop-this.offsetHeight+submenu.View().offsetHeight};
										SET.pos(submenu.View(),p)
									}
									NORM.stopPropagation(event);
								}
							})(c)
							,onmouseover:(function(submenu){
								return function(){
									//console.log('in')
									//submenu.hide()
								}
							})(c)
							,onmouseout:(function(submenu){
								return function(){
									//console.log('out')
									//submenu.hide()
								}
							})(c)
						},{
							cursor:'pointer'
								,padding:'4px'
							,backgroundColor:'#FEF'
						}))
					//c.Parent(d);
					c.View().style.borderCollapse='collapse';
					var hh=new HLayout().Children([v,c]).VAlign('top');
					hh.View().style.borderCollapse='collapse';
					ch[ch.length]=hh;
				}else{
					v=new Widget()
						.View(MAKE.div({
							innerHTML:i
							,onmousedown:(function(_func){
								return function(event){
									_func();
									NORM.stopPropagation(event);
								}
							})(data[i])
						},{
							cursor:'pointer'
								,padding:'4px'
							,backgroundColor:'#EEE'
						}))
					ch[ch.length]=v;
				}
			}
			return ch;
		}
		var renderView = function() {
			CLASS.clearView(_THIS.View());
			var ch=[];var layout=new HLayout().VAlign('top');
			var data=_THIS.Children();
			for(var i in data){
				if(HAS.properties(data[i])){//} && (typeof(data[i])!="function")){
					var c=new VLayout(),d;
					var smnu=makeMenu(data[i]);
					c.Visible(false)
					c.Children(smnu)
					var v=new Widget()
						.View(d=MAKE.div(
								{},{},[MAKE.div({
							innerHTML:i
							,onmousedown:(function(submenu){
								return function(){
									if(submenu.Visible()){
										submenu.hide()
									}else{
										submenu.show()
										var p=GET.Box(this);p.y+=p.h;
										SET.pos(submenu.View(),p)
									}
								}
							})(c)
							,onmouseover:(function(submenu){
								return function(){
									//console.log('in')
									//submenu.hide()
								}
							})(c)
							,onmouseout:(function(submenu){
								return function(){
									//console.log('out')
									//submenu.hide()
								}
							})(c)
						},{
							cursor:'pointer'
							,padding:'4px'
							,backgroundColor:'#FEF'
						})]
						));
					c.Parent(d);
					SET.css(c.View(),{position:'absolute',borderCollapse:'collapse'});
					ch[ch.length]=v;
				}else{
					var v=new Widget()
						.View(MAKE.div({
							innerHTML:i
							,onmousedown:data[i]
						},{
							cursor:'pointer'
								,padding:'4px'
							,backgroundColor:'#EEE'
						}))
					ch[ch.length]=v;
				}
			}
			//console.log(ch);
			layout.Children(ch)
			layout.View().style.borderCollapse='collapse';
			_THIS.View(layout.View())
			_THIS.View().style.borderCollapse='collapse';
			return _THIS;
		}
		this.Parent.afterSet = function(_parent) {
			_parent.appendChild(_THIS.View());
			renderView();
		}
	}
	WidgetStatic.call(CLASS)
	CLASS.test=function(){
		var asd=new Menu();
		var dd={
			'Triple A':function(){
				//console.log('AAA')
				}
			,'Best Barbecue':function(){alert('BB')}
			,'Reperoire':{
				'Daring Daffodils':function(){alert('DD')}
				,'Life of PI':function(){
					//console.log('3.14')
					}
				,'Easy Number':function(){
					//console.log('2.718281828459045')
				}
				,'Animal Kingdom':{
					'Cow':function(){alert('Moo Tools')}
					,'Lizard':function(){alert('Django')}
					,'Frog':function(){alert('Kermit')}
					,'Quetzal':function(){alert('Quantal')}
				}
			}
		};//-->transofrm in {level:<number>,children:[{level:<number>,name:'',type:'ITEM|SUBMENU',click:function(){},childen:[...]}]}
		asd.Children(dd);asd.Parent(document.body);
		document.body.appendChild(asd.View())
	}
	return CLASS;
})();
