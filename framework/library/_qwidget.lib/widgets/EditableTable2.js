
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

