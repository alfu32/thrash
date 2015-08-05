/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/8/13
 * Time: 6:30 PM
 * To change this template use File | Settings | File Templates.
 */
function Color(maxr,maxg,maxb,maxa){
    this.colorspace={r:maxr||255,g:maxg||255,b:maxb||255,a:maxa||1}
    this.r=0;
    this.g=0;
    this.b=0;
    this.a=1;
    this.setFromDString=function(s){
        this.r=parseInt(s.substr(1,2),16);
        this.g=parseInt(s.substr(3,2),16);
        this.b=parseInt(s.substr(5,2),16);
    }
    this.setFromRgbaString=function(s){
        var defString= s.split("rgba(")[1].split(")")[0].split(",");
        this.r=parseInt(defString[0]);
        this.g=parseInt(defString[1]);
        this.b=parseInt(defString[2]);
        var a=parseFloat(defString[3]);
        this.a=a>1?a/255:a;
    }
    this.setFromString=function(s){
        if(s[0]=='#'){
            this.setFromDString(s);
        }
        if(s[0]=='r'){
            this.setFromRgbaString(s);
        }
    }
    this.set=function(r,g,b,a){
        this.r=r;
        this.g=g;
        this.b=b;
        this.a=a>1?a/255:a;
    }
    this.getRGBAString=function(){
        var s="rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
        return s;
    }
    this.getDString=function(){
        var s="#"+this.getString();
        return s;
    }
    this.getString=function(){
        function normalize(str){
            return str.length==1?"0"+str:str
        }
        var r=new Number(this.r).toString(16);
        var g=new Number(this.g).toString(16);
        var b=new Number(this.b).toString(16);
        var s=""+normalize(r)+normalize(g)+normalize(b);
        return s;
    }
}
Color.constructor=Color;
Color.prototype=new Color();