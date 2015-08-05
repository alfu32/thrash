var TableView2=(function(){
    var CLASS=function TableView2(){
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionControllerAtIndex='';
        this.RowControllerAtIndex='';
        this.RowAtIndex='';
        this.CellAtIndex='';
        this.RowCompare='';
        this.TableController='';
        var table;
        _THIS.View(MAKE.div({},{},[table=MAKE.table({},{backgroundColor:'#FFF',boxShadow:'0px 0px 12px #000'})]));

        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            renderView()
        }
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['TableController']);
        this.TableController(function(ref){
            var w=new Widget().View(MAKE.div({innerHTML:'Table View',align:'left'}))
            return w;
        })

        QProperty.call(this,['CellAtIndex']);
        /*this.CellAtIndex(function(ref,rowIndex,colIndex){
            var cell=ref.Items()[rowIndex][colIndex];
            return MAKE.div({innerHTML:cell});
        })*/

        QProperty.call(this,['RowAtIndex']);
        this.RowAtIndex(function(ref,rowIndex){
            var row=ref.Items()[rowIndex];
            var cells=[];
            for(var colIndex=0;colIndex<row.length;colIndex++){
                cells[colIndex]=MAKE.td({},{},[_THIS.CellAtIndex()(ref,rowIndex,colIndex)]);//
            }
            var rc=_THIS.RowControllerAtIndex()(ref,rowIndex)
            for(var i=0;i<rc.length;i++){
            	cells[cells.length]=rc[i].View();
            }
            return MAKE.tr({},{},cells)
        })

        QProperty.call(this,['RowCompare']);
        this.RowCompare(function(rowA,rowB){
            return rowA.join(' ').localeCompare(rowB);
        })

        QProperty.call(this,['RowControllerAtIndex']);
        this.RowControllerAtIndex(function(ref,rowIndex){
            var w=[];//new Widget().View()
            return w;
        })

        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,rowIndex){
            var w=new Widget().View(MAKE.tbody({},{},[
                MAKE.tr({title:'TableSection'},{},[
                    MAKE.td({colSpan:ref.Items()[0].length,innerHTML:'TableSection'})
                ])
            ])
            )
            w.ID='TableSection';
            return w;
        })

        var renderView=function TableView2_renderView(){
            var v=table;
            CLASS.clearView(v);
            v.appendChild(
                MAKE.tbody({},{},[
                    MAKE.tr({title:'TableSection'},{},[
                        MAKE.td(
                            {colSpan:_THIS.Items()[0].length},{}
                            ,[_THIS.TableController()().View()]
                        )
                    ])
                ])
            )
            var items=_THIS.Items();
            //items.sort(_THIS.RowCompare());
            var sections={}
            /** init sections*/
            for(var i=0;i<items.length;i++){
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID]=_THIS.SectionControllerAtIndex()(_THIS,i).View()
                //v.appendChild(sections[_THIS.SectionTitleAtIndex()(_THIS,i).title])
            }
            /** gen Views */
            for(var i=0;i<items.length;i++){
                var tr;
                sections[_THIS.SectionControllerAtIndex()(_THIS,i).ID].appendChild(
                    _THIS.RowAtIndex()(_THIS,i)
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
