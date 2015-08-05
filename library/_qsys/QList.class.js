var QList=(function(){
	var CLASS=function QList(name){
		var _THIS=this;
		var _LIST=[];
		this[name]=function(_value){
			if(arguments.length>0){
				_QLIST.beforeSet({ref:_value,index:_LIST.length,array:_LIST});
				_LIST[_LIST.length]=_value;
				_QLIST.afterSet(_value,_LIST.length-1,_LIST);
				return _THIS;
			}else{
				_QLIST.beforeGet(_value,_LIST.length-1,_LIST);
				return _LIST;
			}
		};
		this[name].type="QList";
		_QLIST=this[name];
		this[name].Iterator=(function(){
			var _ITERATOR=function(){
				var index=0;
				this.next=function(){return _LIST[index++];}
				this.previous=function(){return _LIST[index--];}
				this.hasNext=function(){return _LIST[index+1]!=undefined;}
				this.hasPrevious=function(){return _LIST[index-1]!=undefined;}
			};
			_ITERATOR.name=name+'_Iterator';
			return _ITERATOR;
		})();
		this[name].foreach=function(func){
			for(var i=0;i<_LIST.length;i++){func(_LIST,i,_LIST[i])}
		};
		_QLIST.beforeSet=function(reference){}
		_QLIST.afterSet=function(value,length,list){}
		_QLIST.beforeGet=function(value,length,list){}
	};
	return CLASS;
})();