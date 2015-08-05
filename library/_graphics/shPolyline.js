var shPolyline=(function(){
    var CLASS=function shPolyline(){
        var _THIS=this;
        QProperty.call(this,['MouseDown']);
        _THIS.MouseDown(function(event){
            var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
            /*console.log('clicked down:',_THIS.hoverPoints(_coords));*/
        });
        QProperty.call(this,['MouseUp']);
        _THIS.MouseUp(function(event){
            var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
            console.log('clicked up:',_THIS.hoverPoints(_coords));
        });
        QProperty.call(this,['MouseOver']);
        _THIS.MouseOver(function(event){
            var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
            //console.log('hover in:',_THIS.hoverPoints(_coords));
        });
        QProperty.call(this,['MouseMove']);
        _THIS.MouseMove(function(event){
            var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
            //console.log(_coords);
            //console.log('hovered:',_THIS.hoverPoints(_coords));
        });
        QProperty.call(this,['MouseOut']);
        _THIS.MouseOut(function(event){
            var _coords={x:NORM.mouseX(event),y:NORM.mouseY(event)}
            //console.log('hoverOut:',_THIS.hoverPoints(_coords));
        });

        QProperty.call(this,['Style']);
        _THIS.Style({});

        QProperty.call(this,['Data']);
        _THIS.Data([]);

        this.draw=function _draw(ctx){
            var d=_THIS.Data();
            ctx.beginPath();
            ctx.moveTo(d[0].x,d[0].y);
            for(var i=0;i< d.length;i++){
                ctx.lineTo(d[i].x,d[i].y);
            }
            ctx.stroke();
            ctx.fill();
        };
        _THIS.hoverPoints=function(in_coords,s_rad){
            var rad=10||s_rad;
            var d=_THIS.Data();
            var points=[];
            for(var i=0;i< d.length;i++){
                if(Vector.dist(d[i],in_coords)<=rad){
                    points[points.length]=d[i];
                };
            }
            return points;
        }
        _THIS.overPoint=function(in_coords,s_rad){
            var rad=10||s_rad;
            var d=_THIS.Data();
            for(var i=0;i< d.length;i++){
                if(Vector.dist(d[i],in_coords)<=rad){
                    return true
                };
            }
            return false;
        }
    };
    return CLASS;
})();
