var eddstarmenu_registerbodyonclick = false;
var	eddstartoclose = new Array();
var	eddstarmytimer = null;	

function closeEveryMenu()
{
	closeMenu(null);
}

function getInternetExplorerVersion()
{
	var rv = -1;
	if (navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER')
	{
		var ua = navigator.userAgent.toUpperCase();
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}	

function getFirefoxVersion()
{
	var rv = -1;
	if (navigator.appName.toUpperCase() == 'NETSCAPE')
	{
		var ua = navigator.userAgent.toUpperCase();
		var re  = new RegExp("Firefox/([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}	

function getStyle(x,styleProp)
{
	var returnval=null;
	if (x)
	{
		if (x.currentStyle) returnval = x.currentStyle[styleProp];
		else if (window.getComputedStyle) returnval = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	}
	if (returnval==""||returnval==null) returnval = eval("x.style."+styleProp);
	return returnval;
}

function openMenu(bigparentid,obj)
{
	var bigparent = document.getElementById(bigparentid);
	closeMenu(null);
	HighLight(true,obj);

	for (var x=0;x<obj.childNodes.length;x++)
	{
		ulobj = obj.childNodes[x];
		if (ulobj.nodeName=="UL")
		{
			obj.standby_onmouseover = obj.onmouseover;
			obj.onmouseover = null;
			ulobj.style.visibility = "visible";

			if (bigparent.horizontal&&ulobj.parentNode.parentNode==bigparent)
			{
				ulobj.style.top = ulobj.parentNode.offsetHeight;
				ulobj.style.left = 0;
			}
			else
			{
				ulobj.style.top = 0;
				ulobj.style.left = ulobj.parentNode.offsetWidth;
			}
		}
	}
}

function closeMenu(obj)
{
	if (obj)
	{
		window.clearTimeout(eddstarmytimer);
		eddstartoclose.push(obj);
		eddstarmytimer = setTimeout("closeMenu(null)",500);
	}
	else
	{
		while(eddstartoclose.length>0)
		{
			src = eddstartoclose[0];
			if (src.standby_onmouseover) src.onmouseover = src.standby_onmouseover;
			HighLight(false,src);
			var dst = src.getElementsByTagName("ul")[0];
			if (dst) dst.style.visibility="hidden";
			eddstartoclose.shift();
		}
	}
}
function ChangeObjectTag(object,newTag){
	var _o=object;
	var _p=object.parentNode;
	var _no=document.createElement(newTag)
	_no.innerHTML=_o.innerHTML;
	_no.className=_o.className;
	_no.id=_o.id;
	_no.cssText=_o.cssText;
	_p.insertBefore(_no,_o)
	_p.removeChild(_o)
}
function CreateMenu(
		objid
		,horizontal
		,cssparent
		,cssparentonmouseover
		,cssparentonmouseout
		,csschild
		,csschildonmouseover
		,csschildonmouseout
		)
{ 
	var obj = document.getElementById(objid);
	//alferarui
	//var obj1=obj.cloneNode(false);
	
	//var ihtml=obj.innerHTML.replace(/\<ul\>/gi,'<strong>').replace(/\<li\>/gi,'<span>').replace(/\<\/ul\>/gi,'</strong>').replace(/\<\/li\>/gi,'</span>')
	//obj1.innerHTML=ihtml;
	//document.body.appendChild(obj1);
	//console.log(ihtml)
	//ChangeObjectTag(obj,'STRONG')
	var parent=obj.parentNode;
	
	if (obj==null) return;
	
	obj.horizontal = horizontal;
	obj.csschild = obj.cssparent = cssparent;
	obj.csschildonmouseover = obj.cssparentonmouseover = cssparentonmouseover;
	obj.csschildonmouseout = obj.cssparentonmouseout = cssparentonmouseout;
	if (csschild)
		obj.csschild = csschild;
	if (csschildonmouseover)
		obj.csschildonmouseover = csschildonmouseover;
	if (csschildonmouseout)
		obj.csschildonmouseout = csschildonmouseout;
	obj.style.position = "relative";
	obj.style.listStyleType = "none";
	obj.style.margin = "0px";
	obj.style.padding = "0px";

	if (eddstarmenu_registerbodyonclick!=true)
	{
		if (window.addEventListener)
		{
			window.addEventListener("click", closeEveryMenu, false);
			document.body.addEventListener("click", closeEveryMenu, false);
		}
		else if (window.attachEvent)
		{
			window.attachEvent("onclick", closeEveryMenu);
			document.body.attachEvent("onclick", closeEveryMenu);
		}		
		eddstarmenu_registerbodyonclick = true;
	}
	
			
	if (!obj.className)
	{
		if (cssparent!=""&&cssparent)
			obj.className = cssparent;
		else
		{
			obj.style.borderStyle = "outset"
			obj.style.borderColor = "lightgrey";
			obj.style.borderWidth = "1px";
		}
	}
	
	Examine(objid,obj);
}

function HighLight(highlight,obj)
{
	var bigparent;
	var objparent = obj.parentNode;
	var enable = true;
	
	if (objparent.getAttribute("enable")!=null)
		if (objparent.getAttribute("enable").toUpperCase()=="FALSE"||objparent.getAttribute("enable")=="0")
			enable = false;
	
	while(objparent)
	{
		if (objparent.nodeName.toUpperCase()=="LI")
		{
			objparent = objparent.parentNode;
			continue;
		}
		if (objparent.nodeName.toUpperCase()=="UL")
		{
			bigparent = objparent;
			objparent = objparent.parentNode;
		}
		else
			break;
	}

	if (bigparent==obj.parentNode)
	{
		if (bigparent.cssparentonmouseover&&bigparent.cssparentonmouseout)
		{
			if (highlight)
				obj.className = bigparent.cssparentonmouseover;
			else
				obj.className = bigparent.cssparentonmouseout;
		}
	}
	else
	{
		if (bigparent.csschildonmouseover&&bigparent.csschildonmouseout)
		{
			if (highlight)
				obj.className = bigparent.csschildonmouseover;
			else
				obj.className = bigparent.csschildonmouseout;
		}
	}			
	
	if (obj.className==null||obj.className==""||obj.className.toUpperCase()=="UNDEFINED")
	{
		if (highlight)
		{
			obj.style.background = "#A0A0A0";
			obj.style.color = "#FFFFFF";
		}
		else
		{
			obj.style.background = "#E8E8E8";
			obj.style.color = "#000000";
		}
	}
}

function Examine(bigparentid,obj)
{
	var bigparent = document.getElementById(bigparentid);
	if (bigparent==null) return;
	for (var x=0;x<obj.childNodes.length;x++)
	{
		switch (obj.childNodes[x].nodeName)
		{
			case "LI":
				HighLight(false,obj.childNodes[x]);
				var enable = true;
				if (obj.childNodes[x].getAttribute("enable")!=null)
					if (obj.childNodes[x].getAttribute("enable").toUpperCase()=="FALSE"||obj.childNodes[x].getAttribute("enable")=="0")
						enable = false;
				
				if (enable)
				{
					obj.childNodes[x].onmouseover=function(){openMenu(bigparentid,this);};
					obj.childNodes[x].onmouseout=function(){closeMenu(this);};
					//16/11/2011
					//obj.childNodes[x].onclick=function(){closeMenu(this);};
				}
				obj.childNodes[x].style.position = "relative";
				obj.childNodes[x].style.padding = "0px";
				obj.childNodes[x].style.margin = "0px";
				obj.childNodes[x].style.cursor = "default";
				
				if (bigparent.horizontal&&obj==bigparent)
				{
					var ie_version=getInternetExplorerVersion();
					var firefox_version=getFirefoxVersion();
					//modif alferarui(2648) tk old ie_version<8
					
					if ((ie_version>-1&&ie_version<=8)||(firefox_version>-1&&firefox_version<3))
						obj.childNodes[x].style.display = "inline";
					else
						obj.childNodes[x].style.display = "inline-block";
				}
				Examine(bigparentid,obj.childNodes[x]);
				break;
				
			case "UL":
				obj.childNodes[x].style.position = "absolute";
				obj.childNodes[x].style.visibility = "hidden";
				obj.childNodes[x].style.listStyleType = getStyle(bigparent,"listStyleType");
				obj.childNodes[x].style.marginLeft = getStyle(bigparent,"marginLeft");
				obj.childNodes[x].style.marginRight = getStyle(bigparent,"marginRight");
				obj.childNodes[x].style.marginTop = getStyle(bigparent,"marginTop");
				obj.childNodes[x].style.marginBottom = getStyle(bigparent,"marginBottom");
				obj.childNodes[x].style.paddingLeft = getStyle(bigparent,"paddingLeft");
				obj.childNodes[x].style.paddingRight = getStyle(bigparent,"paddingRight");
				obj.childNodes[x].style.paddingTop = getStyle(bigparent,"paddingTop");
				obj.childNodes[x].style.paddingBottom = getStyle(bigparent,"paddingBottom");
				
				if (!obj.childNodes[x].className)
				{
					if (bigparent.csschild)
						obj.childNodes[x].className = bigparent.csschild;
					else
					{
						obj.childNodes[x].style.borderWidth = getStyle(bigparent,"borderWidth");
						obj.childNodes[x].style.borderStyle = getStyle(bigparent,"borderStyle");
						obj.childNodes[x].style.borderColor = getStyle(bigparent,"borderColor");
					}
				}
				
				if (bigparent!=obj.parentNode||!bigparent.horizontal)
				{
					try
					{
						obj.parentNode.style.width = parseInt(obj.parentNode.style.width) + 35;
					}
					catch(err)
					{}
					var imgref=document.createElement("img");
					imgref.src="image/arrow2.gif";
					imgref.style.width = "5px";
					for (var y=0;y<obj.childNodes.length;y++)
					{
						if (obj.childNodes[y].nodeName.toUpperCase()=="UL")
						{
							obj.insertBefore(imgref,obj.childNodes[y]);
							x++;
							break;
						}
					}
				}
				Examine(bigparentid,obj.childNodes[x]);
				break;
				
			default:
				break;
		}
	}
}
