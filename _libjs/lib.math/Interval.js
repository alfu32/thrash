/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 10/14/12
 * Time: 3:44 PM
 * To change this template use File | Settings | File Templates.
 */
function Interval(ax,bx){
    this.a=ax||0;
    this.b=bx||0;
}
Interval.prototype={
    in:function(x){
        return (a<=x)&&(x<=b);
    },
    intersects:function(i){
    var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
    return ar[0].r!==ar[1].r;
    },
    intersect:function(i){
    var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
    if(ar[0].r!==ar[1].r){this.a=ar[1].n;this.b=ar[2].n}
    else {this.a=null;this.b=null}
    return this;
    },
    union:function(i){
    var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
    if(ar[0].r!==ar[1].r){this.a=ar[0].n;this.b=ar[3].n}
    return this;
    },
    subtract:function(i){
    var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
    if(ar[0].r!==ar[1].r){this.a=ar[0].n;this.b=ar[1].n}
    return this;
    }
}