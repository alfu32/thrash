var SearchBox=(function(){
	var CLASS=function SearchBox(){
		Base.call(this,['SearchBox']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true;
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['Timeout']);
		_THIS.Timeout(200);
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		var tmout,tmout2,input;
		var listener=function(event){
			clearTimeout(tmout2);
			clearTimeout(tmout);
			tmout=setTimeout(function(){
				input.style.backgroundImage='url(image/loader_003.gif)';
			},1200);
			tmout2=setTimeout(function(){
				input.style.backgroundImage='url(image/input_icns/input.search.png)';
				_THIS.OnChange()(_THIS,input.value);
			},1200+_THIS.Timeout());
		}
		_THIS.View(
			input=MAKE.input({
				onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmousedown:function(event){
					if(this.value==_THIS.Placeholder()){
						this.value='';
					}
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					if(x>0){
						clearTimeout(tmout);
						clearTimeout(tmout2);
						input.style.backgroundImage='url(image/input_icns/input.search.png)';
						_THIS.OnChange()(_THIS,input.value);
					}
				}
				,onbeforecut:listener
				,onpaste:listener
				,onkeyup:listener
				,onchange:listener
			},{
				width:'11em'
				,backgroundImage:'url(image/input_icns/input.search.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'
		}));
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		QProperty.call(this,['Placeholder']);
		_THIS.Placeholder.afterSet=function(value){
			_THIS.View().value=value;
			_THIS.View().placeholder=value;
		};
		_THIS.Placeholder('text');
		
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();