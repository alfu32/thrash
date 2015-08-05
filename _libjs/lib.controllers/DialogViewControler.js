/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/21/12
 * Time: 3:29 PM
 * To change this template use File | Settings | File Templates.
 */

function DialogViewControler(renderType){

    ViewController.call(this);
    var dialog=this;
    dialog.initFromPrototype("dialogContainer");
    this.onClose=function(){
    };

    this.Title=function(title){
        if(title==undefined){return head.view.children[0].innerHTML}
        else{head.view.children[0].innerHTML=title}
    }
    var head=new ViewController();
    head.view=dialog.view.children[0];
    var closeButton=head.view.children[1];
    closeButton.addEventListener("click",function(event){
        dialog.dismiss()
    })
    head.prototype=new ViewController()

    var body=new ViewController();
    body.view=dialog.view.children[1];
    this.layout=function(){
        body.view.innerHTML="";
        var dh=document.height;
        var hh=head.view.offsetHeight;
        //log("body",dh-hh-100);
        body.view.style.height=(dh-hh-100)+"px";
        for(var i=0;i<body.children.length;i++){
            var cell=body.renderItemAtIndex(body.children,i)
            body.view.appendChild(cell.view);
            this.show();
        }

    }
    body.prototype=new ViewController()
    //log(body);

    this.getBody=function(){
        return body;
    }
    this.getHead=function(){
        return head;
    }
    this.show=function(){
        var _body=body.getView();
        var _head=head.getView();
        var _dialog=this.getView();
        var parent=_dialog.parent
        //parent.removeChild(_dialog);
        var d=new Vector(document.width,document.height);
        var bh;
        if(renderType!=undefined)bh=renderType;
        else bh= d.y-_head.offsetHeight-100;

        _dialog.style.display="";
        var w=_dialog.offsetWidth;
        //log(w);
        var h=_head.offsetHeight+50;
        _dialog.style.display="none";
        _dialog.style.left=StringUtils.toProcent((d.x-w)/ d.x/2);
        _dialog.style.top= ((d.y-bh-50)/2)+"px";
        _body.style.height=(bh-h)+"px";
        if(_body.offsetHeight>( d.y-h)){
            body.view.style.overflowY="scroll";
            body.view.style.overflowX="hidden";
        }else{
            body.view.style.overflowY="";
            body.view.style.overflowX="hidden";
        }
        _dialog.style.display="";

    }
    this.hide=function(){
        dialog.getView().style.display="none";
    }
    this.dismiss=function(){
        if(dialog.view.parentNode!==null)dialog.view.parentNode.removeChild(dialog.view);
        dialog.onClose();
    }
}
DialogViewControler.constructor=DialogViewControler;
DialogViewControler.prototype=new ViewController();
(function (){
    var dc=document.getElementById("dialogContainer");
    if(dc==null){
        var dlgc=document.createElement("div");
        dlgc.id="dialogContainer"
        dlgc.class="dialogContainer"
        dlgc.innerHTML=
        '<div id="dialog_head">'+
            '<div id="dialog_title" class="dialog_title"></div>'+
            '<div class="dialog_close"></div>'+
            '</div>' +
        '<div id="dialog_body" class="dialog_body"></div>';
        var dlgcStyle=document.createElement("style");
        dlgcStyle.innerHTML=".dialogContainer{"+
            "position: absolute;"+
            "top:5%;"+
            "left:5%;"+
            "width:300px;"+
            //"background-color: #FFF;" +
            "background: url(../../_libimg/ios/dialoggloss.png), rgba(11, 27, 68, 0.8);"+
            "background-size: 100% auto, auto;"+
            "background-repeat: no-repeat;"+
            "border:1.5px solid #b3c0ce;"+
            "box-shadow: 0px 0px 12px #000;"+
            "z-index: 65535;"+
            "border: 2px solid #E9EAEB;"+
            "box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.8),	0px 1px 2px rgba(0, 0, 0, 1.0);"+
            "border-radius: 12px;"+
            "padding: 5px;"+
            "}" +
            ".propertiesEditor{"+
            "}"+
            ".dialog_head{"+
            "}"+
            ".dialog_title{"+
                "text-shadow: 0px -1px rgba(0, 0, 0, 0.8);" +
                "color:white;"+
                "display:inline-block;"+
                "height:24px;"+
                "margin:1px;"+
                "margin-bottom:5px;"+
                "padding:12px;"+
                "font-size: 24px;"+
                "cursor: default;"+
            "}" +
            ".dialog_close{" +
                "width:32px;" +
                "height:32px;" +
                "box-shadow:inset 0px 0px 3px grey;"+
                "background-image:url(../../_libimg/ios/IL_MinusLine.png);" +
                "background-position-x: -1px;" +
                "border-radius:16px;"+
                "opacity:1;"+
                "cursor: pointer;"+
                "position:absolute;"+
                "right: 12px;"+
                "top:12px;"+
            "}"+
            ".dialog_close:hover{"+
                "box-shadow:inset 0px 0px 8px #FFFFFD;"+
            "}"+
            ".dialog_body{"+
                "background: url(../../_libimg/ios/stripes.png), rgba(11, 27, 68, 0.8);"+
                "background-size: 320px 480px;"+
            "}"+
            ".dialogContainer2{margin: 0 auto;"+
            "width: 272px;"+
            "position: fixed;"+
            "top: 30%;"+
            "left: 20px;"+
            "background: url(../img/ios/dialog/dialoggloss.png), rgba(11, 27, 68, 0.8);"+
            "background-size: 100% auto, auto;"+
            "background-repeat: no-repeat;"+
            "border: 2px solid #E9EAEB;"+
            "box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.8),	0px 1px 2px rgba(0, 0, 0, 1.0);"+
            "border-radius: 12px;"+
            "padding: 5px;"+
            "box-sizing: content-box;"+
            "text-align: center;"+
            "display: block;"+
            "}"+
        document.head.appendChild(dlgcStyle);
        document.getElementById("prototypes").appendChild(dlgc);
    }
})();
