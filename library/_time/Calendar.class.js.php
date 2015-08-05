
var ValidDay=(function(){
	return function ValidDay(day,insideCurrentMonth){
		this.string=day;
		this.day=function(){return day;};
		this.isInsideCurrentMonth=function(){return insideCurrentMonth;};
		this.isValid=function(){return true;};
		this.toString=function(){return day.toString();};
	};
})();
var InvalidDay=(function(){
	return function InvalidDay(day,insideCurrentMonth){
		this.string=day.toString();
		this.day=function(){return day;};
		this.isInsideCurrentMonth=function(){return insideCurrentMonth;};
		this.isValid=function(){return false;};
		this.toString=function(){return day.toString();};
	};
})();

var CALENDAR_UTILS={
	DAY_LENGTH:24*60*60*1000
	,toLocalStringFormat:function(_date)
	{
		return (("00" + _date.getDate()).slice(-2)+" "+CALENDAR_UTILS.DAYS[_date.getDay()].name.substring(0,2));
	}
	,SQL_DATE:function(date){
		if(date instanceof Date)
		return (date.getFullYear() + "-" 
			    +("00" + (date.getMonth() + 1)).slice(-2) + "-" 
			    +("00" + date.getDate()).slice(-2) 
			    );
		if(typeof(date)=="string"){
			return new Date(date.replace(/\-/gi,'/'));
		}
	}
	,SQL_DATETIME:function(date){
		if(date instanceof Date)
			return (date.getFullYear() + "-" 
				    +("00" + (date.getMonth() + 1)).slice(-2) + "-" 
				    +("00" + date.getDate()).slice(-2) 
				    + " " 
				    +("00" + dt.getHours()).slice(-2) + ":" 
				    +("00" + dt.getMinutes()).slice(-2) + ":" 
				    +("00" + dt.getSeconds()).slice(-2) 
				    );
		if(typeof(date)=="string"){
			return new Date(date);
		}
	}
	,MONTHS:{
		undefined:{name:"MONTHS error"}
		,0:{name:"<?php WriteLib("CALENDAR.MONTH.JANUARY")?>",length:function(year){return 31;}}
		,1:{name:"<?php WriteLib("CALENDAR.MONTH.FEBRUARY")?>",length:function(year){
			if(( ((year % 4) == 0) && ((year % 100) != 0) ) || ((year % 400) == 0) )
				{return 29;}//LEAP_YEAR = TRUE;
			else
				{return 28;}//LEAP_YEAR = FALSE
			}
		}
		,2:{name:"<?php WriteLib("CALENDAR.MONTH.MARCH")?>",length:function(year){return 31;}}
		,3:{name:"<?php WriteLib("CALENDAR.MONTH.APRIL")?>",length:function(year){return 30;}}
		,4:{name:"<?php WriteLib("CALENDAR.MONTH.MAY")?>",length:function(year){return 31;}}
		,5:{name:"<?php WriteLib("CALENDAR.MONTH.JUNE")?>",length:function(year){return 30;}}
		,6:{name:"<?php WriteLib("CALENDAR.MONTH.JULY")?>",length:function(year){return 31;}}
		,7:{name:"<?php WriteLib("CALENDAR.MONTH.AUGUST")?>",length:function(year){return 31;}}
		,8:{name:"<?php WriteLib("CALENDAR.MONTH.SEPTEMBER")?>",length:function(year){return 30;}}
		,9:{name:"<?php WriteLib("CALENDAR.MONTH.OCTOBER")?>",length:function(year){return 31;}}
		,10:{name:"<?php WriteLib("CALENDAR.MONTH.NOVEMBER")?>",length:function(year){return 30;}}
		,11:{name:"<?php WriteLib("CALENDAR.MONTH.DECEMBER")?>",length:function(year){return 31;}}
	}
	,DAYS:{
		undefined:{name:"DAYS error"}
		,0:{name:"<?php WriteLib("CALENDAR.DAY.SUNDAY")?>"}
		,1:{name:"<?php WriteLib("CALENDAR.DAY.MONDAY")?>"}
		,2:{name:"<?php WriteLib("CALENDAR.DAY.TUESDAY")?>"}
		,3:{name:"<?php WriteLib("CALENDAR.DAY.WEDNESDAY")?>"}
		,4:{name:"<?php WriteLib("CALENDAR.DAY.THURSDAY")?>"}
		,5:{name:"<?php WriteLib("CALENDAR.DAY.FRIDAY")?>"}
		,6:{name:"<?php WriteLib("CALENDAR.DAY.SATURDAY")?>"}
	}
};
var Month=(function(){
	var CLASS=function Month(){
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