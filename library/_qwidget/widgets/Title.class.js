var Title=(function(){
	var CLASS=function Title(){
		Widget.call(this);
		var _THIS=this;
		QProperty.call(this,['Text'])
		_THIS.Text("Title");
		QProperty.call(this,['Click'])
		_THIS.Click(function(event){});
		QProperty.call(this,['CSS'])
		_THIS.CSS({})
		QProperty.call(this,['Tag'])
		_THIS.Tag('div')
		
		this.renderView=function(){
			var v;
			_THIS.View(v=MAKE[_THIS.Tag()](
					{
						innerHTML:_THIS.Text()
						,onmousedown:function(event){
							_THIS.Click()(event);
						}
					},_THIS.CSS()
				)
			)
			return _THIS;
		}
		this.renderView();
		
		this.Text.afterSet=function(_text){
			_THIS.View().innerHTML=_text;
		}
		this.CSS.afterSet=function(_CSSDef){
			SET.css(_THIS.View(),_CSSDef);
		}
		this.Tag.afterSet=function(_tag){
			_THIS.renderView();
		}
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();
