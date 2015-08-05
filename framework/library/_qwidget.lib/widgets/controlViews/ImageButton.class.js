var ImageButton=(function(){
	var CLASS=function ImageButton(){
    	Base.call(this,['ImageButton']);
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
var ImageButton2=(function(){
	var CLASS=function ImageButton2(){
    	Base.call(this,['ImageButton2']);
		Widget.call(this);
		var _THIS=this;
		var h,empty=function(event){};
		QProperty.call(this,['Click']);
		_THIS.Click(empty);
		QProperty.call(this,['Click_async']);
		_THIS.Click_async(false);
		QProperty.call(this,['Text']);
		_THIS.Text('button');
		QProperty.call(this,['Image'])
		_THIS.Image("image/empty.gif");
		QProperty.call(this,['Align'])
		_THIS.Align("left");
		QProperty.call(this,['Size'])
		_THIS.Size({width:'92px',height:'44px'});
		
		QProperty.call(this,['ImagePosition'])
		_THIS.ImagePosition('100% 50%');
		var tagName='div';
		if(IS.IE){tagName='span'}
		_THIS.View(h=MAKE[tagName]({
				onmousedown:function(event){SET.css(h,{backgroundColor:'#9FF'});}
				,onmouseup:function(event){SET.css(h,{backgroundColor:'#EEE'});}
				,onmouseout:function(event){SET.css(h,{backgroundColor:'#EEE'});}
				,onclick:function(event){
					if(_THIS.Click_async()){
						var old_img=_THIS.Image();
						_THIS.Image('image/loader_003.gif');
						setTimeout(function(){
							_THIS.Click()(event);
							setTimeout(function(){
								_THIS.Image(old_img);
							},200);
						},100);
					}else{
						_THIS.Click()(event);
					}
				}
				,innerText:_THIS.Text()
				,innerHTML:_THIS.Text()
		    	,align:'center'
				}
			,{
				display:'inline-block'
				,backgroundColor:'#EEE',width:'92px'
				,height:'44px'
				,lineHeight:'44px'
				,margin:'1px'
				,backgroundImage:'url('+_THIS.Image()+')'
				,backgroundPosition:_THIS.ImagePosition()
				,cursor:'pointer'
				,backgroundRepeat:'no-repeat'
				,whiteSpace:'nowrap'
			}));
		
		_THIS.renderView=function(){
			h.style.backgroundImage='url('+_THIS.Image()+')';
			var sz=_THIS.Size();
			var ns=fuseDict(sz,{lineHeight:sz.height||''},'');
			SET.css(h,ns);
			h.align=_THIS.Align();
			
			h.style.backgroundPosition=_THIS.ImagePosition();
			h.innerText=_THIS.Text();
			h.innerHTML=_THIS.Text();
			return _THIS;
		}
		
		_THIS.Parent.afterSet=function(_parent){
			_parent.appendChild(_THIS.View());
			_THIS.renderView();
		}
		
		this.Image.afterSet=function(_icon){
			h.style.backgroundImage='url('+_icon+')';
		}
		this.Size.afterSet=function(sz){
			var ns=fuseDict(sz,{lineHeight:sz.height||''},'');
			SET.css(h,ns)
		}
		this.Align.afterSet=function(_align){
			/*console.log(h,_align)
			setTimeout(function(){h.align=_align;},1);*/
			h.align=_align;
			h.style.textAlign=_align;
		}
		this.ImagePosition.afterSet=function(_pos){
			h.style.backgroundPosition=_pos;
		}
		this.Text.afterSet=function(_text){
			h.innerText=_text;
			h.innerHTML=_text;
		}
		
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();