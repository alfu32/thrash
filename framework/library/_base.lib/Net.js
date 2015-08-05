var Net=(function(){
    Base.call(this,['Net']);
    var PROTO=function Net(block){
    	var _THIS=this;
        
    	QProperty.call(_THIS,['Block']);
    	_THIS.Block(block||function(){});
        
    	QProperty.call(_THIS,['OnSuccess']);
    	_THIS.OnSuccess(function(){});
        
    	QProperty.call(_THIS,['OnError']);
    	_THIS.OnError(function(){});
    	
    	QProperty.call(_THIS,['Then']);
    	_THIS.Then([]);
    	QProperty.call(_THIS,['Else']);
    	_THIS.Else([]);
    	
    	QProperty.call(_THIS,['Timeslice']);
    	_THIS.Timeslice(100);
    	
    	var timeout;
    	
    	_THIS.Call=function(){
    		timeout=setTimeout(function(){
	    		try{
	    			block();
	    			_THIS.OnSuccess()();
	    			for(var i=0;i<_THIS.Then().length;i++){
	    				_THIS.Then()[i].Call()
	    			}
	    		}catch(error){
	    			_THIS.OnError()();
	    			for(var i=0;i<_THIS.Else().length;i++){
	    				_THIS.Else()[i].Call()
	    			}
	    		}
    		},_THIS.Timeslice());
    		return _THIS;
    	}
    }
    PROTO.test=function(){
    	
    	var _console={log:function(a){
	    		var t=performance.now();
	    		this.logs.push(t+' - '+a)
	    	},
    		logs:[]
    	}
    	
    	A=new Net(function(){}).OnSuccess(function(){}).OnError(function(){});
    	
    	a=new Net(function(){_console.log('a')}).OnSuccess(function(){console.log('a succeeded')}).OnError(function(){console.log('a failed')});
    	b=new Net(function(){_console.log('b')}).OnSuccess(function(){console.log('b succeeded')}).OnError(function(){console.log('b failed')});
    	c=new Net(function(){_console.log('c')}).OnSuccess(function(){console.log('c succeeded')}).OnError(function(){console.log('c failed');});
    	d=new Net(function(){_console.log('d')}).OnSuccess(function(){console.log('d succeeded')}).OnError(function(){console.log('d failed')});
    	e=new Net(function(){_console.log('e')}).OnSuccess(function(){console.log('e succeeded')}).OnError(function(){console.log('e failed')});
    	f=new Net(function(){console.log('tick')}).OnSuccess(function(){console.log('f succeeded')}).OnError(function(){console.log('f failed')});
    	g=new Net(function(){_console.log('g')}).OnSuccess(function(){console.log('g succeeded')}).OnError(function(){console.log('g failed')});
    	h=new Net(function(){_console.log('h')}).OnSuccess(function(){console.log('h succeeded')}).OnError(function(){console.log('h failed')});
    	i=new Net(function(){console.log('tock')}).OnSuccess(function(){console.log('i succeeded')}).OnError(function(){console.log('i failed')});
    	
    	Z=new Net(function(){_console.log('Z')}).OnSuccess(function(){console.log(_console.logs.length)}).OnError(function(){console.log('Z failed')});
    	
    	a.Then([c,d,Z]);
    	b.Then([c,d,e]);
    	c.Then([e,f,A]);
    	d.Then([g,f,A]);
    	e.Then([f,Z,A]);
    	f.Then([i]);
    	g.Then([Z,A,A]);
    	h.Then([i,A,A]);
    	i.Then([f]);
    }
    PROTO.test_circular=function(){
    	
    	var _console={log:function(a){
	    		var t=performance.now();
	    		this.logs.push(t+' - '+a)
	    	},
    		logs:[]
    	}
    	
    	a=new Net(function(){console.log('a')})
    	b=new Net(function(){console.log('b')})
    	c=new Net(function(){console.log('c')})
    	d=new Net(function(){console.log('d')})
    	
    	a.Then([b]);
    	b.Then([c,d]);
    	c.Then([a]);
    }
    PROTO.test2=function(){
    	
    	gen_error=function(msg){
    		if(Math.random()>0.3){
    			throw new Error(msg)
    		}
    	}
    	
    	var _console={log:function(a){
	    		this.logs.push(a)
	    	},
    		logs:[]
    	}
    	
    	a=new Net(function check(){_console.log('checking ...'); gen_error('Check NOK')})
    	aok=function send_ok(){_console.log('... checking OK')}
    	anok=function send_nok(){_console.log('ERROR checking')}
    	b=new Net(function prepare(){_console.log('prepare ...');gen_error('Prepare NOK') })
    	bok=function send_ok(){_console.log('... prepare OK')}
    	bnok=function send_nok(){_console.log('ERROR preparing')}
    	c=new Net(function send(){_console.log('send ...');gen_error('send NOK') })
    	cok=function send_ok(){_console.log('... send OK')}
    	cnok=function send_nok(){_console.log('ERROR sending')}
    	d=new Net(function refresh(){_console.log('refresh');gen_error('Refresh NOK') })
    	dok=function refresh_ok(){_console.log('refresh OK');console.log(_console.logs)}
    	dnok=function refresh_nok(){_console.log('ERROR refreshing')}
    	
    	a.Then([b]).OnSuccess(aok).OnError(anok).Else([a]);
    	b.Then([c]).OnSuccess(bok).OnError(bnok).Else([b]);
    	c.Then([d]).OnSuccess(cok).OnError(cnok).Else([c]);
    	d.Then([]).OnSuccess(dok).OnError(dnok).Else([d]);
    	
    	a.Call();
    	/***
    	 * output :
    	 * 
    	 * 
    	 * 
    	 * 
    	 * 
    	 */
    }
    return PROTO;
})();


var Chain=(function(){
    Base.call(this,['Chain']);
    var PROTO=function Chain(){
    	var _THIS=this;
        var is_paused=false;
        
    	QProperty.call(_THIS,['Timeslice']);
    	_THIS.Timeslice(200);
    	
    	QProperty.call(_THIS,['OnProgress']);
    	_THIS.OnProgress(function(ref,index){});
    	
    	QProperty.call(_THIS,['OnFinished']);
    	_THIS.OnFinished(function(ref,index){});
    	
    	QProperty.call(_THIS,['OnError']);
    	_THIS.OnError(function(ref,index){});
    	
    	QProperty.call(_THIS,['List']);
    	_THIS.List([]);
    	var timeout,current_index=0;
    	_THIS.Call=function(index){
    		clearTimeout(timeout);
    		current_index=index;
    		if(is_paused){
    			timeout=setTimeout(function(){_THIS.Call(index)},_THIS.Timeslice());
    			return _THIS;
    		}
    		if(index===undefined){
    			_THIS.Call(0);
    			return _THIS;
    		}
    		
    		if((index)<_THIS.List().length){
    			try{
    				_THIS.List()[index]();
    				_THIS.OnProgress()(_THIS,index);
    			}catch(error){
    				_THIS.OnError()(_THIS,index);
    			}
    			timeout=setTimeout(function(){_THIS.Call(index+1)},_THIS.Timeslice());
    		}else{
    			_THIS.OnFinished()(_THIS,index);
    		}
    		return _THIS;
    	}
    	_THIS.terminate=function(){
    		clearTimeout(timeout);
    	}
    	_THIS.wait=function(time){
    		clearTimeout(timeout);
    		timeout=setTimeout(function(){_THIS.Call(current_index+1)},time);
    	}
    	_THIS.pause=function(){
    		is_paused=true;
    	}
    	_THIS.resume=function(){
    		is_paused=false;
    	}
    	_THIS.goto=function(index){
    		clearTimeout(timeout);
    		_THIS.Call(index);
    	}
    }
    PROTO.test=function(){
    	console.log(':::::::::::::: Chain prototype test 1 :::::::::::::: ');
    	a=function check(){console.log('checking')}
    	b=function transform(){console.log('transform')}
    	c=function send(){console.log('send')}
    	d=function refresh(){console.log('refresh')}
    	
    	console.log(':::::::::::::: start ');
    	return new Chain()
    		.OnProgress(function(ref,index){console.log('progress - '+index+'/'+ref.List()[index].name)})
    		.OnError(function(ref,index){console.log('!!! ERROR '+index+' @ '+ref.List()[index].name)})
    		.List([a,b,c,d])
    		.Timeslice(1200)
    		.Call();
    }
    PROTO.test_circular=function(){
    	console.log(':::::::::::::: Chain prototype test 2 :::::::::::::: ');
    	a=function check(){console.log('checking')}
    	b=function transform(){console.log('transform')}
    	c=function send(){console.log('send')}
    	d=function refresh(){console.log('refresh')}
    	
    	console.log(':::::::::::::: start ');
    	return new Chain()
    		.OnProgress(function(ref,index){console.log('progress - '+index+'/'+ref.List()[index].name)})
    		.OnError(function(ref,index){console.log('!!! ERROR '+index+' @ '+ref.List()[index].name)})
    		.List([a,b,c,d])
    		.Timeslice(1200)
    		.Call()
    		.OnFinished(function(ref,index){
    			console.log(':::::::::::::: finished ');
    			console.log('');
    			console.log(':::::::::::::: restart ');
    			ref.Call();
    		});
    }
    return PROTO;
})();