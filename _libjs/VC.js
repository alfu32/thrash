/**
 * Created with JetBrains WebStorm.
 * User: ioanalferaru
 * Date: 08/10/12
 * Time: 13:36
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @constructor
 */
function Controller(){
    var cells=[];
    this.children=[];
    this.view=document.createElement("stub");
    this.getCellAtIndex=function(index){
        var c;
        try{
            c=cells[index];
        }catch(e){
            c=null
        }
        return c;
    }
    this.setCellAtIndex=function(index,cell){
        cells[index]=cell;
    }
    this.init=function(){
        this.super=undefined;
        this.self=this;
    }
    this.renderItemAtIndex=_abstract;
}
Controller.constructor=Controller;
//Controller.prototype=new Controller();

Controller.prototype={
    clean:function(){
        //log("remove children")
        for(var i=0;i<this.children.length;i++){
            if(this.children[i] instanceof Controller){
                this.children[i].destroy();
            }
            var parentNode=this.view.parentNode;
            if(parentNode!=null){
                //log("remove view")
                parentNode.removeChild(this.view);
            }
        }
        this.children.length=0;
        this.layout();
    },
    destroy:function(){
        this.clean();
    },
    removeChild:function(child){
        var indexof=this.children.indexOf(child)
        if(indexof>-1){
            this.children.push(child);
            this.layout();
        }
        return this;
    },
    addChild:function(child){
        this.children.push(child);
        this.layout();
        return this;
    },
    attachTo:function(e){
        if(e instanceof HTMLElement){
            e.appendChild(this.view);
            this.super=e;
        }else if(e instanceof Controller){
            e.addChild(this);
            this.super=e;
        }
        return this;
    },
    clear:function(){
        this.children=[];
        this.view.innerHTML="";
        this.layout();
        return this;
    },
    layout:function(){
        //log("this is",this);
        this.view.innerHTML="";
        for(var i=0;i<this.children.length;i++){
            var cell=this.renderItemAtIndex(this.children,i);
            //this.setCellAtIndex(i,cell);//save rendered cell mechanism, secondary, not important
            if(cell instanceof HTMLElement){
                this.view.appendChild(cell);
            }
            if(cell instanceof ViewController){
                //cell.layout()
                this.view.appendChild(cell.getView());
                //cell.arrangeLayout()
                cell.layout();
            }

        }
    },
    dequeueCellWithIndex:function(index){
        return this.getCellAtIndex(index);
    },
    notifyDataSetChanged:this.layout
}

function ViewController(){
    this._requires("lib.std/std.js");
    this._requires("lib.std/stdstr.js");
    this._requires("VC.h.js");
    Controller.call(this);
}

ViewController.constructor=ViewController;
ViewController.prototype=Controller.prototype;

ViewController.prototype.setDefaultPrototype=function(proto){
        this.viewPrototype=proto;
    }
ViewController.prototype.getDefaultPrototype=function(proto){
        return this.viewPrototype;
    }
ViewController.prototype.initFromPrototype=function(prototypeID,_parent,_sibling){
        this.parent=(_parent instanceof HTMLElement)?_parent:document.body;
        var proto=document.getElementById(prototypeID);
        if(proto==null){log(prototypeID+" does not exist");}
        this.view=document.createElement(proto.tagName);
        this.view.className=prototypeID;
        this.view.id=prototypeID+"_"+((Math.random()*999999999)<<0);
        this.view.innerHTML=proto.innerHTML;
        if(_sibling){
            this.parent.insertBefore(this.view,_sibling)
        }
        else{
            this.parent.appendChild(this.view);
        }
        return this.view;
    }
ViewController.prototype.initWithView=function(view){
    this.view=view;
}
ViewController.prototype.repozContainer=function(container){
        var topValue=StringUtils.toProcent((document.documentElement.clientHeight-container.offsetHeight)/document.documentElement.clientHeight/2);
        container.style.top=topValue;
    }
ViewController.prototype.initWithTag=function(tag){
        this.view=document.createElement(tag)
    }
ViewController.prototype.initWithID=function(ID){
        this.view=document.getElementById(ID);
    }
ViewController.prototype.initWithHTML=function(html,boundProperties){
        var n=document.createElement("node");
        n.innerHTML=html;
        this.view= n.children[0];
    }
ViewController.prototype.getView=function(){
    return this.view;
}
ViewController.prototype.setView=function(view){
    this.view=view;
}
ViewController.prototype.setParent=function ViewController_SetParent(parent){
    if(parent==null || parent==undefined){
        this.parent.removeChild(this.getView());
        this.parent=null;
    }else{
        this.parent=parent;
        this.parent.appendChild(this.getView());
        this.layout();
    }
}
ViewController.prototype.setStyle=function(s){
        for(var i in s){
            this.view.style[i]=s;
        }
    }
ViewController.prototype.setCSSClass=function(cssClass){
        this.view.className=cssClass;
    }
ViewController.prototype.bindProperties=function(boundProperties){
        for(var propertyName in boundProperties){
            var elementID=boundProperties[propertyName]['ID'];
            var attribute=boundProperties[propertyName]['attr'];
            var setter=boundProperties[propertyName]['setter'];
            var getter=boundProperties[propertyName]['getter'];
            /* or
             this[propertyName]=element;
             this['set_'+elementID+'_'+attribute]=function(v){}
             this['get_'+elementID+'_'+attribute]=function(){}*/

            var element=document.getElementById(elementID);
            this[propertyName]={'node':element,'attr':attribute};
            this['set_'+elementID+'_'+attribute]=setter || (function(v){
                var _prop=this;
                this.node[this.attr]=v;
            }).bind(this[propertyName]);
            this['get_'+elementID+'_'+attribute]=getter || (function(){
                return this.node[this.attr];
            }).bind(this[propertyName]);
        }
    }