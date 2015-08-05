/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/6/13
 * Time: 10:29 AM
 * To change this template use File | Settings | File Templates.
 */
function ToolbarController(tools){
    var toolbar=new ViewController();
    toolbar.initFromPrototype("toolbarContainer",document.getElementById("toolsPanel"));
    //toolbar.setParent(null);
    toolbar.children=tools;
    toolbar.renderItemAtIndex=function(table,index){
        var b=document.createElement("div");
        if(table[index].selected){
            b.className="button_selected";
        }else{
            b.className="button";
        }
        b.tool=table[index];
        b.innerHTML=table[index].name;
        selectTool_listener=function(table,index){
            return function(event){
                currentTool.selected=false;
                currentTool=table[index];
                currentTool.selected=true;
                toolbar.layout()
            }
        }
        b.addEventListener("click",selectTool_listener(table,index));
        return b;
    }

    this.setParent=function(parent){
        toolbar.setParent(parent);
    }
    currentTool=lineToolController;
    lineToolController.selected=true;
    this.setTo=function(tool){
        var toolIndex=-1;
        for(var i=0;i<toolbar.children.length;i++){
            if(toolbar.children[i]==tool)toolIndex=i
        }
        if(toolIndex>-1){
            //log(toolbar.children[toolIndex]);
            currentTool.selected=false;
            currentTool=toolbar.children[toolIndex];
            currentTool.selected=true;
            toolbar.layout();
        }
    }
    toolbar.layout();
    this.getView=function(){
        return toolbar.getView();
    }
}
ToolbarController.constructor=ToolbarController;
_makeUIPrototype(
    "toolbarContainer",
    "<div id='toolbarContainer' class='toolbarContainer'></div>"+
    "<div id=toolsPanel></div>",
    ".toolbarContainer{" +
        "" +
    "}" +
    "#toolsPanel" +
    "{"+
        "background-color: #b2bbca;"+
        "background-image: linear-gradient(top, #b0bccd, #889bb3 50%, #8195af 51%, #6d84a2);"+
        "background-clip: padding-box;"+
        "background-size: 1px 100%;"+
        "background-repeat: repeat-x;"+
        "border-top: 1px solid #cdd5df;"+
        "border-bottom: 1px solid #2e3744;"+
        "width: 300px;"+
        "height: 100%;"+
    "}"
)