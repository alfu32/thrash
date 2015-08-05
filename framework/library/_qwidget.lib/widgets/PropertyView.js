var PropertyView=(function(){
    var CLASS=function PropertyView(index){
    	Base.call(this,['PropertyView']);
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionTitleAtIndex='';
        this.ItemAtIndex='';
        var table;
        _THIS.View(MAKE.div({},{width:'100%'},[table=MAKE.table({},{width:'100%'})]));

        QProperty.call(this,['Items']);
        _THIS.Items([])
        _THIS.Items.afterSet=function(_items){
            renderView()
        }
        QProperty.call(this,['TypeHandler']);
        _THIS.TypeHandler(function(item){
        	var value=item.value;
        	var type=item.type;
        	var access=item.access;
        	var id=item.id;
        	var name=item.name;
        	switch(type){
        		case 'text':return MAKE.textarea({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'field':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'date':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'time':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'enum':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'KVPair':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'optgroup':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'color':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'coords':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'path':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        		case 'password':return MAKE.input({value:item.value,name:item.id,type:item.type},{},[]);
        	}
        })
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
        	var item=ref.Items()[index];
            return MAKE.div({},{}
            ,[
              MAKE.strong({innerHTML:item.name},{width:'50%',display:'inline-block'},[])
              ,MAKE.strong({innerHTML:item.name},{width:'50%',display:'inline-block'},[_THIS.TypeHandler()(item)])
              ])
        })
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,index){
            var w=new Widget().View(
                MAKE.div({innerHTML:'',title:'List'},{})
            )
            w.ID='List'
            return w;
        })

        var renderView=function PropertyView_renderView(){
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
