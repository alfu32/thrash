var Scenario=(function(){
	var CLASS=function Scenario(length){
		var _THIS=this;
		var _decide=function(index){
			if(index in _THIS.Case()){
				return _THIS.Case()[index];
			}else{
				if(index>length)
				{return _THIS.Default();}
				else {return _THIS.NotCase();}
			}
		};
		QProperty.call(this,['CodeToIndex']);
		_THIS.CodeToIndex(function(params){return false;});
		QProperty.call(this,['Case']);
		_THIS.Case({})
		QProperty.call(this,['NotCase']);
		_THIS.NotCase(function(params){});
		QProperty.call(this,['Default']);
		_THIS.Default(function(params){return false;});
		
		this.addCase=function(indices,exception){
			var e=_THIS.Case();
			for(var i=0;i<indices.length;i++){
				e[indices[i]]=exception;
			}
			//console.log(e);
			_THIS.Case(e);
			return _THIS;
		}
		this.getDecision=function(codeObject){
		var index=_THIS.CodeToIndex()(codeObject);
		//console.log(index);
		codeObject.CODE=index;
			return _decide(index)()+'<br>('+serializeDict(codeObject,'=',';')+')';//+'i_'+index+'('+codeObject.opte+','+codeObject.stat+')';
		}
		this.execAll=function(params){
			for(var i=0;i<length;i++){
				_decide(i)(params);
			}
			return _THIS;
		}
	};
	return CLASS;
})();