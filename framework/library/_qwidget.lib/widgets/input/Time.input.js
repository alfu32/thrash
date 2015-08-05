var TimeInput=(function(){
	var CLASS=function TimeInput(target,onchange){
    	Base.call(this,['TimeInput']);
			//function ax(n){if(n.offsetParent==null)return 0;else return ax(n.offsetParent)+n.offsetLeft}
			//function ay(n){if(n.offsetParent==null)return 0;else return ay(n.offsetParent)+n.offsetTop}
			var PI=Math.PI;
			var px=GET.X(target)+target.offsetWidth/2;
			var py=GET.Y(target)+target.offsetHeight/2;
		var _THIS=this;
		Widget.call(this);
		this.kill=function(){
			_THIS.Parent().removeChild(_THIS.View());
			CLASS.removeInstance(_THIS)
		}
		this.View(MAKE.div(
				{}
				,{position:"absolute",backgroundImage:"url(image/dial4.png)"
				,width:'279px',height:'279px',top:py-139+'px',left:px-139+'px'}))
		var mk=function(x,y,text,onclick,fs){//,display:'table-cell'
			var v=MAKE.div(
			{align:'center',className:"dialElement"
				,innerHTML:text,onclick:function(event){onclick(text,target,this)}
			}
			,{position:"absolute",textAlign:'center',verticalAlign:'middle'
				,backgroundImage:'url(image/bl2-Yellow.png)',top:y+'px'
				,left:x+'px',fontFamily:'Calibri,Consolas',fontSize:(fs+"px"),width:"27px"
				,height:"25px",cursor:'pointer',paddingLeft:'3px',paddingTop:'7px'
			})
			return v;}
		function __constructor(_target){
			var v=_THIS.View();
			
			for(var i=12;i>0;i--){
				var a=2*PI*i/12;
				v.appendChild(mk(
				139-108*Math.cos(a+PI/2)-15
				,139-108*Math.sin(a+PI/2)-17
				,i==24?"0":(i+"")
				,function(tx,el,self){
					var txv=parseInt(self.innerText);
					var vi=el.value.split(":");vi[0]=(txv<10?"0":"")+txv;
					el.value=vi.join(":");
					if(txv<12)self.innerHTML=txv+12;
					else self.innerHTML=txv-12;
					onchange();
				}
				,12));
			}
			for(var i=12;i>0;i--){
				var a=2*PI*i/12;
				v.appendChild(mk(
				139-75*Math.cos(a+PI/2)-15
				,139-75*Math.sin(a+PI/2)-17
				,i==12?"0":(i*5+"")
				,function(tx,el,self){
					var vi=el.value.split(":");vi[1]=(tx<10?"0":"")+tx;
					el.value=vi.join(":");
					onchange();
				}
				,10));
			}
			v.appendChild(
				MAKE.button(
					{innerHTML:'&nbsp;X&nbsp;',onclick:function(event){_THIS.kill()}}
					,{position:"absolute",top:"18px",right:"17px",padding:'9px'}))
			_THIS.Parent(target.offsetParent);
		}
		__constructor(target);
		CLASS.addInstance({target:target,instance:_THIS})
	}
	var instances=[];
	CLASS.hasInstance=function(target){
		for(var i=0;i<instances.length;i++){
			if(instances[i].target==target)return true;
		}
		return false;
	}
	CLASS.removeInstance=function(instance){
		var i=CLASS.indexOfInstance(instance);
		if(i==-1)throw "error";
		console.log(i);
		console.log(instances.splice(i,1));
		console.log(instances);
	}
	CLASS.addInstance=function(reg){
		instances[instances.length]=reg
		console.log(instances);
	}
	CLASS.getInstance=function(target,onchange){
		for(var i=0;i<instances.length;i++){
			if(instances[i].target==target){
				var inst=instances[i].instance;
				inst.Parent(target.offsetParent);
				return inst;
			}
		}
		var instance=new TimeInput(target,onchange)
		instances[instances.length]={target:target,instance:instance}
		return instance;
	}
	CLASS.Instances=function(){
		return instances;
	}
	CLASS.indexOfInstance=function(instance){
		for(var i=0;i<instances.length;i++){
			if(instances[i].instance==instance)return i; 
		}
		return -1;
	}
	return CLASS;
})()
var TimeInput2=(function(){
	var CLASS=function TimeInput2(target){
    	Base.call(this,['TimeInput2']);
		var _THIS=this;
		var initialValue=target.value;
		var pad=function(n){return n<10?'0'+n:n;}
		var hup,hc,hdown,mup,mc,mdown,h,m;
			var date=new Date();
		try{
			h=parseInt(target.value.split(':')[0]);
			m=parseInt(target.value.split(':')[1]);
			if(isNaN(h))h=date.getHours();
			if(isNaN(m))m=date.getMinutes();
		}catch(e){
			h=date.getHours();m=date.getMinutes();
		}
		Widget.call(this);
		QProperty.call(this,['OnCancel']);
		_THIS.OnCancel(function(){})
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		
		var setTarget=function(){
			hc.innerHTML=pad(h);
			mc.innerHTML=pad(m);
			target.value=pad(h)+':'+pad(m)
			_THIS.OnChange()(_THIS,h+":"+m+":00");
		}
		
		this.View(
			new VLayout().Children([
				new HLayout().Children([
				   new VLayout().Children([
				       new Widget().View(hup=MAKE.button({innerHTML:'up'
				    	   ,onmousedown:function(event){h=((h+1)<24?(h+1):0);setTarget()}
				    	   ,ondblclick:function(event){h=((h+2)<24?(h+2):0);setTarget()}}
				       	,{width:'100%'}))
				       ,new Widget().View(hc=MAKE.div({innerHTML:'00'}
				       		,{
				       			width:'100%'
				       			,fontFamily:'thinerFont,Calibri,Consolas'
				       			,fontSize:'64px'
				       		})
				       	)
				       ,new Widget().View(hdown=MAKE.button({innerHTML:'down'
				    	   ,onmousedown:function(event){h=((h-1)>=0?(h-1):23);setTarget()}
				    	   ,ondblclick:function(event){h=((h-2)>=0?(h-2):23);setTarget()}}
						,{width:'100%'}))
				   ])
				   ,new Widget().View(MAKE.div({innerHTML:':'}
				       		,{
				       			width:'100%'
				       			,fontFamily:'thinerFont,Calibri,Consolas'
				       			,fontSize:'64px'
				       		})
				       	)
				   ,new VLayout().Children([
				       new Widget().View(mup=MAKE.button({innerHTML:'up'
				    	   ,onmousedown:function(event){m=((m+1)<60?(m+1):0);setTarget()}
				    	   ,ondblclick:function(event){m=((m+5)<60?(m+5):0);setTarget()}},{width:'100%'}))
				       ,new Widget().View(mc=MAKE.div({innerHTML:'00'}
				       		,{
				       			width:'100%'
				       			,fontFamily:'thinerFont,Calibri,Consolas'
				       			,fontSize:'64px'
				       		})
				       	)
				       ,new Widget().View(mdown=MAKE.button({innerHTML:'down'
				    	   ,onmousedown:function(event){m=((m-1)>=0?(m-1):59);setTarget()}
				    	   ,ondblclick:function(event){m=((m-5)>=0?(m-5):59);setTarget()}},{width:'100%'}))
				    	])
				   ]).VAlign('middle')
				,new Widget().View(MAKE.button({innerHTML:'cancel',onmousedown:function(event){
						target.value=initialValue;
						_THIS.OnCancel()()
					}
				},{width:'100%'},[]))
			]).View()
		);
		setTarget();
	}
	return CLASS;
})()
var TimeInput3=(function(){
	var CLASS=function TimeInput3(){
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
				value:CALENDAR_UTILS.SQL_TIME(new Date())
				,onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,c=new TimeInput2(this)
							.OnChange(
    							function(ref,time){
    								_THIS.OnChange()(ref,time);
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
    						.Size({x:220,y:265})
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
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.time.png)'}
				,onmouseout:function(event){this.style.backgroundImage=''}
			},{
				width:'11em'
				,backgroundImage:''
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'})
			)
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();