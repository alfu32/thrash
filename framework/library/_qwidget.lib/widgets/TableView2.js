var TableView2=(function(){
    var CLASS=function TableView2(){
    	Base.call(this,['TableView2']);
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
        
        /* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(false);
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar();
        /* END PROGRESSBAR */
        
        _THIS.View(MAKE.div({},{},[table=MAKE.table({className:'TableView2'},{backgroundColor:'#FFF',boxShadow:'0px 0px 12px #000'})]));

        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            
        	/* BEGIN Async */
        	if(_THIS.Async()){
        		renderView_async({finished:false,index:-1});
        	}else{
        		renderView({finished:false,index:-1});
        	}
        	/* END Async */
        }
        _THIS.Parent.afterSet=function(_parent){
        	try{
        		_parent.appendChild(_THIS.View())
        		/* BEGIN Async */
	        	if(_THIS.Async()){
	        		renderView_async({finished:false,index:-1});
	        	}else{
	        		renderView({finished:false,index:-1});
	        	}
	        	/* END Async */
        	}catch(err){
        	}
        }
        QProperty.call(this,['TableController']);
        this.TableController(function(ref){
            var w=new Widget().View(MAKE.div({innerHTML:'Table View',align:'left'}))
            return w;
        });

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
            var rc=_THIS.RowControllersAtIndex()(ref,rowIndex)
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
        
        var sections={}
        var ctimeout;
        var renderView_async=function TableView2_renderViewAsync(state){
            var v=table;
            if(_THIS.Parent()==undefined)return _THIS;
            if(state.index==-1){
				CLASS.clearView(v);
        		progressbar.show(_THIS.Parent());
        		progressbar.progress(0);
        		clearTimeout(ctimeout);
        		ctimeout=setTimeout(function(){renderView_async({finished:false,index:5});},100);
				sections={}
				return _THIS;
			}
            var items=_THIS.Items();
            progressbar.progress(parseInt(state.index)*100/items.length);
            /** gen Views */
            var i=state.index;
            if(i<items.length){
            	/*async render block*/
				
                var tr;
                var sID=_THIS.SectionControllerAtIndex()(_THIS,i).ID;
                if(sections[sID]===undefined){
                	/** init section*/
                	sections[sID]=_THIS.SectionControllerAtIndex()(_THIS,i).View();
                	v.appendChild(sections[sID]);
                }
                sections[sID].appendChild(
                    _THIS.RowAtIndex()(_THIS,i)
                )
            	/*END async render block*/
				i++;
				state.index=i;
				ctimeout=setTimeout(function(){renderView_async(state)},12);
            }else{
            	progressbar.hide();
            }
            return _THIS;
        }
        
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
            sections={}
            /** gen Views */
            for(var i=5;i<items.length;i++){
                var tr;
                var sID=_THIS.SectionControllerAtIndex()(_THIS,i).ID;
                if(sections[sID]===undefined){
                	/** init section*/
                	sections[sID]=_THIS.SectionControllerAtIndex()(_THIS,i).View()
                }
                sections[sID].appendChild(
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
var ReferencePair=(function(){
	var PROTO=function ReferencePair(refarray){
		this.view=refarray[0];
		this.data=refarray[1];
	}
	return PROTO;
})();
var TableView1=(function(){
    var CLASS=function TableView1(){
    	Base.call(this,['TableView1']);
        var _THIS=this;
        Widget.call(this);
        var table,tb;
        _THIS.View(table=MAKE.table({},{},[tb=MAKE.tbody()]));
        var references=[];
        _THIS.getReferences=function(){
        	return references;
        }
        _THIS.getReferenceByIndex=function(rowIndex,colIndex){
        	return references[rowIndex][colIndex];
        }
        _THIS.Parent.afterSet=function(_parent){
            _parent.appendChild(_THIS.View())
            renderView();
        }
        QProperty.call(this,['Items']);
        _THIS.Items.afterSet=function(_items){
            renderView()
        }

        QProperty.call(this,['CellAtIndex']);
        this.CellAtIndex(function(ref,rowIndex,colIndex){
            var cell=ref.Items()[rowIndex][colIndex];
            return MAKE.td({innerHTML:cell});
        })

        QProperty.call(this,['RowAtIndex']);
        this.RowAtIndex(function(ref,rowIndex){
            var row=ref.Items()[rowIndex];
            var cells=[];
            for(var colIndex=0;colIndex<row.length;colIndex++){
                cells[colIndex]=ref.CellAtIndex()(ref,rowIndex,colIndex);//MAKE.td({},{},[references[rowIndex][colIndex].view])
            }
            return MAKE.tr({},{},cells)
        })
        
        var renderView=function TableView1_renderView(){
            CLASS.clearView(tb);
            references=[];
            var items=_THIS.Items();
            for(var i=0;i<items.length;i++){
            	references[i]=[];
            	var rowView=_THIS.RowAtIndex()(_THIS,i);
            	for(var k=0;k<rowView.children.length;k++){
            		references[i][k]=new ReferencePair([rowView.children[k].children[0]||rowView.children[k],items[i][k]]);
            	}
                tb.appendChild(rowView);
            }
        }
    };
    WidgetStatic.call(CLASS);
    return CLASS;
})();
