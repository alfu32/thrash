/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/25/12
 * Time: 3:50 PM
 * To change this template use File | Settings | File Templates.
 */
_LIB_QUEUE={
    queue:[],
    push:function(object){
        _LIB_QUEUE.queue.push(object);
    },
    load:function(){

    }
}
Object.defineProperty(Object.prototype,"_requires",{
    value:function Object__requires(src){
        _LIB_QUEUE.push({id:this,required:src})
    },
    configurable:false,
    enumerable:false
});