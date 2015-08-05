var FlexGridLayout = (function() {
    var CLASS = function FlexGridLayout() {
    	Base.call(this,['FlexGridLayout']);
        var _THIS = this;
        Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){})
        this.Children.afterSet=function(_data){
        	renderView();
        }
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
        QProperty.call(this,['Size']);
        this.Size(280);
        this.Size.afterSet=function(_size){
        	renderView();
        }
        var row,body;
        this.View(body=MAKE.div({className:'FlexGridLayout',align:'left'}));
        this.Parent.afterSet=function(_parent){
            renderView();
           _parent.appendChild(_THIS.View());
        }
        this.Children.afterSet=function(_parent){
            renderView();
        }
       // this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(body);
			var children=_THIS.Children();
			for(var name in children){
				var div,dv=MAKE.span({},
					{verticalAlign:'top',display:'inline-block',border:'1px solid #000',width:_THIS.Size()+'px',margin:'4px'}
					,[
					MAKE.div({innerHTML:name,align:'right'},{padding:'4px',margin:'4px',height:'3em',backgroundColor:'#000',color:'#FFF'},[])
				    ,div=MAKE.div({
							onclick:(function(_child){
								return function(event){
									_THIS.OnChildClick()(_child);
								}
							})(children[name])
						}
					    ,{overflow:'auto'
						,width:_THIS.Size()+'px'
						,height:_THIS.Size()+'px',verticalAlign:_THIS.VAlign()})
					]);
				_THIS.OnShowChild()(children,name,true);
				children[name].Parent(div);
				body.appendChild(dv);
			}
			return _THIS;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();