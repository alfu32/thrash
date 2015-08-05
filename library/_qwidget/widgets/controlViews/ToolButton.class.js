var ToolButton=(function(){
	var CLASS=function ToolButton(){
		var _THIS=this
		Widget.call(this);
		_THIS.View(MAKE.div({
			align:'left'
			,onclick:function(event){_THIS.Click()(event);}
		}));
		var renderView=function(){};
		QProperty.call(this,['Icon'])
		this.Icon.afterSet=function(_icon){
			renderView();
			try{
				_THIS.View().style.backgroundImage='url("'+_THIS.Icon()+'")'
			}catch(e){}
		}
		this.Icon("image/transparent_50.gif");
		QProperty.call(this,['IconPosition'])
		this.IconPosition.afterSet=function(_pos){
			_THIS.View().style.backgroundPosition=_pos;
		}
		this.IconPosition(' ');
		QProperty.call(this,['Color'])
		this.Color.afterSet=function(_color){
			_THIS.View().style.backgroundColor=_color;
		}
		this.Color('#FFFFFF')
		
		QProperty.call(this,['Height'])
		this.Height.afterSet=function(_height){
			_THIS.View().style.minHeight=_height+'px';
			_THIS.View().style.height=_height+'px';
			//_THIS.View().style.paddingBottom=(parseInt(_height/2)-20)+'px';
		}
		this.Height(32);
		
		QProperty.call(this,['Text'])
		this.Text.afterSet=function(_text){
			_THIS.View().innerHTML=_text;
		}
		this.Text('')
		
		QProperty.call(this,['Attr'])
		this.Attr.afterSet=function(_attrObject){
			SET.attr(_THIS.View(),_attrObject);
		}
		QProperty.call(this,['CSS'])
		this.CSS.afterSet=function(_cssObject){
			SET.css(_THIS.View(),_cssObject);
		}
		this.CSS({
			cursor:'pointer'
			,backgroundRepeat:'no-repeat'
			,fontSize:'20px'
			,minWidth:"96px"
			,minHeight:"32px"
			,border:'1px solid #B0B0B0'
		})
		QProperty.call(this,['Click'])
		
		this.Click(function(event){confirm('event handler is undefined','Yes','No','Cancel')});
		
		this.renderView=function(){return renderView();}
		var renderView=function(){
			SET.css(_THIS.View(),{
				backgroundColor:_THIS.Color()
				,backgroundImage:'url("'+_THIS.Icon()+'")'
				,backgroundPosition:_THIS.IconPosition()+' 0px'
			})
			SET.attr(_THIS.View(),{
				innerHTML:_THIS.Text()
			})
			return _THIS;
		}
		_THIS.View.beforeGet=function(_val){
			_val.innerHTML=_THIS.Text();
		}
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();