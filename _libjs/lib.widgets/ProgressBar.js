/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 10/21/12
 * Time: 12:55 PM
 * To change this template use File | Settings | File Templates.
 */
(function init_proto(){
    if(!document.getElementById("renderingProgressContainer")){
        log('create "renderingProgressContainer"')
    var _renderingProgressContainer=document.createElement('div');
    _renderingProgressContainer.id="renderingProgressContainer";
    _renderingProgressContainer.className="prototype";
    _renderingProgressContainer.innerHTML=
        '<div id="renderingProgressTitle">'+
            'Message'+
        '</div>'+
        '<div id="renderingProgress">'+
            '<div id="histogram">'+
            '</div>'+
        '</div>'+
        '<div id="messageContainer">'+
            'begin loading'+
        '</div>';
    var _renderingProgressContainerStyles=document.createElement('style');
    _renderingProgressContainerStyles.innerHTML=
        "#renderingProgressContainer,.renderingProgressContainer{\n" +
        "padding:5px;\n" +
        "padding:5px;\n" +
        "margin:2px;\n" +
        "background-color: #fff9f1;\n" +
        "box-shadow: 0px 4px 28px #777777;\n" +
        "}\n" +
        "#renderingProgress,.renderingProgress{\n" +
        "border:1px solid #cbb187;\n" +
        "border-radius:4px;\n" +
        "padding: 1px;\n" +
        "background-color: #eee8e0;\n" +
        "box-shadow: 0px 3px 8px #777777 inset;\n" +
        "}\n" +
        "#histogram,.histogram{\n" +
        "border-radius:2px;\n" +
        "border:1px solid #bf8c00;\n" +
        "height: 2px;\n" +
        "background-color: #ffbb00;\n" +
        "box-shadow: 0px 3px 8px rgba(245,255,255,.5) inset,0px -5px 8px rgba(99,99,99,.3) inset;\n" +
        "}\n" +
        "#messageContainer,.messageContainer{\n" +
        "font-size: 10px;\n" +
        "}\n" +
        "\n";
    document.head.appendChild(_renderingProgressContainerStyles);
    document.body.appendChild(_renderingProgressContainer);
    }
})()
function ProgressBar(){
    ViewController.call(this);
    var view=this.initFromPrototype("renderingProgressContainer");
    var container=document.getElementById("centerDialogContainer");
    container.appendChild(view);
    this.repozContainer(container);
    console.log()
    this.maxValue=100;
    this.hide=function(){
        this.getView().style.display="none";
    }
    this.show=function(){
        this.getView().style.display="";
    }
    this.setProgress=function(v){
        if(v<this.maxValue){
            this.progress=v;
            var procent=StringUtils.toProcent(v/this.maxValue);
            //this.progress=procent;
            this.getView().children[1].children[0].style.width=procent;
            this.getView().children[0].innerHTML=procent;
        }//else this.hide();
    }
    this.setMessage=function(v){
        this.getView().children[2].innerHTML=v;
    }
    this.setProgress(0);
    this.show();
};

ProgressBar.prototype=new ViewController();
ProgressBar.constructor=ProgressBar;