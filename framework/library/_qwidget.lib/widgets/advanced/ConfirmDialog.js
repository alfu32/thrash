var ConfirmDialog=(function(){
	var CLASS=function ConfirmDialog(targetElement){
    	Base.call(this,['ConfirmDialog']);
		var _THIS=this;
		
		Widget.call(this);
		QProperty.call(this,['OnCancel']);
		_THIS.OnCancel(function(){return true;});
		
		QProperty.call(this,['OnConfirm']);
		_THIS.OnConfirm(function(){return true;});
		
		_THIS.Parent.afterSet=function(_parent){
		};
		
		QProperty.call(this,['Message']);
		_THIS.Message('Confirm');
		_THIS.Message.afterSet=function(_msg){
			msg.innerHTML=_msg;
		};
		
		QProperty.call(this,['Title']);
		_THIS.Title('Title');
		_THIS.Title.afterSet=function(_title){
			win.Title(_title);
		};
		
		var renderView=function(){
			return _THIS;
		}
		var cnt,msg
		var btn_OK,btn_CANCEL;
		
		var win=new WindowLayout()
			.Title('Confirm')
			.Children([
				new VLayout().Children([
				cnt=new VLayout()
					.Children([
					     new Widget().View(msg=MAKE.div({innerHTML:_THIS.Message()}))
					])
				,new HLayout()
					.Children([
						btn_OK=new ImageButton2().Text('OK')
						.Click(function(event){
							if(_THIS.OnConfirm()(btn_OK))
								win.Close();
						})
						,btn_CANCEL=new ImageButton2().Text('Cancel')
						.Click(function(event){
							if(_THIS.OnCancel()(btn_CANCEL))
								win.Close();
						})
					])
				])
			]);
		this.show=function(){
			win.Parent(document.body);
			return _THIS;
		}
		this.Close=function(){
			win.Close();
			return _THIS;
		}
		_THIS.View(win.View());
		this.addCtrl=function(){
			win.Parent(document.body);
			return _THIS;
		}
		
		
	};
	WidgetStatic.call(CLASS);
	return CLASS;
}

)();