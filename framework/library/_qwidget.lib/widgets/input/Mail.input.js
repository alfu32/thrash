
var MailInput=(function(){
	var CLASS=function MailInput(){
    	Base.call(this,['MailInput']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true;
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		
		_THIS.View(
			MAKE.input({
				onkeydown:function(event){
					var asd=this.value.split('@');
					this.parentNode.style.backgroundColor='';
					_THIS.valid=true;
					try{
					if(asd.length!=2){
						var a=asd[0];
						var b=asd[1].split('.');
						if((a.length<2) && (b.length<2))
							this.parentNode.style.backgroundColor='#FF0000';
							_THIS.valid=false;
						}
					}catch(err){
						this.parentNode.style.backgroundColor='#FF0000';
						_THIS.valid=false;
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					if(x>0){
						
					}
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.mail.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'11em'
				,backgroundImage:''
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'
			}));
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();