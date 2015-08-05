EditableTable=(function(){
	var CLASS=function EditableTable(){
    	Base.call(this,['EditableTable']);
		var _THIS=this;
		var shadow=[];
		var InstanceViewWidth=null;
		Widget.call(this);
		
		
        /* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(true);
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar({timing:100});
        /* END PROGRESSBAR */
		
		_THIS.Parent.afterSet=function(_parent){
        	_parent.appendChild(_THIS.View())
        	/* BEGIN Async */
        	if(_THIS.Async()){
        		renderView_async({finished:false,index:-1});
        	}else{
        		renderView({finished:false,index:-1});
        	}
        	/* END Async */
		}
		QProperty.call(this,['Editable']);
		_THIS.Editable.afterSet=function(_editable){
			var tagNames={'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}
			var inp;
			inp=_THIS.View().getElementsByTagName('input');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
					//delete inp[i].disabled;
				}else{
					inp[i].disabled=true;
				}
			}
			inp=_THIS.View().getElementsByTagName('select');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
					//delete inp[i].disabled;
				}else{
					inp[i].disabled=true;
				}
			}
			inp=_THIS.View().getElementsByTagName('textarea');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
					delete inp[i].disabled;
				}else{
					inp[i].disabled=true;
				}
			}
		}
		QProperty.call(this,['RecordController']);
		_THIS.RecordController([]);
		_THIS.RecordController.Widgets=[];
		_THIS.RecordController.WithAll=function(f){
			for(var i=0;i<_THIS.RecordController.Widgets.length;i++){
				f(_THIS.RecordController.Widgets,i);
			}
		}
		QProperty.call(this,['TableController']);
		_THIS.TableController([
		    function Title(_EDITABLE_TABLE,_table,_shadow,headSectionView){
		    	return MAKE.tr({},{},[MAKE.th({
		    			colSpan:_table[0].length
		    			,innerHTML:"Table",align:'left'}
		    			,{fontSize:"44px",fontFamily:"thinerFont",padding:'12px'})])
		    	}
		    ]);
		QProperty.call(this,['ButtonTemplates'])
		_THIS.ButtonTemplates.afterSet=function(dict){
			_THIS.ButtonTemplatesCount=(function(){var cnt=0;for(var i in dict){cnt++};return cnt;})()
		}
		_THIS.ButtonTemplatesCount=0
		QProperty.call(this,['Controllers'])
		_THIS.Controllers(new HLayout())
		QProperty.call(this,['SectionForIndex'])
		_THIS.SectionForIndex(function(table,rowIndex){
			var w=new Widget().View(MAKE.div({innerHTML:''},{display:'none'}))
			w.title='Section'
			return w;});
		
		_THIS.indexOf=function(column_id_or_title){
			var table=_THIS.Data();
			for(var i=0;i<table[0].length;i++){
				if(table[0][i]==column_id_or_title)return i;
				if(table[4][i]==column_id_or_title)return i;
			}
		}
		QProperty.call(this,['Data'])
		_THIS.Data([[]])
		_THIS.Data.afterSet=function(_table){
			
			for(var i=0;i<_table.length;i++){
				shadow[i]=[]
				for(var j=0;j<_table[i].length;j++){
					shadow[i][j]=_table[i][j]
				}
			}
        	/* BEGIN Async */
        	if(_THIS.Async()){
        		renderView_async({finished:false,index:-1});
        	}else{
        		renderView({finished:false,index:-1});
        	}
        	/* END Async */
		}
		//var tbody;
		var table;
		_THIS.View(table=MAKE.table({className:'EditableTable'},{borderCollapse:'collapse'},[
		    //tbody=MAKE.tbody({},{})
		]))
		var CHANGE_MODEL=function(old,table,row,col,values,ref){
	        			return function(event){
	        				return;
	        				old[row][col]=table[row][col]
	        				if(table[1][col]=='enum'){
	        					table[row][col]=values[ref.value];
	        				}
							else{
								table[row][col]=ref.value;
							}
	        			};
	        		}
		QProperty.call(this,['Title'])
		_THIS.Title(CLASS.STANDARD.SECTION_TITLE());
		
        /***************************************************************************************************************************************/
		var _SECTIONS={}
		var ctimeout;
		var sectionTitle='MainSection',lastSectionTitle='MainSection';
        var renderView_async=function(state){
			var _table=_THIS.Data();
			//process sections
			if(state.index==-1){
				CLASS.clearView(table);
				_SECTIONS={}
        		progressbar.show(_THIS.Parent());
        		progressbar.progress(0);
				_THIS.RecordController.Widgets=[];
				sectionTitle='MainSection',lastSectionTitle='MainSection';
        		clearTimeout(ctimeout);
				ctimeout=setTimeout(function(){renderView_async({index:5,finished:false})},1);
				return _THIS;
			}
			var i=state.index;
            progressbar.progress(parseInt(state.index)*100/_table.length);
			if(i<_table.length){
				var tbody;
				var sID=_THIS.SectionForIndex()(_table,i).title;
				if(_THIS.SectionForIndex()(_table,i)==undefined){sID='';}
				if(_SECTIONS[sID]===undefined){
					_SECTIONS[sID]=MAKE.tbody({},{},[
						MAKE.tr({align:'center'},{}
							,[MAKE.td(
								{colSpan:_table[0].length/*+_THIS.ButtonTemplatesCount*/
								,className:"TableSectionTitle"}
							,{backgroundColor:"#333336",color:"#EEF",padding:'4px',fontSize:'18px'}
							,[_THIS.SectionForIndex()(_table,i).View()])
							])
						].concat(_THIS.Title()(_THIS,_SECTIONS,_THIS.SectionForIndex()(_table,i).title)));
				}
				tbody=_SECTIONS[sID];
				var r=MAKE.tr({},{},[]);
				
				for(var j=0;j<_table[0].length;j++){
				var cell=MAKE.td({},{display:'',padding:'4px',overflow:((_table[1][j]=='KVpair')?'hidden':'')});
				
					var view,menum=deserializeDict(_table[2][j],'=','&');
					switch(_table[1][j]/* column type */){
						case 'hiddenList':
							var W=new WindowLayout().Children([LV=new ListView2().ItemAtIndex(function(LV,index){
								
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@'))]).Parent(document.body);
							SET.css(W.View(),{boxShadow:'0px 0px 12px #000',display:'none'})
							SET.css(LV.View(),{
								//zIndex:'16384',boxShadow:'0px 0px 12px #000'
								//,display:'none'
								//,position:'absolute',left:'0px'
								//,top:'0px',padding:'3px'
									//,
									backgroundColor:'#FFF'
								//,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:function(){
								this.style.display='none';
							}})
							view=(function(listView,WIN,title){
								var show=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										listView.View().style.display='';
										var x=document.body.scrollLeft+window.screen.width>>1-WIN.View().offsetWidth>>1
											//GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=document.body.scrollTop+window.screen.height>>1-WIN.View().offsetHeight>>1
											//GET.Y(this)+this.offsetHeight;
										WIN.Title(title)//'rq['+row[0]+']'+row[1]
										SET.css(
											WIN.View()
											,{display:''
											,position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV,W,_table[i][0]+':'+_table[0][j]);
						case 'list':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{zIndex:'16384',boxShadow:'0px 0px 12px #000'
								,display:'none'
								,position:'absolute',left:'0px'
								,top:'0px',padding:'3px',backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:(function(listView){return function(){
								this.style.display='none';
								listView.SHOWABLE=true;
							}})(LV)})
							view=(function(listView){
								listView.SHOWABLE=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										if(listView.SHOWABLE){
											listView.View().style.display='';
											listView.SHOWABLE=false
										}
										else {
											listView.View().style.display='none';
											listView.SHOWABLE=true;
										}
										var x=GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=GET.Y(this)+this.offsetHeight;
										SET.css(
											listView.View()
											,{
											position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV);
				        		break;
						case 'infolist':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{
								backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							view=LV.View();
				        		break;
						case 'KVpair':
							var kv=_table[i][j].split('=');
							
							var key,binome={}
							binome[key=kv[0]]=kv[1]
							cell.appendChild(MAKE.input({value:kv[0]},{display:'none'}))
							view=MAKE.div({innerHTML:kv[1]})
				        		break;
						case 'enum':
							menum=deserializeDict(_table[2][j],'=','&');
							view=new SelectView()
				        		.SelectedValue(_table[i][j])
				        		.Data(menum)
				        		.View()
				        	//view.option[parseInt(3)].selected=true;
				        		break;
						case 'checkbox':
							view=MAKE.input({
										type:'checkbox'
									})
								document.body.appendChild(view);
								view.value=_table[i][j]=='1'?1:0;
								if(_table[i][j]==1)view.checked=true;
								document.body.removeChild(view);
				        		break;
						case 'label':
							view=MAKE.div({
								innerHTML:_table[i][j]
							})
				        		break;
						case 'field':
							view=MAKE.input({
								value:_table[i][j]
							})
				        		break;
						case 'text':
							view=MAKE.textarea({
								value:_table[i][j]
							})
				        		break;
						case 'date':
							view=MAKE.input({
								value:_table[i][j]
							,onmousemove:function(event){
								var x=28+NORM.mouseX(event)-this.offsetWidth;
								SET.css(this,{cursor:x>0?'pointer':''});
								//this.value=x;
							}
							,onmousedown:(function(table,row,col){return function(event){
								var x=28+NORM.mouseX(event)-this.offsetWidth;
								var cal;
								if(x>0){
									var _this=this;
	        						var p,ct,c=new Calendar(_this).Date(new Date())
	        							.OnClose(function(calRef){p.hide()});
	        						p=new Popover(this,53000)
	        							.OnClose(function(ref){_this.disabled=false})
		        						//.TouchToClose(false)
		        						.Node(ct=MAKE.div())
		        						.Size({x:340,y:360})
	        							.Icon(Popover.ICONS.QUESTION)
								    	p.align(_this,true)
								    	c.Parent(ct);
								    	SET.css(c.View(),{backgroundColor:'',border:''});
								    	c.show();
								}
							}})(_table,i,j)
							,onchange:(function(table,row,col){return function(event){
								
							}})(_table,i,j)
							},{
								backgroundImage:'url(image/calendar_mini.jpg)'
								,backgroundRepeat:'no-repeat'
								,backgroundPosition:'100% 50%'})
							break;
						default:
							view=MAKE.div({innerHTML:_table[i][j]})
						}
					if((view.tagName+"").toUpperCase() in {'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}){
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.disabled=true;
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								view.disabled=true;
								//view=MAKE.div({innerHTML:_table[i][j]})
								break;
							case 'RW':
								break;
						}
					}else{
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								break;
							case 'RW':
								break;
						}
					}
					/*var btn=MAKE.button(
							{innerHTML:CLASS.STRINGS['ADMIN_TNT.LABEL.VALIDATE'],onmousedown:(
								function(button,o,t,r,c,_e,v){
									return function(event){
										CHANGE_MODEL(o,t,r,c,_e,v)(event)
										this.style.display='none'
											v.parentNode.style.backgroundColor="#FF0033";
									}
								})(btn,shadow,_table,i,j,menum,view)
							}
							,{display:'none'})*/
					if(_table[1][j]!='enum' || true){
						view.onchange=(function(o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								//CHANGE_MODEL(o,t,r,c,_e,v)(event)
							}
						})(shadow,_table,i,j,menum,view)
					}else{
						view.onchange=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								//CHANGE_MODEL(o,t,r,c,_e,v)(event)
							}
						})(shadow,_table,i,j,menum,view)
						view.onmouseout=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								return;
								this.blur();
							}
						})(shadow,_table,i,j,menum,view)
					}
						
					cell.appendChild(view)
					//if(_table[4][j]=='H')
						r.appendChild(cell);
					//tbody.appendChild(r);
					//if(_table[1][j]=='KVpair')view.style.width=cell.offsetWidth+40+'px'
					//tbody.removeChild(r);
				}
				var plugins=_THIS.RecordController();
				_THIS.RecordController.Widgets[_THIS.RecordController.Widgets.length]=(function(p){return p;})(plugins);
				var c,lastButton,lastName;
				for(var name in plugins){
					if(name=='length')continue;
					c=MAKE.td({},{
						//padding:'4px',
						borderTop:'2px solid #A0A0FF',
						borderBottom:'2px solid #A0A0FF',
						cursor:'pointer',
						backgroundColor:"#C0C0FF"
						})
					plugins[name](_table,shadow,i,r).Parent(c);
					r.appendChild(c)
					lastButton=c;
				}
				if(lastButton!=undefined)SET.css(lastButton,{borderRight:'2px solid #A0A0FF'})
				tbody.appendChild(r);
				r.style.backgroundColor=((tbody.children.length)%2?'#FFFFFF':'#E0F0FF');
				
				i++;
				state.index=i;
				
				ctimeout=setTimeout(function(){renderView_async(state)},10);
				
			}else{
				
            	setTimeout(function(){progressbar.hide();},10);
            	
				var tbody_ctrl=MAKE.tbody({className:'TableControllersSection'}
				,[MAKE.tr({}
					,{borderLeft:'1px solid #999',borderRight:'1px solid #999',borderTop:'1px solid #999'},[])])
				table.appendChild(tbody_ctrl);
				
				var _tablePlugins=_THIS.TableController();
					var _head,_headFirst=true;
					for(var i=0;i<_tablePlugins.length;i++){
						if(_table[0].length==0)continue;
						var _head=MAKE.tr({colSpan:_table[0].length,align:'center'}
							,{borderLeft:'1px solid #999',borderRight:'1px solid #999'});
						
							tbody_ctrl.appendChild(_tablePlugins[i](_THIS,_table,shadow,tbody_ctrl))//.Parent(tbody_ctrl);
					}
					//_THIS.Controllers().Parent(tbody_ctrl);
					var maxwidth=0;
				for(var s in _SECTIONS){
					table.appendChild(_SECTIONS[s])
					if(maxwidth<_SECTIONS[s].offsetWidth){
						maxwidth=_SECTIONS[s].offsetWidth;
					}
				}
				for(var s in _SECTIONS){
					_SECTIONS[s].children[0].children[0].children[0].style.width=maxwidth+'px';
					break;
				}
			}
			return _THIS;
		}
		/***************************************************************************************************************************************/
		var renderView=function(index){
			var _table=_THIS.Data();
			//process sections
			CLASS.clearView(table);
			var _SECTIONS={}
			for(var i=5;i<_table.length;i++){
				var sectionTitle=_THIS.SectionForIndex()(_table,i).title
				_SECTIONS[sectionTitle]=MAKE.tbody({},{},[
				MAKE.tr({align:'center'},{}
					,[MAKE.td(
						{colSpan:_table[0].length/*+_THIS.ButtonTemplatesCount*/
						,className:"TableSectionTitle"}
					,{backgroundColor:"#333336",color:"#EEF",padding:'4px',fontSize:'18px'}
					,[_THIS.SectionForIndex()(_table,i).View()])
					])
				].concat(_THIS.Title()(_THIS,_SECTIONS,_THIS.SectionForIndex()(_table,i).title)))
			}
			_THIS.RecordController.Widgets=[];
			var _table=_THIS.Data();
			/*if(index==undefined){
				var _tablePlugins=_THIS.TableController();
				var _head,_headFirst=true;
				for(var i=0;i<_tablePlugins.length;i++){
					if(_table[0].length==0)continue;
					var _head=MAKE.th({colSpan:_table[0].length,align:'center'}
						,{borderLeft:'1px solid #999',borderRight:'1px solid #999'});
					if(_headFirst){
						_headFirst=false;
						SET.css(_head,{borderTop:'1px solid #999'});
						var q=_tablePlugins[i](_table,shadow,_THIS)
						q.Parent(_head);
						tbody.appendChild(_head)
					}
				}
				_THIS.Controllers().Parent(tbody);
				if(_THIS.SectionForIndex()(_table,0)=='MainSection')
					tbody.appendChild(Title())
			}*/
			var sectionTitle='MainSection',lastSectionTitle='MainSection';
			/*if(_table.length<=5){
				_table[5]=[];
				for(var i=0;i<_table[0].length;i++)_table[5][i]=_table[2][i].split('=')[0]
			}*/
			for(var i=5;i<_table.length;i++){
				var tbody=_SECTIONS[_THIS.SectionForIndex()(_table,i).title];
				//tbody.appendChild(_THIS.Title()(_THIS,_SECTIONS,_THIS.SectionForIndex()(_table,i).title))
				if(index!=undefined){
					i=index;
				}
				var r;
				
				if(index==undefined){
					r=MAKE.tr({},{},[]);
				}
				else{
					r=tbody.children[index-5];
					CLASS.clearView(r)//border:'1px solid #000'
				}
				for(var j=0;j<_table[0].length;j++){
				var cell=MAKE.td({}
					,{display:'',padding:'4px'
						//,borderLeft:j>0?'1px solid #888':''
						,overflow:((_table[1][j]=='KVpair')?'hidden':'')});
				
					var view,menum=deserializeDict(_table[2][j],'=','&');
					switch(_table[1][j]/* column type */){
						case 'hiddenList':
							var W=new WindowLayout().Children([LV=new ListView2().ItemAtIndex(function(LV,index){
								
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@'))]).Parent(document.body);
							SET.css(W.View(),{boxShadow:'0px 0px 12px #000',display:'none'})
							SET.css(LV.View(),{
								//zIndex:'16384',boxShadow:'0px 0px 12px #000'
								//,display:'none'
								//,position:'absolute',left:'0px'
								//,top:'0px',padding:'3px'
									//,
									backgroundColor:'#FFF'
								//,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:function(){
								this.style.display='none';
							}})
							view=(function(listView,WIN,title){
								var show=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										listView.View().style.display='';
										var x=document.body.scrollLeft+window.screen.width>>1-WIN.View().offsetWidth>>1
											//GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=document.body.scrollTop+window.screen.height>>1-WIN.View().offsetHeight>>1
											//GET.Y(this)+this.offsetHeight;
										WIN.Title(title)//'rq['+row[0]+']'+row[1]
										SET.css(
											WIN.View()
											,{display:''
											,position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV,W,_table[i][0]+':'+_table[0][j]);
						case 'list':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{zIndex:'16384',boxShadow:'0px 0px 12px #000'
								,display:'none'
								,position:'absolute',left:'0px'
								,top:'0px',padding:'3px',backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:(function(listView){return function(){
								this.style.display='none';
								listView.SHOWABLE=true;
							}})(LV)})
							view=(function(listView){
								listView.SHOWABLE=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										if(listView.SHOWABLE){
											listView.View().style.display='';
											listView.SHOWABLE=false
										}
										else {
											listView.View().style.display='none';
											listView.SHOWABLE=true;
										}
										var x=GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=GET.Y(this)+this.offsetHeight;
										SET.css(
											listView.View()
											,{
											position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV);
				        		break;
						case 'infolist':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{
								backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							view=LV.View();
				        		break;
						case 'KVpair':
							var kv=_table[i][j].split('=');
							
							var key,binome={}
							binome[key=kv[0]]=kv[1]
							cell.appendChild(MAKE.input({value:kv[0]},{display:'none'}))
							view=MAKE.div({innerHTML:kv[1]})
				        		break;
						case 'enum':
							menum=deserializeDict(_table[2][j],'=','&');
							view=new SelectView()
				        		.SelectedValue(_table[i][j])
				        		.Data(menum)
				        		.View()
				        	//view.option[parseInt(3)].selected=true;
				        		break;
						case 'checkbox':
							view=MAKE.input({
										type:'checkbox'
									})
								document.body.appendChild(view);
								view.value=_table[i][j]=='1'?1:0;
								if(_table[i][j]==1)view.checked=true;
								document.body.removeChild(view);
				        		break;
						case 'label':
							view=MAKE.div({
								innerHTML:_table[i][j]
							})
				        		break;
						case 'field':
							view=MAKE.input({
								value:_table[i][j]
							})
				        		break;
						case 'text':
							view=MAKE.textarea({
								value:_table[i][j]
							})
				        		break;
						case 'date':
							view=MAKE.input({
								value:_table[i][j]
							,onmousemove:function(event){
								var x=28+NORM.mouseX(event)-this.offsetWidth;
								SET.css(this,{cursor:x>0?'pointer':''});
								//this.value=x;
							}
							,onmousedown:(function(table,row,col){return function(event){
								var x=28+NORM.mouseX(event)-this.offsetWidth;
								var cal;
								if(x>0){
									var _this=this;
	        						var p,ct,c=new Calendar(_this).Date(new Date())
	        							.OnClose(function(calRef){p.hide()});
	        						p=new Popover(this,53000)
	        							.OnClose(function(ref){_this.disabled=false})
		        						//.TouchToClose(false)
		        						.Node(ct=MAKE.div())
		        						.Size({x:340,y:360})
	        							.Icon(Popover.ICONS.QUESTION)
								    	p.align(_this,true)
								    	c.Parent(ct);
								    	SET.css(c.View(),{backgroundColor:'',border:''});
								    	c.show();
								}
							}})(_table,i,j)
							,onchange:(function(table,row,col){return function(event){
								
							}})(_table,i,j)
							},{
								backgroundImage:'url(image/calendar_mini.jpg)'
								,backgroundRepeat:'no-repeat'
								,backgroundPosition:'100% 50%'})
							break;
						default:
							view=MAKE.div({innerHTML:_table[i][j]})
						}
					if((view.tagName+"").toUpperCase() in {'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}){
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.disabled=true;
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								view.disabled=true;
								//view=MAKE.div({innerHTML:_table[i][j]})
								break;
							case 'RW':
								break;
						}
					}else{
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								break;
							case 'RW':
								break;
						}
					}
					/*var btn=MAKE.button(
							{innerHTML:CLASS.STRINGS['ADMIN_TNT.LABEL.VALIDATE'],onmousedown:(
								function(button,o,t,r,c,_e,v){
									return function(event){
										CHANGE_MODEL(o,t,r,c,_e,v)(event)
										this.style.display='none'
											v.parentNode.style.backgroundColor="#FF0033";
									}
								})(btn,shadow,_table,i,j,menum,view)
							}
							,{display:'none'})*/
					if(_table[1][j]!='enum' || true){
						view.onchange=(function(o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								//CHANGE_MODEL(o,t,r,c,_e,v)(event)
							}
						})(shadow,_table,i,j,menum,view)
					}else{
						view.onchange=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								//CHANGE_MODEL(o,t,r,c,_e,v)(event)
							}
						})(shadow,_table,i,j,menum,view)
						view.onmouseout=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								return;
								this.blur();
							}
						})(shadow,_table,i,j,menum,view)
					}
						
					cell.appendChild(view)
					//if(_table[4][j]=='H')
						r.appendChild(cell);
					//tbody.appendChild(r);
					//if(_table[1][j]=='KVpair')view.style.width=cell.offsetWidth+40+'px'
					//tbody.removeChild(r);
				}
				var plugins=_THIS.RecordController();
				_THIS.RecordController.Widgets[_THIS.RecordController.Widgets.length]=(function(p){return p;})(plugins);
				var c,lastButton,lastName;
				for(var name in plugins){
					if(name=='length')continue;
					c=MAKE.td({},{
						//padding:'4px',
						borderTop:'2px solid #A0A0FF',
						borderBottom:'2px solid #A0A0FF',
						cursor:'pointer',
						backgroundColor:"#C0C0FF"
						})
					plugins[name](_table,shadow,i,r).Parent(c);
					r.appendChild(c)
					lastButton=c;
				}
				if(lastButton!=undefined)SET.css(lastButton,{borderRight:'2px solid #A0A0FF'})
				if(index!=undefined){
					//r.style.backgroundColor="#FF0";
					i=_table.length;
				}else{
					tbody.appendChild(r);
					r.style.backgroundColor=((tbody.children.length)%2?'#FFFFFF':'#E0F0FF')
				}
			}
			var tbody_ctrl=MAKE.tbody({className:'TableControllersSection'}
			,[MAKE.tr({}
				,{borderLeft:'1px solid #999',borderRight:'1px solid #999',borderTop:'1px solid #999'},[])])
			table.appendChild(tbody_ctrl);
			
			var _tablePlugins=_THIS.TableController();
				var _head,_headFirst=true;
				for(var i=0;i<_tablePlugins.length;i++){
					if(_table[0].length==0)continue;
					var _head=MAKE.tr({colSpan:_table[0].length,align:'center'}
						,{borderLeft:'1px solid #999',borderRight:'1px solid #999'});
					
						tbody_ctrl.appendChild(_tablePlugins[i](_THIS,_table,shadow,tbody_ctrl))//.Parent(tbody_ctrl);
				}
				//_THIS.Controllers().Parent(tbody_ctrl);
				var maxwidth=0;
			for(var s in _SECTIONS){
				table.appendChild(_SECTIONS[s])
				if(maxwidth<_SECTIONS[s].offsetWidth){
					maxwidth=_SECTIONS[s].offsetWidth;
				}
			}
			for(var s in _SECTIONS){
				_SECTIONS[s].children[0].children[0].children[0].style.width=maxwidth+'px';
				break;
			}
			return _THIS;
		}
		this.refreshRowAtIndex=function(index){
			renderView(index);
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS);
	CLASS.STANDARD={}
	CLASS.STANDARD.COMMIT=function(_table,_shadow,rowIndex,rowView){
		return function(reqBodyReference){
			for(var i=0;i<_table[4].length;i++){
				rowView.children[i].style.background='';
				_table[rowIndex][i]=rowView.children[i].children[0].value==undefined
					?_table[rowIndex][i]:rowView.children[i].children[0].value;
				(reqBodyReference[0])[_table[4][i]]=_table[rowIndex][i];
				(reqBodyReference[0])['old_'+_table[4][i]]=_shadow[rowIndex][i];
				rowView.children[i].style.backgroundColor='';
			}
		}
	}
	CLASS.STANDARD.SECTION_CONTROLLER=function(NAME_FUNCTION){
		var NF=NAME_FUNCTION||function(table,rowIndex){return table[rowIndex][1]};
		return function _GETSECTION(table,rowIndex){
			var title=NF(table,rowIndex);
			var w=new Widget().View(
				MAKE.div({
					innerHTML:title
					,onclick:function(event){
						var refs=this.parentNode.parentNode.parentNode.children;
						var visible=(this.style.backgroundImage+'').indexOf('icon.php?img=up_empty&type=1_Desktop')>-1;
						for(var i=1;i<refs.length;i++){
							if(visible){
								this.style.backgroundImage='url(icon.php?img=down&type=1_Desktop)';
								refs[i].style.display='none';
							}else{
								this.style.backgroundImage='url(icon.php?img=up_empty&type=1_Desktop)';
								refs[i].style.display='';
							}
						}
					},align:'left'
				},{
					backgroundImage:'url(icon.php?img=up_empty&type=1_Desktop)'
					,backgroundPosition:'100% 50%',cursor:'pointer'
					,backgroundRepeat:'no-repeat',width:'100%',fontSize:"28px",fontFamily:"thinFont"}
					,[MAKE.div({},{borderBottom:'1px solid #888'
					,margin:'0px',padding:'0px'})]
				));
			w.title=title;
			return w;
		}
	}
	CLASS.STANDARD.SECTION_TITLE=function(){
		return function(context,sections,sectionName){
			var tb=context.Data()[0]
			var ar=context.Data()[3]
			var inf=[]
			for(var i=0;i<tb.length;i++){
				var e=MAKE.th({innerHTML:tb[i]},{border:'1px solid #999'})
				if(ar[i]=='H')e.innerHTML='';
				inf[inf.length]=e
			}
			return [MAKE.tr({},{backgroundColor:"#999",border:'1px solid #999'},inf)]
		};
	}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS={}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS.ON_TEXT_CONTENT=function(context,sections,sectionName){
		var names=context.Data()[0];
		var access=context.Data()[3];
		var types=context.Data()[1];
		var data=context.Data();
		var values=context.Data()[2];
		var cols=[];
		for(var i=5;i<data.length;i++){
			var r=data[i];
			for(var j=0;j<r.length;j++){
				if(cols[j]==undefined)cols[j]={'':''};
				cols[j][data[i][j]]=data[i][j];
			}
		}
		var filterRow=[];
		var FILTERS=[];
		for(var i=0;i<names.length;i++){
			FILTERS[i]='';
			var name=MAKE.th({innerHTML:names[i]},{border:'1px solid #999'});
			
			var selector=new SelectView()
				.Data(cols[i])/*cols[i]*/
				.OnChange((function(_section,sectionName,col,sel){
					return function(link,_view,index,value){
						setTimeout(function(){
							var _section=sections[sectionName].children;
							var k=0;
							FILTERS[col]=_view.selected.trim();
							for(var i=3;i<_section.length;i++){
								var rowVisible=1;
								for(var j=0;j<_section[i].children.length-1;j++){
									var cell=_section[i].children[j];
									var cellText=cell.children[0]?(cell.children[0].value?cell.children[0].value:cell.innerHTML):cell.innerHTML;
									rowVisible*=((cellText.trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
								};
								if(rowVisible){
									SET.css(_section[i],{
										display:''
										,backgroundColor:k%2?'#FFFFFF':'#E0F0FF'
									})
									k++;
								}else{
									_section[i].style.display='none';
								}
							}
						},1);
					}
				})(sections,sectionName,i,selector));
			var filter=MAKE.th({},{},[selector.View()])
			if(access[i]=='H'){
				name.innerHTML='';
				filter.innerHTML='';
			}
			filterRow[filterRow.length]=filter
		}
		
		return [MAKE.tr({},{},filterRow)];
	}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS.ON_KVPAIRS=function(context,sections,sectionName){
		var names=context.Data()[0];
		var access=context.Data()[3];
		var types=context.Data()[1];
		var data=context.Data();
		var values=context.Data()[2];
		var filterRow=[];
		var FILTERS=[];
		for(var i=0;i<names.length;i++){
			FILTERS[i]='';
			var name=MAKE.th({innerHTML:names[i]},{border:'1px solid #999'});
			var selector=new SelectView()
				.Data(deserializeDict('*=&'+values[i],'=','&'))
				.OnChange((function(_section,sectionName,col,sel){
					return function(link,_view,index,value){
						setTimeout(function(){
							var _section=sections[sectionName].children;
							var k=0;
							FILTERS[col]=_view.selected.trim();
							for(var i=3;i<_section.length;i++){
								var rowVisible=1;
								for(var j=0;j<_section[i].children.length-1;j++){
									rowVisible*=((((_section[i].children[j].innerText||_section[i].children[j].textContent)+'').trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
									
								}
								if(rowVisible){
									SET.css(_section[i],{display:'',backgroundColor:k%2?'#FFFFFF':'#E0F0FF'})
									k++;
								}else{
									_section[i].style.display='none';
								}
							}
						},1);
					}
				})(sections,sectionName,i,selector));
			var filter=MAKE.th({},{},[selector.View()])
			if(access[i]=='H'){
				name.innerHTML='';
				filter.innerHTML='';
			}
			filterRow[filterRow.length]=filter
		}
		
		return [MAKE.tr({},{backgroundColor:'#FFF'},filterRow)];
	}
	CLASS.STRINGS_FETCH('EditableTable',['ADMIN_TNT.LABEL.VALIDATE','PORTAIL.ENUM.LABEL.ALL','PORTAIL.ENUM.LABEL.EVERY','PORTAIL.ENUM.LABEL.NONE']);
	return CLASS;
})();


/**********************************************************************************************************************************************************/
/******************************************************** EDITABLE TABLE 2 ********************************************************************************/
/**********************************************************************************************************************************************************/


EditableTable2=(function(){
	var CLASS=function EditableTable2(){
    	Base.call(this,['EditableTable2']);
		var _THIS=this;
		var shadow=[];
		var InstanceViewWidth=null
		Widget.call(this);
		
        /* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(true);
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar({timing:100});
        /* END PROGRESSBAR */
        
		
		_THIS.Parent.beforeSet=function(_parent){
			renderView();
			setTimeout(function(){_parent.appendChild(_THIS.View)},15)
		}
		/*_THIS.View.beforeGet=function(_view){
			renderView();
		}*/
		QProperty.call(this,['Editable']);
		_THIS.Editable.afterSet=function(_editable){
			var tagNames={'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}
			var inp;
			inp=_THIS.View().getElementsByTagName('input');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
				}else{
					inp[i].disabled=true;
				}
			}
			inp=_THIS.View().getElementsByTagName('select');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
					//delete inp[i].disabled;
				}else{
					inp[i].disabled=true;
				}
			}
			inp=_THIS.View().getElementsByTagName('textarea');
			for(var i=0;i<inp.length;i++){
				if(_editable){
					inp[i].disabled=(false);
					inp[i].disabled=null;
					inp[i].disabled=undefined;
					delete inp[i].disabled;
				}else{
					inp[i].disabled=true;
				}
			}
		}
		QProperty.call(this,['RecordController']);
		_THIS.RecordController([/*
		    function(_table,_shadow,rowIndex,tableRow){
		    	return new Widget().View(MAKE.button(
		    		{innerHTML:'...'
		    		,onclick:function(){
		    			alert(_table[rowIndex][0]+' is '+_table[3][0])
		    		}}))
		    }*/]);
		_THIS.RecordController.Widgets=[];
		_THIS.RecordController.WithAll=function(f){
			for(var i=0;i<_THIS.RecordController.Widgets.length;i++){
				f(_THIS.RecordController.Widgets,i);
			}
		}
		QProperty.call(this,['TableController']);
		_THIS.TableController([
		    function Title(_EDITABLE_TABLE,_table,_shadow,headSectionView){
		    	return MAKE.tr({},{},[MAKE.th({
		    			colSpan:_table[0].length
		    			,innerHTML:"Table",align:'left'}
		    			,{fontSize:"44px",fontFamily:"thinerFont",padding:'12px'})])
		    	}
		    ]);
		QProperty.call(this,['ButtonTemplates'])
		_THIS.ButtonTemplates.afterSet=function(dict){
			_THIS.ButtonTemplatesCount=(function(){var cnt=0;for(var i in dict){cnt++};return cnt;})()
		}
		_THIS.ButtonTemplatesCount=0
		QProperty.call(this,['Controllers'])
		_THIS.Controllers(new HLayout())
		QProperty.call(this,['SectionForIndex'])
		_THIS.SectionForIndex(function(table,rowIndex){
			var w=new Widget().View(MAKE.div({innerHTML:''},{display:'none'}))
			w.title='Section'
			return w;});
		/*
		QProperty.call(this,['SectionsCount'])
		_THIS.SectionsCount(function(){return 1})
		*/
		_THIS.indexOf=function(column_id_or_title){
			var table=_THIS.Data();
			for(var i=0;i<table[0].length;i++){
				if(table[0][i]==column_id_or_title)return i;
				if(table[4][i]==column_id_or_title)return i;
			}
		}
		QProperty.call(this,['Data'])
		_THIS.Data([[]])
		_THIS.Data.afterSet=function(_table){
			
			for(var i=0;i<_table.length;i++){
				shadow[i]=[]
				for(var j=0;j<_table[i].length;j++){
					shadow[i][j]=_table[i][j]
				}
			}
			renderView();
		}
		//var tbody;
		var table;
		_THIS.View(table=MAKE.table({className:'EditableTable'},{borderCollapse:'collapse'},[
		    //tbody=MAKE.tbody({},{})
		]))
		QProperty.call(this,['Title'])
		_THIS.Title(CLASS.STANDARD.SECTION_TITLE())
		var renderView=function(index){
			var _table=_THIS.Data();
			//process sections
			CLASS.clearView(table);
			var _SECTIONS={}
			for(var i=5;i<_table.length;i++){
				var sectionTitle=_THIS.SectionForIndex()(_table,i).title
				_SECTIONS[sectionTitle]=MAKE.tbody({},{},[
				MAKE.tr({align:'center'},{}
					,[MAKE.td(
						{colSpan:_table[0].length/*+_THIS.ButtonTemplatesCount*/
						,className:"TableSectionTitle"}
					,{backgroundColor:"#333336",color:"#EEF",padding:'4px',fontSize:'18px'}
					,[_THIS.SectionForIndex()(_table,i).View()])
					])
				].concat(_THIS.Title()(_THIS,_SECTIONS,_THIS.SectionForIndex()(_table,i).title)))
			}
			_THIS.RecordController.Widgets=[];
			var _table=_THIS.Data();
			var sectionTitle='MainSection',lastSectionTitle='MainSection';
			
			for(var i=5;i<_table.length;i++){
				var tbody=_SECTIONS[_THIS.SectionForIndex()(_table,i).title];
				if(index!=undefined){i=index;}
				var r;
				if(index==undefined){r=MAKE.tr({},{},[]);}
				else{
					r=tbody.children[index-5];
					CLASS.clearView(r)//border:'1px solid #000'
				}
				for(var j=0;j<_table[0].length;j++){
				var cell=MAKE.td({}
					,{display:'',padding:'4px'
						,overflow:((_table[1][j]=='KVpair')?'hidden':'')});
				
					var view,menum=deserializeDict(_table[2][j],'=','&');
					
					
					switch(_table[1][j]/* column type */){
						case 'hiddenList':
							var W=new WindowLayout().Children([LV=new ListView2().ItemAtIndex(function(LV,index){
								
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@'))]).Parent(document.body);
							SET.css(W.View(),{boxShadow:'0px 0px 12px #000',display:'none'})
							SET.css(LV.View(),{
								//zIndex:'16384',boxShadow:'0px 0px 12px #000'
								//,display:'none'
								//,position:'absolute',left:'0px'
								//,top:'0px',padding:'3px'
									//,
									backgroundColor:'#FFF'
								//,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:function(){
								this.style.display='none';
							}})
							view=(function(listView,WIN,title){
								var show=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										listView.View().style.display='';
										var x=document.body.scrollLeft+window.screen.width>>1-WIN.View().offsetWidth>>1
											//GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=document.body.scrollTop+window.screen.height>>1-WIN.View().offsetHeight>>1
											//GET.Y(this)+this.offsetHeight;
										WIN.Title(title)//'rq['+row[0]+']'+row[1]
										SET.css(
											WIN.View()
											,{display:''
											,position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV,W,_table[i][0]+':'+_table[0][j]);
							break;
							
							
						case 'list':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{zIndex:'16384',boxShadow:'0px 0px 12px #000'
								,display:'none'
								,position:'absolute',left:'0px'
								,top:'0px',padding:'3px',backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							SET.attr(LV.View(),{className:'ListDetail',onmousedown:(function(listView){return function(){
								this.style.display='none';
								listView.SHOWABLE=true;
							}})(LV)})
							view=(function(listView){
								listView.SHOWABLE=true;
								return MAKE.div({
									innerHTML:(''+_table[i][j]).replace('####','=').replace('@@@@','; ').substr(0,8)+'...'
									,onclick:function(event){
										if(listView.SHOWABLE){
											listView.View().style.display='';
											listView.SHOWABLE=false
										}
										else {
											listView.View().style.display='none';
											listView.SHOWABLE=true;
										}
										var x=GET.X(this)-listView.View().offsetWidth+this.offsetWidth//-26;
										var y=GET.Y(this)+this.offsetHeight;
										SET.css(
											listView.View()
											,{
											position:'absolute'
											,top:y+'px'
											,left:x+'px'
											})
											/*var timing=listView.Items().length*800
											setTimeout(function(){
												listView.View().style.display='none'
											},timing)*/
									}},{cursor:'pointer',paddingRight:'26px',border:'1px solid #38F'
										,backgroundImage:'url(image/icon_plus_mini.png)'
										,backgroundPosition:'100% 50%'
										,backgroundRepeat:'no-repeat'});
								})(LV);
				        		break;
				        		
				        		
				        		
						case 'infolist':
							var LV=new ListView2().ItemAtIndex(function(LV,index){
								//var w=new Widget().View
								return (MAKE.div(
										{innerHTML:LV.Items()[index][1]}
										,{
											display:'inline-block'
											,paddingLeft:'19px'
											,paddingRight:'32px'
											,backgroundImage:'url(image/check_micro.png)'
											,backgroundPosition:'0% 50%'
											,backgroundRepeat:'no-repeat'}));
								//w.title='L'
								//return w;
							}).Items(deserializeTable(_table[i][j],'####','@@@@')).Parent(document.body);
							SET.css(LV.View(),{
								backgroundColor:'#FFF'
								,border:'1px solid #38F'
								,backgroundImage:'url(image/openiconlib/dialog-information-4.png)'
								,backgroundPosition:'100% 100%'
								,backgroundRepeat:'no-repeat'})
							view=LV.View();
				        		break;
				        		
				        		
						case 'KVpair':
							var kv=_table[i][j].split('=');
							
							var key,binome={}
							binome[key=kv[0]]=kv[1]
							cell.appendChild(MAKE.input({value:kv[0]},{display:'none'}))
							view=MAKE.div({innerHTML:kv[1]})
				        		break;
							
						case 'enum':
							menum=deserializeDict(_table[2][j],'=','&');
							view=new SelectView()
				        		.SelectedValue(_table[i][j])
				        		.Data(menum)
				        		.View()
				        		break;
						case 'dropdown':
							menum=deserializeDict(_table[i][j],'=','&');
							view=new SelectView()
				        		.SelectedValue(_table[i][j])
				        		.Data(menum)
				        		.View()
				        		break;
						case 'address':
							view=new AddressInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
						
						case 'date':
							view=new DateInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
						
						case 'mail':
							view=new MailInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
						
						case 'map':
							view=new MapInput()
								.MarkerAtIndex(function(map,table,index,parent){
									//var map=parent.getMap();
									var markerData=table[index];
									var xx=markerData[4].split('x')[0];
									var yy=markerData[4].split('x')[1]
									var rr=parseFloat(markerData[5]);
									var coordinates=new google.maps.LatLng(parseFloat(xx), parseFloat(yy));
									var newMarker = new google.maps.Marker({
										position:coordinates
									    ,map: map
									    ,draggable:false
										,title: markerData.text
									});
									newMarker.setIcon('image/input_icns/pin.small.teal.png');
									google.maps.event.addListener(newMarker, 'click', function(event) {
										alert('RAW_DATA:\n'+serializeDict(pivot_dictionary(table,index),'=','\n'));
									});
									return newMarker;
								})
								.Markers(_table)
								.Value(_table[i][j])
								.OnChange(function(ref,value){
									ref.value=value;
									ref.onchange();
								})
				        		.View()
				        		break;
						
						case 'mapdist':
							view=new MapDistInput()
								.MarkerAtIndex(function(map,table,index,parent){
									//var map=parent.getMap();
									var markerData=table[index];
									var xx=markerData[4].split('x')[0];
									var yy=markerData[4].split('x')[1]
									var rr=parseFloat(markerData[5]);
									var coordinates=new google.maps.LatLng(parseFloat(xx), parseFloat(yy));
									var newMarker = new google.maps.Marker({
										position:coordinates
									    ,map: map
									    ,draggable:false
										,title: markerData.text
									});
									newMarker.setIcon('image/input_icns/pin.small.teal.png');
									google.maps.event.addListener(newMarker, 'click', function(event) {
										alert('RAW_DATA:\n'+serializeDict(pivot_dictionary(table,index),'=','\n'));
									});
									return newMarker;
								})
								.Markers(_table)
								.Center({x:parseFloat(_table[i][j-1].split('x')[0]),y:parseFloat(_table[i][j-1].split('x')[1])})
								.Value(_table[i][j])
								.OnChange(function(ref,value){
									ref.value=parseInt(value/10)/100;
									ref.onchange();
								})
				        		.View()
				        		break;
						
						case 'number':
							view=new NumberInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
						
						case 'field':
						case 'text':
							view=new TextInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
						
						case 'textarea':
							view=new TextareaInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
							
						case 'time':
							view=new TimeInput()
								.Value(_table[i][j])
				        		.View()
				        		break;
							
						case 'checkbox':
							view=MAKE.input({
										type:'checkbox'
									})
								document.body.appendChild(view);
								view.value=_table[i][j]=='1'?1:0;
								if(_table[i][j]==1)view.checked=true;
								document.body.removeChild(view);
				        		break;
				        		
						case 'label':
							view=MAKE.div({
								innerHTML:_table[i][j]
							})
				        		break;
							
						default:
							view=MAKE.div({innerHTML:_table[i][j]})
					}
					
					
					
					
					if((view.tagName+"").toUpperCase() in {'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}){
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.disabled=true;
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								view.disabled=true;
								//view=MAKE.div({innerHTML:_table[i][j]})
								break;
							case 'RW':
								break;
						}
					}else{
						switch(_table[3][j]/* column acces */){
							case 'H':
								view.style.color="#AAA";
								view.style.display='none';
								break;
							case 'R':
								break;
							case 'RW':
								break;
						}
					}
					if(_table[1][j]!='enum' || true){
						view.onchange=(function(o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800';
							}
						})(shadow,_table,i,j,menum,view)
					}else{
						view.onchange=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
							}
						})(shadow,_table,i,j,menum,view)
						view.onmouseout=(function(button,o,t,r,c,_e,v){
							return function(event){
								this.parentNode.style.backgroundColor='#FF8800'
								return;
								this.blur();
							}
						})(shadow,_table,i,j,menum,view)
					}
					r.onmouseout=(function(t,sh,index,rowView){
						return function(event){
							var types=t[1];
							var access=t[4];
							var row=t[index];
							var shrow=sh[index];
							for(var i=0;i<row.length;i++){
								if(access[i]=='R' || access[i]=='H' || rowView.children[i].children[0].value==undefined)continue;
								if(rowView.children[i].children[0].value!=(''+row[i])){
									rowView.children[i].style.backgroundColor='#FF8800';
								}
							}
						}
					})(_table,shadow,i,r)
					cell.appendChild(view)
					//if(_table[4][j]=='H')
						r.appendChild(cell);
				}
				var plugins=_THIS.RecordController();
				_THIS.RecordController.Widgets[_THIS.RecordController.Widgets.length]=(function(p){return p;})(plugins);
				var c,lastButton,lastName;
				for(var name in plugins){
					if(name=='length')continue;
					c=MAKE.td({},{
						borderTop:'2px solid #A0A0FF',
						borderBottom:'2px solid #A0A0FF',
						cursor:'pointer',
						backgroundColor:"#C0C0FF"
						})
					plugins[name](_table,shadow,i,r).Parent(c);
					r.appendChild(c)
					lastButton=c;
				}
				if(lastButton!=undefined)SET.css(lastButton,{borderRight:'2px solid #A0A0FF'})
				if(index!=undefined){
					//r.style.backgroundColor="#FF0";
					i=_table.length;
				}else{
					tbody.appendChild(r);
					r.style.backgroundColor=((tbody.children.length)%2?'#FFFFFF':'#E0F0FF')
				}
			}
			var tbody_ctrl=MAKE.tbody({className:'TableControllersSection'}
			,[MAKE.tr({}
				,{borderLeft:'1px solid #999',borderRight:'1px solid #999',borderTop:'1px solid #999'},[])])
			table.appendChild(tbody_ctrl);
			
			var _tablePlugins=_THIS.TableController();
				var _head,_headFirst=true;
				for(var i=0;i<_tablePlugins.length;i++){
					if(_table[0].length==0)continue;
					var _head=MAKE.tr({colSpan:_table[0].length,align:'center'}
						,{borderLeft:'1px solid #999',borderRight:'1px solid #999'});
					
						tbody_ctrl.appendChild(_tablePlugins[i](_THIS,_table,shadow,tbody_ctrl))//.Parent(tbody_ctrl);
				}
				var maxwidth=0;
			for(var s in _SECTIONS){
				table.appendChild(_SECTIONS[s])
				if(maxwidth<_SECTIONS[s].offsetWidth){
					maxwidth=_SECTIONS[s].offsetWidth;
				}
			}
			for(var s in _SECTIONS){
				_SECTIONS[s].children[0].children[0].children[0].style.width=maxwidth+'px';
				break;
			}
			return _THIS;
		}
		this.refreshRowAtIndex=function(index){
			renderView(index);
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS);
	CLASS.STANDARD={}
	CLASS.STANDARD.COMMIT=function(_table,_shadow,rowIndex,rowView){
		return function(reqBodyReference){
			for(var i=0;i<_table[4].length;i++){
				rowView.children[i].style.background='';
				_table[rowIndex][i]=rowView.children[i].children[0].value==undefined
					?_table[rowIndex][i]:rowView.children[i].children[0].value;
				(reqBodyReference[0])[_table[4][i]]=_table[rowIndex][i];
				(reqBodyReference[0])['old_'+_table[4][i]]=_shadow[rowIndex][i];
				rowView.children[i].style.backgroundColor='';
			}
		}
	}
	CLASS.STANDARD.SECTION_CONTROLLER=function(NAME_FUNCTION){
		var NF=NAME_FUNCTION||function(table,rowIndex){return table[rowIndex][1]};
		return function _GETSECTION(table,rowIndex){
			var title=NF(table,rowIndex);
			var w=new Widget().View(
				MAKE.div({
					innerHTML:title
					,onclick:function(event){
						var refs=this.parentNode.parentNode.parentNode.children;
						var visible=(this.style.backgroundImage+'').indexOf('icon.php?img=up_empty&type=1_Desktop')>-1;
						for(var i=1;i<refs.length;i++){
							if(visible){
								this.style.backgroundImage='url(icon.php?img=down&type=1_Desktop)';
								refs[i].style.display='none';
							}else{
								this.style.backgroundImage='url(icon.php?img=up_empty&type=1_Desktop)';
								refs[i].style.display='';
							}
						}
					},align:'left'
				},{
					backgroundImage:'url(icon.php?img=up_empty&type=1_Desktop)'
					,backgroundPosition:'100% 50%',cursor:'pointer'
					,backgroundRepeat:'no-repeat',width:'100%',fontSize:"28px",fontFamily:"thinFont"}
					,[MAKE.div({},{borderBottom:'1px solid #888'
					,margin:'0px',padding:'0px'})]
				));
			w.title=title;
			return w;
		}
	}
	CLASS.STANDARD.SECTION_TITLE=function(){
		return function(context,sections,sectionName){
			var tb=context.Data()[0]
			var ar=context.Data()[3]
			var inf=[]
			for(var i=0;i<tb.length;i++){
				var e=MAKE.th({innerHTML:tb[i]},{border:'1px solid #999'})
				if(ar[i]=='H')e.innerHTML='';
				inf[inf.length]=e
			}
			return [MAKE.tr({},{backgroundColor:"#999",border:'1px solid #999'},inf)]
		};
	}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS={}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS.ON_TEXT_CONTENT=function(context,sections,sectionName){
		var names=context.Data()[0];
		var access=context.Data()[3];
		var types=context.Data()[1];
		var data=context.Data();
		var values=context.Data()[2];
		var cols=[];
		for(var i=5;i<data.length;i++){
			var r=data[i];
			for(var j=0;j<r.length;j++){
				if(cols[j]==undefined)cols[j]={'':''};
				cols[j][data[i][j]]=data[i][j];
			}
		}
		var filterRow=[];
		var FILTERS=[];
		for(var i=0;i<names.length;i++){
			FILTERS[i]='';
			var name=MAKE.th({innerHTML:names[i]},{border:'1px solid #999'});
			
			var selector=new SelectView()
				.Data(cols[i])/*cols[i]*/
				.OnChange((function(_section,sectionName,col,sel){
					return function(link,_view,index,value){
						setTimeout(function(){
							var _section=sections[sectionName].children;
							var k=0;
							FILTERS[col]=_view.selected.trim();
							for(var i=3;i<_section.length;i++){
								var rowVisible=1;
								for(var j=0;j<_section[i].children.length-1;j++){
									var cell=_section[i].children[j];
									var cellText=cell.children[0]?(cell.children[0].value?cell.children[0].value:cell.innerHTML):cell.innerHTML;
									rowVisible*=((cellText.trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
								};
								if(rowVisible){
									SET.css(_section[i],{
										display:''
										,backgroundColor:k%2?'#FFFFFF':'#E0F0FF'
									})
									k++;
								}else{
									_section[i].style.display='none';
								}
							}
						},1);
					}
				})(sections,sectionName,i,selector));
			var filter=MAKE.th({},{},[selector.View()])
			if(access[i]=='H'){
				name.innerHTML='';
				filter.innerHTML='';
			}
			filterRow[filterRow.length]=filter
		}
		
		return [MAKE.tr({},{},filterRow)];
	}
	CLASS.STANDARD.SECTION_FILTERS_DROPDOWNS.ON_KVPAIRS=function(context,sections,sectionName){
		var names=context.Data()[0];
		var access=context.Data()[3];
		var types=context.Data()[1];
		var data=context.Data();
		var values=context.Data()[2];
		var filterRow=[];
		var FILTERS=[];
		for(var i=0;i<names.length;i++){
			FILTERS[i]='';
			var name=MAKE.th({innerHTML:names[i]},{border:'1px solid #999'});
			var selector=new SelectView()
				.Data(deserializeDict('*=&'+values[i],'=','&'))
				.OnChange((function(_section,sectionName,col,sel){
					return function(link,_view,index,value){
						setTimeout(function(){
							var _section=sections[sectionName].children;
							var k=0;
							FILTERS[col]=_view.selected.trim();
							for(var i=3;i<_section.length;i++){
								var rowVisible=1;
								for(var j=0;j<_section[i].children.length-1;j++){
									rowVisible*=((((_section[i].children[j].innerText||_section[i].children[j].textContent)+'').trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
									
								}
								if(rowVisible){
									SET.css(_section[i],{
										display:''
										,backgroundColor:k%2?'#FFFFFF':'#E0F0FF'
									})
									k++;
								}else{
									_section[i].style.display='none';
								}
							}
						},1);
					}
				})(sections,sectionName,i,selector));
			var filter=MAKE.th({},{},[selector.View()])
			if(access[i]=='H'){
				name.innerHTML='';
				filter.innerHTML='';
			}
			filterRow[filterRow.length]=filter
		}
		
		return [MAKE.tr({},{backgroundColor:'#FFF'},filterRow)];
	}
	CLASS.STRINGS_FETCH('EditableTable',['ADMIN_TNT.LABEL.VALIDATE','PORTAIL.ENUM.LABEL.ALL','PORTAIL.ENUM.LABEL.EVERY','PORTAIL.ENUM.LABEL.NONE']);
	return CLASS;
})();


/**********************************************************************************************************************************************************/
/******************************************************** TABLE *******************************************************************************************/
/**********************************************************************************************************************************************************/

var Table=(function(){
	var CLASS=function Table(){
    	Base.call(this,['Table']);
		var _THIS=this;
		QProperty.call(this,['AfterAddRow']);
		_THIS.AfterAddRow(function(_table,new_row,new_index){
			
		});
		QProperty.call(this,['BeforeReplaceRow']);
		_THIS.BeforeReplaceRow(function(_table,old_row,new_row,index){
			
		});
		QProperty.call(this,['AfterReplaceRow']);
		_THIS.AfterReplaceRow(function(_table,old_row,new_row,index){
			
		});
		QProperty.call(this,['BeforeDeleteRow']);
		_THIS.BeforeDeleteRow(function(_table,old_row,rowIndex){
			
		});
		QProperty.call(this,['OnDatasetChanged']);
		_THIS.OnDatasetChanged(function(_table){
			
		});
		
		var DATA_ARRAY_STRING;
		var history=[];currentHistoryIndex=0;
		history.add=function(v){
			history[history.length]=v;
			currentHistoryIndex=history.length-1;
		}
		this.getHistory=function(){
			return history;
		}
		this.undo=function(){
			var last=history[currentHistoryIndex];
			this[last.undo.command](last.undo.parameters);
		}
		var shadow=[];
		this.getShadow=function(){
			return shadow;
		}
		this.names=[];
		this.types=[];
		this.ranges=[];
		this.access=[];
		this.t_codes=[];
		this.rows=[];
		this.columns=[];
		this.width=0;
		this.height=0;
		var deleted=[];
		
		this.init=function Table_init(dataArray){
			deleted=[];
			DATA_ARRAY_STRING=serializeTable(dataArray)
			var TABLE=this;
			var _THIS=this;
			if(dataArray.length<5){
				console.log(('malformed table data'));
				console.log(dataArray);
				_THIS.init([['error'],['label'],['*'],['R'],['e'],['not well defined']])
			}
			this.names=dataArray[0];
			this.types=dataArray[1];
			this.ranges=dataArray[2];
			this.access=dataArray[3];
			this.t_codes=dataArray[4];
			var columns={};
			var data=[];
			var maxWidth=0,minWidth=0,height=dataArray.length-5;
			for(var i=5;i<dataArray.length;i++){
				shadow[i-5]=[];
				data[i-5]=[];
				if(maxWidth<dataArray[i].length){maxWidth=dataArray[i].length;}
				if(minWidth>dataArray[i].length){minWidth=dataArray[i].length;}
				for(var j=0;j<dataArray[i].length;j++){
					if(!(this.names[j] in columns)){
						columns[this.names[j]]=[]
					}
					if(!(j in columns)){
						columns[j]=[];
					}
					columns[this.names[j]][i]=dataArray[i][j]
					columns[j][i]=dataArray[i][j];
					shadow[i-5][j]=dataArray[i][j];
					data[i-5][j]=dataArray[i][j];
				}
			}
			this.rows=data;
			this.columns=columns;
			this.width=maxWidth;
			this.height=height;
			history.add({command:'init',parameters:[dataArray]
				,undo:{command:'init',parameters:[[['error'],['label'],['*'],['R'],['e'],['not well defined']]]}
			})
			return _THIS;
		}
		this.cloneRow=function(_rIndex){
			var row=deserializeList(serializeList(_THIS.rows[_rIndex]));
			this.addRow(row);
			return _THIS;
		}
		this.insertRow=function(){
			var row=[];
			for(var i=0;i<this.types.length;i++){
				row[i]='';
			}
			this.addRow(row);
			return _THIS;
		}
		this.join=function(table){
			var maxWidth=this.width,minWidth=this.width,height=this.height+1;
			for(var i=0;i<table.t_codes.length;i++){
				this.names[this.width+i]=table.names[i];
				this.types[this.width+i]=table.types[i];
				this.ranges[this.width+i]=table.ranges[i];
				this.access[this.width+i]=table.access[i];
				this.t_codes[this.width+i]=table.t_codes[i];
				columns[this.width+i]=[];
				columns[table.names[i]]=[];
				for(var j=0;j<this.rows.length;j++){
					columns[this.width+i][j]=table.rows[j][i];
					columns[table.names[i]][j]=table.rows[j][i];
					this.rows[this.width+i][j]=table[j][i];
				}
			}
			
			this.width=this.width+table.width;
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.selectLines=function(f){
			var _f=f||function(table,rowIndex){return true;}
			var table=this.replicateTableHead();
			for(var i=5;i<tdata.length;i++){
				if(f(this,i))table.rows[table.rows.length]=deserializeList(serializeList(this.rows[i]))
			}
			return table;
		}
		this.selectColumns=function(f){
			var _f=f||function(table,rIndex,cIndex){return true}
			
			return _THIS;
		}
		this.addRow=function(row){
			var maxWidth=this.width,minWidth=this.width,height=this.height+1;
			var i=this.rows.length;
				//shadow[i]=row;
				this.rows[i]=row;
				if(maxWidth<row.length){maxWidth=row.length;}
				if(minWidth>row.length){minWidth=row.length;}
				for(var j=0;j<row.length;j++){
					if(!(this.names[j] in this.columns)){
						this.columns[this.names[j]]=[]
					}
					if(!(j in this.columns)){
						this.columns[j]=[];
					}
					this.columns[this.names[j]][i]=row[j];
					this.columns[j][i]=row[j];
					//shadow[i][j]=row[j];
					this.rows[i][j]=row[j];
				}
			this.width=maxWidth;
			this.height=height;
			
			_THIS.AfterAddRow()(_THIS,row,i);
			
			history.add({
				command:'addRow',parameters:[row]
				,undo:{command:'deleteRow',parameters:[i]}
			});
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.replaceRow=function(rowIndex,row){
			var maxWidth=this.width,minWidth=this.width,height=this.height;
			var old_row=this.rows[rowIndex];
			
			_THIS.BeforeReplaceRow()(_THIS,old_row,row,rowIndex);
			
			var i=rowIndex;
				//shadow[i]=row;
				this.rows[i]=row;
				if(maxWidth<row.length){maxWidth=row.length;}
				if(minWidth>row.length){minWidth=row.length;}
				for(var j=0;j<row.length;j++){
					if(!(this.names[j] in this.columns)){
						this.columns[this.names[j]]=[]
					}
					if(!(j in this.columns)){
						this.columns[j]=[];
					}
					this.columns[this.names[j]][i]=row[j];
					this.columns[j][i]=row[j];
					//shadow[i][j]=row[j];
					this.rows[i][j]=row[j];
				}
			this.width=maxWidth;
			this.height=height;
			
			_THIS.AfterReplaceRow()(_THIS,old_row,row,rowIndex);
			
			history.add({command:'replaceRow',parameters:[rowIndex,row]
				,undo:{command:'replaceRow',parameters:[rowIndex,old_row]}})
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.deleteRow=function(rowIndex){
			var maxWidth=this.width,minWidth=this.width,height=this.height-1;
			var old_row=this.rows[rowIndex];
			
			_THIS.BeforeDeleteRow()(_THIS,old_row,rowIndex);
			
			var i=rowIndex;
				deleted[deleted.length]={index:i,row:shadow[i].splice(i,1)};
				this.rows.splice(i,1);
				for(var j in this.columns){
					this.columns[j].splice(i,1)
				}
				try{
					shadow.splice(i,1);
				}catch(err){}
			this.height=height;
			history.add({command:'deleteRow',parameters:[rowIndex]
			,undo:{command:'addRow',parameters:[old_row]}})
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.hasDiffs=function(){
			if(deleted.length>0)return true;
			
			for(var i=0;i<this.rows.length;i++){
				var row=this.rows[i];
				var sh_row=shadow[i];
				for(var j=0;j<row.length;j++){
					if(sh_row[j]!=row[j]){
						return true;
					}
				}
			}
			return false;
		}
		this.isRowChanged=function(rowIndex){
			var row=this.rows[rowIndex];
			var sh_row=shadow[rowIndex];
			var is_changed=false;
			for(var j=0;j<row.length;j++){
				if(sh_row[j]!=row[j]){
					is_changed=true;
					break;
				}
			}
			return is_changed;
		}
		this.computeRowChange=function(rowIndex){
			var tc=_THIS.t_codes;
			var change=null;
			var row=this.rows[rowIndex];
			var sh_row=shadow[rowIndex];
			if(sh_row===undefined){
				change=deserializeDict(serializeDict(mapTableRow(tc,this.rows[rowIndex])));
				change.type='insert';
				change.internalIndex=rowIndex;
			}else{
				if(this.isRowChanged(rowIndex)){
					var mapold=mapTableRow(tc,sh_row);
					var mapnew=mapTableRow(tc,row);
					change=fuseDict(mapnew,mapold,'old_');
					change.type='update';
					change.internalIndex=rowIndex;
				}
			}
			return change;
		}
		this.getChangedRows=function(){
			var ch={update:[],insert:[],_delete:[]}
			for(var i=0;i<this.rows.length;i++){
				var row=this.rows[i];
				var sh_row=shadow[i];
				if(sh_row===undefined){
					ch.insert[ch.insert.length]={internalIndex:i,'NEW':row};
					continue;
				}
				var is_changed=false;
				for(var j=0;j<row.length;j++){
					if(sh_row[j]!=row[j]){
						is_changed=true;
						break;
					}
				}
				if(is_changed)ch.update[ch.update.length]={internalIndex:i,'old':shadow[i],'NEW':row};
			}
			if(deleted.length>0){
				for(var i=0;i<deleted.length;i++){
					ch._delete[ch._delete.length]={internalIndex:i,'old':deleted[i]};
				}
			}
			return ch;
		}
		this.prepareComBodies=function(changedRows){
			var tc=_THIS.t_codes;
			var ch=[]
			var cr=changedRows;
			for(var i=0;i<cr.update.length;i++){
				var mapold=mapTableRow(tc,cr.update[i].old);
				var mapnew=mapTableRow(tc,cr.update[i].NEW);
				ch[i]=fuseDict(mapnew,mapold,'old_');
				ch[i].type='update';
				ch[i].internalIndex=cr.update[i].internalIndex;
			}
			for(var i=0;i<cr.insert.length;i++){
				ch[i+cr.update.length]=mapTableRow(tc,cr.insert[i].NEW);
				ch[i+cr.update.length].type='insert';
				ch[i].internalIndex=cr.insert[i].internalIndex;
			}
			for(var i=0;i<cr._delete.length;i++){
				ch[i+cr.update.length+cr.insert.length]=mapTableRow(tc,cr._delete[i].old);
				ch[i+cr.update.length+cr.insert.length].type='delete';
				ch[i].internalIndex=cr._delete[i].internalIndex;
			}
			return ch;
		}
		this.commitChanges=function(index){
			if(index==undefined){
				shadow=deserializeTable(serializeTable(this.rows));
			}else{
				shadow[index]=deserializeList(serializeList(this.rows[index]));
			}
		}
		this.replicateTableHead=function(){
			var tdata=deserializeTable(DATA_ARRAY_STRING);
			tdata.splice(5);
			var newTable=new Table().init(tdata);
			return newTable;
		}
		this.replicateTable=function(){
			var tdata=deserializeTable(DATA_ARRAY_STRING);
			tdata.splice(5);
			tdata.concat(deserializeTable(serializeTable(this.rows)));
			var newTable=new Table().init(tdata);
			return newTable;
		}
		this.computeCurrentRangeOf=function Table_computeCurrentRangeOf(colName){
			var range={};
			for(var i=0;i<this.columns[colName].length;i++){
				range[this.columns[colName][i]]=this.columns[colName][i];
			}
			return range;
		}
		CLASS.TT[CLASS.TT.length]=_THIS;
	}
	CLASS.TT=[]
	return CLASS;
})();
/**********************************************************************************************************************************************************/
/********************************************************TABLE CONTROLLER VIEW ****************************************************************************/
/**********************************************************************************************************************************************************/
TableControllerView=(function(){
	var CLASS=function TableControllerView(){
    	Base.call(this,['TableControllerView']);
		var _THIS=this;
		Widget.call(this);
		var table;
		var TABLE=new Table();
		this.getTABLE=function(){
			return TABLE;
		}
		var red={}
		this.redUp=function(arr){
			for(var t=0;t<arr.length;t++){
				red[arr[t]]=t;
			}
			return _THIS;
		}
		/* BEGIN Async */
        QProperty.call(this,['Async']);
        _THIS.Async(true);
        QProperty.call(this,['OnRenderFinished']);
        _THIS.OnRenderFinished(function(){});
        /* END Async */
        /* BEGIN PROGRESSBAR */
        var progressbar=MAKE.progressbar({timing:100});
        /* END PROGRESSBAR */
		
		_THIS.Parent.afterSet=function(_parent){
        	_parent.appendChild(_THIS.View())
        	/* BEGIN Async */
        	if(_THIS.Async()){
        		renderView_async({finished:false,index:-1});
        	}else{
        		renderView({finished:false,index:-1});
        	}
        	/* END Async */
		}
		
		QProperty.call(this,['Limit']);
		_THIS.Limit(20);
		
		QProperty.call(this,['TableControllers']);
		_THIS.TableControllers(function(_table,_this){
			return [MAKE.tr()]
		});
		QProperty.call(this,['SectionControllers']);
		_THIS.SectionControllers(function(_table,_this,_SECTIONS,sectionID){
			return [MAKE.tr()]
		});
		QProperty.call(this,['RecordControllers']);
		_THIS.RecordControllers(function(_table,_this,_sectionView,_rIndex,_rowView){
			return [MAKE.td({innerHTML:'someCOntroller'})]
		});
		
		QProperty.call(this,['SectionIDForIndex']);
		_THIS.SectionIDForIndex(function(_table,_rIndex){
			return 'section';
		});
		
		QProperty.call(this,['RecordForIndex']);
		_THIS.RecordForIndex(function(_table,_ref,_rIndex,_sectionView,_rowView){
			var row=_table.rows[_rIndex];
			var rowCells=[];
			for(var _cI=0;_cI<row.length;_cI++){
				rowCells[_cI]=_THIS.CellForIndex()(_table,_rIndex,_cI);
				rowCells[_cI].onchange=(function(t,ref,sv,rv,ri,c,ci){
					return function(event){
						if(_THIS.IsCellChanged()(t,ref,sv,rv,ri,c,ci)){
							_THIS.OnCellChanged()(t,ref,sv,rv,ri,c,ci);
						}
					}
				})(_table,_THIS,_sectionView,_rowView,_rIndex,rowCells[_cI],_cI)
				/*rowCells[_cI].onmousemove=(function(t,ref,sv,rv,ri,c,ci){
					return function(event){
						if(_THIS.IsCellChanged()(t,ref,sv,rv,ri,c,ci)){
							_THIS.OnCellChanged()(t,ref,sv,rv,ri,c,ci);
						}
					}
				})(_table,_THIS,_sectionView,_rowView,_rIndex,rowCells[_cI],_cI)*/
			}
			return MAKE.tr({},{},rowCells);
		});
		QProperty.call(this,['CellForIndex']);
		_THIS.CellForIndex(function(_table,_rIndex,_cIndex){
			var cell=_table.rows[_rIndex][_cIndex]
			var cellView=MAKE.td({},{},[MAKE.input({value:cell})])
			return cellView;
		});
		
		QProperty.call(this,['IsCellChanged']);
		_THIS.IsCellChanged(function(_table,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){
			return true;
		});
		QProperty.call(this,['IsRecordChanged']);
		_THIS.IsRecordChanged(function(_table,_this,_sectionView,_rIndex,_rowView){
			return true;
		});
		
		QProperty.call(this,['OnCellChanged']);
		_THIS.OnCellChanged(function(_table,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){});
		QProperty.call(this,['OnRecordChanged']);
		_THIS.OnRecordChanged(function(_table,_this,_sectionView,_rIndex,_rowView){});
		
		QProperty.call(this,['Table']);
		_THIS.Table([['empty'],['label'],['*'],['R'],['e'],['not defined']])
		_THIS.Table.afterSet=function(_table_data){
			TABLE.init(_table_data);
			sectionRows={};
			red={}
        	/* BEGIN Async */
        	if(_THIS.Async()){
        		renderView_async({finished:false,index:-1});
        	}else{
        		renderView({finished:false,index:-1});
        	}
        	/* END Async */
		}
		
		_THIS.View(table=MAKE.table({className:'Table2'},{borderCollapse:'collapse'}))
		this.refreshView=function(){
			renderView();
		}
		var _sections;
		var _sectionsData=null;
		var sectionRows={};
		this.getSectionRows=function(){
			return sectionRows;
		}
		var _SECTIONS={}
		var maxwidth=0;
		/******************************************************************* ASYNCHRONE ****************************************************************/
		var ctimeout;
		var renderView_async=function(state){
			
			if(state.index==-1){
				CLASS.clearView(table);
        		try{progressbar.show(_THIS.Parent());}catch(err){}
				_SECTIONS={}
				sectionRows={};
				maxwidth=0;
				table.appendChild(MAKE.tbody({},{},_THIS.TableControllers()(TABLE,_THIS)));
				
        		progressbar.progress(0);
        		clearTimeout(ctimeout);
				ctimeout=setTimeout(function(){renderView_async({index:0,finished:false})},50);
				return _THIS;
			}
			var i=parseInt(state.index);
            
			if(i<TABLE.height){
        		try{
        			 _THIS.Parent().insertBefore(progressbar.view,  _THIS.Parent().children[0]);
        		}catch(err){}
        		
        		progressbar.progress(parseInt(state.index)*100/TABLE.height);
				var sID=_THIS.SectionIDForIndex()(TABLE,i)
				
				if(_SECTIONS[sID]===undefined){
					_SECTIONS[sID]=MAKE.tbody();
					sectionRows[sID]={begin:0,indices:[]};
					sectionRows[sID].indices[i]=sID;
				
					var sc=_THIS.SectionControllers()(TABLE,_THIS,_SECTIONS,sID);
					var sc_length=sc.length;
					for(var j=0;j<sc_length;j++){
						_SECTIONS[sID].appendChild(sc[j]);
					}
				}
				var crt_tbody=_SECTIONS[sID];
					
					var crt_row=_THIS.RecordForIndex()(TABLE,_THIS,i,crt_tbody,crt_row);
					var ctrl=(_THIS.RecordControllers()(TABLE,_THIS,crt_tbody,i,null));
					var tr=crt_row;
					for(var k=0;k<ctrl.length;k++){
						tr.appendChild(ctrl[k])
					}
					
					if(TABLE.getShadow()[i]==undefined || TABLE.rows[i].join('')!=TABLE.getShadow()[i].join('')){
						tr.style.backgroundColor='#F89';
					}
					if(TABLE.getShadow()[i]==undefined && crt_tbody.children.length>sc_length){
						for(var nsec in _SECTIONS){
							_SECTIONS[nsec].insertBefore(tr,_SECTIONS[nsec].children[sc_length]);
							break;
						}
					}else{
						crt_tbody.appendChild(tr);
					}
				i++;
				state.index=i;
				
				ctimeout=setTimeout(function(){renderView_async(state)},1);
				
			}else{
            	setTimeout(function(){progressbar.hide();},10);
				for(var sID in _SECTIONS){
					table.appendChild(_SECTIONS[sID])
					if(maxwidth<_SECTIONS[sID].offsetWidth){
						maxwidth=_SECTIONS[sID].offsetWidth;
					}
				}
				for(var sID in _SECTIONS){
					_SECTIONS[sID].style.width=maxwidth+'px';
				}
				_sections=_SECTIONS;
				_THIS.OnRenderFinished()();
			}
			/*for(var s in _SECTIONS){
				table.appendChild(_SECTIONS[s])
				if(maxwidth<_SECTIONS[s].offsetWidth){
					maxwidth=_SECTIONS[s].offsetWidth;
				}
			}*/
			return _THIS;
		}
		/****************************************************************** SYNCHRONE *****************************************************************/
		var renderView=function(){
			CLASS.clearView(table);
			_SECTIONS={}
			sectionRows={};
			/*var resetSectionsData=true;
			if(_sectionsData==null){
				resetSectionsData=false;
				_sectionsData=[];
			}*/
			
			/*
			for(var i=0;i<TABLE.height;i++){
				var sectionID=_THIS.SectionIDForIndex()(TABLE,i);
				_SECTIONS[sectionID]=MAKE.tbody();
				if(sectionRows[sectionID]==undefined){
					sectionRows[sectionID]={begin:0,indices:[]};
				}
				sectionRows[sectionID].indices[i]=sectionID;	
			}
			
			
			for(var s in _SECTIONS){
				
				var sc=_THIS.SectionControllers()(TABLE,_THIS,_SECTIONS,s)
				var sc_length=sc.length
				for(var i=0;i<sc_length;i++){
					_SECTIONS[s].appendChild(sc[i]);
				}
			}*/
			table.appendChild(MAKE.tbody({},{},_THIS.TableControllers()(TABLE,_THIS)))
			
			for(var i=0;i<TABLE.height;i++){
				var sID=_THIS.SectionIDForIndex()(TABLE,i)
					/*var iof=_THIS.indexOfSectionDataAtIndex(_s_index)*/
				
				if(_SECTIONS[sID]===undefined){
					_SECTIONS[sID]=MAKE.tbody();
					sectionRows[sID]={begin:0,indices:[]};
					sectionRows[sID].indices[i]=sID;
				
					var sc=_THIS.SectionControllers()(TABLE,_THIS,_SECTIONS,sID);
					var sc_length=sc.length;
					for(var j=0;j<sc_length;j++){
						_SECTIONS[sID].appendChild(sc[j]);
					}
					table.appendChild(_SECTIONS[sID])
					if(maxwidth<_SECTIONS[sID].offsetWidth){
						maxwidth=_SECTIONS[sID].offsetWidth;
					}
				}
				var crt_tbody=_SECTIONS[sID];
				/*if(_sectionsData[iof][4]>_sectionsData[iof][0] && _sectionsData[iof][4]<_sectionsData[iof][1]){*/
					
					var crt_row=_THIS.RecordForIndex()(TABLE,_THIS,i,crt_tbody,crt_row);
					var ctrl=(_THIS.RecordControllers()(TABLE,_THIS,crt_tbody,i,null));
					var tr=crt_row;
					for(var k=0;k<ctrl.length;k++){
						tr.appendChild(ctrl[k])
					}
					
					if(TABLE.getShadow()[i]==undefined || TABLE.rows[i].join('')!=TABLE.getShadow()[i].join('')){
						tr.style.backgroundColor='#F89';
					}
					/*if(i in red){
						tr.style.backgroundColor='#F89';
					}*/
					if(TABLE.getShadow()[i]==undefined && crt_tbody.children.length>sc_length){
						for(var nsec in _SECTIONS){
							_SECTIONS[nsec].insertBefore(tr,_SECTIONS[nsec].children[sc_length]);
							break;
						}
					}else{
						crt_tbody.appendChild(tr);
					}
					/*_sectionsData[iof][4]++
				}
				_sectionsData[iof][2]++;*/
			}
			var maxwidth=0;
			/*for(var s in _SECTIONS){
				table.appendChild(_SECTIONS[s])
				if(maxwidth<_SECTIONS[s].offsetWidth){
					maxwidth=_SECTIONS[s].offsetWidth;
				}
			}*/
			for(var s in _SECTIONS){
				_SECTIONS[s].style.width=maxwidth+'px';
				//var iof=_THIS.indexOfSectionDataAtIndex(s)
				/*if(true){
					_SECTIONS[s].appendChild(MAKE.tr({},{},[
						MAKE.td({colSpan:TABLE.width+1},{},[
							new ImageButton2()
							.Click((function(){
								return function(event){
									renderView();
								}
							})()).Text('previous '+_THIS.Limit()).View()
							,new ImageButton2()
							.Click((function(){
								return function(event){
									renderView();
								}	
							})()).Text('next '+_THIS.Limit()).Size({float:'right'}).View()
						])
					]))
				}*/
			}
			_sections=_SECTIONS;
			return _THIS;
		}
		this.accessSections=function(){
			return _sections;
		}
		this.accessSectionsData=function(){
			return [_sectionsData];
		}
		this.indexOfSectionDataAtIndex=function(name){
			for(var i=0;i<_sectionsData.length;i++){
				if(_sectionsData[i][3]==name)return i;
			}
			return -1;
		}
	}
	WidgetStatic.call(CLASS);
	CLASS.FACTORY={};
	CLASS.FACTORY.ROW_RENDERERS={
		TITLE:function(_table,_ref){
    		var tds=[];
    		for(var i=0;i< _table.names.length;i++){
    			if(_table.access[i]!='H'){
    				tds[i]=MAKE.td({align:'align',innerHTML: _table.names[i]});
    			}else{
    				tds[i]=MAKE.td({align:'align'});
    			}
    		}
    		tds[i]=MAKE.td();
    		return tds;
		}
		,HIDE_SHOW_SECTION:function(beginAtRow,widthNumber,sections,sectionName){
			var wn=widthNumber==undefined?sectionName[sections].children[0].length:widthNumber;
			var br=beginAtRow==undefined?1:beginAtRow;
			var spacer;
    		var tds=
    			MAKE.td({colSpan:wn},{margin:'0px',padding:'0px'},[
    			MAKE.div({
					innerHTML:sectionName
					,onclick:function(event){
						var refs=sections[sectionName].children;
						var visible=(this.style.backgroundImage+'').indexOf('icon.php?img=up_empty&type=1_Desktop')>-1;
						for(var i=br;i<refs.length;i++){
							if(visible){
								this.style.width=(this.offsetWidth)+'px';
								this.style.backgroundImage='url(icon.php?img=down&type=1_Desktop)';
								refs[i].style.display='none';
							}else{
								this.style.width='';
								this.style.backgroundImage='url(icon.php?img=up_empty&type=1_Desktop)';
								refs[i].style.display='';
							}
						}
					}
					,align:'left'
				},{margin:'0px',padding:'0px'
					,backgroundImage:'url(icon.php?img=up_empty&type=1_Desktop)'
					,backgroundPosition:'100% 50%',cursor:'pointer'
					,backgroundRepeat:'no-repeat',width:'100%',fontSize:"28px",fontFamily:"thinFont"}
					/*,[
					  spacer=MAKE.div({},{borderBottom:'1px solid #888',margin:'0px',padding:'0px'})
					 ]*/
				)
			]);
    		return [tds];
		}
		,FILTER_WITH_TEXTBOX:function(beginAtRow,widthNumber,_table,_tcview,sections,sectionName,onFilterChange){
			var FILTERS=[[]],filterRow=[];
			var wn=widthNumber==undefined?sectionName[sections].children[0].length:widthNumber;
			var br=beginAtRow==undefined?1:beginAtRow;
			var tmout;
			var lastKeydown=new Date().getTime();
			var selector;
			var _onFilterChange=onFilterChange||function(i,e){};
			for(var i=0;i<_table.names.length;i++){
				FILTERS[0][i]='';
				var refreshTable=(function(){return function(){}})()
				selector=MAKE.input({
					onkeydown:(function(_section,sectionName,col,sel,FILTERS){
						return function(event){
							if(Math.abs(lastKeydown-new Date().getTime())<214){
								clearTimeout(tmout);
								this.style.backgroundImage='url(image/input_icns/input.filter.png)'
							}
							this.style.backgroundImage='url(image/loadinfo_03.gif)'
							tmout=setTimeout(
								(function(_section,sectionName,_col,_sel,__this__,FILTERS){
									return function(){
										
										_sel.style.backgroundImage='url(image/input_icns/input.filter.png)'
										var _section=sections[sectionName].children;
										var k=0;
										/*FILTERS[0][col]=__this__.value.trim();*/
										for(var i=br;i<_section.length;i++){
											var rowVisible=1;
											for(var j=0;j<_table.names.length;j++){
												var elem=_section[i].children[j].children[0];
												var t=elem.value
													||elem.innerText
													||elem.textContent
													||elem.innerHTML;
												if(elem.tagName=='SELECT'){
													t=elem[elem.selectedIndex].innerText||elem[elem.selectedIndex].textContent;
												}
												if(
												/*((t+'').trim().indexOf(FILTERS[0][j]) > -1)
												|| ((FILTERS[0][j]+'').trim().indexOf(t) > -1)
												|| */(t.toUpperCase()==FILTERS[0][j].toUpperCase())
												|| (FILTERS[0][j]=="") 
												|| (_table.access[j]=='H'))rowVisible*=1;
												else rowVisible*=0;
											}
											if(rowVisible>0){
												SET.css(_section[i],{display:'',backgroundColor:k%2?'#FFFFFF':'#E0F0FF'});
												k++;
											}else{
												_section[i].style.display='none';
											}
										}
									}
								})(sections,sectionName,i,this,this,FILTERS),214);
							lastKeydown=new Date().getTime();
						}
					})(sections,sectionName,i,selector,FILTERS)
					,onkeyup:(function(_section,sectionName,col,sel,FILTERS){
						return function(event){
							FILTERS[0][col]=this.value.trim();
							_onFilterChange(col,FILTERS[0]);
						}
					})(sections,sectionName,i,selector,FILTERS)
				},{
					width:'100%'
					,backgroundImage:'url(image/input_icns/input.filter.png)'
					,backgroundRepeat:'no-repeat'
					,backgroundPosition:'100% 50%'})
				var filter=MAKE.th({},{},[selector])
				if(_table.access[i]=='H'){
					filter.innerHTML='';
				}
				filterRow[filterRow.length]=filter
			}
			filterRow[filterRow.length]=MAKE.div();
			return filterRow;
		},FILTER_WITH_TEXTBOX2:function(beginAtRow,widthNumber,_table,_tcview,sections,sectionName,onchange,get_filter_cache){
			var FILTERS=[get_filter_cache(sectionName)[0].join().split(',')],filterRow=[];
			/*console.log("INIT : ",sectionName,FILTERS[0].join());*/
			var wn=widthNumber==undefined?sectionName[sections].children[0].length:widthNumber;
			var br=beginAtRow==undefined?1:beginAtRow;
			var tmout;
			var lastKeydown=new Date().getTime();
			var selector;
			var willupdate=false;
			var _onchange=onchange||function(v){};
			for(var i=0;i<_table.names.length;i++){
				FILTERS[0][i]=FILTERS[0][i]||'';
				if(FILTERS[0][i]!=''){willupdate=true;}
				
				var refreshTable=(function(){return function(){}})()
				selector=MAKE.input({
					value:FILTERS[0][i]||''
					,onkeydown:(function(_section,sectionName,col,sel,FILTERS){
						return function(event){
							if(Math.abs(lastKeydown-new Date().getTime())<214){
								clearTimeout(tmout);
								this.style.backgroundImage='url(image/input_icns/input.filter.png)'
							}
							this.style.backgroundImage='url(image/loadinfo_03.gif)'
							tmout=setTimeout(
								(function(_section,sectionName,col,sel,__this__,_FILTERS){
									return function filter_onkeydown_timeout(){
										sel.style.backgroundImage='url(image/input_icns/input.filter.png)'
										var _section=sections[sectionName].children;
										var k=0;
										/*FILTERS[0][col]=__this__.value.trim();*/
										for(var i=br;i<_section.length;i++){
											var rowVisible=1;
											for(var j=0;j<_table.names.length;j++){
												var elem=_section[i].children[j].children[0];
												var t=elem.value
													||elem.innerText
													||elem.textContent
													||elem.innerHTML;
												if(elem.tagName=='SELECT'){
													t=elem[elem.selectedIndex].innerText||elem[elem.selectedIndex].textContent;
												}
												if(
												/*((t+'').trim().indexOf(FILTERS[0][j]) > -1)
												|| ((FILTERS[0][j]+'').trim().indexOf(t) > -1)
												|| */(t.toUpperCase()==_FILTERS[0][j].toUpperCase())
												|| (_FILTERS[0][j]=="") 
												|| (_table.access[j]=='H'))rowVisible*=1;
												else rowVisible*=0;
											}
											if(rowVisible>0){
												SET.css(_section[i],{display:'',backgroundColor:k%2?'#FFFFFF':'#E0F0FF'});
												k++;
											}else{
												_section[i].style.display='none';
											}
										}
									}
								})(sections,sectionName,i,this,this,FILTERS),214);
							lastKeydown=new Date().getTime();
						}
					})(sections,sectionName,i,selector,FILTERS)
					,onkeyup:(function(_section,sectionName,col,sel,FILTERS){
						return function(event){
							FILTERS[0][col]=this.value.trim();
							_onchange(FILTERS,sectionName);
						}
					})(sections,sectionName,i,selector,FILTERS)
					,onchange:function(event){
						this.onkeydown(event);this.onkeyup(event);
					}
				},{
					width:'100%'
					,backgroundImage:'url(image/input_icns/input.filter.png)'
					,backgroundRepeat:'no-repeat'
					,backgroundPosition:'100% 50%'});
				
				var filter=MAKE.th({},{},[selector])
				if(_table.access[i]=='H'){
					filter.innerHTML='';
				}
				filterRow[filterRow.length]=filter
			}
			if(willupdate){
				setTimeout(function(){
					for(var s=0;s<sections[sectionName].children.length;s++){
						sections[sectionName].children[s].style.display='table-row';
					}
					selector.onkeydown();/*selector.onkeyup();*/
				},700);
			}
			filterRow[filterRow.length]=MAKE.div();
			return filterRow;
		}
		,TABLE_FILTER_WITH_TEXTBOX:function(beginAtRow,widthNumber,_table,_tcview,sections){
			var FILTERS=[[]],filterRow=[];
			var wn=_table.width;
			var br=beginAtRow==undefined?1:beginAtRow;
			var tmout;
			var lastKeydown=new Date().getTime();
			var selector;
			for(var sectionName in sections){
				for(var i=0;i<_table.names.length;i++){
					FILTERS[0][i]='';
					var refreshTable=(function(){return function(){}})()
					selector=MAKE.input({
						value:_initialValues[i]||""
						,onkeydown:(function(_section,sectionName,col,sel,FILTERS){
							return function(event){
								if(Math.abs(lastKeydown-new Date().getTime())<214){
									clearTimeout(tmout);
									this.style.backgroundImage='url(image/input_icns/input.filter.png)'
								}
								this.style.backgroundImage='url(image/loadinfo_03.gif)'
								tmout=setTimeout(
									(function(_section,sectionName,col,sel,__this__,FILTERS){
										return function(){
											
											sel.style.backgroundImage='url(image/input_icns/input.filter.png)'
											var _section=sections[sectionName].children;
											var k=0;
											/*FILTERS[0][col]=__this__.value.trim();*/
											for(var i=br;i<_section.length;i++){
												var rowVisible=1;
												for(var j=0;j<_table.names.length;j++){
													var elem=_section[i].children[j].children[0];
													var t=elem.value
														||elem.innerText
														||elem.textContent
														||elem.innerHTML;
													if(elem.tagName=='SELECT'){
														t=elem[elem.selectedIndex].innerText||elem[elem.selectedIndex].textContent;
													}
													if(
													/*((t+'').trim().indexOf(FILTERS[0][j]) > -1)
													|| ((FILTERS[0][j]+'').trim().indexOf(t) > -1)
													|| */(t==FILTERS[0][j])
													|| (FILTERS[0][j]=="") 
													|| (_table.access[j]=='H'))rowVisible*=1;
													else rowVisible*=0;
												}
												if(rowVisible>0){
													SET.css(_section[i],{display:'',backgroundColor:k%2?'#FFFFFF':'#E0F0FF'});
													k++;
												}else{
													_section[i].style.display='none';
												}
											}
										}
									})(sections,sectionName,i,this,this,FILTERS),214);
								lastKeydown=new Date().getTime();
							}
						})(sections,sectionName,i,selector,FILTERS)
						,onkeyup:(function(_section,sectionName,col,sel,FILTERS){
							return function(event){
								FILTERS[0][col]=this.value.trim();
							}
						})(sections,sectionName,i,selector,FILTERS)
					},{
						width:'100%'
						,backgroundImage:'url(image/input_icns/input.filter.png)'
						,backgroundRepeat:'no-repeat'
						,backgroundPosition:'100% 50%'})
					var filter=MAKE.th({},{},[selector])
					if(_table.access[i]=='H'){
						filter.innerHTML='';
					}
					filterRow[filterRow.length]=filter
				}
			}
			filterRow[filterRow.length]=MAKE.div();
			return filterRow;
		}
	}
	CLASS.FACTORY.CELL_RENDERERS={
		SIMPLE_EDITABLE:function(TABLE,cindex,rindex){
			var d=MAKE.input({
    			value:TABLE.rows[rindex][cindex]
    			/*,onkeyup:function(event){
    				TABLE.rows[rindex][cindex]=this.value;
    			}*/
    			,onchange:function(event){
    				TABLE.rows[rindex][cindex]=this.value;
    			}},{width:'11em'});
			
			if(TABLE.types[cindex]=='enum'){
				d=this['enum'](TABLE,cindex,rindex);
			}
			return d;
			
		}
		,SIMPLE:function(TABLE,cindex,rindex){
			var d;
			if(TABLE.access[cindex]!='H'){
				d=MAKE.div({innerHTML:TABLE.rows[rindex][cindex]},{width:'11em'});
				var overrides={'enum':'enum','checkbox':'checkbox'}
				if(TABLE.types[cindex] in overrides){
					d=this[TABLE.types[cindex]](TABLE,cindex,rindex);
	    			SET.css(d,{margin:0,padding:0,border:0});
	    			d.disabled=true;
    			}
    		}else{
    			d=MAKE.div(TABLE,cindex,rindex);
    		}
			return d;
		}
		,BY_ACCESS:function(TABLE,cindex,rindex){
			switch(TABLE.access[cindex]){
				case 'RW':
					return MAKE.input({
		    			value:TABLE.rows[rindex][cindex]
		    			,onmousemove:function(event){
		    				TABLE.rows[rindex][cindex]=this.value;
		    			}
		    			,onchange:function(event){
		    				TABLE.rows[rindex][cindex]=this.value;
		    			}
					},{width:'11em'});
				case 'H':
					return MAKE.div({
		    			innerHTML:TABLE.rows[rindex][cindex]
					},{display:'none',width:'11em'});
				default:
					return MAKE.div({
		    			innerHTML:TABLE.rows[rindex][cindex]
					},{display:'inline-block',width:'11em'});
			}
		}
		,BY_TYPE:function(TABLE,cindex,rindex){
			var cr_type=TABLE.types[cindex];
			
			var d=CLASS.FACTORY.CELL_RENDERERS[cr_type](TABLE,cindex,rindex);
			d.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return d;
		}
		,'enum':function(TABLE,cindex,rindex){
			var menum=deserializeDict(TABLE.ranges[cindex],'=','&');
			var sv;
			if(TABLE.rows[rindex][cindex] in menum){
				sv=TABLE.rows[rindex][cindex];
			}else{
				for(var kk in menum){
				sv=kk;
				break;
				}
			}
			var view=new SelectView()
	        		.SelectedValue(sv)
	        		.Data(menum)
	        		.View();
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'dropdown':function(TABLE,cindex,rindex){
			var menum=deserializeDict(TABLE.rows[rindex][cindex],'=','&');
			var view=new SelectView()
	        		.Data(menum)
	        		.View();
			return view;
		}
		,'vlist':function(TABLE,cindex,rindex){
			var menum=deserializeTable(TABLE.rows[rindex][cindex],'=','&');
			var view=new ListView2()
	        		.ItemAtIndex(function(ref,index){
	        			var dta=ref.Items()[index];
	        			return MAKE.div({innerHTML:dta[0]+'='+dta[1]})
	        		})
	        		.Items(menum)
	        		.View();
			return view;
		}
		,'option':function(TABLE,cindex,rindex){
			var menum=deserializeDict(TABLE.ranges[cindex],'=','&');
			var sv;
		}
		,'checkbox':function(TABLE,cindex,rindex){
			var view=MAKE.input({
					type:'checkbox'
				})
			document.body.appendChild(view);
			view.value=TABLE.rows[rindex][cindex]=='1'?1:0;
			if(TABLE.rows[rindex][cindex]==1)view.checked=true;
			document.body.removeChild(view);
			view.onclick=function(event){
				TABLE.rows[rindex][cindex]=view.checked?1:0;
				view.value=view.checked?1:0;
				try{
				view.onchange(event);
				}catch(err){}
			}
			return view;
		}
		,'label':function(TABLE,cindex,rindex){
			var view=MAKE.div({
    			innerHTML:TABLE.rows[rindex][cindex]
			},{width:'11em'});
			return view;
		}
		,'map':function(TABLE,cindex,rindex){
			var view=new MapInput()
				.MarkerAtIndex(function(map,table,index,parent){
					//var map=parent.getMap();
					var markerData=table[index];
					var xx=markerData[4].split('x')[0];
					var yy=markerData[4].split('x')[1]
					var rr=parseFloat(markerData[5]);
					var coordinates=new google.maps.LatLng(parseFloat(xx), parseFloat(yy));
					var newMarker = new google.maps.Marker({
						position:coordinates
					    ,map: map
					    ,draggable:false
						,title: markerData.text
					});
					newMarker.setIcon('image/input_icns/pin.small.teal.png');
					google.maps.event.addListener(newMarker, 'click', function(event) {
						alert('RAW_DATA:\n'+serializeDict(pivot_dictionary(table,index),'=','\n'));
					});
					return newMarker;
				})
				.Markers(TABLE.rows)
				.Value(TABLE.rows[rindex][cindex])
				.OnChange(function(ref,value){
					ref.value=value;
					ref.onchange();
				})
	    		.View();
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
	    	return view;
		}
		,'mapdist':function(TABLE,cindex,rindex){
			var view=new MapDistInput()
				.MarkerAtIndex(function(map,table,index,parent){
					var markerData=table[index];
					var xx=markerData[4].split('x')[0];
					var yy=markerData[4].split('x')[1]
					var rr=parseFloat(markerData[5]);
					var coordinates=new google.maps.LatLng(parseFloat(xx), parseFloat(yy));
					var newMarker = new google.maps.Marker({
						position:coordinates
					    ,map: map
					    ,draggable:false
						,title: markerData.text
					});
					newMarker.setIcon('image/input_icns/pin.small.teal.png');
					google.maps.event.addListener(newMarker, 'click', function(event) {
						alert('RAW_DATA:\n'+serializeDict(pivot_dictionary(table,index),'=','\n'));
					});
					return newMarker;
				})
				.Markers(TABLE.rows)
				.Center({x:parseFloat(TABLE.rows[rindex][cindex-1].split('x')[0]),y:parseFloat(TABLE.rows[rindex][cindex-1].split('x')[1])})
				.Value(TABLE.rows[rindex][cindex])
				.OnChange(function(ref,value){
					ref.value=parseInt(value/10)/100;
					ref.onchange();
					view.onchange();
				})
	    		.View();
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'address':function(TABLE,cindex,rindex){
			var view=new AddressInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'email':function(TABLE,cindex,rindex){
			var view=new MailInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[0][cindex]=this.value;
			}
			return view;
		}
		,'number':function(TABLE,cindex,rindex){
			var view=new NumberInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'procent':function(TABLE,cindex,rindex){
			var tmout;
			var lastKeydown=new Date().getTime();
			var view=MAKE.input({
			    value:TABLE.rows[rindex][cindex]
				,onchange:function(event){
					var _this=this;
					var val=parseFloat(_this.value).toFixed(2);
					if(isNaN(val))val=0;
					if(val<=0 || val>=1 || isNaN(val)){
						_this.style.backgroundImage='url(image/openiconlib/dialog-warning-4-small.png)'
					}else{
						_this.style.backgroundImage='url(image/input_icns/input.procent.png)'
					}
					TABLE.rows[rindex][cindex]=val;
				}
				,onkeyup:(function(_TABLE,_cindex,_rindex){
					return function(event){
						var _this=this;
						var COMPUTED_TIME=700+100*_this.value.length
						if(Math.abs(lastKeydown-new Date().getTime())<COMPUTED_TIME){
							try{
								clearTimeout(tmout);
							}catch(err){}
							//this.style.backgroundImage='url(image/input_icns/input.procent.png)';
						}
						var val=parseFloat(_this.value).toFixed(2);
						if(isNaN(val))val=0.00;
						if(val<0 || val>1 || isNaN(val)){
							_this.style.backgroundImage='url(image/openiconlib/dialog-warning-4-small.png)'
						}else{
							_this.style.backgroundImage='url(image/input_icns/input.procent.png)'
						}
						_TABLE.rows[_rindex][_cindex]=val;
						//_this.style.backgroundColor='#FFFFCC';
						tmout=setTimeout(
							(function(__TABLE,__cindex,__rindex,__this){
								return function(){
									
									try{
										var val=parseFloat(__this.value).toFixed(2);
										if(isNaN(val))val=0;
										__this.value=val;
										__TABLE.rows[__rindex][__cindex]=val;
										if(val<0 || val>1){
											__this.style.backgroundImage='url(image/openiconlib/dialog-warning-4-small.png)'
										}else{
											__this.style.backgroundImage='url(image/input_icns/input.procent.png)';
										}
									}catch(err){}
									
								}
							})(_TABLE,_cindex,_rindex,_this),COMPUTED_TIME);
						lastKeydown=new Date().getTime();
					}
				})(TABLE,cindex,rindex)
				/*,onkeyup:function(event){
					if(Math.abs(parseFloat(this.value).toFixed(2)-.5)<.5)
					TABLE.rows[rindex][cindex]=this.value;
				}*/
			},{
				width:'6em'
				,backgroundImage:'url(image/input_icns/input.procent.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'})
			return view;
		}
		,'text':function(TABLE,cindex,rindex){
			var view=new TextInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'field':function(TABLE,cindex,rindex){
			var view=new TextInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'textarea':function(TABLE,cindex,rindex){
			var view=new TextareaInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'list':function(TABLE,cindex,rindex){
			
		}
		,'date':function(TABLE,cindex,rindex){
			var view=new DateInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'time':function(TABLE,cindex,rindex){
			var view=new TimeInput()
				.Value(TABLE.rows[rindex][cindex])
	    		.View()
			view.onchange=function(event){
				TABLE.rows[rindex][cindex]=this.value;
			}
			return view;
		}
		,'datetime':function(TABLE,cindex,listData){
			
		}
		,'bin':function(TABLE,cindex,listData){
			
		}
		,'bin_download':function(TABLE,cindex,listData){
			
		}
		,'bin_upload':function(TABLE,cindex,listData){
			
		}
		,'file':function(TABLE,cindex,listData){
			var d=MAKE.input({
    			value:listData[cindex]
				,name:TABLE.t_codes[cindex]
				,type:'file'
    			/*,onkeyup:function(event){
    				TABLE.rows[rindex][cindex]=this.value;
    			}*/},{width:'11em'});
			return d;
		}
		,'photo':function(TABLE,cindex,listData){
			
		}
	};
	CLASS.CELL_EDITORS={
		'enum':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'option':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'checkbox':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'text':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'map':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'mapdist':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'address':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'email':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'number':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'field':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'list':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'date':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'time':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'datetime':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_download':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_upload':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'file':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
	};
	CLASS.CELL_VALIDATORS={
		'enum':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'option':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'checkbox':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'text':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'map':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'mapdist':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'address':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'email':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'number':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'field':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'list':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'date':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'time':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'datetime':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_download':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_upload':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'file':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
	};
	CLASS.CELL_VALIDATOR_MESSAGES={
		'enum':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'option':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'checkbox':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'text':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'map':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'mapdist':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'address':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'email':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'number':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'field':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'label':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'list':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'date':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'time':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'datetime':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_download':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'bin_upload':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
		,'file':function(TABLE,_this,_sectionView,_rowView,_rIndex,_cellView,_cIndex){}
	};
	CLASS.STRINGS_FETCH('EditableTable',['ADMIN_TNT.LABEL.VALIDATE','PORTAIL.ENUM.LABEL.ALL','PORTAIL.ENUM.LABEL.EVERY','PORTAIL.ENUM.LABEL.NONE']);
	return CLASS;
})();