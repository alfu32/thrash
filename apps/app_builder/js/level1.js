
var QProperty=(function(){
    var CLASS=function QProperty(name){
        var property;
        this[name]=function(value){
            if(arguments.length==0){
                _PROPERTY.beforeGet([value])
                return property;
            }else{
                _PROPERTY.beforeSet([value]);
                property=value;
                _PROPERTY.afterSet([property]);
                return this;
            }
        }
        var _PROPERTY=this[name];
        _PROPERTY.beforeGet=function(valueByRef){};
        _PROPERTY.beforeSet=function(valueByRef){};
        _PROPERTY.afterSet=function(valueByRef){};
    }
    return CLASS;
})();

var QArray=(function(){
    var CLASS=function QArray(name){
        var array=[];
        this[name]=function(value){
            if(arguments.length==0){
                _PROPERTY.beforeGet([value])
                return array;
            }else{
                _PROPERTY.beforeSet([value]);
                array[array.length]=value;
                _PROPERTY.afterSet([value]);
                return this;
            }
        }
        var _PROPERTY=this[name];
        _PROPERTY.beforeGet=function(valueByRef){};
        _PROPERTY.beforeSet=function(valueByRef){};
        _PROPERTY.afterSet=function(valueByRef){};
    }
    return CLASS;
})();

var QMethod=(function(){
    var CLASS=function QMethod(context,name){
        QProperty.call(context,[name]);
        QProperty.call(context[name],['BeforeRun']);
        QProperty.call(context[name],['AfterRun']);
        QProperty.call(context[name],['DuringRun']);
        context[name].Call=function(data){
            context[name].BeforeRun()([data]);
            context[name]([data]);
            context[name].AfterRun()([data]);
            return this;
        };
    }
    return CLASS;
})();

var QTemplate=(function(){
    var CLASS=function QTemplate(template){
        var _TEMPLATE=this;
        QObject.apply(this);
        QProperty.apply(this,['Template']);
        this.Template(template);
        this.Instance=function(hashList){
            var t=this.Template();
            for (var i in hashList) {
                var r=new RegExp("##"+i+"##","gi")
                t=t.replace(r,hashList[i]);
            }
            return t;
        }
    }
    return CLASS;
})();

var QViewTemplate=(function(){
    var CLASS=function QViewTemplate(template){
        var _THIS=this;
        QProperty.apply(this,['View']);
        QObject.apply(this);
        QProperty.apply(this,['Template']);
        this.Template(template);
        this.Map={};
        this.Tags={};
        this.findTags=function(){
            var wds=template.split("##")
            for(var i=1;i<wds.length;i+=2){
                this.Tags[wds[i]]=wds[i];
            }
        }
        this.findTags();
        this.ViewForArray=function(hashList){
            var e=document.createElement('div');
            e.innerHTML=_THIS.Template()+"";
            document.body.appendChild(e);
            for (var tag in hashList) {
                if(_THIS[tag]==undefined){
                    this[tag]=[];
                }
                this.Map[tag]=CLASS.mapNode(e,tag);
                for(var i=0;i<this.Map[tag].length;i++){
                    this.Map[tag][i].nodeValue=hashList[tag];
                }
            }
            _THIS.View(e.childNodes[0]);
            return _THIS;
        }
        _THIS.Template.afterSet=function(byRefvalue){
            var e=document.createElement('div');
            e.innerHTML=byRefvalue[0];
            e=e.childNodes[0];
            //console.log(_THIS);
        }
        _THIS.Template(template);
    }
    CLASS.mapNode=function(node,tag){
        var val="##"+tag+"##";
        var list=[];
        if(node.nodeType==3 && node.nodeValue==val)list[0]=node;
        if(node.attributes!=null)
        for(var i=0;i<node.attributes.length;i++){
            list=list.concat(CLASS.mapNode(node.attributes[i],tag))
        }
        for(var i=0;i<node.childNodes.length;i++){
            list=list.concat(CLASS.mapNode(node.childNodes[i],tag))
        }
        return list;
    }
    return CLASS;
})();

var QReceiver=(function(){
    var CLASS=function QReceiver(socket,onReceive){

    }
    return CLASS;
})()

var QObject=(function(){
    var CLASS=function QObject(){

    }
    return CLASS;
})();
