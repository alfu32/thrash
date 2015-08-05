var WindowLayout = (function() {
    var CLASS = function WindowLayout() {
    	
        var _THIS = this;
        CLASS.instances++;
        var _window,headRow,headCell,titleCell,commandsCell
        	,toolbarRow,toolbarCell
        	,menuRow,menuCell
        	,contentRow,contentCell
        	,footerRow,statusCell,resizeCell,wtitle,hr;
        Widget.call(_THIS);
        var _X,_Y;
        var Z;
        var MINIMIZED=false;
	    if(isNaN(parseFloat(document.body.style.zoom))){Z=1}
	    else {Z=parseFloat(document.body.style.zoom);}
	    var DIRECTIVE='MOVE'
        var MIN_MAX_BUTTON,CLOSE_BUTTON;
        this.close=function(){
            try{
                _THIS.Parent().removeChild(_THIS.View());
                _THIS.Parent(null);
            }catch(err){

            }
        }
		var STANDARD_WINDOW_BUTTONS=[
		  MIN_MAX_BUTTON=new Widget().View(MAKE.span({
			   onclick:function(event){
				   var affected=[toolbarRow,menuRow,contentRow,footerRow];
				   if(MINIMIZED){
					   for(var i=0;i<affected.length;i++){
						   affected[i].style.display='';
					   }
					   MINIMIZED=false;
					   this.style.backgroundImage='url(img/icons_min_032.png)'
				   }else{
					   for(var i=0;i<affected.length;i++){
						   affected[i].style.display='none';
					   }
					   MINIMIZED=true;
					   this.style.backgroundImage='url(img/icons_max_032.png)'
				   }
			   }
		   },{display:'inline-block',backgroundImage:'url(img/icons_min_032.png)',width:'32px',height:'32px'}))
		   ,CLOSE_BUTTON=new Widget().View(MAKE.span({
			   onmousedown:function(event){
                   _THIS.close();
				   /*_THIS.View().style.display='none'*/
			   }
		   },{display:'inline-block',backgroundImage:'url(img/icons_close_032.png)',width:'32px',height:'32px'}))
		]
		var STANDARD_WINDOW_MENU=new Widget().View(MAKE.div({innerHTML:"..."}))
		  //new Menu2();
		   /*new Widget().View(MAKE.span({innerHTML:'MenuItem X'},{display:'inline-block'})).renderView()
		   ,new Widget().View(MAKE.span({innerHTML:'MenuItem Y'},{display:'inline-block'})).renderView()
		   ,new Widget().View(MAKE.span({innerHTML:'MenuItem Z'},{display:'inline-block'})).renderView()*/
		
		var STANDARD_TOOLBARS=[
		   /*new Widget().View(MAKE.span({innerHTML:'Save'},{display:'inline-block'})).renderView()
		   ,new Widget().View(MAKE.span({innerHTML:'Cut'},{display:'inline-block'})).renderView()
		   ,new Widget().View(MAKE.span({innerHTML:'Copy'},{display:'inline-block'})).renderView()
		   ,new Widget().View(MAKE.span({innerHTML:'Paste'},{display:'inline-block'})).renderView()*/
		]
		
        var mask=MAKE.div({
		    	className:'mask'
	    		,onmousemove:function(e){
	    			var event=NORM.event(e);
	    			var x=NORM.mouseX(),y=NORM.mouseY();
	    			switch(DIRECTIVE){
	    			case 'MOVE':
	    				SET.css(_window,{
		    				top:parseInt((y-_Y)/10)*10+'px'
		    				,left:parseInt((x-_X)/10)*10+'px'
		    			});
	    			break;
	    			case 'RESIZE':
	    				var resizeX=(x-_X)>(wtitle.offsetWidth+commandsCell.offsetWidth);
	    				var resizeY=(y-_Y-headRow.offsetHeight
		    						-toolbarRow.offsetHeight
		    						-menuRow.offsetHeight
		    						-footerRow.offsetHeight)>64;
	    				if(resizeY){
		    				SET.css(contentCell,{
			    				height:parseInt((y-_Y
		    						-headRow.offsetHeight
		    						-toolbarRow.offsetHeight
		    						-menuRow.offsetHeight
		    						-footerRow.offsetHeight
		    						-hr.offsetHeight)/10)*10+'px'
		    				});
	    				}
	    				if(resizeX){
	    					SET.css(contentCell,{
	    						width:parseInt((x-_X)/10)*10+'px'
	    					});
	    					SET.css(hr,{
	    						width:parseInt((x-_X)/10)*10+'px'
	    					});
	    				}
	    				_THIS.OnResize()(contentCell)
	    			break;
	    			}
	    		}
	    		,onmouseup:function(event){
	    			document.body.onselectstart=null;
					SET.css(document.body,{
					    overflow:""
					    ,cursor:'default'
			    	})
	    			document.body.removeChild(mask)
	    		}
	    	},{
			    position:'absolute'
			    	//,background:'rgba(0,0,0,.2)'
	    		,top:'0px'
	    		,zIndex:'32768'
	    		,left:'0px'
	    		,width:'0px'
	    		,height:'0px'
	    		,cursor:'default'
	    	})
        this.View(
        	_window=MAKE.table({
        		className:'WindowLayout'
        	}
        	,{borderCollapse:'collapse',position:'absolute',left:(CLASS.LAST_LEFT+=40)+'px',top:(CLASS.LAST_TOP+=40)+'px'
        		,border:'3px solid #000',backgroundColor:'#FFF'}
        	,[MAKE.tbody({},{},[
        		headRow=MAKE.tr({
        			onmousedown:function(){
		    			if(CLASS.lastOp!=undefined){
		    				CLASS.lastOp();
		    			}
						_window.style.zIndex=(1022)
						mask.style.zIndex=(1024)
		    			CLASS.lastOp=function(){
		    				_window.style.zIndex=(128);
		    				mask.style.zIndex=(129);
		    				}
        			}
		    		,onmouseup:function(event){
		    			document.body.onselectstart=null;
						SET.css(document.body,{
						    overflow:""
						    ,cursor:'default'
				    	})
		    			document.body.removeChild(mask)
		    		}
	    		},{color:'#FFF',backgroundColor:'#000',cursor:'pointer'},[
        				headCell=MAKE.td({},{},[
        					MAKE.table({},{width:'100%',height:'32px'},[
        						MAKE.tbody({},{},[
        							MAKE.tr({},{},[
        								titleCell=MAKE.td({
        									align:'left'
        									,onmousedown:function(e){
        										var event=NORM.event(e);
        										DIRECTIVE='MOVE';
        										_X=NORM.mouseX(),_Y=NORM.mouseY();
        										SET.css(mask,{
												    position:"absolute"
												    //,backgroundColor:'rgba(0,0,0,0.05)'
										    		,top:'0px'
										    		,left:'0px'
										    		,width:document.body.offsetWidth+'px'
										    		,height:document.body.offsetHeight+2000+'px'
										    	})
        										SET.css(document.body,{
												    overflowX:"hidden"
										    	})
										    	document.body.onselectstart=function BODY_PREVENT_DEFAULT(event){NORM.preventDefault(event);NORM.stopPropagation(event);return false;}
        										document.body.appendChild(mask)
        									}
        								},{width:'100%',cursor:'move'},[
        								     wtitle=MAKE.strong({},{color:'#FFF',display:'inline-block'})
        								])
        								,commandsCell=MAKE.td({align:'right'})
        							])
        						])
        					])
        				])
        			])
        		,menuRow=MAKE.tr({},{color:'#FFF',backgroundColor:'#555',cursor:'pointer'},[
        				menuCell=MAKE.td({},{},[])
        			])
        		,toolbarRow=MAKE.tr({},{color:'#FFF',backgroundColor:'#555',cursor:'pointer'},[
        				toolbarCell=MAKE.td({},{},[])
        			])
        		,hr=MAKE.hr({},{width:'100%',margin:'0px',padding:'0px'})
        		,contentRow=MAKE.tr({},{},[
        				MAKE.td({},{},[
        				    MAKE.table({},{borderCollapse:'collapse',width:'100%'},[
        						MAKE.tbody({},{},[
        							MAKE.tr({},{},[
        								MAKE.td({},{},[
        								    contentCell=MAKE.div({},{
        								    	overflow:'auto'
        								    })
        								])
        							])
        						])
        					])
        				])
        			])
        		,footerRow=MAKE.tr({},{},[
        				MAKE.td({},{color:'#FFF',backgroundColor:'#555'},[
        				    MAKE.table({},{borderCollapse:'collapse',width:'100%'},[
        						MAKE.tbody({},{},[
        							MAKE.tr({},{},[
        								statusCell=MAKE.td({},{})
        								,resizeCell=MAKE.td({
        									onmousedown:function(e){
        										var event=NORM.event(e);
        										DIRECTIVE='RESIZE'
        											
        										_X=GET.X(_window);
        										_Y=GET.Y(_window);
        										SET.css(mask,{
												    position:"absolute"
												    //,backgroundColor:'rgba(0,0,0,0.05)'
										    		,top:'0px'
										    		,left:'0px'
										    		,width:document.body.offsetWidth+'px'
										    		,height:document.body.offsetHeight+2000+'px'
										    	})
        										document.body.appendChild(mask)
        									}
        								
        								},{cursor:'nw-resize',width:'12px'
        									,height:'12px'
                                            ,backgroundPosition:'100% 50%'
                                            ,backgroundRepeat:'no-repeat'
                                            ,backgroundImage:"url('img/icons_resize_012.png')"})
        							])
        						])
        					])
        				])
        			])
        		/*end window layout*/
        		])
        	])
        );
        _THIS.Parent.afterSet=function(_parent){
           if(_parent!=null)_parent.appendChild(_THIS.View());
            renderView();
        }
        _THIS.Children.afterSet=function(_children){
            renderView();
        }
        var renderView=function(){
            CLASS.clearView(contentCell);
			var children=_THIS.Children();
			for(var name in children){
				//children[name].Parent(contentCell);
				contentCell.appendChild(children[name].View());
			}
			return _THIS;
		};
		
        QProperty.call(_THIS,['Title']);
        _THIS.Title.afterSet=function(_title){
        	wtitle.innerHTML=_title;
        }
        this.Title('Window');
        
        QProperty.call(this,['WindowControllers']);
        this.WindowControllers.afterSet=function(_controllers){
            CLASS.clearView(commandsCell);
            new HLayout().Parent(commandsCell).Children(_controllers).OnChildClick(function(_child){
            	_child.OnClick()(_child,_window);
            })
        }
        _THIS.WindowControllers(STANDARD_WINDOW_BUTTONS);
        
        QProperty.call(this,['Menu']);
        _THIS.Menu.afterSet=function(_controller){
            CLASS.clearView(menuCell);
            _controller.Parent(menuCell);
            menuCell.appendChild(_controller.View());
            _controller.renderView();
        }
        _THIS.Menu(STANDARD_WINDOW_MENU);
        
        QProperty.call(this,['ToolBars']);
        _THIS.ToolBars.afterSet=function(_controllers){
            CLASS.clearView(toolbarCell);
            new HLayout().Parent(toolbarCell).Children(_controllers).OnChildClick(function(_child){
            	_child.OnClick()(_child,_window);
            })
        }
        _THIS.ToolBars(STANDARD_TOOLBARS);
        
        QProperty.call(this,['OnResize']);
        _THIS.OnResize(function(){});
	
	};
	CLASS.instances=0;
	CLASS.LAST_TOP=50;
	CLASS.LAST_LEFT=50;
	WidgetStatic.call(CLASS);
	return CLASS;
})();