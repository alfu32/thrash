ANIM={
	prop:function(element,parameters/*element:HTMLElement,properties,initial_values,final_values,function,duration*/){
		Base.call(this,['ANIM']);
		var p=parameters,transforms={};
		if(element===undefined)return;
		if(parameters===undefined){
			p={"height":{unit:function(s){return s+'px'},x0:0,x1:400,t0:0,t1:10000},"width":{unit:function(s){return s+'px'},x0:0,x1:400,t0:10000,t1:20000},type:'LINEAR'}
		}
		for(var i in p){
			if(i=='type')continue;
			transforms[i]=ANIM.FUNCTIONS[p.type](p[i].x0,p[i].x1,p[i].t1-p[i].t0);
		}
		var tstart=new Date().getTime();
		var tslice=10;
		var tslices=0;
		var trans=function trans(){
			tslices+=tslice;
			had_transformed=false;
			for(var i in transforms){
				if(i=='type')continue;
				if(tslices<p[i].t0)continue;
				var val=transforms[i](tstart)
				if(tslices>p[i].t1)continue;
				element.style[i]=p[i].unit(transforms[i](tstart));
				had_transformed=true;
			}
			if(had_transformed){
				setTimeout(trans,tslice);
			}else{
				console.log('finished');
			}
		}
		trans();
	}
}
Base.call(this,['ANIM']);
ANIM.FUNCTIONS={
	LINEAR:function(x0,x1,dt){
		Base.call(this,['ANIM']);
		var m=(x1-x0)/(dt);
		var f=function(tinit){
			return x0+(new Date().getTime()-tinit)*m;
		}
		f.name="transform_linear";
		return f;
	}
	,linear:function(x0,x1){
		Base.call(this,['ANIM']);
		var t0=null;
		var m=null,n=null;
		var y=function y(t){
			if(t0==null){
				t0=new Date().getTime();
				m=1/(x1-x0);
				n=x0;
			}
			return m*(t-t0)+n;
		}
		return t;
	}
}