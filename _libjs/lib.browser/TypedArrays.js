/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 10/14/12
 * Time: 1:15 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
    try {
        console.log("has TypedArray")
        var a = new Uint8Array(1);
        return; //no need
    } catch(e) {

    }

    function subarray(start, end) {
        return this.slice(start, end);
    }

    function set_(array, offset) {
        if (arguments.length < 2) offset = 0;
        for (var i = 0, n = array.length; i < n; ++i, ++offset)
            this[offset] = array[i] & 0xFF;
    }

    // we need typed arrays
    function TypedArray(arg1) {
        var args=[];
        for(var i=0;i<arguments.length;i++)args[i]=arguments[i];
        var result;
        if (typeof arg1 === "number") {
            result = new Array(arg1);
            for (var i = 0; i < arg1; ++i)
                result[i] = 0;
        } else
            if(arg1){
                result = [arg1];
                console.warn("from TypedArray arguments: %s",arguments[0]);
            }else {
                result = [];
            }
        result.subarray = subarray;
        result.buffer = result;
        result.byteLength = result.length;
        result.set = set_;
        if (typeof arg1 === "object" && arg1.buffer)
            result.buffer = arg1.buffer;

        return result;
    }

    window.Uint8Array = TypedArray;
    window.Uint16Array = TypedArray;
    window.Uint32Array = TypedArray;
    window.Int8Array = TypedArray;
    window.Int16Array = TypedArray;
    window.Int32Array = TypedArray;
    window.Float32Array = TypedArray;
    window.Float64Array = TypedArray;
})();