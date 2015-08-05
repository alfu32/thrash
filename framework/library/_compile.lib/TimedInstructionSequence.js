var TimedInstructionSequence=(function(){
	var PROTOTYPE=function TimedInstructionSequence(_sequenceObject){
		Base.call(this,['TimedInstructionSequence']);
		var _THIS=this;
		var timeouts={};
		this.execute=function(){
			for(var i in _sequenceObject){
				timeouts[i]=setTimeout(
					(function(context,index){return function(){_sequenceObject[index](_THIS);};})(_THIS,i)
				,i);
			}
		}
		this.cancel=function(){
			for(var i=0;i<timeouts.length;i++){
				clearTimeout(timings[i]);
			}
		}
	}
	return PROTOTYPE;
})();
var DO_LATER=(function(){
	var PROTOTYPE=function DO_LATER(_sequenceObject){
		Base.call(this,['DO_LATER']);
		var _THIS=this;
		var timeouts={};
		this.execute=function(){
			for(var i in _sequenceObject){
				timeouts[i]=setTimeout(
					(function(context,index){return function(){_sequenceObject[index](_THIS);};})(_THIS,i)
				,i);
			}
		}
		this.cancel=function(){
			for(var i=0;i<timeouts.length;i++){
				clearTimeout(timings[i]);
			}
		}
	}
	return PROTOTYPE;
})();