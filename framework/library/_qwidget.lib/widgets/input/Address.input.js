var AddressInput=(function(){
	var CLASS=function AddressInput(){
    	Base.call(this,['AddressInput']);
		var _THIS=this;
		Widget.call(this);
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,coords){});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		_THIS.Value('');
		_THIS.View(
			MAKE.input({
				maxLength:'256'
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,c=new GoogleMapInput(this)
							.OnChangeAddress(
    							function(ref,val){
    								_this.value=val;
    							}
    						)
							.OnClose(function(calRef){
								_THIS.OnClose()(_THIS);
							});
						
						p=new Popover(this,900000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(ct=MAKE.div())
    						.Size({x:586,y:510})
							.Icon(Popover.ICONS.QUESTION)
					    	p.align(_this,true)
					    	c.Parent(ct);
					    	SET.css(c.View(),{backgroundColor:'',border:''});
					    	c.show();
					   if(this.value!='')
						   c.Data(this.value);
					   else c.Data('50.84506976112555x4.3710243701934814');
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.address.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'22em'
				,backgroundImage:''
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			))
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();