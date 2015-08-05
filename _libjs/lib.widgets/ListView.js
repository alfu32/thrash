/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/25/12
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */

function ListView(){
    var list=new Controller();
    list.view=document.getElementById("list");
    //list.initWithID("list");
    list.renderItemAtIndex=function(table,index){
        var listitem=document.createElement("div");
        listitem.className="listitem"
        listitem.innerHTML=table[index].split("/")[2];
        var a=document.createElement("a");
        a.href=table[index];
        var img=document.createElement("img");
        img.src="dl-iconx032.png";
        img.className="link";
        a.appendChild(img);
        listitem.appendChild(a);
        console.log(listitem);
        return listitem;
    }
}
ListView.constructor=ListView;
ListView.prototype=new Controller()

ListView.prototype.setCellPrototype=function (prototype){
    this.cellPrototype=prototype;
}

ListView.prototype.Cells={
    simpleCell:function (){
            var cell=document.createElement("div");
            cell.className="ListViewController_simpleCell"
            return cell;
        },
    fotoTextCell:function (){
            var cell=document.createElement("div");

            cell.className="ListViewController_simpleCell"
            return cell;
        },
    cellFromID:function(id){

    }
}