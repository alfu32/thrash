
var Expression=(function(){
	var CLASS=function Expression(operators,delimiters,transform){
		Base.call(this,['Expression']);
		var _THIS=this;
		this.func=function(){return true;}
		this.eval=function(text){
			if(text==""){
				_THIS.func=function(){return true;}
				return this;
			}
			
			var i=0,expr="",_wd="",_wds=[];
			var pa=text.split("");
			while(pa[i]!==undefined){
				if(pa[i] in operators || pa[i] in delimiters){
					
					if(_wd!==""){
						expr+=transform(_wd);//'(s.indexOf("'+_wd+'")!=-1)'
						if(pa[i] in operators)expr+=operators[pa[i]];
						else expr+=pa[i];
						_wds[_wds.length]=_wd;
						_wd="";
					}else{
						if(pa[i] in operators)expr+=operators[pa[i]];
						else expr+=pa[i];
					}
				}else{
					_wd+=pa[i];
				}
				i++;
			}
			if(_wd!=""){
				expr+=transform(_wd);//'(s.indexOf("'+_wd+'")!=-1)'
				_wds[_wds.length]=_wd;
			}
			
			try{
				_THIS.func=new Function('s','return '+expr+';');
				return true;
			}catch(e){
				return false;
			}
		}
	}
	return CLASS;
})();
var Expression2=(function(){
	var CLASS=function Expression2(operators,delimiters,transform){
		Base.call(this,['Expression2']);
		var _THIS=this;
		this.func=function(){return true;}
		this.eval=function(text){
			if(text==""){
				_THIS.func=function(){return true;}
				return this;
			}
			
			var i=0,expr="",_wd="",last_type='';
			var pa=text.split("");
			while(pa[i]!==undefined){
				if(pa[i] in delimiters){
					if(_wd in operators){
						expr+=operators[_wd];
						last_type='op';
						_wd='';
					}else{
						if(_wd!=""){
							if(last_type=='op')expr+=transform(_wd);
							else 
							last_type='word';
						}
						_wd="";
					}
					expr+=delimiters[pa[i]];
				}else{
					_wd+=pa[i];
				}
				i++;
			}
			if(_wd in operators){
				expr+=operators[_wd];
				_wd='';
			}else{
				if(_wd!="")expr+=transform(_wd);
			}
			//return expr;
			try{
				_THIS.func=new Function('s','return '+expr+';');
				_THIS.func.bind(_THIS);
				_THIS.func.name='_func';
				return this;
			}catch(e){
				return this;
			}
		}
	}
	return CLASS;
})()