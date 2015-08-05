var VListLayout=(function(){
	var APP=function VListLayout(){
		Widget.call(this);
		var _THIS=this;
		var viewTemplate=new HTMLTemplateFactory('<td class="##CLASS_NAME##"><img src="##IMG##"/>##TITLE##</td>');
		var tr=MAKE.tr({},{});
		var tbody=MAKE.tbody({},{},[tr]);
		this.View(MAKE.table({},{},[tbody]));
		var lastClicked=null;
		this.Children.afterSet=function(data){
			//var v=_THIS.View();
			APP.clearView(tr);
			for(var i=0;i<data.length;i++){
				var child=viewTemplate.makeInstance(data[i]);
				child.Parent(tr);
				var cv=child.View();
				cv.onclick=data[i].LISTENER;
				cv.onmousedown=(function(type){return function(event){
					if(lastClicked!=null){lastClicked.style.backgroundColor="";}
					this.style.backgroundColor="#96d4df";
					lastClicked=this;
					}
				})(cv.className);
				cv.onmouseover=(function(type){return function(event){this.className="hover"}})(cv.className);
				cv.onmouseout=(function(type){return function(event){this.className=type}})(cv.className);
				cv.onmouseleave=(function(type){return function(event){this.className=type}})(cv.className);
			};
		}
	};
	WidgetStatic.call(APP);
	return APP;
})();


var HLayout = (function() {
    var CLASS = function HLayout() {
        var _THIS = this;
        Widget.call(this);
        QProperty.call(this,['OnChildClick']);
        this.OnChildClick(function(widget){});
        this.OnChildClick.afterSet=function(_function){
        	//renderView();
        }
        var row;
        var t;
        this.View(t=MAKE.table({className:'HLayout'},{},[MAKE.tbody({},{},[row=MAKE.tr()])]));
        this.Parent.afterSet=function(_parent){
           if(_parent!=null)_parent.appendChild(_THIS.View());
            renderView();
        }
        this.Children.afterSet=function(_parent){
            renderView();
        }
       // this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(row);
			var children=_THIS.Children();
			for(var name in children){
				var cssDef={}
				if(children[name]['SetParentCss']!=null){cssDef=children[name].SetParentCss()}
				cssDef.verticalAlign=_THIS.VAlign()
				var td=MAKE.td({
					align:_THIS.Align()
					,onmousedown:(function(_child){
						return function(event){
							try{
							_THIS.OnChildClick()(_child);
							}catch(err){}
						}
					})(children[name])
				}
				,cssDef);
				children[name].Parent(td);
				//td.appendChild(children[name].View())
				//children[name].View().innerHTML=children[name].Text()
				row.appendChild(td);
			}
			return _THIS;
		};
		
        QProperty.call(this,['VAlign']);
        this.VAlign('bottom');
        this.VAlign.afterSet=function(_align){
        	renderView();
        }
        QProperty.call(this,['Align']);
        this.Align('center');
        this.Align.afterSet=function(_align){
        }
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();