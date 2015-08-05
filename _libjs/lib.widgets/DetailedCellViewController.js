/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/22/12
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
function DetailedCellViewController(){
    var _detailedCell=this;
    ViewController.call(this);
    //styleDef.id="DetailedCellViewController";
    _detailedCell.initFromPrototype('detailed_cell');
    _detailedCell.iconElement=_detailedCell.getView().children[0].children[0].children[0].children[0].children[0];
    _detailedCell.messageElement=_detailedCell.getView().children[0].children[0].children[0].children[1].children[0];
    _detailedCell.detailElement=_detailedCell.getView().children[0].children[0].children[0].children[1].children[1];
    this.Icon=function(src){
        if(src==undefined){return _detailedCell.iconElement.src}
        else{_detailedCell.iconElement.src=src;}
    }
    this.IconBackground=function(src,poz){
        if(src==undefined){return _detailedCell.iconElement.style.backgroundImage}
        else{
            _detailedCell.iconElement.style.backgroundImage="url('"+src+"')";
            if(poz!=undefined)_detailedCell.iconElement.style.backgroundPosition="0% -"+poz+"px";
            //_detailedCell.layout();
        }
    }
    this.Message=function(msg){
        if(msg==undefined){return _detailedCell.messageElement.innerHTML;}
        else{
            _detailedCell.messageElement.innerHTML=msg;
            //_detailedCell.layout();
        }
    }
    this.Detail=function(detail){
        if(detail==undefined){return _detailedCell.detailElement.innerHTML}
        else{
            _detailedCell.detailElement.innerHTML=detail;
            _detailedCell.layout();
            }
    }
    this.layout=function(){
        /*var x=_detailedCell.getView().offsetLeft;
        var y=_detailedCell.getView().offsetTop;
        //log(x,y);
        _detailedCell.detailElement.style.left=(x+40)+"px"
        _detailedCell.detailElement.style.top=(y+24)+"px"
        _detailedCell.messageElement.style.left=(x+40)+"px"
        _detailedCell.messageElement.style.top=(y+11)+"px"*/
    }

}
DetailedCellViewController.ICONS={
    DEFAULT:'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D',
    ARROW_LINE:"../../_libimg/ios/IL_ArrowLine.png",
    MINUS_LINE:"../../_libimg/ios/IL_MinusLine.png",
    LOCK:"../../_libimg/ios/IL_Lock.png",
    ARROW:"../../_libimg/ios/arrow.png",
    WIFI:"../../_libimg/ios/IL_Wifi.png",
    MAGNIFYING_GLASS:"../../_libimg/ios/magnifying_glass.png",
    SEARCH:"../../_libimg/ios/search.png",
    TABLE_NEXT:"../../_libimg/ios/UITableNext.png",
    TABLE_NEXT_BUTTON:"../../_libimg/ios/UITableNextButton.png",
}
DetailedCellViewController.constructor=DetailedCellViewController;
DetailedCellViewController.prototype=new ViewController();

_makeUIPrototype("detailed_cell",
    "<div id='detailed_cell' class='detailed_cell'><table><body><tr><td rowspan='2'>" +
        "<img class='detailed_cell_icon' src='"+DetailedCellViewController.ICONS.DEFAULT+"'/></td>" +
        "<td><div class='detailed_cell_message'></div>" +
        "<div class='detailed_cell_detail'></div></td></tr>" +
        "</body></table></div>",
    ".detailed_cell{" +
        "background: #dbe8f6;" +
        "box-shadow: 0 1px 0 rgba(255,255,255, 0.25), inset 0 1px 2px rgba(0,0,0, 0.3);" +
        "cursor:default;" +
        "height:40px" +
        "}" +
        ".detailed_cell:hover{" +
        "background: #e0f5ff;" +
        "box-shadow: 0 1px 0 rgba(255,255,255, 0.25), inset 0 1px 2px rgba(0,0,0, 0.3);" +
        "}" +
        ".detailed_cell_icon{" +
        //"display:inline-block;" +
        "width:32px;" +
        "height:32px;" +
        "margin:5px;" +
        "}" +
        ".detailed_cell_icon:hover{" +
        "}" +
        ".detailed_cell_message{" +
        //"display:inline-block;" +
        //"position:absolute;" +
        "font-size:13px;" +
        "}" +
        ".detailed_cell_detail{" +
        //"display:inline-block;" +
        //"position:absolute;" +
        "font-size:9px;" +
        "font-style:italic;" +
        "}")