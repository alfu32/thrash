/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/27/12
 * Time: 3:05 PM
 * To change this template use File | Settings | File Templates.
 */
function HorizontalListController(parent,kvArray){
    ViewController.call(this);
    this.initFromPrototype("horizontalList",parent);
    this.head=this.getView().children[0];
    this.body=this.getView().children[1];

    var controllers=new List();
    this.add=function(ids){
        for(var i=0;i<ids.length;i++){
            controllers.add(ids[i])
        }
        return this;
    }
    this.replaceController=function(c1,c2){
        //log("replacing");
        controllers.replace(c1,c2);
        return this;
    }
    this.getControllers=function(){
        return controllers;
    }
    var backButton_clickListener=function(list){
        return function(event){
            list.back();
        };
    }
    var forwardButton_clickListener=function(list){
        return function(event){
            list.forward();
        };
    }
    var backButton=this.head.children[0].children[0].children[0].children[0].children[0];
    var title=this.head.children[0].children[0].children[0].children[0].children[1];
    var forwardButton=this.head.children[0].children[0].children[0].children[0].children[2];
    backButton.addEventListener("click",backButton_clickListener(this));
    forwardButton.addEventListener("click",forwardButton_clickListener(this));
    this.setTitle=function(string){
        var name=string;
        title.innerHTML=name;
        while(title.offsetWidth>190){
            name=name.substr(0,name.length-1);
            title.innerHTML=name;
        }
        title.style.left=((300-title.offsetWidth)/2)+"px"
        return this;
    }
    this.setBackButton=function(w){
        var previousControllerName,previousController;
        if(controllers.hasPrevious()){
            backButton.style.visibility="";
            previousControllerName=controllers.previous().name;
            backButton.innerHTML=previousControllerName;
            while(backButton.offsetWidth>w){
                previousControllerName=previousControllerName.substr(0,previousControllerName.length-1);
                backButton.innerHTML=previousControllerName;
            }
        }else{
            backButton.style.visibility="hidden";
        }
        return this;
    }
    this.setForwardButton=function(w){
        var nextControllerName,nextController;
        if(controllers.hasNext()){
            forwardButton.style.visibility=""
            nextControllerName=controllers.next().name;
            forwardButton.innerHTML=nextControllerName;
            while(forwardButton.offsetWidth>w){
                nextControllerName=nextControllerName.substr(0,nextControllerName.length-1);
                forwardButton.innerHTML=nextControllerName;
            }
        }else{
            forwardButton.style.visibility="hidden"
        }
        return this;
    }
    this.layout=function(){
        var view=this.getView();
        var thisItem=controllers.item();
        var controllerName,controller,height;
        if(thisItem!=null){
            controllerName=controllers.item().name;
            controller=controllers.item().controller;
            controller.setParent(document.body);
            var b=controller.getView();
            height=b.offsetHeight;
            controller.setParent(null);
            var dh=document.height-45;
            //log(height+"/"+dh)
            if(height>dh){
                this.body.style.height=(dh)+"px";
                this.body.style.overflowY="scroll";
            }else{
                this.body.style.height=(dh)+"px";
                this.body.style.overflowY="";
            }
            controller.setParent(this.body);
            this.setTitle(controllerName);
        }
        var space=((300-title.offsetWidth)/2)
        this.setBackButton(space-8);
        this.setForwardButton(space-8);
        forwardButton.style.left=(300-forwardButton.offsetWidth-6)+"px";
        return this;
    }
    this.forward=function(){
        controllers.item().controller.setParent(null)
        controllers.forward();
        this.layout();
        return this;
    }
    this.back=function(){
        controllers.item().controller.setParent(null);
        controllers.back();
        this.layout();
        return this;
    }
    this.add(kvArray);
    this.layout();
}
HorizontalListController.constructor=HorizontalListController;
HorizontalListController.prototype=new ViewController();

_makeUIPrototype("horizontalList",
    '<div id="horizontalList" class="horizontalList">'+
        '<div id="horizontalList_head" class="horizontalList_head">'+
            '<table>'+
                '<tbody>'+
                    '<tr>'+
                        '<td>'+
                            '<div id="horizontalList_back" class="titlebar_button">'+
                            '</div>'+
                            '<div id="horizontalList_title" class="horizontalList_title">'+
                            '</div>'+
                            '<div id="horizontalList_forward" class="titlebar_button">'+
                            '</div>'+
                        '</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+
        '</div>'+
        '<div id="horizontalList_body" class="horizontalList_body">'+
        '</div>'+
    '</div>',
    '.horizontalList{'+
    '}' +
    '.horizontalList_head{'+
        'background: #5b80ab;'+
        'background: -moz-linear-gradient(top,  #9fb3cc 0%, #5b80ab 100%, #6b8bb2 50%, #597eaa 51%);'+ /* FF3.6+ */
        'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9fb3cc), color-stop(100%,#5b80ab), color-stop(50%,#6b8bb2), color-stop(51%,#597eaa));'+ /* Chrome,Safari4+ */
        'background: -webkit-linear-gradient(top,  #9fb3cc 0%,#5b80ab 100%,#6b8bb2 50%,#597eaa 51%);'+ /* Chrome10+,Safari5.1+ */
        'background: -o-linear-gradient(top,  #9fb3cc 0%,#5b80ab 100%,#6b8bb2 50%,#597eaa 51%);'+ /* Opera 11.10+ */
        'background: -ms-linear-gradient(top,  #9fb3cc 0%,#5b80ab 100%,#6b8bb2 50%,#597eaa 51%);'+ /* IE10+ */
        'background: linear-gradient(to bottom,  #9fb3cc 0%,#5b80ab 100%,#6b8bb2 50%,#597eaa 51%);'+ /* W3C */
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9fb3cc', endColorstr='#597eaa',GradientType=0 );"+ /* IE6-9 */
        'height:45px;'+
    '}'+
    '.horizontalList_title{'+
        'color:white;'+
        'text-shadow: 0px -1px 0px rgba(0,0,0,0.6);'+
        'display:inline-block;'+
        'text-align: center;'+
        'position:absolute;'+
        'height:32px;'+
        'font-size: 26px;'+
        'font-weight: 500;'+
        'cursor: default;'+
        'top:6px;'+
        'left:54px;'+
    '}'+
    '.horizontalList_body{'+
        'position: absolute;'+
        'width:300px;'+
        'top:45px;'+
    '}'+
    '.titlebar_button{'+
    'font-weight: 500;'+
    'color:white;'+
    'text-shadow: 0px -1px 0px rgba(0,0,0,0.4);'+
    'border-radius: 5px;'+
    'box-shadow: 0 1px 0 rgba(255,255,255, 0.25), inset 0 1px 2px rgba(0,0,0, 0.4);'+
    ''+
    'background: #6988af;'+ /* Old browsers */
    'background: -moz-linear-gradient(top,  #6988af 0%, #4b6b91 50%, #446184 50%, #456385 100%);'+ /* FF3.6+ */
    'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#6988af), color-stop(50%,#4b6b91), color-stop(50%,#446184), color-stop(100%,#456385));'+ /* Chrome,Safari4+ */
    'background: -webkit-linear-gradient(top,  #6988af 0%,#4b6b91 50%,#446184 50%,#456385 100%);'+ /* Chrome10+,Safari5.1+ */
    'background: -o-linear-gradient(top,  #6988af 0%,#4b6b91 50%,#446184 50%,#456385 100%);'+ /* Opera 11.10+ */
    'background: -ms-linear-gradient(top,  #6988af 0%,#4b6b91 50%,#446184 50%,#456385 100%);'+ /* IE10+ */
    'background: linear-gradient(to bottom,  #6988af 0%,#4b6b91 50%,#446184 50%,#456385 100%);'+ /* W3C */
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6988af', endColorstr='#456385',GradientType=0 );"+ /* IE6-9 */
    ''+
    'font-size: 12px;'+
    'position:absolute;'+
    'cursor: pointer;'+
    'padding:5px;'+
    'padding-top:9px;'+
    'padding-bottom:8px;'+
    'opacity:1;'+
    ''+
    'top:9px;'+
    'left:6px;'+
    ''+
    '}'+
    '.titlebar_button:hover{'+
    'opacity: 1;'+
    '}'
)