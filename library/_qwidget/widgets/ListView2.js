var ListView2=(function(){
    var CLASS=function ListView2(index){
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionTitleAtIndex='';
        this.ItemAtIndex='';
        var table;
        _THIS.View(MAKE.div({},{},[table=MAKE.table({},{})]));

        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            renderView()
        }
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
            return MAKE.div({innerHTML:ref.Items()[index]},{})
        })
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,index){
            var w=new Widget().View(
                MAKE.div({innerHTML:'',title:'List'},{})
            )
            w.ID='List'
            return w;
        })

        var renderView=function ListView_renderView(){
            var v=table;
            CLASS.clearView(v);
            var items=_THIS.Items();
            var sections={}
            /** init sections*/
            for(var i=0;i<items.length;i++){
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID]=MAKE.tbody({},{},[
                    MAKE.tr({},{},[
                        MAKE.td({},{},[
                            _THIS.SectionControllerAtIndex()(_THIS,i).View()
                        ])
                    ])
                ])
                //v.appendChild(sections[_THIS.SectionTitleAtIndex()(_THIS,i).title])
            }
            /** gen Views */
            for(var i=0;i<items.length;i++){
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID].appendChild(
                    MAKE.tr({},{},[
                        MAKE.td({},{},[
                            _THIS.ItemAtIndex()(_THIS,i)///.View()
                        ])
                    ])
                )
            }
            /** init section views*/
            for(var j in sections){
                v.appendChild(sections[j]);
            }
        }
    };
    WidgetStatic.call(CLASS);
    CLASS.CALL_CNT=0;
    return CLASS;
})();
var ListView3=(function(){
    var CLASS=function ListView2(index){
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionControllerAtIndex='';
        this.ItemAtIndex='';
        var table;
        _THIS.View(MAKE.div({},{},[table=MAKE.table({},{})]));

        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            renderView()
        }
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
            return MAKE.div({innerHTML:ref.Items()[index]},{})
        })
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,index){
            var w=new Widget().View(
                MAKE.div({innerHTML:'',title:'List'},{})
            )
            w.ID='List'
            return w;
        })

        var renderView=function ListView_renderView(){
            var v=table;
            CLASS.clearView(v);
            var items=_THIS.Items();
            var sections={}
            /** init sections*/
            for(var i=0;i<items.length;i++){
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID]=MAKE.tr({},{},[
                        MAKE.td({},{},[
                            _THIS.SectionControllerAtIndex()(_THIS,i).View()
                        ])
                    ])
                //v.appendChild(sections[_THIS.SectionTitleAtIndex()(_THIS,i).title])
            }
            /** gen Views */
            for(var i=0;i<items.length;i++){
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID].appendChild(
                        MAKE.td({},{},[
                            _THIS.ItemAtIndex()(_THIS,i)///.View()
                        ])
                )
            }
            /** init section views*/
            for(var j in sections){
                v.appendChild(sections[j]);
            }
        }
    };
    WidgetStatic.call(CLASS);
    CLASS.CALL_CNT=0;
    return CLASS;
})();
var ListView1=(function(){
    var CLASS=function ListView1(index){
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionControllerAtIndex='';
        this.ItemAtIndex='';
        var list;
        _THIS.View(list=MAKE.div());

        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            renderView()
        }
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
            return MAKE.div({innerHTML:ref.Items()[index]},{})
        })
        QProperty.call(this,['SectionID']);
        this.SectionID(function(ref,index){
            return 'List';
        });
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,sectionIndex){
            var w=MAKE.div({innerHTML:'',title:'SectionController'},{});
            return w;
        })
        QProperty.call(this,['SectionContainerAtIndex']);
        this.SectionContainerAtIndex(function(ref,sectionIndex){
            var w=MAKE.div({title:'SectionContainerAtIndex'},{});
            return w;
        })

        var renderView=function ListView_renderView(){
            CLASS.clearView(list);
            var items=_THIS.Items();
            var sections={}
            /** init sections*/
            for(var i=0;i<items.length;i++){
                var  sectionIndex=_THIS.SectionID()(_THIS,i);
                if(sections[sectionIndex]===undefined){
                    sections[sectionIndex]=_THIS.SectionContainerAtIndex()(_THIS,sectionIndex);
                    sections[sectionIndex].appendChild(_THIS.SectionControllerAtIndex()(_THIS,sectionIndex));
                }
                sections[sectionIndex].appendChild(_THIS.ItemAtIndex()(_THIS,i));
            }
            /** init section views*/
            for(var j in sections){
                list.appendChild(sections[j]);
            }
        }
    };
    WidgetStatic.call(CLASS);
    CLASS.CALL_CNT=0;
    return CLASS;
})();