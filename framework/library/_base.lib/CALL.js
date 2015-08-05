Base.call(this,['CALL']);
Function.prototype.CALL=function(){
	Base.call(this,['CALL']);
	var _THIS=this;
	try{
		_THIS.call(_THIS,arguments);
	}catch(err){
		setTimeout(function(){_THIS.CALL(_THIS,arguments);},_THIS.exec_timeout());
	}
}

QProperty.call(Function.prototype,['exec_timeout']);
Function.prototype.exec_timeout(1000);

var test_CALL=function test_CALL(){
	Base.call(this,['CALL']);
	this.asd=null;
	this.func=(function (m){
		if(this.asd==undefined){
			console.log(m||'this.asd is undefined');
			throw('asd is undefined');
		}else{
			console.log('this.asd is '+this.asd)
		}
	}).bind(this);
}
