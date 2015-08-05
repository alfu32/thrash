/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/17/12
 * Time: 7:40 PM
 * To change this template use File | Settings | File Templates.
 */
function Meter(){
    this.onMeasure=_abstract;
    this.onMeasureEnded=_abstract;
    this.index=0;
    var begin=null,init=null,end=null;
    this.measure=function(msg){
        if(begin==null){
            this.queue={};
            begin=new Date().getTime();
            init=new Date().getTime();
        }else{
            end=new Date().getTime();
            this.onMeasure((end-begin),msg);
            this.queue[msg]=(end-begin);
            begin=end;
        }
        this.index++;
    }
    this.finish=function(msg){
        end=new Date().getTime();
        this.onMeasure((end-begin),msg);
        this.queue[msg]=(end-begin);
        this.index++;
        this.queue['time_total']=(end-init);
        this.onMeasureEnded((end-init)," total time ");
        init=null;
        begin=null;
        this.index=0;
    }
}
function TimeMeasure(){
    var t0,t1,x0,x1;
    this.onMeasure=function(dx,dt){
        return true;
    }
    this.measure=function(x){
        var t=Date.getTime();
        if(this.onMeasure(x-x0,t-t0)){
            x0=x;
            t0=t;
        }
    }
}
function CinematicMeasure(){
    var t0,t1,t2
    var x0,x1,x2,v0,v1,a;
    this.onMeasure=function(v,a){
    }
    this.measure=function(_x){
        var x=_x;
        if(!(_x instanceof Vector)){
            x=new Vector(_x,0);
        }
        if(x0==undefined){
            x0=x;
            t0=Date.getTime();
            return;
        }
        if(x1==undefined){
            x1=x;
            t1=Date.getTime();
            v0=x1.clone().sub(x0).multiplyScalar(1/(t1-t0));
            return;
        }
        if(x2==undefined){
            x2=x;
            t2=Date.getTime();
            v1=x2.clone().sub(x1).multiplyScalar(1/(t2-t1));
            a=v1.clone().sub(v0).multiplyScalar(1/(t2-t0));
        }else{
            x0=x1;x1=x2;t0=t1;t1=t2;
            x2=x;
            t2=Date.getTime();
            v0=x1.clone().sub(x0).multiplyScalar(1/(t1-t0));
            v1=x2.clone().sub(x1).multiplyScalar(1/(t2-t1));
            a=v1.clone().sub(v0).multiplyScalar(1/(t2-t0));
        }
        this.onMeasure(v1,a);
    }
}
function Timer(){
    var started=false;
    var timeoutID;
    this.timeout=1000;
    this.onTime=function(){};

    this.isTime=function(){
        if(started){
            this.onTime()
        }
        timeoutID=setTimeout((this.isTime).bind(this),this.timeout)
    }
    this.startListening=function(){
        started=true;
        timeoutID=setTimeout((this.isTime).bind(this),this.timeout)
    }
    this.stopListening=function(){
        started=false;
        clearTimeout(timeoutID);
    }
}