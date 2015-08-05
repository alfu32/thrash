var FormFrame=(function(){
	var PROTO=function FormFrame(id){
    	Base.call(this,['FormFrame']);
		var _THIS=this;
		Widget.call(_THIS);
		var frame,form,button,extra;
		var _id=id||'form_'+RANDOM.GUID(7,5,'_');
		this.formData={};
		_THIS.Parent.afterSet=function(_parent){
			try{
				_parent.appendChild(_THIS.View())
				frame.style.display='';
			}catch(err){
				
			}
		};
		_THIS.submit=function(){
			form.submit();
		}
		QProperty.call(_THIS,['Application']);
		_THIS.Application('self');
		_THIS.Application.afterSet=function(_action){
			form.action=_action;
		};
		QProperty.call(_THIS,['Enabled']);
		_THIS.Enabled(true);
		_THIS.Enabled.afterSet=function(_action){
		};
		QProperty.call(_THIS,['Extras']);
		_THIS.Extras([]);
		_THIS.Extras.afterSet=function(_action){
			renderView();
		};
		QProperty.call(_THIS,['HiddenData']);
		_THIS.HiddenData({cmd:'NOP'});
		_THIS.HiddenData.afterSet=function(_action){
			renderView();
		};
		QProperty.call(_THIS,['ValidateCellAtIndex']);
		_THIS.ValidateCellAtIndex(function(_table,index,cell){
			
		});
		QProperty.call(_THIS,['ValidateForm']);
		_THIS.ValidateForm(function(_table,_form){
			
		});
		
		QProperty.call(_THIS,['BeforeSubmit']);
		_THIS.BeforeSubmit(function(_formframe){
			return true;
		});
		QProperty.call(_THIS,['AfterLoad']);
		_THIS.AfterLoad(function(_response){
			
		});
		QProperty.call(_THIS,['Table']);
		_THIS.Table(new Table().init([[],[],[],[],[]]));
		_THIS.Table.afterSet=(function(table){
			renderView();
		});
		_THIS.View(make.div({},{},[
			frame=make.IFRAME({
				id:_id
				,name:_id
				,onload:function(event){
					var dbody=frame.contentWindow || frame.contentDocument;
					var _response=dbody.document.body.innerText;
					_THIS.AfterLoad()(_response);
				}
				,src:''
			},{display:'none',border:0,margin:0,padding:0,width:'840px',height:'0px'})
			,form=make.form({
				target:_id
				,action:_THIS.Application()
				,method:"post"
				,enctype:"multipart/form-data"
				,encoding:"multipart/form-data"
				,acceptCharset:"ISO-8859-15"
			})
			,extra=make.div()
		]));
		button=make.input({
			type:'submit'
			,name:'action'
			,value:'A C T'
			,onclick:function(event){
				if(false && !_THIS.BeforeSubmit()(_THIS)){
					NORM.preventDefault(event);
					NORM.stopPropagation(event);
					return false;
				};
			}
		})
		var renderView=function form_frame_renderView(){
			var table=_THIS.Table();
			PROTO.clearView(form);
			PROTO.clearView(extra);
			var t=MAKE.tbody();
			var hasRWproperties=false;
			var renderer=TableControllerView.FACTORY.CELL_RENDERERS.BY_TYPE
			for(var i=0;i<table.t_codes.length;i++){
				var cr_type=table.types[i];
				var cr_code=table.t_codes[i];
				var cr_access=table.access[i];
				var cell;
				if(cr_type in TableControllerView.FACTORY.CELL_RENDERERS){
					cell=TableControllerView.FACTORY.CELL_RENDERERS[cr_type](table,i,0);
				}else{
					cell=TableControllerView.FACTORY.CELL_RENDERERS.BY_ACCESS(table,i,0);
				}
				cell.name=cr_code;
				_THIS.formData[cr_code]=table.rows[0][i];
				cell.onchange=(function(selector,cell,index,table){
					return function(){
						_THIS.formData[selector]=this.value;
						_THIS.ValidateCellAtIndex()(table,i,this);
						_THIS.ValidateForm()(table,_THIS);
					}
				})(cr_code,cell,i,table);
				if(cr_access=='R'){
					cell=MAKE.div({innerHTML:table.rows[0][i]});
				}
				
				cell.style.backgroundImage='';
				if(cr_type=='file' && cr_access=='R'){
					var tout;
					var filename=table.rows[0][i].split('/');
					var extension=filename[filename.length-1].split('.');
					var ext=extension[extension.length-1]==''?'blank':extension[extension.length-1];
					cell=MAKE.imagebutton(
							{hover:'#DDEEFF',innerHTML:table.rows[0][i],align:'left'
								,onclick:(function(index){
									return function(event){
										var __frame=MAKE.IFRAME({align:'center',name:'preview_frame',id:'preview_frame'},{width:'99%',height:'99%'});
										var win=new WindowLayout()
											.Title(filename[filename.length-1])
											.Children([new Widget().View(__frame)]);
										win.Parent(document.body);
										SET.css(win.View(),{top:'0px',left:'0px'});
										SET.css(__frame,{width:'768px',height:'540px'});
										SET.css(win.ViewElements().menuRow,{display:'none'});
										SET.css(win.ViewElements().toolbarRow,{display:'none'});
										SET.css(win.ViewElements().footerRow,{display:'none'});
										__frame.src=filename.join('/');
										win.View().scrollIntoView();
									}
								})(filename)
								,onmouseover:function(event){this.style.backgroundColor='#AACCFF'}
								,onmouseout:function(event){this.style.backgroundColor='#FFF'}
							},
							{cursor:'pointer',padding:'2px'
							,width:'21em',height:'22px'
							,backgroundImage:'url(image/mime-types/32/'+ext+'.png)'
							,backgroundPosition:'100% 50%'
							,backgroundColor:'#FFF',color:"#122227"
							,border:'1px solid #FFF',margin:'2px'
							})
							.view
				}
				var tr;
				cell.style.width='22em';
				t.appendChild(tr=MAKE.tr({},{},[MAKE.td({innerHTML:table.names[i]}),MAKE.td({},{},[cell])]));
				if(cr_access=='H'){
					tr.style.display='none';
				}
				if(cr_access=='RW'){hasRWproperties=true}
			}
			var xtras=_THIS.HiddenData();
			for(var x in xtras){
				form.appendChild(MAKE.input({name:x,value:xtras[x]},{display:'none'}));
				_THIS.formData[x]=xtras[x];
			}
			var xtraCtrl=_THIS.Extras();
			for(var i=0;i<xtraCtrl.length;i++){
				extra.appendChild(xtraCtrl[i]);
			}
			//if(hasRWproperties)form.appendChild(button);
			form.appendChild(MAKE.table({},{},[t]));
		}
	}
	WidgetStatic.call(PROTO);
	return PROTO;
})();