/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 10/21/12
 * Time: 12:55 PM
 * To change this template use File | Settings | File Templates.
 */
function LoadFileController(server){
    var container=document.getElementById("centerDialogContainer")
    log(container);
    var progressBar=new ProgressBar();
    this.onResponseReady=_abstract;
    var getlogtxt=new _ajaxBinding(server);
    getlogtxt.onabort=_empty;//_echo("getlogtxt onabort");
    getlogtxt.onerror=_empty;//_echo("getlogtxt onerror");
    getlogtxt.onload=_empty;//_echo("getlogtxt onload");
    getlogtxt.onloadend=(function(){
        //loadProg.hide();
    }).bind(this)
    //document.getElementById("centerDialogContainer").appendChild(this.progressBar.view);
    getlogtxt.onloadstart=(function(event){
        progressBar.maxValue=event.total;
        progressBar.setMessage("0/"+StringUtils.toMega(event.total)+"MB");
        progressBar.show();
    }).bind(this);
    getlogtxt.onprogress=(function(event){
        progressBar.maxValue=event.total;
        progressBar.setMessage(StringUtils.toMega(event.loaded)+"/"+StringUtils.toMega(event.total)+"MB");
        progressBar.setProgress(event.loaded);
    }).bind(this)
    getlogtxt.onResponseReady=(function(object,event){
        this.onResponseReady(object);
        progressBar.hide();
    }).bind(this);
    this.setOnResponseReady=function(f){
        this.onResponseReady=f;
    }
    this.load=function(parameters){
        getlogtxt.send(parameters || "","GET",true);
    }
    this.getView=function(){
        return progressBar.getView();
    }
}