
var NumberInput=(function(){
	var CLASS=function NumberInput(){
    	Base.call(this,['NumberInput']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true;
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,value){
			_THIS.View().onchange();});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		var tmout;
		_THIS.View(
			MAKE.input({
				onmouseout:function(event){
					/*this.value=this.value.replace(/[a-zA-Z]/gi,'');*/
				}
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,c=new Calculator(this)
							.OnChange(
    							function(ref,val){
    								_THIS.OnChange()(ref,val);
    							}
    						)
							.OnClose(function(calRef){
								_THIS.OnClose()(_THIS);
							});
						
						p=new Popover(this,53000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(ct=MAKE.div())
    						.Size({x:250,y:382})
							.Icon(Popover.ICONS.QUESTION)
					    	p.align(_this,true)
					    	c.Parent(ct);
					    	SET.css(c.View(),{backgroundColor:'',border:''});
					    	c.show();
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.number.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'6em'
				,backgroundImage:'url(image/input_icns/input.number.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			))
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();