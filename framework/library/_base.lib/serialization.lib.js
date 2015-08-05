

var serializeTable=function serializeTable(table,sepCell,sepRow,encodeFunc){
	Base.call(this,['serialization']);
	var _encodeFunc=encodeFunc||function(tx){return tx;};
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	var t=table,r=[];
	for(var i=0;i<t.length;i++){
		for(var j=0;j<t[i].length;j++){t[i][j]=_encodeFunc(t[i][j])}
		r[i]=t[i].join(CS);
	}
	return r.join(RS);
}
var deserializeTable=function deserializeTable(tableString,sepCell,sepRow,decodeFunc){
	Base.call(this,['serialization']);
	var _decodeFunc=decodeFunc||function(tx){return tx;};
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	var t=tableString.split(RS);
	for(var i=0;i<t.length;i++){
		t[i]=t[i].split(CS);
		for(var j=0;j<t[i].length;j++){t[i][j]=_decodeFunc(t[i][j])}
	}
	return t;
}

var serializeDict=function serializeDict(dict,sepCell,sepRow,encodeFunc){
	Base.call(this,['serialization']);
	var ser=[];
	var _encodeFunc=encodeFunc||function(tx){return tx;};
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	for(var i in dict){
		ser[ser.length]=i+CS+_encodeFunc(dict[i]);
		}
	return ser.join(RS);
	}
var deserializeDict=function deserializeDict(dictString,sepCell,sepRow,decodeFunc){
	Base.call(this,['serialization']);
	var _decodeFunc=decodeFunc||function(tx){return tx;};
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	var response=dictString.split(RS);
	var responseData={};
	for(var i=0;i<response.length;i++){
		var b=response[i].split(CS);
		var k='',v='';
		var iof=response[i].indexOf(CS);
		if(iof!=-1){k=response[i].substr(0,iof);v=response[i].substr(iof+1)}
		responseData[k]=_decodeFunc(v);
	}
	return responseData;
}
var serializeList=function serializeList(list,sepCell,encodeFunc){
	Base.call(this,['serialization']);
	var _encodeFunc=encodeFunc||function(tx){return tx;};
	var S=sepCell==undefined?"|":sepCell;
	for(var j=0;j<list.length;j++){list[j]=_encodeFunc(list[j])}
	return list.join(S);
}
var deserializeList=function deserializeList(listString,sep,decodeFunc){
	Base.call(this,['serialization']);
	var _decodeFunc=decodeFunc||function(tx){return tx;};
	var S=sep==undefined?"|":sepCell;
	var list=listString.split(S);
	for(var j=0;j<list.length;j++){list[j]=_decodeFunc(list[j])}
	return list;
}

SERIALIZE={dict:serializeDict,table:serializeTable,list:serializeList}
DESERIALIZE={dict:deserializeDict,table:deserializeTable,list:deserializeList}
var wrapTable=function wrapTable(typedTable,wrapHead,wrapRowCell,wrapRow){
	Base.call(this,['serialization']);
	var wrap=[[]];
	var head=typedTable[0]
	typedTable.head=typedTable[0];
	typedTable.types=typedTable[1];
	typedTable.values=typedTable[2];
	typedTable.access=typedTable[3];
	
	wrap[0]=wrapHead(typedTable)
	for(var r=1;r<typedTable.length;r++){
		wrap[r]=wrapRow(typedTable,r);
	}
	return wrap;
}
var pivot=function pivot(table,rowIndex){
	Base.call(this,['serialization']);
	var pivot=[];
	for(var column=0;column<table[0].length;column++){
		pivot[pivot.length]={name:table[0][column],type:table[1][column],value:table[rowIndex][column]};
	}
	//console.log(pivot);
	return pivot;
}
var pivot_dictionary=function pivot_dictionary(table,rowIndex){
	Base.call(this,['serialization']);
	var pivot={};
	for(var column=0;column<table[0].length;column++){
		pivot[table[0][column]]=table[rowIndex][column];
	}
	return pivot;
}
var transposeMatrix=function transposeMatrix(matrix){
	Base.call(this,['serialization']);
	var m=[];
	for(var i=0;i<matrix.length;i++){
		for(var j=0;j<matrix[i].length;j++){
			if(m[j]==undefined)m[j]=[];
			m[j][i]=matrix[i][j]
		}
	}
	return m;
}
var mapTable=function mapTable(names,data){
	Base.call(this,['serialization']);
	var map=[];
	for(var i=0;i<data.length;i++){
		map[i]={};
		for(var j=0;j<names.length;j++){
			map[i][names[j]]=data[i][j];
		}
	}
	return map;
}
var mapTableRow=function mapTableRow(nameRow,dataRow){
	Base.call(this,['serialization']);
	var map={};
	for(var i=0;i<nameRow.length;i++){
		map[nameRow[i]]=dataRow[i];
	}
	return map;
}
var fuseDict=function fuseDict(dict1,dict2,prefix){
	Base.call(this,['serialization']);
	var pref=prefix||''
	var map=dict1;
	for(var i in dict2){
		map[pref+i]=dict2[i];
	}
	return map;
}
var joinMaps=function joinMaps(){
	Base.call(this,['serialization']);
	var map={};
	for(var i=0;i<arguments.length;i++){
		var dict=arguments[i];
		for(var j in dict){
			map[j]=dict[j];
		}
	}
	return map;
}
TABLE_UTILS={wrapTable:wrapTable,pivot:pivot,pivot_dictionary:pivot_dictionary,mapTable:mapTable,mapTableRow:mapTableRow,fuseDict:fuseDict,joinMaps:joinMaps}