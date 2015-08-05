var DateInput=(function(){
	var CLASS=function DateInput(){
    	Base.call(this,['DateInput']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true;
		
		QProperty.call(this,['DateDirectTransform']);
		_THIS.DateDirectTransform(CALENDAR_UTILS.SQL_DATE);
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
			_THIS.OnChange(function(ref,date){
		});
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		
		QProperty.call(this,['DisabledDate']);
		_THIS.DisabledDate(function(date){
			return date.getTime()<1378213404770;
		});
		_THIS.DisabledDate.afterSet=function(formula){
			renderView();
		}
		
		_THIS.View(
			MAKE.input({
				value:_THIS.DateDirectTransform()(new Date())
				,onkeyup:function(event){
					var date=_THIS.DateDirectTransform()(this.value);
					if(date=='Invalid Date'){
						_THIS.OnChange()(_THIS,this.value);
					}else{
						_THIS.OnChange()(_THIS,this.value);
					}
				}
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,c=new Calendar(this)
							.DateDirectTransform(_THIS.DateDirectTransform())
							.Date(new Date())
							.OnChange(
    							function(ref,date){
    								_this.disabled=false;
									if(date=='Invalid Date'){
										_THIS.OnChange()(_THIS,this.value);
									}else{
										_THIS.OnChange()(_THIS,_THIS.DateDirectTransform()(date));
										//_this.value=_THIS.DateDirectTransform()(date);
									}
    								p.Parent().removeChild(p.View());//.close();
    								_THIS.OnClose()(_THIS);
    							}
    						)
							.OnClose(function(calRef){
    							p.Parent().removeChild(p.View());
								_THIS.OnClose()(_THIS);
							})
							.DisabledDate(function(date){
								return _THIS.DisabledDate()(date);
							});
						
						p=new Popover(this,53000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(ct=MAKE.div({},{}))
    						.Size({x:390,y:390})
							.Icon(Popover.ICONS.QUESTION);
						
					    	p.align(_this,true);
					    	
					    	c.Parent(ct);
						
							//p.Size({x:ct.offsetWidth+250,y:ct.offsetHeight+150})
					    	
							SET.css(c.View(),{backgroundColor:'',border:''});
							SET.css(ct,{width:'350px',height:'320px'});
					    	c.show();
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.date.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'11em'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			));
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();