var FilterViewControl=(function(){
	var CLASS=function FilterViewControl(expression,targetViews,_helpString){
    	Base.call(this,['FilterViewControl']);
		_THIS=this;
		Widget.call(this);
		this.Parent.afterSet=function(_parent){
			_THIS.renderView();
            _parent.appendChild(tfilter);
         }
		this.filter="";
		this.renderView=function(){
			return _THIS;
		}
		var length=0;
		var help,helpIcon,tdf,arrow,popover,hd;
		var input=MAKE.input({maxLength:"65535"
			,onkeyup:function(event){
				expression.eval(this.value);
				NORM.preventDefault(event);
				NORM.stopPropagation(event);
			}
			},{verticalAlign:'bottom',display:'',width:"380px"
				,backgroundImage:'url(image/loupe.png)',backgroundRepeat:'no-repeat'
					,backgroundPosition:'95% center',height:'28px'})
		var toggleHelp=function toggleHelp(event){
	    	if(hd.style.display=='inline'){
	    		hd.style.display='none';
	    		arrow.src='image/openiconlib/arrow-right.png';
	    	}
	    	else {
	    		hd.style.display='inline';
	    		arrow.src='image/openiconlib/arrow-left.png';
	    	}
	    }
		var tfilter=MAKE.table({},{},[
		    MAKE.tbody({},{},[
				MAKE.tr({className:"Header"},{},[
					tdf=MAKE.td({},{cursor:'default'},[
					    MAKE.img({src:'image/jumelles2.png'
						    	,onclick:toggleHelp}
						    ,{width:"32px",height:"32px"})
					   	,arrow=MAKE.img(
					   			{src:'image/openiconlib/arrow-right.png'
					   				,onclick:toggleHelp}
					   			,{width:'32px',height:"32px"})
						,hd=MAKE.div({},{display:'none'},[
						    input
						   	,helpIcon=MAKE.img(
						   			{src:'image/openiconlib/dialog-question-2.png'
						   				,onclick:function(event){
						   					popover.show();
						   					popover.align(this)
									    }
						   			}
						   			,{display:'',marginTop:'6px',position:'relative'
						   				,left:'-32px',width:'22px',height:"22px"})
						   	,MAKE.button({innerHTML:"Filter",onclick:function(event){
								for(var i in targetViews){
									targetViews[i].Filter(expression.func);
									targetViews[i].renderView();
								}
						   	}},{height:"32px"})
						])
						,MAKE.hr({},{margin:'0px',padding:'0px'})
					])
				])
			])
		]);
		this.View(tfilter);
		var popover=new Popover(helpIcon,8000).Text(_helpString).Icon(Popover.ICONS.INFO).hide();
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();