
var ValidDay=(function(){
	return function ValidDay(day,insideCurrentMonth){
    	Base.call(this,['ValidDay']);
		this.string=day;
		this.day=function(){return day;};
		this.isInsideCurrentMonth=function(){return insideCurrentMonth;};
		this.isValid=function(){return true;};
		this.toString=function(){return day.toString();};
	};
})();
var InvalidDay=(function(){
	return function InvalidDay(day,insideCurrentMonth){
    	Base.call(this,['InvalidDay']);
		this.string=day.toString();
		this.day=function(){return day;};
		this.isInsideCurrentMonth=function(){return insideCurrentMonth;};
		this.isValid=function(){return false;};
		this.toString=function(){return day.toString();};
	};
})();

var CALENDAR_UTILS=(function(){
	var UNIT={}
	WidgetStatic.call(UNIT);
	UNIT.STRINGS_FETCH('CALENDAR_UTILS'
			,["CALENDAR.MONTH.JANUARY","CALENDAR.MONTH.FEBRUARY","CALENDAR.MONTH.MARCH"
	        ,"CALENDAR.MONTH.APRIL","CALENDAR.MONTH.MAY","CALENDAR.MONTH.JUNE"
	        ,"CALENDAR.MONTH.JULY","CALENDAR.MONTH.AUGUST","CALENDAR.MONTH.SEPTEMBER"
	        ,"CALENDAR.MONTH.OCTOBER","CALENDAR.MONTH.NOVEMBER","CALENDAR.MONTH.DECEMBER"
	        ,"CALENDAR.DAY.SUNDAY","CALENDAR.DAY.MONDAY","CALENDAR.DAY.TUESDAY"
	        ,"CALENDAR.DAY.WEDNESDAY","CALENDAR.DAY.THURSDAY","CALENDAR.DAY.FRIDAY"
	        ,"CALENDAR.DAY.SATURDAY"])
	UNIT.DAY_LENGTH=24*60*60*1000
	UNIT.toLocalStringFormat=function(_date)
	{
		Base.call(this,['CALENDAR_UTILS']);
		return (("00" + _date.getDate()).slice(-2)+" "+CALENDAR_UTILS.DAYS[_date.getDay()].name.substring(0,2));
	}
	UNIT.TO_INT_FORMAT=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		var d=date;
		if(date==undefined){d=new Date()}
		return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()
	}
	UNIT.FROM_INT_FORMAT=function(format){
		Base.call(this,['CALENDAR_UTILS']);
		var d=new Date();
		if(format==undefined){
			d=new Date();
		}
		else{
			d.setFullYear(parseInt(format/10000))
			d.setMonth(parseInt((format%10000)/100)-1)
			d.setYear(parseInt(format%1000000))
		}
			d.setHours(0)
			d.setMinutes(0)
			d.setSeconds(0)
			d.setMilliseconds(0)
		return d;
	}
	UNIT.DDMMYYYY_DATE=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		if(date instanceof Date)
		return (""
			    +("00" + date.getDate()).slice(-2) + "-" 
			    +("00" + (date.getMonth() + 1)).slice(-2) + "-" 
				+ date.getFullYear()
			    );
		if(typeof(date)=="string"){
			var darray=[date.substr(6,4),date.substr(3,2),date.substr(0,2)];
			return new Date(darray.join('/'));
		}
	}
	UNIT.SQL_DATE=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		if(date instanceof Date)
		return (date.getFullYear() + "-" 
			    +("00" + (date.getMonth() + 1)).slice(-2) + "-" 
			    +("00" + date.getDate()).slice(-2) 
			    );
		if(typeof(date)=="string"){
			return new Date(date.replace(/\-/gi,'/'));
		}
	}
	UNIT.IS_DATE=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		var msg=true;
		if(date instanceof Date){
			msg=true;
		}else{
			
			var d;
			try{
				d=new Date(date);
			}catch(err){
				msg=false
			}
			if(d.toString()=="Invalid Date")msg=false;
			if(date.length<10)msg=false;
		}
		return msg;
	}
	UNIT.SQL_DATETIME=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		if(date instanceof Date)
			return (date.getFullYear() + "-" 
				    +("00" + (date.getMonth() + 1)).slice(-2) + "-" 
				    +("00" + date.getDate()).slice(-2) 
				    + " " 
				    +("00" + date.getHours()).slice(-2) + ":" 
				    +("00" + date.getMinutes()).slice(-2) + ":" 
				    +("00" + date.getSeconds()).slice(-2) 
				    );
		if(typeof(date)=="string"){
			return new Date(date);
		}
	}
	UNIT.SQL_TIME=function(date){
		Base.call(this,['CALENDAR_UTILS']);
		if(date instanceof Date)
			return (("00" + date.getHours()).slice(-2) + ":" 
				    +("00" + date.getMinutes()).slice(-2) + ":" 
				    +("00" + date.getSeconds()).slice(-2) 
				    );
		if(typeof(date)=="string"){
			return new Date(date);
		}
	}
	UNIT.MONTHS={
		undefined:{name:"MONTHS error"}
		,0:{name:UNIT.STRINGS["CALENDAR.MONTH.JANUARY"],length:function(year){return 31;}}
		,1:{name:UNIT.STRINGS["CALENDAR.MONTH.FEBRUARY"],length:function(year){
			if(( ((year % 4) == 0) && ((year % 100) != 0) ) || ((year % 400) == 0) )
				{return 29;}//LEAP_YEAR = TRUE;
			else
				{return 28;}//LEAP_YEAR = FALSE
			}
		}
		,2:{name:UNIT.STRINGS["CALENDAR.MONTH.MARCH"],length:function(year){return 31;}}
		,3:{name:UNIT.STRINGS["CALENDAR.MONTH.APRIL"],length:function(year){return 30;}}
		,4:{name:UNIT.STRINGS["CALENDAR.MONTH.MAY"],length:function(year){return 31;}}
		,5:{name:UNIT.STRINGS["CALENDAR.MONTH.JUNE"],length:function(year){return 30;}}
		,6:{name:UNIT.STRINGS["CALENDAR.MONTH.JULY"],length:function(year){return 31;}}
		,7:{name:UNIT.STRINGS["CALENDAR.MONTH.AUGUST"],length:function(year){return 31;}}
		,8:{name:UNIT.STRINGS["CALENDAR.MONTH.SEPTEMBER"],length:function(year){return 30;}}
		,9:{name:UNIT.STRINGS["CALENDAR.MONTH.OCTOBER"],length:function(year){return 31;}}
		,10:{name:UNIT.STRINGS["CALENDAR.MONTH.NOVEMBER"],length:function(year){return 30;}}
		,11:{name:UNIT.STRINGS["CALENDAR.MONTH.DECEMBER"],length:function(year){return 31;}}
	}
	UNIT.DAYS={
		undefined:{name:"DAYS error"}
		,0:{name:UNIT.STRINGS["CALENDAR.DAY.SUNDAY"]}
		,1:{name:UNIT.STRINGS["CALENDAR.DAY.MONDAY"]}
		,2:{name:UNIT.STRINGS["CALENDAR.DAY.TUESDAY"]}
		,3:{name:UNIT.STRINGS["CALENDAR.DAY.WEDNESDAY"]}
		,4:{name:UNIT.STRINGS["CALENDAR.DAY.THURSDAY"]}
		,5:{name:UNIT.STRINGS["CALENDAR.DAY.FRIDAY"]}
		,6:{name:UNIT.STRINGS["CALENDAR.DAY.SATURDAY"]}
	}
	return UNIT;
})();
var Month=(function(){
	var CLASS=function Month(){
		Base.call(this,['CALENDAR_UTILS']);
		var _THIS=this;
		var firstShownDay,firstDayOfMonth,lastDayOfMonth,lastDayShown;
		
		QProperty.call(this,['Date']);
		this.Date.afterSet=function(_dateValue){
			var _date=new Date(_dateValue);
			_date.setHours(0);_date.setMinutes(0);_date.setSeconds(0);_date.setMilliseconds(0);
			DAY_LENGTH=CALENDAR_UTILS.DAY_LENGTH;
			firstDayOfMonth=new Date(_date);firstDayOfMonth.setDate(1);
			lastDayOfMonth=new Date(_date);
			lastDayOfMonth.setDate(CALENDAR_UTILS.MONTHS[firstDayOfMonth.getMonth()].length(_date.getFullYear()));
			firstShownDay=new Date(firstDayOfMonth);firstShownDay.setDate(1-((firstDayOfMonth.getDay()+6)%7));
			lastDayShown=new Date(lastDayOfMonth);lastDayShown.setDate(lastDayShown.getDate()+(7-lastDayOfMonth.getDay())%7);
		};
		this.getDayList=function(_unavailable){
			var days=[];
			var unavailable=_unavailable||{};
			for(
				var d=new Date(firstShownDay);
				d<=lastDayShown;
				d.setDate(d.getDate()+1)
			){
				var insideCurrentMonth=(d>=firstDayOfMonth) && (d<=lastDayOfMonth);
				var valid=!((d.getDate()+"") in unavailable) && insideCurrentMonth;
				days[days.length]=valid
					?new ValidDay(new Date(d),insideCurrentMonth)
					:new InvalidDay(new Date(d),insideCurrentMonth);
			}
			return days;
		};
	};
	return CLASS;
})();