function hackVMMAP(){
	var box=document.getElementsByClassName('widgetBoxIti')[0];
	var box_parent_bk=box.parentNode;
	var a=document.getElementById("dItinerairesResult");
	var b=a.children[1];
	var c=document.getElementById("carte");
	var d=c.children[0];
	var e=d.children[0];
	var f=e.children[1];
	var x_bk=e.children[1].offsetWidth;
	var y_bk=e.children[1].offsetHeight;
	var _setResolution=function setResolution(x,y){
		var mx;
		for(var k in mx=[a,b,c,d,e,f]){
			try{
				mx[k].style.width=x+'px';
				mx[k].style.height=y+'px';
			}
			catch(e){}
		}
	}
	var _move=function(x,y){
		document.documentElement.scrollX=x;
		document.documentElement.scrollY=y;
	}
	this.print=function(){
		document.body.insertBefore(box,document.body.children[0]);
		document.getElementsByName("aspnetForm")[0].style.display="none"

	}

	this.unhack=function(){
		_setResolution(x_bk,y_bk);
		document.body.insertBefore(box,box_parent_bk.children[5]);
		document.getElementsByName("aspnetForm")[0].style.display="";
	}

	this.resolution=_setResolution
	this.move=_move
}