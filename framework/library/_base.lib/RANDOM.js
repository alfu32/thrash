

RANDOM = {
	string : function (length,charset){
		Base.call(this,['RANDOM']);
		var _charset=charset||"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		_charset=_charset.split('');
		var _charset_length=_charset.length
		var str="";
		for(var i=0;i<length;i++){
			str+=_charset[parseInt(Math.random()*_charset_length)];
		}
		return str;
	}
	,WORD:function(length){
		Base.call(this,['RANDOM']);
		var vowels=['a','e','i','o','u'];
		var consonants=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','x','z'];
		var type=(Math.random()>=0.5);
		var str="";
		for(var i=0;i<length;i++){
			if(type){
				str+=consonants[parseInt(Math.random()*consonants.length)];
			}else{
				str+=vowels[parseInt(Math.random()*vowels.length)];
			}
			type=!type;
		}
		return str;
	}
	,GUID:function(groups,group_length,separator,charset){
		Base.call(this,['RANDOM']);
		var _charset=charset||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var _groups=groups||5;
		var _group_length=group_length||5;
		var _separator=separator||'-'
		var str=[];
		for(var i=0;i<_groups;i++){
			str[str.length]=this.string(_group_length,_charset);
		}
		return str.join(_separator);
	}
	,NUMBER_STRING:function(length,charset){
		Base.call(this,['RANDOM']);
		var _charset=charset||"0123456789";
		_charset=_charset.split('');
		var _charset_length=_charset.length
		var str=_charset[parseInt(Math.random()*(_charset_length-1))+1];
		for(var i=0;i<(length-1);i++){
			str+=_charset[parseInt(Math.random()*_charset_length)];
		}
		return str;
	}
	,DEC_STRING:function(length){
		Base.call(this,['RANDOM']);
		return this.NUMBER_STRING(length||10,"0123456789");
	}
	,HEX_STRING:function(length){
		Base.call(this,['RANDOM']);
		return this.NUMBER_STRING(length||6,"0123456789ABCDEF");
	}
	,OCT_STRING:function(length){
		Base.call(this,['RANDOM']);
		return this.NUMBER_STRING(length||6,"01234567");
	}
	,BIN_STRING:function(length){
		Base.call(this,['RANDOM']);
		var _charset=['0','1'];
		var str="";
		for(var i=0;i<length;i++){
			str+=_charset[parseInt(Math.random()*2)];
		}
		return str;
	}
}