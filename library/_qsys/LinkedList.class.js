var LinkedList=(function(){
	var CLASS=function LinkedList(object,previous,next){
		var _THIS=this;
		this._value=object;
		this.onValueChanged=function(value){};
		this.onPreviousChanged=function(oldSibling,newSibling){};
		this.onNextChanged=function(oldSibling,newSibling){};
		
		this.parseAsc=function(f){
			var first=_THIS;
			while(first.Previous()!=null){first=first.Previous()}
			for(var item=first;item!=null;item=item.Next()){
				f(item);
			}
		}
		this.parseDesc=function(f){
			var last=_THIS;
			while(last.Next()!=null){last=last.Next()}
			for(var item=last;item!=null;item=item.Previous()){
				f(item);
			}
		}
		this.parse=function(f){
			//while(last.Next()!=null){last=last.Next()}
			for(var item1=_THIS,item2=_THIS.Next();item1!=null || item2!=null;item1=item1.Previous()){
				if(item1!=null)f(item1);
				if(item2!=null)f(item2);
				item2=item2.Next();
			}
		}
		this.max=function(fn,ln){
			var i1=_THIS,i2=_THIS;
			var max1=_THIS,max2=_THIS;
			while(i1!=null){
				if(max1.Value()<i1.Value())max1=i1;
				i1=i1.Previous();}
			while(i2!=null){
				if(max2.Value()<i2.Value())max2=i2;
				i2=i2.Next();}
			return (max1.Value()>max2.Value())?max1:max2;
		}
		this.min=function(fn,ln){
			var i1=_THIS,i2=_THIS;
			var min1=_THIS,min2=_THIS;
			while(i1!=null){
				if(min1.Value()>i1.Value())min1=i1;
				i1=i1.Previous();}
			while(i2!=null){
				if(min2.Value()>i2.Value())min2=i2;
				i2=i2.Next();}
			return (min1.Value()<min2.Value())?min1:min2;
		}
		this.order=function(dir){
			var i1,i2;
			var first=_THIS;
			while(first.Previous()!=null){first=first.Previous()}
			for(var i=first;i!=null;i=i.Next()){
				for(var j=first;j!=null;j=j.Next()){
					if(dir(j.Value(),i.Value())){
						var t=i.Value();
						i.Value(j.Value());
						j.Value(t);
					}
				}
			}
			
		}
		this.close=function(){
			var first=_THIS;
			while(first.Previous()!=null){first=first.Previous()}
			var last=_THIS;
			while(last.Next()!=null){last=last.Next()}
			first.Previous(last);last.Next(previous);
		}
		
		QProperty.call(this,['Value']);
		QProperty.call(this,['Previous']);
		QProperty.call(this,['Next']);
		
		_THIS.Value(object);
		_THIS.Value.afterSet=function(value){
			_THIS._value=value;
		}
		_THIS.Previous.afterSet=function(value){
			_THIS._prev=object;
		}
		_THIS.Next.afterSet=function(value){
			_THIS._next=value;
		}
	}
	CLASS.ORDER_ASC=function(a,b){return a>b};
	CLASS.ORDER_DESC=function(a,b){return a<b};
	CLASS.Merge=function(list1,list2){}
	CLASS.Split=function(list){}
	CLASS.Swap=function(node1,node2){}
	
	CLASS.Dist=function(node1,node2){}
	CLASS.Count=function(node){}
	CLASS.ToArray=function(list){
		var ar=[];
		var ar2=[]
		list.parseAsc(function(item){
			ar[ar.length]=item;
			ar2[ar2.length]=item.Value();
		})
		return ar2;
	}
	CLASS.FromArray=function(array){
		var nodes=[]
		var f=new LinkedList(array[0],null,null);
		for(var i=0;i<array.length;i++){
			nodes[i]=new LinkedList(array[i],null,null);
		}
		if(nodes.length>1){
			nodes[0].Next(nodes[1]);
			for(var i=1;i<nodes.length-1;i++){
				nodes[i].Previous(nodes[i-1]);
				nodes[i].Next(nodes[i+1]);
			}
			nodes[nodes.length-1].Previous(nodes[nodes.length-2]);
		}
		if(nodes.length<1){
			return null;
		}
		return nodes[0];
	}
	return CLASS;
})();