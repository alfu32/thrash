/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/26/12
 * Time: 5:05 PM
 * To change this template use File | Settings | File Templates.
 */
StringUtils={
    toProcent:function(v,_precision){
        var precision=_precision||2;
        var a=Math.pow(10,precision);
        return ((100*a*v)>>0)/a+"%";
    }
}