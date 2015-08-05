/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/9/12
 * Time: 10:09 AM
 * To change this template use File | Settings | File Templates.
 */
function PropertiesEditDialog(targetObject,propertiesDictionary){
    var d=document.height;
    DialogViewControler.call(this,[d-100]);
    var propertiesEditDialog=this;
    this.getHead().view.style.width="300px";
    this.onClose=function(){
    };
    this.onPropertyChanged=function(){};
    this.Title(targetObject.name+" Properties");

    for(var propName in propertiesDictionary){
        var cell=new PropertyCell(this,targetObject,propName,propertiesDictionary);
        this.children.push(cell);
        this.getBody().getView().appendChild(cell.view);
    }
    this.renderItemAtIndex=function(table,index){
        return table[index];
    }
    this.layout=function(){}
    this.getDialogControler=function(){
        return this;
    }
}
PropertiesEditDialog.constructor=PropertiesEditDialog;
PropertiesEditDialog.prototype=new ViewController();

function PropertyCell(propDialog,targetObject,propName,propertiesDictionary){
    ViewController.call(this)
    var cell=this;
    cell.initFromPrototype("propertiesEditor_prop");

    var pName=cell.view.children[0];
    var pInput=cell.view.children[1];
    var cName=propName[0].toUpperCase()+propName.substring(1,propName.length);
    pName.innerHTML=cName;
    var val=targetObject["get"+cName]();
    //log(val);
    pInput.value=val;
    pInput.type=propertiesDictionary[propName];
    var change_Listener=function(dialog,target,setter){
        return function(event){
            //log(target[setter],event.target.value);
            target[setter](event.target.value);

            dialog.onPropertyChanged();
        }
    }
    if(propertiesDictionary[propName].substr(0,4)=="list"){
        var dicName=propertiesDictionary[propName].split(":")[1];
        var dic=CanvasLayer[dicName];
        var opt=[];var j=0;
        for(var i in dic){
            opt[j]=i;
            j++;
        }

        var sel=new OptionView(opt,cell.view,pInput,val);
        sel.onValueChanged=change_Listener(propDialog,targetObject,"set"+cName);
        sel.className="propertiesEditor_propValue"
        this.view.removeChild(pInput);
        //log(opt);
        sel.layout();
    }else{
        pInput.addEventListener("change",change_Listener(propDialog,targetObject,"set"+cName));
    }
}
PropertyCell.constructor=PropertyCell;
PropertyCell.prototype=new ViewController();

(function (){
    var dc=document.getElementById("propertiesEditor_prop");
    if(dc==null){
        var dlgc=document.createElement("div");
        dlgc.id="dialogContainer"
        dlgc.innerHTML='<div>' +
            '<div id="propertiesEditor_prop">'+
            '<div id="propertiesEditor_propName" class="propertiesEditor_propName"></div>'+
            '<input type="text" class="propertiesEditor_propValue" src="../../_libimg/close.png" />'+
            '</div>';
        var dlgcStyle=document.createElement("style");
        dlgcStyle.id=".propertiesEditor";
        dlgcStyle.innerHTML=".propertiesEditor_prop{"+
            "background-color: #cedbe9;" +
            "width:300px;" +
            "overflow:hidden;"+
            "}"+
            ".propertiesEditor_prop:hover{"+
                "background-color: #deebf9;"+
            "}"+
            ".propertiesEditor_propValue{"+
                "background-color: #FFFFFF;"+
                "border-radius: 5px;"+
                "border:1px solid #EEE;" +
                "width:145px;"+
            "}"+
            ".propertiesEditor_propName{" +
                "display:inline-block;"+
                "margin-top:1px;" +
                "width:145px;"+
            "}";
        document.head.appendChild(dlgcStyle)
        document.body.appendChild(dlgc);
    }
})();