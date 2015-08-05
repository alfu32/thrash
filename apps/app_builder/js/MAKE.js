var MAKE={};
var list=["a","abbr","address","area","article","aside","audio","b"
    ,"base","bb","bdi","bdo","blockquote","body","br","button","canvas","caption"
    ,"cite","code","col","colgroup","command","data","datagrid","datalist","dd"
    ,"del","details","dfn","div","dl","dt","em","embed","eventsource","fieldset"
    ,"figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header"
    ,"hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend"
    ,"li","link","mark","map","menu","meta","meter","nav","noscript","object","ol","optgroup"
    ,"option","output","p","param","pre","progress","q","ruby","rp","rt","s","samp","script","section","select"
    ,"small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th"
    ,"thead","time","title","tr","track","u","ul","var","video","wbr"]
for(var i=0;i<list.length;i++){
    MAKE[list[i]]=(function(tagName){
        var FUNC=function(){
            var e=document.createElement(tagName);
            if(arguments.length>0){
                for(var k in arguments[0]){e[k]=arguments[0][k]}
            }
            if(arguments.length>1){
                for(var k in arguments[1]){e.style[k]=arguments[1][k]}
            }
            if(arguments.length>2){
                for(var k in arguments[2]){e.appendChild(arguments[2][k])}
            }
            return e;
        }
        FUNC.name="mk"+tagName.toUpperCase();
        return FUNC;
    })(list[i]);
}