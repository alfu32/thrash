var SliderView=(function(){
	var SLIDER=function SliderView(target){
		var _THIS=this;
		Widget.call(this);
		QProperty.call(_THIS,['OnChange']);
		_THIS.OnChange(function(event,target){})
		var ihtml="<table><tbody><tr><td align='left'>0.0%</td>";
		for(var p=10;p<100;p+=10){
			ihtml+="<td align='center' style='width:10%'>"+p+"%</td>";
		}
		ihtml+="<td align='right'>100%</td></tr></tbody</table>";
		
		var v,w,d;
		_THIS.View(w=MAKE.div({className:"SliderView"},{},[
			v=MAKE.div({
				onscroll:function(event){
					var val=parseInt(this.scrollLeft/14.3)/100
					target.value=val<0?0:val>1?1:val;
					_THIS.OnChange()(event,target);
					target.onchange(event);
				}
			},{margin:"10px",width:"526px",overflowX:"scroll",overflowY:"hidden"},[
				d=MAKE.div({innerHTML:ihtml,className:"SliderButton"})
				,MAKE.div({},{margin:"10px",width:"2000px"})
			])
		]));
	};
	WidgetStatic.call(SLIDER);
	SLIDER.onChange_listener=function(field){
		return function(event){
			field.value=this.value;
		}
	}
	return SLIDER;
})();