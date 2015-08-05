//TODO
var VFlowGridLayout = (function() {
    var CLASS = function VFlowGridLayout(rowNum) {
    	Base.call(this,['VFlowGridLayout']);
        var _THIS = this;
        Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){})
        QProperty.call(this,['OnChildClick']);
        this.OnChildClick(function(widget){});
        this.OnChildClick.afterSet=function(_function){
        	//renderView();
        }
        QProperty.call(this,['VAlign']);
        this.VAlign('bottom');
        this.VAlign.afterSet=function(_align){
        	renderView();
        }
        var row;
        this.View(MAKE.table({className:'HLayout'},{},[MAKE.tbody({},{},[row=MAKE.tr()])]));
        this.Parent.afterSet=function(_parent){
            renderView();
           _parent.appendChild(_THIS.View());
        }
        this.Children.afterSet=function(_parent){
            renderView();
        }
       // this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(row);
			var children=_THIS.Children();
			for(var name in children){
				var td=MAKE.td({
					onclick:(function(_child){
						return function(event){
							_THIS.OnChildClick()(_child);
						}
					})(children[name])
				}
				,{verticalAlign:_THIS.VAlign()});
				children[name].Parent(td);
				row.appendChild(td);
			}
			return _THIS;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();