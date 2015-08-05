
var TableView=(function(){
	var CLASS=function TableView(title,_headStyle){
		
		var _THIS=this;
		QObject.call(this);
		Widget.call(this);
		QProperty.call(this,['OnRowClicked']);
		QProperty.call(this,['RowClassName']);
		QProperty.call(this,['HeadVisibility']);
		QProperty.call(this,['Filter']);
		this.HeadVisibility(true);
		this.Filter(function(s){return true});
		
		var lookup=function(_tr){
			//if(_THIS.filter==null)return true;
			var r=(function(rw){var ret=[];for(var i=0;i<rw.length;i++){ret[ret.length]=rw[i].innerText};return ret.join(' ');})(_tr);
			//console.log(_THIS.Filter());
			//console.log(_THIS.Children());
			return _THIS.Filter()(r);
		}
		this.RowClassName("");
		this.OnRowClicked(function(instance,index,target){})
		this.Children({data:{}});
		this.Children.afterSet=function(val){
			_THIS.renderView();
		}
		this.append=function(child){
			if(child.name in children){return this;}
			children[child.name]=child.widget;
			return this;
		};
		this.View(MAKE.center({className:"TableView"}));
			
		var table=MAKE.table({hasLayout:true});
		var tbody=MAKE.tbody();
		
		//table.appendChild(tfilter);
		this.View().appendChild(table);
		table.appendChild(tbody);
		this.filterView=function(){
			var k=0;
			for(var i=1;i<tbody.children.length;i++){
				var tr=tbody.children[i];
				tr.className="Row "+this.RowClassName();
				if(k%2)tr.className+=" Even";
				else tr.className+=" Odd";
				if(!lookup(tr.children)){tr.style.display='none'}
				else{tr.style.display='';k++}
				tr.onmouseover=(function(_type){return function(event){this.className="Row Row_hover"}})(tr.className)
				tr.onmouseout=(function(_type){return function(event){this.className=_type}})(tr.className)
				tr.onmouseleave=(function(_type){return function(event){this.className=_type}})(tr.className)
			}
		}
		this.renderView=function(){
			CLASS.clearView(tbody);
			var k=0,maxCol=0;
			var nrVisibleCols=0;
			var children=this.Children()
			if(children.order==undefined){
				children.order={order:"ASC",column:0}
				var row0=children.data[0];
				children.data.sort(function(row1,row2){
					if(row1==row0)return -1;
					if(row2==row0)return 1;
					var a=row1[children.order.column];
					var b=row2[children.order.column];
					return a>b?-1:a==b?0:1;
				});
			}
			var COL_LEN;
			if(children.data[0].length>0)COL_LEN=(100/children.data[0].length);
			else COL_LEN=100;
			for(var row in children.data){
				var tr=MAKE.tr({className:"Row "+this.RowClassName()});
                var type=children.data[row][5];
				if(k==0){
					tr.className=_headStyle||"Header ";
				}
				else
				if(k%2)tr.className+=" Even";
				else tr.className+=" Odd";
				var col=0;
				for(var cell in children.data[row]){
					var td=MAKE.td(
							{className:this.RowClassName()
							,innerHTML:children.data[row][cell]}
							,{width:COL_LEN+'%',cursor:'default'});
					if(children.data[row][cell].indexOf("####")>-1){
						var listData=children.data[row][cell].split("####");
						var ltitle,lbody=MAKE.div({},{position:'absolute',display:'none'})
						td=MAKE.td({
							className:this.RowClassName()
							},{
								width:COL_LEN+'%'
							},[
							ltitle=MAKE.div(
								{
									innerHTML:'Multiple roles'
									,onmousemove:function(e){
										var event=NORM.event(e)
										if(event.offsetX>(this.offsetWidth-64)){
											this.style.cursor='pointer'
										}else{
											this.style.cursor='default'
										}
									}
									,onmousedown:(function(targetList,targetTitle){
										return function(e){
											var event=NORM.event(e)
											//console.log(event.offsetX,this.offsetWidth-64)
											if(event.offsetX>(this.offsetWidth-64)){
												var X=GET.X(this),Y=GET.Y(this)+this.offsetHeight+2;
												SET.css(targetList,{left:X+'px',top:Y+'px',width:this.offsetWidth+'px'})
												if(targetList.style.display=='none'){
													targetList.style.display='block';
													this.style.backgroundImage='url(image/icongen/minus_icons/1_Desktop_Icons/icon_032.png)';
												}else{
													targetList.style.display='none';
													this.style.backgroundImage='url(image/icongen/plus_icons/1_Desktop_Icons/icon_032.png)';
												}
											}
										}
									})(lbody,ltitle)
									,align:'left'
								},{
								height:'32px'
								,padding:'7px',backgroundColor:'#FFF',border:'1px solid #888'
								,backgroundImage:'url(image/icongen/plus_icons/1_Desktop_Icons/icon_032.png)'
								,backgroundPosition:'100% 50%'
								,backgroundRepeat:'no-repeat'
							})
							,lbody])
						for(var i=0;i<listData.length;i++){
							lbody.appendChild(MAKE.div({innerHTML:listData[i]}
							,{cursor:'default'
							,width:'192px'
							,padding:'2px'
							,backgroundColor:'#FFF'
							,border:'1px solid #888',borderTop:'',marginRight:'32px'},[]))
						}
						lbody.children[0].style.borderTop='1px solid #888'
					}
					if(col==children.order.column && k==0){
						SET.css(td,{
							verticalAlign:'top'
							,backgroundRepeat:"no-repeat"
							,backgroundPosition:"0px 3px"
							,backgroundImage:(children.order.order=="ASC")?
								"url('image/arrow-up-small.png')":
								"url('image/arrow-down-small.png')"
						})
					}
					if(col==children.order.column){
						//td.style.background="rgba(33,33,53,.2)";//rgba(255,255,255,.3)
						td.className="Ordered";
							//"url(data:image/gif;base64,R0lGODlhBAAEAIABAAAAAP///yH5BAEKAAEALAAAAAAEAAQAAAIFRB6GelAAOw==);";//rgba(255,255,255,.3)
					}
					if(k==0){
						nrVisibleCols++;
						td.onclick=CLASS.MAKE_sortByColumnListener(_THIS,col,td);
					}
					if(col>=nrVisibleCols)continue;
					tr.appendChild(td);
					col++;
				}
				if(col>maxCol)maxCol=col;
				if(k>0){
					td.align="center";
					tr.onclick=CLASS.MAKE_rowClickEventListener(_THIS,row,tr);
					tr.onmouseover=(function(_type){return function(event){this.className="Row Row_hover"}})(tr.className)
					tr.onmouseout=(function(_type){return function(event){this.className=_type}})(tr.className)
					tr.onmouseleave=(function(_type){return function(event){this.className=_type}})(tr.className)
				}

				if(k!=0 && !lookup(tr.children))continue;
				if(k==0 && !_THIS.HeadVisibility()){k++;continue;}
				tbody.appendChild(tr);
				k++;
			}
			//tdf.colSpan=maxCol+1;
			return this;
		};
		this.last=null;
		
	};
	WidgetStatic.call(CLASS);
	CLASS.MAKE_sortByColumnListener=function(instance,index,target,_sign){
		return function(event){
			var d=instance.Children();
			var head=instance.View().children[0].children[0].children[0];
			var row0=d.data[0];
			var dd=d.order.order=='ASC' + d.order.column==index;
			if(d.order.column==index){
				d.order.order=='ASC'?d.order.order='ASC':d.order.order='DESC'
			}else{
				d.order.order='ASC'
				}
			if(d.order.order=='ASC'){
				d.order.order='DESC';
				d.order.column=index;
				d.data.sort(function(row1,row2){
					if(row1==row0)return -1;
					if(row2==row0)return 1;
					var a=row1[d.order.column];
					var b=row2[d.order.column];
					return a>b?1:a==b?0:-1;
				});
				instance.renderView();
			}
			else {
				d.order.order='ASC';
				d.order.column=index;
				d.data.sort(function(row1,row2){
					if(row1==row0)return -1;
					if(row2==row0)return 1;
					var a=row1[d.order.column];
					var b=row2[d.order.column];
					return a>b?-1:a==b?0:1;
				});
				instance.renderView();
			}
		};
	};
	CLASS.MAKE_rowClickEventListener=function(instance,index,target,_sign){
		return function(event){
			instance.OnRowClicked()(instance,index,target);
			if(instance.last!=null){
				instance.last.style.backgroundColor='';
				instance.last.style.borderTop='';
				instance.last.style.borderLeft='';
				instance.last.style.borderRight='';
				instance.last.style.borderBottom='';
			}
			instance.last=target;
			target.style.backgroundColor='#96d4df';
			instance.last.style.borderTop='2px solid #FFFFFF';
			instance.last.style.borderLeft='5px solid #96d4df';
			instance.last.style.borderRight='5px solid #96d4df';
			instance.last.style.borderBottom='2px solid #76b4bf';
		};
	};
	return CLASS;
})();