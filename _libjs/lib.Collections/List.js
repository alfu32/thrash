/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/27/12
 * Time: 4:13 PM
 * To change this template use File | Settings | File Templates.
 */
function List(){
    var index=0,hasNext,hasPrevious;
    this.getIndex=function(){
        return index;
    }
    var elements=[];
    this.add=function(id){
            elements[elements.length]=id;
        return this;
   }
    this.replace=function(id1,id2){
        for(var i=0;i<elements.length;i++){
            if(elements[i]==id1){
                log("replacing ",id1," with ",id2);
                elements[i]=id2;
                return this;
            }
        }
        return this;
    }
    this.getList=function List_GetList(){
        return elements;
    }
    this.hasPrevious=function(){
        return index>0;
    }
    this.hasNext=function(){
        return index<elements.length-1;
    }
    this.item=function(){
        if(elements.length!=0)
        return elements[index];
        else return null;
    }
    this.next=function(){
        if(this.hasNext())
        return elements[index+1];
        else return null;
    }
    this.previous=function(){
        if(this.hasPrevious())
            return elements[index-1];
        else return null;
    }
    this.forward=function(){
        if(this.hasNext()){
            index++;
            //hasPrevious=index>0;
            //hasNext=index<(elements.length-1);
        }
        return this;
    }
    this.back=function(){
        if(this.hasPrevious()){
            index--;
            //hasPrevious=index>0;
            //hasNext=index<(elements.length-1);
        }
        return this;
    }
}
List.constructor=List;
List.prototype=new List();