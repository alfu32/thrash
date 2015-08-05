var Interval=(function(){
	var CLASS=function Interval(target,date){
		Base.call(this,['Interval']);
		Widget.call(this);
		var _THIS=this;
		CLASS.Z+=8;
		CLASS.N++;
		_THIS.start={t:target,d:date}
		_THIS.end={t:target,d:date}
		this.setStart=function(_target,_date){
			if(_date<_THIS.end.d){
				_THIS.start={t:_target,d:_date}
			}
			else {
				_THIS.start={t:_THIS.end.t,d:_THIS.end.d}
				_THIS.end={t:_target,d:_date}
			}
			_update();
			return this;
		}
		this.setEnd=function(_target,_date){
			if(_date>_THIS.start.d){
				_THIS.end={t:_target,d:_date}
			}
			else {
				_THIS.end={t:_THIS.start.t,d:_THIS.start.t}
				_THIS.start={t:_target,d:_date}
			}
			_update();
			return this;
		}
		var fam=[];
		function dist(r0,c0,r1,c1,C){
			return C*(r1-c1)+c1-c0;
		}
		function _update(){
			if(fam.length>0){
				for(var i=0;i<fam.length;i++){
					if(fam[i]!=null)fam[i].parentNode.removeChild(fam[i]);
				}
				fam.length=0;
			}
			var s=_THIS.start.t
			,e=_THIS.end.t;
			var tb=s.parentNode.parentNode;
			var sp=aP(s);
			var ep=aP(e);
			var started=false;
			for(var i=0;i<tb.children.length;i++){
				var row=tb.children[i];
				for(var j=0;j<row.children.length;j++){
					var cell=row.children[j];
					var cp=aP(cell);
					var el=null,_function=null;
					if(started && cell!=s && cell!=e){
						
						el=MAKE.div({},{	position:'absolute'
									,cursor:'pointer'
									,backgroundColor:"rgba(167, 209, 245,.527)"
									,borderTop:"1px dashed #335566"
									,borderBottom:"1px dashed #335566"
									,width:cell.offsetWidth-1+'px'
									,height:cell.offsetHeight-6+'px'
									,top:3+cp.y+'px',left:cp.x+1+'px'})
					}
					if(cell==s){
						started=true;
						el=MAKE.div({},{	position:'absolute'
									,cursor:'pointer'
									,backgroundColor:"rgba(167, 209, 245,.527)"
									,borderRadius:'12px 0px 0px 12px'
									,border:"1px dashed #335566"
									,borderRight:"0px dashed #335566"
									,width:cell.offsetWidth-4+'px'
									,height:cell.offsetHeight-6+'px'
									,top:3+sp.y+'px',left:sp.x+3+'px'})
					}
					if(cell==e){
						started=false;
						el=MAKE.div({},{	position:'absolute'
									,cursor:'pointer'
									,backgroundColor:"rgba(167, 209, 245,.527)"
									,borderRadius:'0px 12px 12px 0px'
									,border:"1px dashed #335566"
									,borderLeft:"0px dashed #335566"
									,width:cell.offsetWidth-4+'px'
									,height:cell.offsetHeight-6+'px'
									,top:3+ep.y+'px',left:ep.x+1+'px'})
						if(s==e)el.style.borderRadius='12px 12px 12px 12px';
					}
					if(el!=null){
						el.style.boxShadow='0px 0px 3px rgba(0,0,0,0.5)';
						_function=(function(_cell,INTERVAL){return function(event){
							var target=NORM.target(event);
							if((event.pageX-target.offsetLeft)<(target.offsetWidth/2))
							_THIS.setStart(_cell,_cell.children[0].id);
							else _THIS.setEnd(_cell,_cell.children[0].id);
						}})(cell,_THIS);
						el.onclick=_function;
						fam[fam.length]=(function(ee){return ee})(el);
						document.body.appendChild(fam[fam.length-1]);
						el=null,_function=null;
					}
				}
			}
		}
		//init
			//console.log(this);
			var sp=aP(target);
			var ep=aP(target);
			//_update();
			var v=MAKE.div(
					{	className:'popupChoice'
						,onclick:function(event){
						}}
					,{	position:'absolute'
						,cursor:'pointer'
							,backgroundColor:"rgba(167, 209, 245,.527)"
							,borderRadius:'0px 12px 12px 0px'
							,border:"1px dashed #335566"
							,borderLeft:"0px dashed #335566"
						,width:_THIS.start.t.offsetWidth-1+'px'
						//,height:target.offsetHeight-1+'px'
						,top:sp.y+'px',left:sp.x+1+'px'}
					,[
						//MAKE.div({innerHTML:"op/"+date},{})
					])
			v.appendChild(MAKE.div(
					{innerHTML:date.substr(6,2)+'/'+date.substr(4,2)}
					,{fontSize:'12px',color:"#335566",background:'#EEEEEE',margin:'0px',padding:'3px'}));
			
			//this.Parent(target);
			
			var task=['CP','A7(+)','X','B','RP','reset'];
			var choice=0;
			for(var i=0;i<task.length;i++){
				var inp;
				v.appendChild(MAKE.hr({},{margin:'0px'}));
				v.appendChild(inp=MAKE.input(
						{type:'radio'
							,name:'dayopt_'+date
							,onclick:(function(index){return function(event){
								choice=index;
								_THIS.Parent().removeChild(v)}})(i)
							,value:task[i]}
						,{}
						,[]))
						if(i==0)inp.checked=true;
				v.appendChild(MAKE.div({innerHTML:task[i]},{display:'inline-block',fontSize:'10px'},[]));
			}
			v.appendChild(MAKE.hr({},{margin:'0px'}));
			this.View(v);
			//this.Parent(document.body);
		
		
	}
	CLASS.Z=0;
	CLASS.N=0;
	return CLASS;
})();