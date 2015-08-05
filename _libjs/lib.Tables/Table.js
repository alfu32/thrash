/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/22/12
 * Time: 1:51 PM
 * To change this template use File | Settings | File Templates.
 */
function Table(){
    this.fields={}
    for(var i=0;i<arguments.length;i++){
        this.fields[arguments[i]]=[];
    }
}
Table.constructor=Table;
Table.prototype=new Table();

Table.prototype.foreachField=function(transform){
    for(var field in this.fields){
        transform(this.fields,field,this.fields[field]);
    }
}
Table.prototype.foreachCell=function(transform){
    this.foreachField(function(fields,fieldName,valuesArray){
        for(var index=0;valuesArray<array.length;index++){
            transform(fieldName,valuesArray,index,valuesArray[index]);
        }
    })
}
Table.prototype.clear=function(){
    this.foreachField(function(fields,fieldName,values){
        fields[fieldName]=[];
    })
    return this;
}
Table.prototype.merge=function(table){
    table.foreachField(function(fields,fieldName,values){
        if(!(fieldName in this.fields)){
            this.fields[fieldName]=[];
        }
        this.fields[fieldName].concat(values);
    });
    return this;
}