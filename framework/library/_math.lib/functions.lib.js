var LinearDomain=(function(){
	var CLASS=function LinearDomain(){
		Base.call(this,['LinearDomain']);
		var _THIS=this;
		QProperty.call(this,['Name'])
		this.Name("undefined Transformation")
		QProperty.call(this,['Begin'])
		this.Begin.afterSet=function(_function){
			
		}
		QProperty.call(this,['End'])
		this.End.afterSet=function(_function){
			
		}
		this.isLinear=function(){return true}
		this.isDomain=function(){return true}
	}
	return CLASS;
})()
var Transform=(function(){
	var CLASS=function Transform(){
		Base.call(this,['Transform']);
		var _THIS=this;
		QProperty.call(this,['Direct'])
		this.Direct.afterSet=function(_function){
			
		}
		QProperty.call(this,['Inverse'])
		this.Inverse.afterSet=function(_function){
			
		}
		QProperty.call(this,['Domain'])
		this.Domain.afterSet=function(_domain){
			try{
				if(!_domain.isLinear()){throw(_THIS.Name()+': non linear domain')}
				try{
					if(_THIS.Inverse(_THIS.Direct(_domain.Begin()))!=_THIS.Direct(_THIS.Inverse(_domain.Begin()))
						||
						_THIS.Inverse(_THIS.Direct(_domain.End()))!=_THIS.Direct(_THIS.Inverse(_domain.End())))
						throw(_THIS.Name()+": Transformation is no inversable on the given domain")
				}catch(er){
					throw(_THIS.Name()+": Transformation is not well defined")
				}
			}catch(e){
				throw(_THIS.Name()+': non linear domain')
			}
		}
	}
	return CLASS;
})()