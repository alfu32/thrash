var Table=(function NAMESPACE_TABLE(){
    var CLASS=function Table(name,_matrix,_primaryKey){
        var _THIS=this;
        var matrix=_matrix||[[]];
        var names=matrix.splice(0,1)[0];
        var types=matrix.splice(0,1)[0];
        var primaryIndex=_primaryKey==undefined?"key":typeof(_primaryKey)=='number'?names[_primaryKey]:_primaryKey;
        //var defaults=matrix.splice(0,1)[0];
        /*var filters=(typeof(matrix[0][0])=="function")?matrix.splice(0,1):[];
        filters.length=names.length;
        var orderBy=(typeof(matrix[0][0])=="function")?matrix.splice(0,1):[];
        orderBy.length=names.length;*/

        var rows=matrix;
        var columns={};
        for(var i=0;i<names.length;i++){
            var _name=names[i];
            columns[_name]={};
            columns[_name].type=types[i];
            columns[_name].data=[];
            for(var k=0;k<rows.length;k++){columns[_name].data[k]=rows[k]||defaults[k]}
        }
        this.getMatrixView=function(_booleanFilteringRules,_orderingRule){
            var booleanFilteringRules=_booleanFilteringRules||[CLASS.FILTERS.ALL];
            var orderingRule=_orderingRule||[CLASS.ORDER.ASC];
            var _names=[],namesLength=0;
            var _types=[],typesLength=0;
            var _rows=[],rowsLength=0;
            var m=[_names,_types,_rows];
            var r=0;
            for(var i=0;i<rows.length;i++){
                var c=0;
                var boolFilter=booleanFilteringRules[i]||booleanFilteringRules[0];
                for(var j=0;j<rows[i].length;j++){
                    if(boolFilter(names[j],types[j],j,rows[i],i,rows[i][j])){
                        if(_names[c]==undefined){
                            _names[c]=names[j];
                            _types[c]=types[j];
                        }
                        if(_rows[r]==undefined){_rows[r]=[]}
                        _rows[r][c]=rows[i][j]
                        c++;
                    }
                }
                if(c)r++;
            }
            _rows.sort(orderingRule);
            return m;
        }
    }
    CLASS.FILTERS={
        ALL:function(){
            return function(column,columnType,columnIndex,row,rowIndex,value){return true}
        }
        ,LIMIT:function(rowIndex1,rowIndex2){
            return function(column,columnType,columnIndex,row,rowIndex,value){
                return rowIndex>rowIndex1 && rowIndex<rowIndex2
            }
        }
        ,LIKE:function(value){
            return function(column,columnType,columnIndex,row,rowIndex,value){
                var r=new RegExp(value,"gi");
                return value.toString().match(r);
            }
        }
    };
    CLASS.ORDER={
        ASC:function rule(row1,row2){
            var a=row1.join("_");
            var b=row2.join("_");
            return a>b?1:a==b?0:-1;
        }
        ,DESC:function rule(value1,value2){
            var a=row1.join("_");
            var b=row2.join("_");
            return a<b?1:a==b?0:-1;
        },
        _ASC:function(column){
            var _rule=function(v0,v1){
                return v0>v1?1:v0==v1?0:-1;
            }
            return _rule;
        },
        _DESC:function(column){
            var _rule=function(v0,v1){
                return v0<v1?1:v0==v1?0:-1;
            }
            return _rule;
        }
    }
    return CLASS;
})();