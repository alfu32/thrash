
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
		,'text64':function(TABLE,cindex,rindex){
			var view=new TextInput()
				//.Value(base64decode(TABLE.rows[rindex][cindex]))
	    		.View();
			return view;
		}
		,'textarea64':function(TABLE,cindex,rindex){
			var view=new TextareaInput()
				//.Value(base64decode(TABLE.rows[rindex][cindex]))
	    		.View()
			view.onchange=function(event){
				//TABLE.rows[rindex][cindex]=base64encode(this.value);
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