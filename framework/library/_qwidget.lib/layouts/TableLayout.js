//TODO
var TableLayout = (function() {
    var CLASS = function TableLayout() {
    	Base.call(this,['TableLayout']);
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
            renderView();
        }
       // this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(tbody);
			var children=_THIS.Children();
			for(var r=0;r<children.length;r++){
				var row=children[r];
				var tr=MAKE.tr();
				for (var c=0;c<row.length;c++){
					var td=MAKE.td({
					onclick:(function(_child){
						return function(event){
							_THIS.OnChildClick()(_child);
						}
					})(row[c])
				}
				,{
					verticalAlign:_THIS.VAlign()
					,padding:_THIS.Spacing()+'px'
				});
				row[c].Parent(td);
				tr.appendChild(td);
				}
				tbody.appendChild(tr)
			}
			return _THIS;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();