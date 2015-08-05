function serializeTable(table,sepCell,sepRow){
var CS=sepCell==undefined?"|":sepCell;
var RS=sepRow==undefined?";":sepRow;
	var t=table,r=[];
	for(var i=0;i<t.length;i++){
		r[i]=t[i].join(CS);
	}
	return r.join(RS);
}
function deserializeTable(tableString,sepCell,sepRow){
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	var t=tableString.split(RS);
	for(var i=0;i<t.length;i++){
		t[i]=t[i].split(CS)
	}
    if(t.length==1)
        if(t[0].length==1)
            if(t[0][0]=='')return [];
	return t;
}

function wrapTable(typedTable,wrapHead,wrapRowCell,wrapRow){
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
function serializeDict(dict,sepCell,sepRow){
	var ser=[];
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	for(var i in dict){
		ser[ser.length]=i+CS+dict[i];
		}
	return ser.join(RS);
	}
function deserializeDict(dictString,sepCell,sepRow){
	var CS=sepCell==undefined?"|":sepCell;
	var RS=sepRow==undefined?";":sepRow;
	var response=dictString.split(RS);
	var responseData={};
	for(var i=0;i<response.length;i++){
		var b=response[i].split(CS);
		responseData[b[0]]=b[1];
	}
	return responseData;
}
function serializeList(list,sep){
	var S=sep==undefined?"|":sepCell;
	return list.join(S);
}
function deserializeList(listString,sep){
	var S=sep==undefined?"|":sepCell;
	return listString.split(S);
}
function pivot(table,rowIndex){
	var pivot=[];
	for(var column=0;column<table[0].length;column++){
		pivot[pivot.length]={name:table[0][column],type:table[1][column],value:table[rowIndex][column]};
	}
	//console.log(pivot);
	return pivot;
}
function fuseDict(dict1,dict2,pref1,pref2){
    var dict={}
    for(var i in dict1){
        dict[pref1+i]=dict1[i];
    }
    for(var i in dict2){
        dict[pref2+i]=dict2[i];
    }
    return dict;
}
function pivot_dictionary(table,rowIndex){
	var pivot={};
	for(var column=0;column<table[0].length;column++){
		pivot[table[0][column]]=table[rowIndex][column];
	}
	return pivot;
}
function mapTable(names,data){
	var map=[];
	for(var i=0;i<data.length;i++){
		map[i]={};
		for(var j=0;j<names.length;j++){
			map[i][names[j]]=data[i][j];
		}
	}
	return map;
}