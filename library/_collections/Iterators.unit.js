var Iterator = (function() {
	var CLASS = function Iterator(collection) {
		var _THIS = this;
		var _else=true;
		var INDEX=0,_COLLECTION=[]
		if(collection instanceof Array){
			_else=false;
			for(var i=0;i<collection.length;i++){
				_COLLECTION[_COLLECTION.length]={name:'Item '+i,item:collection[i]}
			}
		}
		if(_else && collection instanceof Object){
			_else=false;
			for(var _name in collection){
				_COLLECTION[_COLLECTION.length]={name:_name,item:collection[_name]}
			}
		}
		if(_else){
			
		}
		
		this.Current=function(){
			return _COLLECTION[INDEX];
		}
		this.goTo=function(i){
			INDEX=i;
			return _THIS;
		}
		this.back=function(){
			if(_THIS.hasPrevious()){
				INDEX-=1;
			}
			return _THIS;
		}
		this.Previous=function(){
			if(_THIS.hasPrevious()){
				return _COLLECTION[INDEX-1];
			}else{
				return null;
			}
		}
		this.hasPrevious=function(){
			return INDEX>0;
		}
		this.forward=function(){
			if(_THIS.hasNext()){
				INDEX+=1;
			}
			return _THIS;
		}
		this.Next=function(){
			if(_THIS.hasNext()){
				return _COLLECTION[INDEX+1];
			}else{
				return null;
			}
		}
		this.hasNext=function(){
			return INDEX<(_COLLECTION.length-1);
		}
		this.Iterate=function(_function/*function(_reference){}*/){
			for(var i=0;i<_COLLECTION.length;i++){
				_function({item:_COLLECTION[i].item,name:_COLLECTION[i].name,ref:_COLLECTION[i]})
			}
			return _THIS;
		}
		var i=0,loopStarted=false;
		this.CircularLoop=function(_function/*function(_item,_name,_reference){}*/,_timing/*milis*/){
			if(loopStarted){return _THIS;}
			loopStarted=true;
			_function({item:_COLLECTION[i].item,name:_COLLECTION[i].name,ref:_COLLECTION[i]});
			setTimeout((function(){
				if((i+1)<_COLLECTION.length){i++;}else{i=0};
				loopStarted=false;
				_THIS.CircularLoop(_function,_timing);
			}).bind(_THIS)
			,_timing||1000);
			return _THIS;
		}//function
	}//constructor
	return CLASS;
})();
var CircularIterator = (function() {
	var CLASS = function CircularIterator(collection) {
		var _THIS = this;
		var _else=true;
		var INDEX=0,_COLLECTION=[]
		if(collection instanceof Array){
			_else=false;
			for(var i=0;i<collection.length;i++){
				_COLLECTION[_COLLECTION.length]={name:'Item '+i,item:collection[i]}
			}
		}
		if(_else && collection instanceof Object){
			_else=false;
			for(var _name in collection){
				_COLLECTION[_COLLECTION.length]={name:_name,item:collection[_name]}
			}
		}
		if(_else){
			
		}
		
		this.Current=function(){
			return _COLLECTION[INDEX];
		}
		this.goTo=function(i){
			INDEX=i;
			return _THIS;
		}
		this.hasPrevious=function(){
			return true;
		}
		this.hasNext=function(){
			return true;
		}
		this.back=function(){
			if((INDEX-1)>0){
				INDEX-=1;
			}else{
				INDEX=_COLLECTION.length-1;
			}
			return _THIS;
		}
		this.Previous=function(){
			if((INDEX-1)>0){
				return _COLLECTION[INDEX-1];
			}else{
				return _COLLECTION[_COLLECTION.length-1];
			}
		}
		this.forward=function(){
			if((INDEX+1)<_COLLECTION.length){
				INDEX+=1;
			}else{
				INDEX=0;
			}
			return _THIS;
		}
		this.Next=function(){
			if((INDEX+1)<_COLLECTION.length){
				return _COLLECTION[INDEX+1];
			}else{
				return _COLLECTION[0];
			}
		}
	}
	return CLASS;
})();
var MatrixIterator = (function() {
	var CLASS = function MatrixIterator(collection) {
		var _THIS = this;
		Iterator.call(this,[collection]);
		this.Iterate=function(_function/*function(_item,rowReference,rowIndex,columnIndex){}*/){
			for(var r=0;r<_COLLECTION.length;r++){
				for(var c=0;c<_COLLECTION[r].item.length;c++){
					_function({item:_COLLECTION[r].item[c],row:_COLLECTION[r].item,rowIndex:r,colIndex:c})
				}
			}
		}
	}
	return CLASS;
})();
