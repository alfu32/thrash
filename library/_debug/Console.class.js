
var Console=(function(){
	var CLASS=function Console(){
		Widget.call(this)
		var _log=MAKE.div({id:"LOG"},{height:"80px",overflowY:"scroll",fontSize:'8px'},[]);
		//document.body.appendChild(_log);
		this.View(_log);
		var _counter=0;
		function pad(d){
			return d>100?"0"+d:d>10?"00"+d:"000"+d;
		}
		this.Log=function(a){
			var _entry=MAKE.div({innerHTML:a});
			_log.appendChild(_entry);
			var topPos = _entry.offsetTop;
			_log.scrollTop = topPos;
		}
		this.track=function(a){
			this.Log(pad(_counter)+':'+a);
			_counter++;
		}
	}
	return CLASS;
})();