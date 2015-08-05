/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/28/12
 * Time: 9:47 AM
 * To change this template use File | Settings | File Templates.
 */
function ButtonView(){
    var button=new ViewController();
    button.initFromPrototype("ui_button");
    var onclick=function(event){}
    var caption;
    this.view=button.view;
    this.layout=function(){
        button.view.innerHTML=caption;
    }
    this.Click=function(click){
        if(click==undefined)return onclick
        else {
            onclick=click;
            return this;
        }
    }
    button.view.addEventListener("click",function(event){onclick(event)},true);
    this.Text=function(text){
        if(text==undefined){
            return caption;
        }else {
            log(text);
            caption=text;
            return this;
        }
    }
}
ButtonView.constructor=ButtonView;
ButtonView.prototype=new ViewController();

_makeUIPrototype("UIButton",
    "<div id='ui_button' class='ui_button'></div>",
".ui_button {"+
    "font-family: Helvetica ;" +
    "cursor:pointer;"+
    "font-weight: bold ;"+
    "padding: 15px;"+
    "border: 1px solid black ;"+
    "-moz-border-radius: 8px ;"+
    "-webkit-border-radius: 8px ;"+
    "margin-top: 10px ;"+
    "margin-bottom: 10px ;"+
    "background-color: white ;"+
"}"
)