/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/28/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */
function _makeUIPrototype(id,html,style){
    var dc=document.getElementById(id);
    if(dc==null){
        var dlgc=document.createElement("div");
        dlgc.id=id
        dlgc.innerHTML=html;
        var dlgcStyle=document.createElement("style");
        dlgcStyle.innerHTML=style;
        document.head.appendChild(dlgcStyle)
        document.getElementById("prototypes").appendChild(dlgc.children[0]);
        //log(id);
    }
};