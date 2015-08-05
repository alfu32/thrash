ListView3_graphView=function(data,xForm,yForm){
	var _data=data||{20131001:0.1,20131101:0.2,20131201:0.34,20140101:0.74,20140201:0.80,20140301:0.88}
	var _xf=xForm||new Transform().Direct(function(x){return x}).Inverse(function(x){return x})
	var _yf=yForm||new Transform().Direct(function(x){return x}).Inverse(function(x){return x})
	var func=function(ref,index){
		var cnv;
		try{
			cnv=MAKE.canvas({width:350,height:120});
		}catch(err){return MAKE.div({innerHTML:"your browser does not support canvas<br>"+ref.Items()[index]},{});}
		var pline=[],box=new Rectangle();//{x:0,y:0,w:0,h:0}
		var ctx=cnv.getContext('2d');
		for(var d in data){
			var v={x:d,y:data[d]}
			pline[pline.length]=v;
			box.add(v);
		}
		console.log(box);
		/*draw grid*/
		
		/*draw graph*/
		for(var d in data){
			
		}
		
	}
	return func;
}