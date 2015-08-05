
var Calendar=(function(){
	var WIDGET=function Calendar(targetElement){
		var _THIS=this;
		Widget.call(this);
		this.View(MAKE.div({},{
			zoom:'1'
			,opacity:'1'
			,backgroundColor:'#FFF'
			,padding:'15px'
			,marginTop:'15px'
			,border:'1px solid #2AA'
			,width:'290px'
			,height:'232px'
		}));
		this.View().className=''//'CalendarWidget';
		var view=this.View();
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		var month=new Month();
		QProperty.call(this,['Date']);
		this.Date.afterSet=function(_date){
			title.innerHTML=_date.getFullYear()+" "+CALENDAR_UTILS.MONTHS[_date.getMonth()].name;
			month.Date(_date);
			_THIS.Data(month.getDayList());
		}
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(_raw_data){
			renderView();
		}
		this.Parent.afterSet=function(_parent){
			targetElement.disabled=true;
			renderView();
			_parent.appendChild(_THIS.View())
		}
		
		var closeBtn=MAKE.button({
			className:'CloseButton'
			,innerHTML:WIDGET.STRINGS['PARAMETRAGEAD.LABEL.CLOSE']
			,onmousedown:function(event){
				_THIS.OnClose()(_THIS);
				_THIS.Parent().removeChild(_THIS.View());
				targetElement.disabled=false;
				targetElement.focus();
				/*WIDGET.kill({widget:_THIS});
				NORM.preventDefault(event);
				NORM.stopPropagation(event);*/
			}
		});
		var headLayout=MAKE.center();
		var prevYear=MAKE.button({innerHTML:"&lt;&lt;"
			,onmousedown:function(event){
				var d=_THIS.Date();
				d.setFullYear(d.getFullYear()-1);
				_THIS.Date(d);
			NORM.preventDefault(event);
			NORM.stopPropagation(event);
			}
		});
		var prevMonth=MAKE.button({innerHTML:"&lt;"
			,onmousedown:function(event){
				var d=_THIS.Date();
				d.setMonth(d.getMonth()-1);
				_THIS.Date(d);
			NORM.preventDefault(event);
			NORM.stopPropagation(event);
			}});
		var title=MAKE.strong({className:'Message',innerHTML:"Title$",align:"center"},{
				width:'120px'
				,display:'inline-block'
				,zoom:'1'
			});
		var nextMonth=MAKE.button({innerHTML:"&gt;"
			,onmousedown:function(event){
				var d=_THIS.Date();
				d.setMonth(d.getMonth()+1);
				_THIS.Date(d);
			NORM.preventDefault(event);
			NORM.stopPropagation(event);
			}});
		var nextYear=MAKE.button({innerHTML:"&gt;&gt;"
			,onmousedown:function(event){
				var d=_THIS.Date();
				d.setFullYear(d.getFullYear()+1);
				_THIS.Date(d);
			NORM.preventDefault(event);
			NORM.stopPropagation(event);
			}});
			view.appendChild(closeBtn);
			view.appendChild(MAKE.hr());
					
			headLayout.appendChild(prevYear);
			headLayout.appendChild(prevMonth);
			headLayout.appendChild(title);
			headLayout.appendChild(nextMonth);
			headLayout.appendChild(nextYear);

			view.appendChild(headLayout);
			view.appendChild(MAKE.hr());
		var bodyLayout=MAKE.center();
		var body=MAKE.div();
			bodyLayout.appendChild(body);
			view.appendChild(bodyLayout);
		
		var renderView=function(){
			var d=_THIS.Data();
			var v=body;
			WIDGET.clearView(v);
			for(var i=0;i < 7;i++){
				var e=MAKE.strong({className:'Day',innerHTML:CALENDAR_UTILS.DAYS[(i+1)%7].name.substr(0,2)},{
					width:'34px'
					,backgroundColor:'#C0C0EF'
					,display:'inline-block'
					,zoom:'1'
				});
				if((((i+1)%7)%6)!=0)e.style.backgroundColor='#E0E0EF';
				v.appendChild(e);
			}
			v.appendChild(MAKE.br());
			for(var i=0;i < d.length;i++){
				var day=d[i];
				var dd=day.day().getDate();
				var e=MAKE.strong({className:'Day'},{
					width:'34px'
					,backgroundColor:'#C0C0EF'
					,display:'inline-block'
					,zoom:'1'
				});
				var b=MAKE.button({
					className:'DayButton',
					innerHTML:(dd<10)?("0"+dd):dd,
					onmousedown:WIDGET.onClick_listener(_THIS,targetElement,day.day())
					});
				
				if(!day.isValid())b.disabled="true";
				if(((day.day().getDay()+6)%7)<5)e.style.backgroundColor='#E0E0EF';
				
				e.appendChild(b);
				if(i>0 && (i%7)==0)v.appendChild(MAKE.br());
				v.appendChild(e);
			}
		}
	};
	WidgetStatic.call(WIDGET);
	WIDGET.STRINGS_FETCH('Calendar.input',['PARAMETRAGEAD.LABEL.CLOSE'])
	WIDGET.onClick_listener=function(instance,target,date){
		return function(event){
			target.value=CALENDAR_UTILS.SQL_DATE(date);
			try{
			target.onchange(event);
			}catch(error){
				
			}
			/*instance.Parent().removeChild(instance.View());
			WIDGET.kill({widget:instance});
			target.disabled=false;
			target.focus();*/
			
		}
	}
	return WIDGET;
}

)();