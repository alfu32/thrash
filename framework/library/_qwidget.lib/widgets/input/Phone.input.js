
var PhoneInput=(function(){
	var CLASS=function PhoneInput(){
    	Base.call(this,['PhoneInput']);
		var _THIS=this;
		Widget.call(this);
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(index,vals){});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		
		_THIS.View(
			MAKE.input({
				onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,c=new SelectView(_this)
							.Selected(_this.value)
							.OnChange(
    							function(lnk,view,index,val){
    								_this.value='+'+val.split('-')[1];
    								_THIS.OnChange()(_THIS,val);
    							}
    						);
						
						p=new Popover(this,53000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(ct=MAKE.div())
    						.Size({x:350,y:115})
							.Icon(Popover.ICONS.QUESTION)
					    	p.align(_this,true)
					    	c.Parent(ct);
					    	SET.css(c.View(),{backgroundColor:'',border:''});
					    	c.show();
					    c.Data(SERVER.requestEnum('static_data/dialling codes.php',{},function(v){return v}))
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.phone.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'11em'
				,backgroundImage:''
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			))
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();