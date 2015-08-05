var DecisionTree2=(function(){
	var CLASS=function DecisionTree2(){
		var _THIS=this;
		QProperty.call(this,['Length']);
		QProperty.call(this,['Exceptions']);
		_THIS.Exceptions({})
		QProperty.call(this,['Rule']);
		this.addExceptions=function(indices,rule){
			var e=_THIS.Exceptions();
			for(var i=1;i<indices.length;i++){
				e[indices[i]]=rule;
			}
			var e=_THIS.Exceptions(e);
		}
		QProperty.call(this,['Length']);
		this.ADD=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if((i+'') in _THIS.Exceptions())result+=_THIS.Exceptions()[i].ADD(params);
				else result+=_THIS.Rule().ADD(params);
			}
			return result;
		}
		this.MUL=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if((i+'') in _THIS.Exceptions())result*=_THIS.Exceptions()[i].MUL(params);
				else result*=_THIS.Rule().MUL(params);
			}
			return result;
		}
		this.XOR=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
			var tmp;
			if((i+'') in _THIS.Exceptions()){
					tmp=_THIS.Exceptions()[i].MUL(params);
				}else{
					tmp=_THIS.Rule().MUL(params);
				}
				result=((result==0 && tmp==0) || (result==1 && tmp==1))?1:0;
			}
			return result;
		}
	}
	return CLASS;
})()
