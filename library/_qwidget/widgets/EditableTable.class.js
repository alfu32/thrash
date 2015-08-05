EditableTable=(function(){
	var CLASS=function EditableTable(){
		var _THIS=this;
		var shadow=[];
		var InstanceViewWidth=null
		Widget.call(this);
		_THIS.Parent.beforeSet=function(_parent){
			renderView();
			setTimeout(function(){_parent.appendChild(_THIS.View)},100)
		}
		/*_THIS.View.beforeGet=function(_view){
			renderView();
		}*/
		QProperty.call(this,['Editable']);
		_THIS.Editable.afterSet=function(_editable){
			var tagNames={'INPUT':0,'SELECT':1,'TEXTAREA':2,'BUTTON':3}
			var inp;
			//console.log('EDITABLE',_editable)
			inp=_THIS.View().getElementsByTagName('input');
			//console.log('EDITABLE',inp)
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
		var CHANGE_MODEL=function(old,table,row,col,values,ref){
	        			return function(event){
	        				return;
	        				//console.log('ONCHANGE : type:',table[1][col],'OLD:',old,'NEW:',table,'row:',row,'col:',col,'enum_values : ',values,'reference view :',ref)
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
				console.log(_table);
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
							//console.log('enum')
							//console.log('ENUM:',menum,'"'+_table[i][j]+'"',qenum.KeysForValue(_table[i][j]));
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
								//console.log(this);
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
								//console.log('RW')
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
				//console.log(lastButton)
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
				//console.log(_SECTIONS)
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
						//console.log((this.style.backgroundImage+'').indexOf('icon.php?img=up_empty&type=1_Desktop'))
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
			
			//console.log(cols);
			
			var selector=new SelectView()
				.Data(cols[i])/*cols[i]*/
				.OnChange((function(_section,sectionName,col,sel){
					return function(link,_view,index,value){
						setTimeout(function(){
							var _section=sections[sectionName].children;
							var k=0;
							FILTERS[col]=_view.selected.trim();
							//console.log(FILTERS[col],'=====STANDARD.SECTION_FILTERS_DROPDOWNS.ON_TEXT_CONTENT====');
							for(var i=3;i<_section.length;i++){
								var rowVisible=1;
								for(var j=0;j<_section[i].children.length-1;j++){
									var cell=_section[i].children[j];
									var cellText=cell.children[0]?(cell.children[0].value?cell.children[0].value:cell.innerHTML):cell.innerHTML;
									rowVisible*=((cellText.trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
									//console.log("CHILD INNER TEXT : `"+cellText+"`",cell);
									//console.log(j,'$'+cellText.trim().indexOf(FILTERS[j])+'$','$'+FILTERS[j]+'$');
								};
								console.log(i,rowVisible,FILTERS);
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
									rowVisible*=(((_section[i].children[j].innerText+'').trim().indexOf(FILTERS[j]) > -1) || FILTERS[j]=='' || access[j]=='H');
									
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
})()