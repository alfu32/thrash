/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/6/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */
function FunctionListController(list){
    var toolbar=new ViewController();
    toolbar.initFromPrototype("toolbarContainer",document.getElementById("toolsPanel"));
    //toolbar.setParent(null);
    toolbar.children=list;
    toolbar.renderItemAtIndex=function(table,index){
        var b=document.createElement("div");
        if(table[index] instanceof ButtonController){
            b.innerHTML=table[index].name;
            b.className="button";
            var selectTool_listener=function(table,index){
                return function(event){
                    table[index].click();
                    toolbar.layout()
                }
            }
            b.addEventListener("click",selectTool_listener(table,index));
        }
        else{
            b.className="layerListItem_selected";
            b.style.cursor="default";

            b.appendChild(table[index].getView())
        }
        return b;
    }

    this.setParent=function(parent){
        toolbar.setParent(parent);
    }
    toolbar.layout();
    this.getView=function(){
        return toolbar.getView();
    }
    this.layout=function(){
        toolbar.layout()
    }
    this.addEntry=function(element,index){
        var ch=[]
        if(index!==undefined){
            if(index<toolbar.children.length)ch=toolbar.children.splice(index)
        }
        toolbar.children.push(element);
        toolbar.children=toolbar.children.concat(ch);
        toolbar.layout();
    }
    this.setTo=function(tool){
        var toolIndex=-1;
        for(var i=0;i<toolbar.children.length;i++){
            if(toolbar.children[i]==tool){
                toolIndex=i;
                break;
            }
        }
        if(toolIndex>-1){
            //log(toolbar.children[toolIndex]);
            currentTool.selected=false;
            currentTool=toolbar.children[toolIndex];
            currentTool.selected=true;
            toolbar.layout();
        }
    }
}
FunctionListController.constructor=FunctionListController;
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