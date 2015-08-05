
var SequenceLayout=(function(){
	var CLASS=function SequenceLayout(){
		var _THIS=this;
		Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){console.log('GOTO : ',children,name,visibility)})
		var tbody;
		this.View(MAKE.table({className:'SequenceLayout'},{},[
			tbody=MAKE.tbody({},{},[
			])
		]))
		this.Parent.afterSet=function(_parent){
			_parent.appendChild(_THIS.View());
			_THIS.renderView();
		}
		this.renderView=function(){
			CLASS.clearView(tbody);
			var children=this.Children();
			var first=false;
			for(var name in children){
				if(!first)first=name;
				var td;
				tbody.appendChild(
					MAKE.tr({},{},[
						td=MAKE.td({display:'none'},{},[children[name].View()])
					])
				);
				children[name].Parent(td);
			}
			if(first)_THIS.GoTo(first);
			return _THIS;
		};
		this.GoTo=function(childName){
			var first=false;
			var children=this.Children();
			for(var name in children){
				if(!first)first=name;
				children[name].Parent().style.display='none';
				if(name==childName){
					children[name].Parent().style.display='';
					_THIS.OnShowChild()(children,name,true);
				}
			}
		}
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();
var HTabController=(function(){
	var CLASS=function TabController(sequenceLayout){
		var _THIS=this;
		Widget.call(this);
		var tbody,table,tr;
		this.View(table=MAKE.table({className:'TabController'},{borderCollapse:'collapse'},[
			tbody=MAKE.tbody({},{},[
				tr=MAKE.tr()
			])
		]))
		var prev;
		var border=function(e){
			for(var c=0;c<tr.children.length;c++){
				tr.children[c].style.borderBottom='1px solid #FFF';
				tr.children[c].style.backgroundColor='#CCC';
			}
			e.style.border='1px solid #FFF';
			//e.style.borderBottom='';
			e.style.backgroundColor='#EEE';
		}
		this.renderView=function(){
			CLASS.clearView(tr);
			
			var children=sequenceLayout.Children();
			var first=false;
			for(var name in children){
				var td;
				tr.appendChild(
					td=MAKE.td({},{display:''},[
						MAKE.div({
							innerHTML:name
							,onmousedown:(function(sequence,childName){
								return function(event){
									sequence.GoTo(childName)
									border(this.parentNode,true);
									
								}
							})(sequenceLayout,name)
						},{cursor:'pointer',height:'44px',padding:'8px',margin:'2px'},[])
					])
				);
			}
				if(!first){
					first=name;
					border(tr.children[0]);
				}
			return _THIS;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();
var VTabController=(function(){
	var CLASS=function TabController(sequenceLayout){
		var _THIS=this;
		Widget.call(this);
		var tbody,table,tr;
		this.View(table=MAKE.table({className:'TabController'},{borderCollapse:'collapse'}
			,[tbody=MAKE.tbody({},{},[tr=MAKE.tr()])])
		)
		var prev;
		var border=function(e){
			for(var c=0;c<tbody.children.length;c++){
				//tr.children[c].style.borderBottom='1px solid #FFF';
				tbody.children[c].style.backgroundColor='#CCC';
			}
			//e.style.border='1px solid #FFF';
			e.style.backgroundColor='#EEE';
		}
		this.renderView=function(){
			CLASS.clearView(tbody);
			
			var children=sequenceLayout.Children();
			var first=false;
			for(var name in children){
				var td;
				tbody.appendChild(
					tr=MAKE.tr({},{},[
						td=MAKE.td({},{display:''},[
							MAKE.div({
								innerHTML:name
								,onmousedown:(function(sequence,childName){
									return function(event){
										sequence.GoTo(childName)
										border(this.parentNode.parentNode,true);
									}
								})(sequenceLayout,name)
							},{cursor:'pointer',height:'44px',padding:'8px',margin:'2px'},[])
						])
					])
				);
			}
				if(!first){
					first=name;
					border(tr);
				}
			return _THIS;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();
var SequenceController=(function(){
	var CLASS=function SequenceController(sequenceLayout){
		var _THIS=this;
		Widget.call(this);
		var tbody,table;
		this.View(table=MAKE.table({},{borderCollapse:'collapse',border:'0px solid #DDD',width:'100%'},[
			tbody=MAKE.tbody()
		]))
		QProperty.call(this,['Iterator'])
		
		_THIS.Iterator(new Iterator(sequenceLayout.Children()))
		
		this.renderView=function(){
			CLASS.clearView(tbody);
			c=[_THIS.Iterator().Previous(),_THIS.Iterator().Current(),_THIS.Iterator().Next()];
				var back,title,forth;
				SET.css(tbody,{backgroundColor:'rgb(255,255,255)'})
				tbody.appendChild(MAKE.tr({},{},[MAKE.td({colSpan:3},{},[MAKE.hr()])]))
				tbody.appendChild(
					MAKE.tr({className:'SequenceController'},{backgroundColor:'#F7F7F7'
						,borderTop:'1px solid #F0F0F0',borderBottom:'1px solid #DDD'},[
						back=MAKE.td({
							onmousedown:(function(sequence,child){
									if(child!=null){
										return function(event){
											sequence.GoTo(child.name);
											_THIS.Iterator().back();
											_THIS.renderView();
										}
									}else{
										return function(event){}
									}
								})(sequenceLayout,c[0])
						},{
							width:'25%'
							,backgroundImage:'url(image/previous6.png)'
							,backgroundRepeat:'no-repeat'
							,backgroundPosition:'0%'
							,cursor:'pointer'
							,padding:'3px'
							,paddingLeft:'32px'},[
							MAKE.div({
								align:'right'
								,innerHTML:c[0]!=null?c[0].name:' '
							},{
								height:'100%'
							},[])
						])
						,MAKE.td({},{width:'50%'},[
							title=MAKE.h2({
								align:'center'
								,innerHTML:c[1].name
							},{padding:'3px'},[])
						])
						,forth=MAKE.td({
							onmousedown:(function(sequence,child){
									if(child!=null){
										return function(event){
											sequence.GoTo(child.name);
											_THIS.Iterator().forward();
											_THIS.renderView();
										}
									}else{
										return function(event){}
									}
								})(sequenceLayout,c[2])
							},{
								width:'25%'
								,cursor:'pointer'
								,padding:'3px'
								,paddingRight:'32px'
								,backgroundImage:'url(image/next2.png)'
								,backgroundRepeat:'no-repeat'
								,backgroundPosition:'100%'
							},[
							MAKE.div({
								align:'left'
								,innerHTML:c[2]!=null?c[2].name:' '
							},{height:'100%'},[])
						])
					])
				);
				tbody.appendChild(MAKE.tr({},{},[MAKE.td({colSpan:3},{},[MAKE.hr()])]))
				if(c[0]==null)SET.css(back,{backgroundImage:'',border:'',cursor:''})
				if(c[2]==null)SET.css(forth,{backgroundImage:'',border:'',cursor:''})
			return _THIS;
		};
		this.Match=function Match(reference){
			var b=GET.Box(reference||document.body)
			_THIS.View().style.width=b.w-40+'px';
			return _THIS;
		}
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();