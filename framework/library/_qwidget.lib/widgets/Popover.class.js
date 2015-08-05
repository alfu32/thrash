var Popover=(function(){
	var CLASS=function Popover(target,timeout){
    	Base.call(this,['Popover']);
		var _THIS=this;
		Widget.call(this);
		var p=GET.Pos(target);
		var text,arrowTop,arrowBottom,v,ttc;
		var timeoutRef;
		this.refnumber=11111+parseInt(Math.random()*888889)
		QProperty.call(this,['TouchToClose']);
		_THIS.TouchToClose(true)
		this.TouchToClose.afterSet=function(_value){
			//btn.display=_value?'none':'';
			ttc.innerHTML=_value?CLASS.STRINGS['PARAMETRAGEAD.LABEL.CLOSE']:'';
		}
		var v=MAKE.div(
			{}
			,{borderCollapse:'collapse',position:"absolute",width:'220px',cursor:'default',overflow:'hidden'}
			,[
			    arrowTop=MAKE.div(
			    	{}
			    	,{
				    	display:''
			    		,backgroundImage:'url("image/borders/popover_arrow_up.png")'
			    		,height:'17px',width:'100%'
			    		,minWidth:'49px'
				    	,backgroundPosition:'50% 0%'
			    		,backgroundRepeat:'no-repeat'
			    	})
			    ,MAKE.div({align:'right'},{border:'6px solid #000000',backgroundColor:'#000000',color:'#FFFFFF'},[
				    ttc=MAKE.strong({
				    	innerHTML:CLASS.STRINGS['PARAMETRAGEAD.LABEL.CLOSE']
				    	,align:'right'
				    	,onmousedown:function(event){
							if(_THIS.TouchToClose()){
								_THIS.close();
							}
						}
				    },{backgroundColor:'#76767A',padding:'5px',color:'#FFFFFF',cursor:'pointer',display:'inline-block'})
				    ,text=MAKE.div(
				    	{}
				    	,{
				    		backgroundColor:'#FFFFFF',color:'#000001'
				    		,backgroundImage:'url("image/openiconlib/dialog-information-3.png")'
					    	,backgroundPosition:'100% 100%'
						    ,backgroundRepeat:'no-repeat'
				    		,boxShadow:'inset 0px 1px 4px #000000'
				    		,border:'6px solid #76767A'
				    		,wordWrap: 'break-word'
				    	},[])
				 ])
		    	,arrowBottom=MAKE.div(
				    	{}
				    	,{
				    		display:'none'
				    		,backgroundImage:'url("image/borders/popover_arrow_down.png")'
				    		,height:'17px',width:'100%'
				    		,minWidth:'49px'
				    		,backgroundPosition:'50% 0%'
				    		,backgroundRepeat:'no-repeat'
				    	})
		]);
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		QProperty.call(this,['Text']);
		QProperty.call(this,['Node']);
		QProperty.call(this,['Icon']);
		QProperty.call(this,['Size']);
		_THIS.Size({x:220,y:220})
		_THIS.Size.afterSet=function(vector){
			if(vector.x==undefined)v.style.width='';
			else v.style.width=(vector.x||220)+'px';
			if(vector.y==undefined)v.style.height='';
			else v.style.height=(vector.y||220)+'px';
		}
		this.Text.afterSet=function(_value){
			text.innerHTML+=_value;
		}
		this.Node.afterSet=function(_value){
			text.appendChild(_value);
		}
		this.Icon.afterSet=function(_value){
			text.style.backgroundImage='url("'+_value+'")';
		}
		this.Icon(CLASS.ICONS.INFO)
		this.View(v);
		this.Parent(document.body);
		
		this.align=function(t,bottom){
			var _target=t||target;
			v.style.display='';
			var X=GET.X(_target)+(_target.offsetWidth/2)-(v.offsetWidth)/2;
			var Y;
			
			var Z=parseFloat(document.body.style.zoom);
			Z=isNaN(Z)?1:Z;
			if(navigator.userAgent.indexOf('WebKit')==-1){
				//X*=Z;Y*=Z;
			}
			if(bottom){
				arrowBottom.style.display='';
				arrowTop.style.display='none';
				Y=GET.Y(_target)-v.offsetHeight;
			}else{
				arrowBottom.style.display='none';
				arrowTop.style.display='';
				Y=GET.Y(_target)+_target.offsetHeight;
			}///2-v.offsetHeight;
			//console.log(X,Y,_target.offsetWidth,v.offsetWidth)
			v.style.top=parseInt(Y)+'px';
			v.style.left=parseInt(X)+'px';
			if(v.offsetTop<0 || v.offsetLeft<0){
				this.align(t,false)
			}
			timeoutRef=setTimeout((function(){
					try{
						_THIS.OnClose()(_THIS);
						_THIS.Parent().removeChild(_THIS.View());
						//v.style.display='none';
					}catch(err){}
				}),timeout||3000);//.bind(_THIS)
			return _THIS;
		}
		
		this.close=function(){
			try{
				_THIS.OnClose()(_THIS)
				_THIS.Parent().removeChild(_THIS.View());
				clearTimeout(timeoutRef);
			}catch(err){}
		}
	}
	WidgetStatic.call(CLASS)
	CLASS.STRINGS_FETCH('Popover',['PARAMETRAGEAD.LABEL.CLOSE'])
	CLASS.ICONS={
		INFO:'image/openiconlib/dialog-information-3.png'
		,QUESTION:'image/openiconlib/dialog-question-2.png'
		,WARNING:'image/openiconlib/dialog-warning.png'
		,ERROR:'image/openiconlib/dialog-error-4.png'
		,ALERT:'image/openiconlib/dialog-alert.png'
	}
	return CLASS;
})();