var DecisionMatrix=(function(){
	var CLASS=function DecisionMatrix(length){
		var _THIS=this;
		var _MATRIX=[];
		QProperty.call(this,['Exceptions']);
		_THIS.Exceptions({})
		QProperty.call(this,['Rule']);
		_THIS.Rule(function(params){});
		
		for(var i=0;i<length;i++){
			_MATRIX [_MATRIX.length]=function(params){
				if(i in _THIS.Exceptions()){
					_THIS.Exceptions()[i](params);
				}else{
					_THIS.Rule()[i](params);
				}
			}
		}
		this.addExceptions=function(indices,rule){
			var e=_THIS.Exceptions();
			for(var i=1;i<indices.length;i++){
				e[indices[i]]=rule;
			}
			_THIS.Exceptions(e);
			return _THIS;
		}
		this.decide=function(params){
			for(var i=1;i<_MATRIX.length;i++){
				_MATRIX [i](params);
			}
			return _THIS;
		}
	}
	return CLASS;
})()
