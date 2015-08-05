
EditableRow=(function(){
	var CLASS=function EditableRow(dataTargetReference/*{ref:data}*/){
    	Base.call(this,['EditableRow']);
		var _THIS=this;
		Widget.call(_THIS);
		QProperty.call(this,['OnBeforeCommit']);this.OnBeforeCommit(function(event,_EDIT_ROW){});
		QProperty.call(this,['OnCommit']);this.OnCommit(function(event,_EDIT_ROW){return true});
		QProperty.call(this,['OnAfterCommit']);this.OnAfterCommit(function(event,_EDIT_ROW){return true});
		
		QProperty.call(this,['OnReset']);this.OnReset(function(event,_EDIT_ROW){});
		
		QProperty.call(this,['OnBeforeReload']);this.OnBeforeReload(function(event,_EDIT_ROW){});
		QProperty.call(this,['OnReload']);this.OnReload(function(event,_EDIT_ROW){});
		QProperty.call(this,['OnAfterReload']);this.OnAfterReload(function(event,_EDIT_ROW){});
		
		QProperty.call(this,['OnErrorCommit']);this.OnErrorCommit(function(event,_EDIT_ROW){});
		QProperty.call(this,['OnErrorReload']);this.OnErrorReload(function(event,_EDIT_ROW){});
		
		QProperty.call(this,['Link']);/*{ref:TABLE_TEST,row:r,header:table_test[0]}*/
		this.Link.afterSet=function(_link){
			_THIS.renderView();
		}
		QProperty.call(this,['UpdateTable']);
		var v,fb;
		_THIS.View(
			MAKE.table({className:'EditableRow'},{border:'1px solid #888888'},[
			   MAKE.tbody({},{},[
			       v=MAKE.tr()
			   ])
			])
		)
		
		_THIS.View(v=MAKE.tr())
		this.renderView=function(){
			CLASS.clearView(v);
			var lnk=_THIS.Link(),row=lnk.ref[lnk.row],head=lnk.header;
			var table=lnk.ref,head=lnk.ref.head,access=lnk.ref.access,types=lnk.ref.types
			var newRow=[]
			v.appendChild(MAKE.td({},{},[
			    fb=MAKE.img({src:CLASS.STATUS.EMPTY
					,onclick:function(event){
						_THIS.OnReset()(event,_THIS);
					}
			    },{width:'33px',height:'33px'})
			]))
			for(var c=0;c<head.length;c++){
				newRow[c]=row[c]
				var view,menum=deserializeDict(table.values[c],'=','&');
				switch(access[c]){
				case 'H':
					//console.log('H')
					view=MAKE.input({value:row[c],disabled:true,type:'hidden'},{color:"#AAA"})
					break;
				case 'R':
					//console.log('R')
						view=MAKE.div({innerHTML:row[c],disabled:true})
					break;
				case 'RW':
					//console.log('RW')
					switch(types[c]){
					case 'enum':
						//console.log('enum')
						view=new SelectView()
			    			.Link({ref:table,row:lnk.row,col:c})
			        		.SelectedValue(table[lnk.row][c])
			        		.Data(menum)
			        		.View()
			        		break;
					case 'text':
						//console.log('text')
						view=MAKE.textarea({
							value:row[c]
						})
						//view=
						break;
					default:
						//console.log('default RW')
						view=MAKE.div({innerHTML:row[c],disabled:true})
					}
					break;
				default:
					//console.log('default acces')
					view=MAKE.input({value:row[c]})
				}
				view.onchange=(function(_col,target,_enum){
			        			return function(event){
			        				if(types[_col]=='enum'){newRow[_col]=_enum[target.value];}
									else{newRow[_col]=target.value;}
			        				console.log(_col,target,row,newRow)
			        				//return _THIS.UpdateTable()(lnk,oldValue,newValue);
			        			};
			        		})(c,view,menum)
				v.appendChild(MAKE.td({},{display:''},[
				    view
				]))
			}
			v.appendChild(MAKE.td({},{},[MAKE.button({
				innerHTML:'Commit'
				,onclick:function(event){
					fb.src=CLASS.STATUS.LOADING
					_THIS.OnBeforeCommit()(event,_THIS);
					//var s1=_THIS.OnCommit()(event,_THIS);
					var s1=_THIS.OnCommit()(lnk,row,newRow)
					var s2=_THIS.OnAfterCommit()(event,_THIS);
					
					
					setTimeout((function(){
						fb.src=CLASS.STATUS.EMPTY
						if(!(s1||s2)){
							_THIS.OnErrorCommit()();
							fb.src=CLASS.STATUS.ERROR
			    				new Popover(fb,15000)
			    				.Text('Erreur de communication<br><b>SERVEUR :</b>'+s1+'<br><b>APPLICATION :</b>'+s2)
			    				.Node(MAKE.div({},{},[
			    				     MAKE.button({innerHTML:'Fermer',onclick:function(event){fb.src=CLASS.STATUS.WARNING}})
			    				     ,MAKE.button({innerHTML:'Signaler',onclick:function(event){fb.src=CLASS.STATUS.ATTENTION}})]))
			    				.Icon(Popover.ICONS.ERROR)
			    				.align(fb);
						}else {fb.src=CLASS.STATUS.OK}
					}).bind(this),300)
				}
			})]))
			v.appendChild(MAKE.td({},{},[MAKE.button({
				innerHTML:'Reset'
				,onclick:function(event){
					_THIS.OnReset()(event,_THIS);
				}
			})]))
			v.appendChild(MAKE.td({},{},[MAKE.button({
				innerHTML:'Reload'
				,onclick:function(event){
					fb.src=CLASS.STATUS.LOADING
					_THIS.OnBeforeReload()(event,_THIS);
					var s1=_THIS.OnReload()(event,_THIS);
					var s2=_THIS.OnAfterReload()(event,_THIS);
					setTimeout((function(){
						fb.src=CLASS.STATUS.EMPTY
						if(!(s1&&s2)){
							_THIS.OnErrorReload()();
							fb.src=CLASS.STATUS.ERROR
			    				new Popover(fb,15000)
			    				.Text('Erreur de communication<br><b>SERVEUR :</b>'+s1+'<br><b>APPLICATION :</b>'+s2)
			    				.Node(MAKE.div({},{},[
			    				     MAKE.button({innerHTML:'Fermer',onclick:function(event){fb.src=CLASS.STATUS.WARNING}})
			    				     ,MAKE.button({innerHTML:'Signaler',onclick:function(event){fb.src=CLASS.STATUS.ATTENTION}})]))
			    				.Icon(Popover.ICONS.ERROR)
			    				.align(fb);
						}else {fb.src=CLASS.STATUS.OK}
					}).bind(this),300)
				}
			})]))
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS);
	CLASS.firstTimeSeen=true;
	CLASS.STATUS={
		LOADING:'image/loadinfo_EEF.gif'
		,OK:'image/check_mini.png'
		,ERROR:'image/openiconlib/dialog-error-4.png'
		,WARNING:'image/openiconlib/dialog-warning-4.png'
		,ATTENTION:'image/openiconlib/dialog-alert.png'
		,EMPTY:'image/openiconlib/empty.png'
	}
	return CLASS;
})()