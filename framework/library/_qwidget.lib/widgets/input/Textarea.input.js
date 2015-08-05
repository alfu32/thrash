var TextareaInput=(function(){
	var CLASS=function TextareaInput(){
    	Base.call(this,['TextareaInput']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true;
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().innerText=value;
		};
		
		_THIS.View(
			MAKE.textarea({
				onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var y=NORM.mouseY(event)-28;
					SET.css(this,{cursor:(x>0&&y<0)?'pointer':''});
					//this.value=x;
				}
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var y=NORM.mouseY(event)-28;
					if(x>0&&y<0){
						
					}
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.textfield1.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'22em'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 0%'
			}));
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();