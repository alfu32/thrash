var TextInput=(function(){
	var hist={}
	var historyAdd=function(e){
		if(e=="" || e==undefined || e=='undefined' || e=='')return;
		hist[e]='';
	}
	var PROTO=function TextInput(){
    	Base.call(this,['TextInput']);
		var _THIS=this;
		Widget.call(this);
		_THIS.valid=true
		var changed=false;
		var input;
		var oldScroll=0;
		var historyList=new ListView3()
		.SectionControllerAtIndex(function(ref,index){
            return MAKE.div({
            	innerHTML:'TextInput History',className:'ListController'
				,onmousemove:function(event){
					var x=48+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					SET.css(this,{backgroundImage:x>0?'url(image/icongen/x_wh_032.png)':'url(image/icongen/x_bk_032.png)'});
				}
				,onmouseout:function(event){this.style.backgroundImage='url(image/input_icns/input.text.png)'}
				,onclick:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					if(x>0){
						ListView3.removeView(historyList);
					}
				}
            },{
            	padding:'12px'
            	,fontSize:'22px'
            	,backgroundColor:'#E7E3FF'
            	,color:'#122227'
				,backgroundImage:'url(image/input_icns/input.text.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'99.5% 50%'
				,backgroundSize:'32px'
				,boxShadow:'0px 0px 12px #000'
			});
        })
		.ItemAtIndex(function(ref,index){
			var v=MAKE.div({
				innerHTML:ref.Items()[index]
				,onclick:function(event){
					input.value=ref.Items()[index];
					ListView3.removeView(historyList);
					//input.scrollIntoView();
					SET.ScrollTop(oldScroll);
					changed=true;
				}
				,onmouseover:function(event){v.style.backgroundColor='#122227';v.style.color='#FFF';}
				,onmouseout:function(event){v.style.color='#122227';v.style.backgroundColor='#FFF';}
			},{padding:'12px',cursor:'pointer',backgroundColor:'#FFF'});
			return v;
		})
		.CSS({border:'1px solid #57777C',position:'absolute',top:'12.5%',left:'12.5%',width:'75%',height:'75%',overflowX:'hidden',backgroundColor:'#FFF'});
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		
		_THIS.View(
			input=MAKE.input({
				onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
				,onmousedown:function(event){
					if(this.value==_THIS.Placeholder() && !changed){
						this.value='';
					}
					changed=true;
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					if(x>0){
						//delete(history['undefined']);
						var history=(serializeDict(hist)+';').split('|;')
						history.length--;
						console.log(history);
						historyList.Items(history).Parent(document.body);
						oldScroll=GET.ScrollTop();
						SET.ScrollTop('0px');
						//this.value=_THIS.Placeholder()||this.value;
					}
					//this.value=x;
				}
				,onchange:function(event){
					_THIS.OnChange()(_THIS,this.value);
				}
				,onmouseover:function(event){this.style.backgroundImage='url(image/input_icns/input.text.png)'}
				,onmouseout:function(event){
					this.style.backgroundImage='';
					historyAdd(this.value);
				}
			},{
				width:'11em'
				,backgroundImage:''
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'
		}));
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		QProperty.call(this,['Placeholder']);
		_THIS.Placeholder('text');
		_THIS.Placeholder.afterSet=function(value){
			changed=false;
			historyAdd(this.value);
			_THIS.View().value=value;
			_THIS.View().placeholder=value;
		};
		
	}
	PROTO.getHistory=function(){return hist;}
	WidgetStatic.call(PROTO);
	return PROTO;
})();