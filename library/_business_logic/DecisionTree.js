var DecisionTree=(function(){
	var CLASS=function DecisionTree(){
		var _THIS=this;
		QProperty.call(this,['Length']);
		QProperty.call(this,['Exceptions']);
		QProperty.call(this,['Length']);
		this.ADD=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if((i+'') in _THIS.Exceptions())result+=_THIS.Exceptions()[i](params);
				else result+=_THIS.Rule()(params);
			}
			return result;
		}
		this.MUL=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if((i+'') in _THIS.Exceptions())result*=_THIS.Exceptions()[i](params);
				else result*=_THIS.Rule()(params);
			}
			return result;
		}
		this.XOR=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
			var tmp;
			if((i+'') in _THIS.Exceptions()){
					tmp=_THIS.Exceptions()[i](params);
				}else{
					tmp=_THIS.Rule()(params);
				}
				result=((result==0 && tmp==0) || (result==1 && tmp==1))?1:0;
			}
			return result;
		}
	}
	return CLASS;
})()
