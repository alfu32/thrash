var ImageButton=(function(){
	var CLASS=function ImageButton(){
		Widget.call(this);
		var _THIS=this;
		QProperty.call(this,['Click'])
		QProperty.call(this,['Image'])
		_THIS.Image("image/transparent_50.gif");
		
		QProperty.call(this,['ImageSize'])
		_THIS.ImageSize('44 44');
		this.renderView=function(){
			var styleDef={
						padding:'5px'
						,cursor:'pointer'
						,width:_THIS.ImageSize()
					}
			var is=_THIS.ImageSize().replace(/px/gi,'').split(' ');
			is[0]=parseInt(is[0]);
			if(!isNaN(is[0])){
				is[1]=parseInt(is[1])
				if(isNaN(is[1]))is[1]=is[0];
				styleDef.width=is[0]+'px'
				styleDef.height=is[1]+'px'
			}
			_THIS.View(MAKE.img(
					{
						src:_THIS.Image()
						,onmousedown:_THIS.Click()
					}
					,styleDef
				)
			)
			return _THIS;
		}
		
		this.Image.afterSet=function(_icon){
			_THIS.renderView();
		}
		this.ImageSize.afterSet=function(_size){
			_THIS.renderView();
		}
		this.Click.afterSet=function(_function){
			_THIS.renderView();
		}
		
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();