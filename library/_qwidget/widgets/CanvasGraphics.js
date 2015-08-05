var CanvasGraphics=(function(){
	var CLASS=function CanvasGraphics(){
		Widget.call(this);
		var _THIS=this;
		QProperty.call(this,['MouseDown']);
        _THIS.MouseDown(function(data){
            console.log(data);
        });
		QProperty.call(this,['MouseUp']);
        _THIS.MouseUp(function(data){
            console.log(data);
        });
        QProperty.call(this,['MouseMove']);
        _THIS.MouseMove(function(data){
            /*console.log(data);*/
        });
		QProperty.call(this,['Wheel']);
        _THIS.Wheel(function(data){
            console.log(data);
        });

		QProperty.call(this,['Width']);
        _THIS.Width(640);
        this.Width.afterSet=function(values){
            renderView();
        };
		QProperty.call(this,['Height']);
        _THIS.Height(300);
        this.Height.afterSet=function(values){
            renderView();
        };
        QProperty.call(this,['ViewportWidth']);
        _THIS.ViewportWidth(640);
        this.ViewportWidth.afterSet=function(values){
            renderView();
        };
        QProperty.call(this,['ViewportHeight']);
        _THIS.ViewportHeight(300);
        this.ViewportHeight.afterSet=function(values){
            renderView();
        };
		QProperty.call(this,['TransformMatrix']);
        _THIS.TransformMatrix(new TransformMatrix());/*{'00':1,'01':0,'02':0,'10':1,'11':0,'12':0}*/
				  
		QProperty.call(this,['Data']);
        _THIS.Data([]);

		this.Data.afterSet=function(values){
			renderGraphics();
		};
		
		this.Parent.afterSet=function(_parent){
            _parent.appendChild(div);
			renderGraphics();
		};
		
		var ctx,cnv,div;
		
		_THIS.View(
			div=MAKE.div({},{},[
                cnv=MAKE.canvas({
                    width:_THIS.Width()
                    ,height:_THIS.Height()
                    ,onmousemove:function(event){
                        var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
                        _THIS.MouseMove()(_coords)
                    }
                    ,onmousedown:function(event){
                        var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
                        _THIS.MouseDown()(_coords)
                    }
                    ,onmouseup:function(event){
                        var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
                        _THIS.MouseUp()(_coords)
                    }
                    ,onDOMMouseScroll:function(event){
                        var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
                        _THIS.Wheel()(_coords)
                    }
                    ,onmousewheel:function(event){
                        var coords={x:NORM.mouseX(event),y:NORM.mouseY(event),delta:NORM.wheelDetail(event)}
                        _THIS.Wheel()(coords);
                    }
                }
                ,{}
                ,[])
            ])
		);
		
		var ctx=cnv.getContext('2d');
		
		var renderGraphics=function _renderGraphics(){
		
			var d=_THIS.Data();
            console.log(_THIS.Data.length);
			var tm=_THIS.TransformMatrix().getMatrix();

			var itm=_THIS.TransformMatrix().getInverse();
			ctx.clearRect(0,0,_THIS.Width(),_THIS.Height())
			ctx.save();

			ctx.transform(tm[00],tm[10],tm[01],tm[11],tm[02],tm[12]);
			for(var i=1;i< d.length;i++){
				d[i].draw(ctx);
			}
			ctx.restore();
		};
		
		var renderView=function _renderView(){
			SET.css(div,{
                width:_THIS.ViewportWidth()
                ,height:_THIS.ViewportHeight()
            });
            SET.attr(cnv,{
                width:_THIS.Width()
                ,height:_THIS.Height()
            });
            renderGraphics();
		};
		
		this.AddShape=function AddShape(_reference){
            var i=_THIS.Data.length;
			_THIS.Data()[i]=_reference;
            NORM.addListener(cnv,'mousemove',_reference.MouseMove());
            NORM.addListener(cnv,'mouseover',_reference.MouseOver());
            NORM.addListener(cnv,'mouseout',_reference.MouseOut());
            NORM.addListener(cnv,'mousedown',_reference.MouseDown());
            NORM.addListener(cnv,'mouseup',_reference.MouseUp());
			return _THIS;
		};
		_THIS.AddShape.after=function(data){
			renderGraphics();
		}
		this.RemoveShape=function RemoveShape(_reference){
            var _shapes=_THIS.Data();
			var iof=_shapes.indexOf(_reference);
            if(iof!=-1){
                NORM.removeListener(cnv,'mousemove',_reference.MouseMove());
                NORM.removeListener(cnv,'mouseover',_reference.MouseOver());
                NORM.removeListener(cnv,'mouseout',_reference.MouseOut());
                NORM.removeListener(cnv,'mousedown',_reference.MouseDown());
                NORM.removeListener(cnv,'mouseup',_reference.MouseUp());
                _THIS.Data().splice(iof,1);
            }
			return _THIS;
		};
		_THIS.RemoveShape.after=function(data){
			renderGraphics();
		}
		this.RemoveAll=function(){
            var d=_THIS.Data();
            for(var i=0;i< d.length;i++){
                NORM.removeListener(cnv,'mousemove',d[i].MouseMove());
                NORM.removeListener(cnv,'mouseover',d[i].MouseOver());
                NORM.removeListener(cnv,'mouseout',d[i].MouseOut());
                NORM.removeListener(cnv,'mousedown',d[i].MouseDown());
                NORM.removeListener(cnv,'mouseup',d[i].MouseUp());
            }
            _THIS.Data([]);
            return _THIS;
        }
		
	};
	WidgetStatic.call(this);
	return CLASS;
})();
