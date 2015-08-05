var AbstractDecisionTree=(function(){
	var CLASS=function AbstractDecisionTree(){
		Base.call(this,['AbstractDecisionTree']);
		var _THIS=this;
		
		DecisionTree.call(this);
		QProperty.call(this,['Addition']);
		_THIS.Addition(function(a,b){return a+b});
		QProperty.call(this,['Multiplication']);
		_THIS.Multiplication(function(a,b){return a*b})
		
		this.opAdditive=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if(i in _THIS.Exceptions())result=_THIS.Addition()(result,_THIS.Exceptions()[i](params));
				else result=_THIS.Addition()(result,_THIS.Rule()(params));
			}
			return result;
		}
		this.opMultiplicative=function(params){
			var result=0;
			for(var i=0;i<_THIS.Length();i++0{
				if(i in _THIS.Exceptions())result=_THIS.Multiplication()(result,_THIS.Exceptions()[i](params));
				else result=_THIS.Multiplication()(result,_THIS.Rule()(params));
			}
			return result;
		}
	}
	return CLASS;
})()
