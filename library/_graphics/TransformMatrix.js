var TransformMatrix=(function(){
    var CLASS=function TransformMatrix(){
        var _THIS=this;
        this['00']=1;
        this['01']=0;
        this['02']=0;
        this['10']=0;
        this['11']=1;
        this['12']=1;
        this.getMatrix=function(){
            return _THIS;
        }
        this.inverse={}
        this.getInverse=function(){
            this.inverse=new TransformMatrix();
            return this.inverse;
        }
    };
    return CLASS;
})();
