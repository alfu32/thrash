var THREAD_MAN=(function(){
        var PROTO=function THREAD_MAN(){
        	Base.call(this,['THREAD_MAN']);

            var _THIS=this;
            _THIS.proceses=[];
            _THIS.processExecTime=2500;
            var procTime=function(){
                return _THIS.proceses.length*_THIS.processExecTime;
            }
            var dt;
            var avg=0;
            var n=0
            _THIS.getDelta=function(){return dt;}
            _THIS.getAverageDelta=function(){return avg;}
            _THIS.parseQueue=function parseQueue(){
                var t0=performance.now();
                for(var i= 0;i<_THIS.proceses.length;i++){
                    try{
                        _THIS.proceses[i]();
                    }catch(err){
                    	
                    }
                }
                dt=performance.now()-t0;
                n++;
                avg=((n-1)*avg+dt)/n;
                setTimeout(function(){_THIS.parseQueue()},procTime()+dt);
            }
            _THIS.parseQueue();
        }
        return PROTO;
    })();

var PROCESS=(function(){
        Base.call(this,['PROCESS']);
		var __running=0;
		var __ids=0;
        var PROTO=function PROCESS(f){
            var _THIS=this;
            var run=false;
            var cancel=false;
            _THIS.id=__ids++;
            _THIS.isRunning=function(){
            	return run;
            }
            _THIS.cancel=function(){
            	cancel=true;
            }
            
            QProperty.call(this,['Process']);
            _THIS.Process(function(state_object){});
            
            QProperty.call(this,['State']);
            _THIS.State({finished:false});
            
            QProperty.call(this,['OnFinish']);
            _THIS.OnFinish(function(_proc){console.log("FINISHED :: ",_proc)});
            
            var process=function(sta){
            	
            	if(run && cancel){
	            		_THIS.OnFinish()(_THIS);
	            		run=false;
	            		__running--;
	            		return _THIS;
            	}else if(run && !cancel){
            	}else if(!run && cancel){
	            		_THIS.OnFinish()(_THIS);
	            		run=false;
	            		__running--;
	            		return _THIS;
            	}else if(!run && !cancel){
            		return _THIS;
            	}
            	
            	try{
	            	_THIS.Process()(sta);
	            }catch(_state){
	            	if(_state instanceof Error){
	            		throw _state;
	            		return;
	            	}
	            	if(_state.finished===true){
	            		_THIS.OnFinish()(_THIS);
	            		run=false;
	            		__running--;
	            		return;
	            	}
	            	_THIS.State(_state);
	            	setTimeout(function(){process(_THIS.State());},_THIS.State().timing||PROTO.TIMING);
	            }
            }
            _THIS.run=function(){
            	if(run)return _THIS;
            	/*if(__running>PROTO.MAX_CONCURRENT)return _THIS;*/
            	__running++;
            	run=true;
            	process(_THIS.State());
            	return _THIS;
            }
            _THIS.stay=function(){
            	if(!run)return _THIS;
            	__running--;
            	run=false;
            	return _THIS;
            }
        }
        PROTO.running=function(){return __running;}
        PROTO.MAX_CONCURRENT=5;
        PROTO.TIMING=1000;
        PROTO.YIELD=function(object){
        	throw(object);
        }
        return PROTO;
    })();
function proc_test1(){
	var asd=new PROCESS()
		.Process(function proc_test(_state){
			_state.index=parseInt(_state.index)+1;
			console.log("index : ",_state.index);
			if(_state.index==10000){
				_state.finished=true;
			}
			PROCESS.YIELD( _state );
		})
		.State({finished:false,index:0,timing:50}).run();
	return asd;
}

function proc_test(_iter){
	var iterations=_iter||50;
	var l=document.getElementById('load_container');
	if(l==null){
		l=MAKE.div({id:'load_container'},{position:'absolute',top:'0px',background:"#EEE"});
		document.body.appendChild(l);
	}
	
	var proc=new PROCESS();
	
	var progressbar,bCancel,bPause,layout;
	layout=new VLayout().Align("left").Children([
	    new Widget().View(MAKE.div({innerHTML:'PROCESS ::'+proc.id}))
		,new HLayout().Align("left").Children([
		    progressbar=new Progress1()
			.OnClick(function(ref){
			})
			,bPause=new ImageButton2().Align("center").Text('pause')
				.Click(function(){
					if(proc.isRunning()){
						bPause.Text('play');
						proc.stay();
					}else{
						bPause.Text('pause');
						proc.run();
					}
				})
			,bCancel=new ImageButton2().Align("center").Text('cancel')
				.Click(function(){
					proc.cancel();
				})
		])
	])
	.Parent(l);
	
		proc.Process(function proc_test(_state){
			_state.index=parseInt(_state.index)+1;
			var t=_state.index/iterations;
			progressbar.Progress((t));
			/*console.log("finished : "+proc+"%");*/
			if(_state.index==iterations*100){
				_state.finished=true;
			}
			PROCESS.YIELD( _state );
		})
		.OnFinish(function(_proc){
				layout.Parent().removeChild(layout.View());
		})
		.State({finished:false,index:0,timing:5}).run();
	return proc;
}


