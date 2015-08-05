/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/16/12
 * Time: 12:17 PM
 * To change this template use File | Settings | File Templates.
 */
_STORAGE={
    local:localStorage,
    session:sessionStorage
}
_CURRENT_STORAGE=_STORAGE.local;
imageStorage=new StorageManager();

localStorageManager={
    getData:function(selector){
        if(hasSelector(selector))return localStorage[selector] || sessionStorage[selector];
    },
    putData:function(selector,data){
        try{
            localStorage[selector]=data;
        }catch(errorLocal){
            try{
                sessionStorage[selector]=data;
            }catch(errorLocal){
                warn("no space left - "+(data.length/1024)+"KB of data not written");
            }
        }
    },
    hasSelector:function(name){
        return localStorage[selector]!=undefined || sessionStorage[selector]!=undefined || false
    },
    clear:function(){
        localStorage.clear();
        sessionStorage.clear();
    }
}