EditableCell=(function(){
	var CLASS=function EditableCell(dataTargetReference/*{ref:data}*/){
    	Base.call(this,['EditableCell']);
		var _THIS=this;
		Widget.call(_THIS);
		QProperty.call(this,['OnBeginEditing']);
		QProperty.call(this,['OnEndEditing']);
		QProperty.call(this,['OnAfterCommitChanges']);
		QProperty.call(this,['OnErrorCommitChanges']);
		QProperty.call(this,['Text']);
		QProperty.call(this,['Link']);
		this.Text.afterSet=function(_text){
			div.innerHTML=_text;
			input.value=_text;
		}
		this.OnBeginEditing(function(event,_EDIT_CELL){});
		this.OnEndEditing(function(event,_EDIT_CELL){});
		this.OnAfterCommitChanges(function(event,_EDIT_CELL){});
		this.OnErrorCommitChanges(function(event,_EDIT_CELL){});
		var div,input,timeout;
		_THIS.View(
			MAKE.div({className:'EditableCell'},{},[
			    div=MAKE.div({
			    	innerHTML:'Celule editable, click pour editer'
					,onclick:function(event){
						var box=GET.Box(div)
						
						//box.w+=50;
						//box.h+=50;
						div.style.display='none'
						input.style.display=''
						_THIS.Text(div.innerHTML);
						SET.box(input,box);
						SET.css(input,{fontSize:div.style.fontSize,fontFace:div.style.fontFace});
						_THIS.OnBeginEditing()(event,_THIS);
					}
			    ,onmouseout:function(){
			    	clearInterval(timeout);
			    }
			    	,onmouseover:function(event){
			    		if(CLASS.firstTimeSeen){
			    			timeout=setTimeout((function(){
			    				new Popover(div,15000)
			    				.Text('Celule editable, double-click pour editer, clicquer autrepart pour finir (comme en excel)')
			    				.Icon(Popover.ICONS.INFO)
			    				.align(div);
			    			timeout=null;
			    			CLASS.firstTimeSeen=false;
			    			}).bind(_THIS),1100)
			    		}
			    	}
			    },{border:'1px solid white',paddingRight:'24px'},[])
			    ,input=MAKE.textarea({
					/*onchange:function(event){
						console.log('CH')
						div.style.display='';
						input.style.display='none';
						if(_THIS.OnEndEditing()(event,_THIS,_THIS.Text()+"",""+this.value)){
							_THIS.Text(input.value);
							_THIS.OnAfterCommitChanges()(event,_THIS)
						}
					}
					,*/onblur:function(event){
						div.style.display='';
						input.style.display='none';
						if(_THIS.OnEndEditing()(event,_THIS,_THIS.Text()+"",""+this.value)){
							_THIS.Text(input.value);
							_THIS.OnAfterCommitChanges()(event,_THIS)
						}else{
							_THIS.OnErrorCommitChanges()(event,_THIS)
						}
					}
			    },{display:'none',overflow:'auto'},[])
			])
		)
		this.renderView=function(){
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS);
	CLASS.firstTimeSeen=true;
	return CLASS;
})()