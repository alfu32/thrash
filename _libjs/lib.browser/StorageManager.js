/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/16/12
 * Time: 10:45 AM
 * To change this template use File | Settings | File Templates.
 */
function StorageManager(){
    this.storage={}
}
StorageManager.prototype={
    iterator:function(){
        TODO("StorageManager.js : implement iterator");
    },
    getData:function(key){
        return this.storage[key] || null;
    },
    putData:function(key,data){
        try{
            this.storage[key]=data;
        }catch(errorLocal){
            warn("no space left - "+(data.length/1024)+"KB of data not written");
        }
    },
    hasKey:function(key){
        return key in this.storage;
    },
    keys:function(){
        var keys=[];
        for(var i in this.storage){
            keys.push(i);
        }
        return keys;
    },
    values:function(){
        var values=[];
        for(var i in this.storage){
            values.push(i);
        }
        return values;
    },
    clear:function(){
        for(var i in this.storage){
            delete this.storage[i];
        }
    }
}