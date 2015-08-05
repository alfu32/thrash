
var Calendar=(function(){
	var WIDGET=function Calendar(targetElement){
		var _THIS=this;
		Widget.call(this);
		this.View(MAKE.div());
		this.View().className='CalendarWidget';
		var view=this.View();
		
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

		var _kill=function(event){
			_THIS.Parent().removeChild(_THIS.View());
			WIDGET.kill({widget:_THIS});
			targetElement.disabled=false;
			targetElement.focus();
		}
		
		var closeBtn=MAKE.button({className:'CloseButton',innerHTML:"<?php WriteLib("PARAMETRAGEAD.LABEL.CLOSE")?>",onclick:_kill});
		var headLayout=MAKE.center();
		var prevYear=MAKE.button({innerHTML:"&lt;&lt;"
			,onclick:function(event){
				var d=_THIS.Date();
				d.setFullYear(d.getFullYear()-1);
				_THIS.Date(d);
			}
		});
		var prevMonth=MAKE.button({innerHTML:"&lt;"
			,onclick:function(event){
				var d=_THIS.Date();
				d.setMonth(d.getMonth()-1);
				_THIS.Date(d);
			}});
		var title=MAKE.div({className:'Message',innerHTML:"Title$",align:"center"},{width:'120px'});
		var nextMonth=MAKE.button({innerHTML:"&gt;"
			,onclick:function(event){
				var d=_THIS.Date();
				d.setMonth(d.getMonth()+1);
				_THIS.Date(d);
			}});
		var nextYear=MAKE.button({innerHTML:"&gt;&gt;"
			,onclick:function(event){
				var d=_THIS.Date();
				d.setFullYear(d.getFullYear()+1);
				_THIS.Date(d);
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
				var e=MAKE.div({className:'Day',innerHTML:CALENDAR_UTILS.DAYS[(i+1)%7].name.substr(0,2)});
				if((((i+1)%7)%6)!=0)e.style.backgroundColor='#E0E0EF';
				v.appendChild(e);
			}
			v.appendChild(MAKE.br());
			for(var i=0;i < d.length;i++){
				var day=d[i];
				var dd=day.day().getDate();
				var e=MAKE.div({className:'Day'});
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
	WIDGET.onClick_listener=function(instance,target,date){
		return function(event){
			target.value=CALENDAR_UTILS.SQL_DATE(date);
			target.onchange(event);
			/*instance.Parent().removeChild(instance.View());
			WIDGET.kill({widget:instance});
			target.disabled=false;
			target.focus();*/
			
		}
	}
	return WIDGET;
}

)();