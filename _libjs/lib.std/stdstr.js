/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/19/12
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */

StringUtils={
    toMega:function(v){
        return ((100*v/1024/1024)<<0)/100;
    },
    toKilo:function(v){
        return ((100*v/1024)<<0)/100;
    },
    toProcent:function(v){
        return ((10000*v)<<0)/100+"%";
    },
    roundWithDecimals:function(number,decimals){
        var r=Math.pow(10,decimals);
        return (Math.round(number*r))/r;
    },
    roundWithStep:function(number,step){
    return (Math.round(number/step)<<0)*step;
},
}