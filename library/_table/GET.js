GET={
    Position:function(node){
        var X=node.offsetLeft,Y=node.offsetTop;
        if(node.offsetParent==null){
            return {x:X,y:Y}
        }else{
            var _v=this.Position(node.offsetParent)
            return {x:X+_v.x,y:Y+_v.y}
        }
    }
    ,Box:function(node){
        var p=this.Position(node);
        p['w']=node.offsetWidth;p['h']=node.offsetHeight;
        return p;
    }
}
