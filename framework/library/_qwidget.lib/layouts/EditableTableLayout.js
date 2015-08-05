//TODO
var EditableTableLayout = (function() {
    var CLASS = function EditableTableLayout() {
    	Base.call(this,['EditableTableLayout']);
        var _THIS = this;
        Widget.call(this);
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
        QProperty.call(this,['Spacing']);
        this.Spacing(5);
        this.Spacing.afterSet=function(_spacing){
        	renderView();
        }
        var tbody;
        this.View(MAKE.table({className:'TableLayout'},{borderCollapse:'collapse'},[tbody=MAKE.tbody()]));
        this.Parent.afterSet=function(_parent){
            renderView();
           _parent.appendChild(_THIS.View());
        }
        this.Children.afterSet=function(_children){
			//console.log(_children[0].View(),'cnt:'+CLASS.cnt++)
            renderView();
        }
       // this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(tbody);
			var children=_THIS.Children();
			for(var r=0;r<children.length;r++){
				children[r].Parent(tbody);
				tbody.appendChild(children[r].View())
			}
			return _THIS;
		};
	};
	CLASS.cnt=0;
	WidgetStatic.call(CLASS);
	return CLASS;
})();