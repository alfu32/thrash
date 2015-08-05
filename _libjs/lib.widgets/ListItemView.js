/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/31/12
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */
function ListItemView(){
    ViewController.call(this);
    var _ListItemView=this;
    var click=function(event,listItem){

    }
    var selected=false;
    this.view=document.createElement("div");
    this.view.className="button";
    this.Text=function(text){
        if(text==undefined){return this.view.innerHTML;}
        else{
            this.view.innerHTML=text;
            return this;
        }
    }
    this.Click=function(listener){
        if(listener==undefined){return click;}
        else{
            click=listener;
            return this;
        }
    }
    this.Selected=function(_selected){
        if(_selected==undefined){return _selected;}
        else{
            selected=_selected;
            return this;
        }
    }
    this.layout=function(){
        if(selected){
            this.view.className="layerListItem_selected";
            this.view.style.cursor="default";
        }else{
            this.view.className="button";
            this.view.style.cursor="";
        }
        return this;
    }
    this.view.addEventListener("click",function(event){click(event,_ListItemView)},true);
}
ListItemView.constructor=ListItemView;
ListItemView.prototype=new ViewController();