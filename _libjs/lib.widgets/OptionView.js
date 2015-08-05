/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/12/13
 * Time: 8:35 PM
 * To change this template use File | Settings | File Templates.
 */
function OptionView(children,parent,sibling,selectedValue){
    ViewController.call(this);
    this.children=children||[];
    var _option=this;
    this.onValueChanged=function(value){}
    _option.initFromPrototype("optionView",parent,sibling);
    _option.view.addEventListener("change",function(event){_option.onValueChanged(event);},true);
    this.renderItemAtIndex=function(table,index){
        var e=document.createElement("option");
        if(table[index]==selectedValue){
            e.selected="selected";
        }
        e.value=table[index];
        e.innerHTML=table[index];

        return e;
    }
}
OptionView.constructor=OptionView;
OptionView.prototype=new ViewController();

_makeUIPrototype("optionView",
    "<select id='optionView' class='optionView'></select>",
    ".optionView{" +
        "background-color: #FFFFFF;"+
        "border-radius: 5px;"+
        "border:1px solid #EEE;" +
        "width:145px;"+
        "}");