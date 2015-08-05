var ListView2=(function(){
    var CLASS=function ListView2(index){
    	Base.call(this,['ListView2']);
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionTitleAtIndex='';
        this.ItemAtIndex='';
        var table;
        /* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(false);
        QProperty.call(this,['AsyncFeedback']);
        _THIS.AsyncFeedback(true);
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar({timing:100});
        /* END PROGRESSBAR */
        
        _THIS.View(MAKE.div({className:'ListView2'},{},[table=MAKE.table({},{})]));

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
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
            return MAKE.div({innerHTML:ref.Items()[index]},{})
        });
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,index){
            var w=new Widget().View(
                MAKE.div({innerHTML:'',title:'List'},{})
            )
            w.ID='List'
            return w;
        });
        var sections={}
        var ctimeout;
        var renderView_async=function ListView_renderViewAsync(state){
            var v=table;
            if(_THIS.Parent()==undefined)return _THIS;
            if(state.index==-1){
				CLASS.clearView(v);
        		if(_THIS.AsyncFeedback()){
        			progressbar.show(_THIS.Parent());
        		}
        		progressbar.progress(0);
        		clearTimeout(ctimeout);
        		ctimeout=setTimeout(function(){renderView_async({finished:false,index:0});},100);
				sections={}
				return _THIS;
			}
            var items=_THIS.Items();
            progressbar.progress(parseInt(state.index)*100/items.length);
            /** gen Views */
            var i=state.index;
            if(i<items.length){
            	/*async render block*/
				var sID=_THIS.SectionControllerAtIndex()(_THIS,i).ID;
				if(sections[sID]===undefined){
					/** init section*/
					
					sections[sID]=MAKE.tbody({},{},[
						MAKE.tr({},{},[
							MAKE.td({},{},[
								_THIS.SectionControllerAtIndex()(_THIS,i).View()
							])
						])
					]);
					v.appendChild(sections[sID]);
				}
                sections[sID].appendChild(
                    MAKE.tr({},{},[
                        MAKE.td({},{},[
                            _THIS.ItemAtIndex()(_THIS,i)///.View()
                        ])
                    ])
                );
                
            	/*END async render block*/
				i++;
				state.index=i;
				ctimeout=setTimeout(function(){renderView_async(state)},120);
            }else{
            	if(_THIS.AsyncFeedback()){
            		progressbar.hide();
            	}
            }
            return _THIS;
        }
        
        var renderView=function ListView_renderView(){
            var v=table;
            CLASS.clearView(v);
            var items=_THIS.Items();
            sections={}
            /** gen Views */
            for(var i=0;i<items.length;i++){
				var sID=_THIS.SectionControllerAtIndex()(_THIS,i).ID;
				if(sections[sID]===undefined){
					/** init section*/
					sections[sID]=MAKE.tbody({},{},[
						MAKE.tr({},{},[
							MAKE.td({},{},[
								_THIS.SectionControllerAtIndex()(_THIS,i).View()
							])
						])
					])
				}
                sections[sID].appendChild(
                    MAKE.tr({},{},[
                        MAKE.td({},{},[
                            _THIS.ItemAtIndex()(_THIS,i)///.View()
                        ])
                    ])
                )
            }
            /** append section views*/
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
    var CLASS=function ListView3(index){
    	Base.call(this,['ListView3']);
        var _THIS=this;
        Widget.call(this);
        this.Items='';
        this.SectionIDAtIndex='';
        
        this.ItemAtIndex='';
        this.SectionControllerAtIndex='';
        this.SectionBodyAtIndex='';
        var table;
        
        /* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(false);
        QProperty.call(this,['AsyncFeedback']);
        _THIS.AsyncFeedback(true);
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar({timing:100});
        /* END PROGRESSBAR */
        
        _THIS.View(MAKE.div({className:'ListView3'}));

        QProperty.call(this,['Items']);
        _THIS.Items([]);
        _THIS.Items.afterSet=function(_items){
        	/* BEGIN Async */
	        	if(_THIS.Async()){
	        		renderView_async({finished:false,index:-1});
	        	}else{
	        		renderView({finished:false,index:-1});
	        	}
	        	/* END Async */
            renderView();
        }
        
        _THIS.Parent.afterSet=function(_parent){
        	try{
        		_parent.appendChild(_THIS.View());
	        	if(_THIS.Async()){
	        		renderView_async({finished:false,index:-1});
	        	}else{
	        		renderView({finished:false,index:-1});
	        	}
            }catch(err){}
        }
        
        QProperty.call(this,['ListController']);
        this.ListController(function(_ref){
            return MAKE.span({className:'ListController'});
        })
        
        QProperty.call(this,['SectionIDAtIndex']);
        this.SectionIDAtIndex(function(ref,index){
            return 'default';
        })
        QProperty.call(this,['SectionAtIndex']);
        this.SectionAtIndex(function(ref,index){
            return MAKE.div({className:'ListViewSection'});
        })
        QProperty.call(this,['ItemAtIndex']);
        this.ItemAtIndex(function(ref,index){
            return MAKE.div({className:'ListItem',innerHTML:ref.Items()[index]},{});
        })
        QProperty.call(this,['SectionControllerAtIndex']);
        this.SectionControllerAtIndex(function(ref,index){
            return MAKE.div({innerHTML:_THIS.SectionIDAtIndex()==null?'':_THIS.SectionIDAtIndex()(ref,index),className:'ListViewSectionController'},{});
        })
        QProperty.call(this,['SectionBodyAtIndex']);
        this.SectionBodyAtIndex(function(ref,index){
            return MAKE.div({className:'ListViewSectionBody'},{});
        });
        
        var sections={}
        var ctimeout;
        
        var renderView_async=function ListView_renderView_async(state){
        	var v=_THIS.View();
            var items=_THIS.Items();
	        /** gen Views */
            if(state.index==-1){
            	CLASS.clearView(_THIS.View());
            	sections={}
            	state.index=0;
        		if(_THIS.AsyncFeedback()){
        			progressbar.show(_THIS.Parent());
        		}
        		progressbar.progress(0);
        		clearTimeout(ctimeout);
	            ctimeout=setTimeout(function(){renderView_async(state)},1);
            	return _THIS;
            }
            var i=parseInt(state.index);
            if(i<items.length){
            	progressbar.progress(parseInt(state.index)*100/items.length);
				var sID=_THIS.SectionIDAtIndex()(_THIS,i);
				sID=_THIS.SectionIDAtIndex()==null?'':sID;
				if(sections[sID]===undefined){
					sections[sID]=_THIS.SectionAtIndex()(_THIS,i)
					if(_THIS.SectionIDAtIndex()!=null)sections[sID].appendChild(_THIS.SectionControllerAtIndex()(_THIS,i));
					sections[sID].appendChild(_THIS.SectionBodyAtIndex()(_THIS,i));
				}
				var list_item=_THIS.ItemAtIndex()(_THIS,i);
                sections[sID].children[1].appendChild(list_item);
            	state.index=i+1;
	            ctimeout=setTimeout(function(){renderView_async(state)},1);
                return _THIS;
            };
            /** init section views*/
            if(_THIS.ListController()!=null)_THIS.View().appendChild(_THIS.ListController()(_THIS));
            for(var j in sections){
                _THIS.View().appendChild(sections[j]);
            }
            return _THIS;
        }
        var renderView=function ListView_renderView(){
            var v=_THIS.View();
            CLASS.clearView(_THIS.View());
            var items=_THIS.Items();
            var sections={}
            /** gen Views */
            for(var i=0;i<items.length;i++){
				var sID=_THIS.SectionIDAtIndex()(_THIS,i);
				sID=_THIS.SectionIDAtIndex()==null?'':sID;
				if(sections[sID]===undefined){
					sections[sID]=_THIS.SectionAtIndex()(_THIS,i)
					if(_THIS.SectionIDAtIndex()!==null)sections[sID].appendChild(_THIS.SectionControllerAtIndex()(_THIS,i));
					sections[sID].appendChild(_THIS.SectionBodyAtIndex()(_THIS,i));
				}
				var list_item=_THIS.ItemAtIndex()(_THIS,i);
                sections[sID].children[1].appendChild(list_item);
            }
            /** init section views*/
            _THIS.View().appendChild(_THIS.ListController()(_THIS));
            for(var j in sections){
                _THIS.View().appendChild(sections[j]);
            }
            return _THIS;
        }
    };
    WidgetStatic.call(CLASS);
    return CLASS;
})();
