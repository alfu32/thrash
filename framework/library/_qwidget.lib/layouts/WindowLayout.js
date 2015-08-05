var WindowLayout = (function() {
    var CLASS = function WindowLayout() {
    	Base.call(this,['WindowLayout']);
        var _THIS = this;
        CLASS.instances++;
        CLASS.current=_THIS;
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
	    
        QProperty.call(this,['OnClose']);
	    this.OnClose(function(_window,event){});
        
        QProperty.call(this,['ContentSize']);
	    this.ContentCSS=function(_cSS){
	    	SET.css(contentCell,_cSS);
	    	return _THIS;
	    };
	    
	    this.Close=function(){
	        _THIS.OnClose()(_THIS);
        	_THIS.Parent().removeChild(_THIS.View());
        	_THIS.Parent(null);
        	   try{
        		   var trg=document.getElementById('appContainer');
        		   try{
	        		   //appContainer.filters.item('DXImageTransform.Microsoft.MotionBlur').enabled=0;
	        		   //appContainer.filters.item('DXImageTransform.Microsoft.MotionBlur').strength=50;
	        		   //appContainer.filters.item("DXImageTransform.Microsoft.Alpha").enabled = 0;
        		   }catch(err1){}
        		   try{
        			   trg.style.webkitFilter='';
        		   }catch(err1){}
        	   }catch(err){}
        }
		var STANDARD_WINDOW_BUTTONS=[
		  MIN_MAX_BUTTON=new Widget().View(MAKE.span({
			   onclick:function(event){
				   var affected=[toolbarRow,menuRow,contentRow,footerRow];
				   headCell.style.width=headCell.offsetWidth-5+'px';
				   if(MINIMIZED){
					   for(var i=0;i<affected.length;i++){
						   affected[i].style.display='';
					   }
					   MINIMIZED=false;
					   this.style.backgroundImage='url(icon.php?img=_minimize&res=32)'
				   }else{
					   for(var i=0;i<affected.length;i++){
						   affected[i].style.display='none';
					   }
					   MINIMIZED=true;
					   this.style.backgroundImage='url(icon.php?img=_maximize&res=32)'
				   }
			   }
		   },{display:'inline-block',backgroundImage:'url(icon.php?img=_minimize&res=32)',width:'32px',height:'32px'}))
		   ,CLOSE_BUTTON=new Widget().View(MAKE.span({
			   onmousedown:function(event){
				   _THIS.Close();
			   }
		   },{display:'inline-block',backgroundImage:'url(icon.php?img=_close_delete&res=32)',width:'32px',height:'32px'}))
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
		];
        var mask=MAKE.div({
		    	className:'mask'
	    		,onmousemove:function(event){
	    			var event=NORM.event(event);
	    			var x=NORM.mouseX(event),y=NORM.mouseY(event);
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
					    /*overflow:""
					    ,*/cursor:'default'
			    	})
	    			document.body.removeChild(mask)
	    		}
	    	},{
			    position:'absolute'
			    	//,background:'rgba(0,0,0,.2)'
			    /*,backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQI12NgYGAIAAAAVQBR4X1X/AAAAABJRU5ErkJggg==)"*/
	    		,top:'0px'
	    		,cursor:'default'
	    		,left:'0px'
	    		,width:'0px'
	    		,height:'0px'
	    		,cursor:'default'
	    	})
	    this.ViewElements=function(){
        	return {
        		window:_window,headRow:headRow,headCell:headCell
        		,menuRow:menuRow,toolbarRow:toolbarRow,contentRow:contentRow
        		,footerRow:footerRow
        		}
        }
        this.View(
        	_window=MAKE.table({
        		className:'WindowLayout'
        		,onmousedown:function window_focus(event){
        			if(CLASS.current!=_THIS){
        				_THIS.View().style.zIndex=CLASS.instances+50;
        				CLASS.current.View().style.zIndex=CLASS.instances+50-1;
        			}
        			CLASS.current=_THIS;
        		}
        	}
        	,{borderCollapse:'collapse',position:'absolute',
        		left:(CLASS.LAST_LEFT+=40)+'px',top:(CLASS.LAST_TOP+=40)+'px'
        		,border:'3px solid #FFF',backgroundColor:'#FFF'}
        	,[MAKE.tbody({},{},[
        		headRow=MAKE.tr({
        			onmousedown:function(){
		    			if(CLASS.lastOp!=undefined){
		    				CLASS.lastOp();
		    			}
						/*_window.style.zIndex=(32766)*/
						/*mask.style.zIndex=(32767)*/
		    			CLASS.lastOp=function(){
		    				/*_window.style.zIndex=(32000);
		    				mask.style.zIndex=(32001);*/
		    				}
        			}
		    		,onmouseup:function(event){
		    			document.body.onselectstart=null;
						SET.css(document.body,{
						    /*overflow:""
						    ,*/cursor:'default'
				    	});
						try{
							document.body.removeChild(mask);
						}catch(err){}
		    		}
	    		},{color:'#FFF',backgroundColor:'#000',cursor:'pointer'},[
        				headCell=MAKE.td({},{},[
        					MAKE.table({},{width:'100%',height:'32px'},[
        						MAKE.tbody({},{},[
        							MAKE.tr({},{},[
        								titleCell=MAKE.td({
        									align:'left'
        									,onmousedown:function(event){
        										var event=NORM.event(event);
        										DIRECTIVE='MOVE';
        										_X=NORM.mouseX(event),_Y=NORM.mouseY(event);
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
										    	document.body.onselectstart=function BODY_PREVENT_DEFAULT(event){
        											NORM.preventDefault(event);
        											NORM.stopPropagation(event);
        											return false;
        										}
        										mask.style.zIndex=CLASS.current.View().style.zIndex+1
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
        				    MAKE.table({},{borderCollapse:'collapse'},[
        						MAKE.tbody({},{},[
        							MAKE.tr({},{},[
        								MAKE.td({},{},[
        								    contentCell=MAKE.div({align:'center'},{
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
        									onmousedown:function(event){
        										var event=NORM.event(event);
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
        								
        								},{cursor:'nw-resize',width:'32px'
        									,height:'32px',backgroundImage:"url('image/resize_bk_032.png')"
        									,backgroundPosition:"0% 0%"
        									,backgroundRepeat:"no-repeat"})
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
           if(_parent!=null){
        	   try{
        		   var trg=document.getElementById('appContainer');
        		   try{
        			   /*trg.filters.item('DXImageTransform.Microsoft.MotionBlur').enabled=1;
        			   trg.filters.item('DXImageTransform.Microsoft.MotionBlur').strength=50;*/
        			   /*trg.style.cssText='progid:DXImageTransform.Microsoft.MotionBlur(enabled=1 strength=50)';
	        		   
	        		    * 
	        		   trg.filters[0].enabled=1;
	        		   trg.filters[0].opacity=50;*/
	        		     /*trg.filters.item("DXImageTransform.Microsoft.Alpha").Enabled=1;
	        		   trg.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=50;
	        		   trg.filters.item("DXImageTransform.Microsoft.BasicImage").Enabled=1;
	        		   trg.filters.item("DXImageTransform.Microsoft.BasicImage").Grayscale=1;
	        		   trg.filters.item("DXImageTransform.Microsoft.Blur").Enabled=1;
	        		   trg.filters.item("DXImageTransform.Microsoft.Blur").PixelRadius=5;
	        		 trg.filters.item("DXImageTransform.Microsoft.Alpha").enabled = 1;*/
        		   }catch(err1){alert(err1)}
        		   try{
        			   //trg.style.webkitFilter='blur(4px) grayscale(0.2) opacity(0.8)';
        			   _THIS.View().style.boxShadow='#000000 0px 2px 64px';
        		   }catch(err1){}
        	   }catch(err){}
        	   _parent.appendChild(_THIS.View());
           }
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