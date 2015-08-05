
/**********************************************************************************************************************************************************/
/******************************************************** TABLE *******************************************************************************************/
/**********************************************************************************************************************************************************/
var Table=(function(){
	var CLASS=function Table(){
    	Base.call(this,['Table']);
		var _THIS=this;
		QProperty.call(this,['AfterAddRow']);
		_THIS.AfterAddRow(function(_table,new_row,new_index){
			
		});
		QProperty.call(this,['BeforeReplaceRow']);
		_THIS.BeforeReplaceRow(function(_table,old_row,new_row,index){
			
		});
		QProperty.call(this,['AfterReplaceRow']);
		_THIS.AfterReplaceRow(function(_table,old_row,new_row,index){
			
		});
		QProperty.call(this,['BeforeDeleteRow']);
		_THIS.BeforeDeleteRow(function(_table,old_row,rowIndex){
			
		});
		QProperty.call(this,['OnDatasetChanged']);
		_THIS.OnDatasetChanged(function(_table){
			
		});
		
		var DATA_ARRAY_STRING;
		var history=[];currentHistoryIndex=0;
		history.add=function(v){
			history[history.length]=v;
			currentHistoryIndex=history.length-1;
		}
		this.getHistory=function(){
			return history;
		}
		this.undo=function(){
			var last=history[currentHistoryIndex];
			this[last.undo.command](last.undo.parameters);
		}
		var shadow=[];
		this.getShadow=function(){
			return shadow;
		}
		this.names=[];
		this.types=[];
		this.ranges=[];
		this.access=[];
		this.t_codes=[];
		this.rows=[];
		this.columns=[];
		this.width=0;
		this.height=0;
		var deleted=[];
		
		this.init=function Table_init(dataArray){
			deleted=[];
			DATA_ARRAY_STRING=serializeTable(dataArray)
			var TABLE=this;
			var _THIS=this;
			if(dataArray.length<5){
				console.log(('malformed table data'));
				console.log(dataArray);
				_THIS.init([['error'],['label'],['*'],['R'],['e'],['not well defined']])
			}
			this.names=dataArray[0];
			this.types=dataArray[1];
			this.ranges=dataArray[2];
			this.access=dataArray[3];
			this.t_codes=dataArray[4];
			var columns={};
			var data=[];
			var maxWidth=0,minWidth=0,height=dataArray.length-5;
			for(var i=5;i<dataArray.length;i++){
				shadow[i-5]=[];
				data[i-5]=[];
				if(maxWidth<dataArray[i].length){maxWidth=dataArray[i].length;}
				if(minWidth>dataArray[i].length){minWidth=dataArray[i].length;}
				for(var j=0;j<dataArray[i].length;j++){
					if(!(this.names[j] in columns)){
						columns[this.names[j]]=[]
					}
					if(!(j in columns)){
						columns[j]=[];
					}
					columns[this.names[j]][i]=dataArray[i][j]
					columns[j][i]=dataArray[i][j];
					shadow[i-5][j]=dataArray[i][j];
					data[i-5][j]=dataArray[i][j];
				}
			}
			this.rows=data;
			this.columns=columns;
			this.width=maxWidth;
			this.height=height;
			history.add({command:'init',parameters:[dataArray]
				,undo:{command:'init',parameters:[[['error'],['label'],['*'],['R'],['e'],['not well defined']]]}
			})
			return _THIS;
		}
		this.cloneRow=function(_rIndex){
			var row=deserializeList(serializeList(_THIS.rows[_rIndex]));
			this.addRow(row);
			return _THIS;
		}
		this.insertRow=function(){
			var row=[];
			for(var i=0;i<this.types.length;i++){
				row[i]='';
			}
			this.addRow(row);
			return _THIS;
		}
		this.join=function(table){
			var maxWidth=this.width,minWidth=this.width,height=this.height+1;
			for(var i=0;i<table.t_codes.length;i++){
				this.names[this.width+i]=table.names[i];
				this.types[this.width+i]=table.types[i];
				this.ranges[this.width+i]=table.ranges[i];
				this.access[this.width+i]=table.access[i];
				this.t_codes[this.width+i]=table.t_codes[i];
				columns[this.width+i]=[];
				columns[table.names[i]]=[];
				for(var j=0;j<this.rows.length;j++){
					columns[this.width+i][j]=table.rows[j][i];
					columns[table.names[i]][j]=table.rows[j][i];
					this.rows[this.width+i][j]=table[j][i];
				}
			}
			
			this.width=this.width+table.width;
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.selectLines=function(f){
			var _f=f||function(table,rowIndex){return true;}
			var table=this.replicateTableHead();
			for(var i=5;i<tdata.length;i++){
				if(f(this,i))table.rows[table.rows.length]=deserializeList(serializeList(this.rows[i]))
			}
			return table;
		}
		this.selectColumns=function(f){
			var _f=f||function(table,rIndex,cIndex){return true}
			
			return _THIS;
		}
		this.addRow=function(row){
			var maxWidth=this.width,minWidth=this.width,height=this.height+1;
			var i=this.rows.length;
				//shadow[i]=row;
				this.rows[i]=row;
				if(maxWidth<row.length){maxWidth=row.length;}
				if(minWidth>row.length){minWidth=row.length;}
				for(var j=0;j<row.length;j++){
					if(!(this.names[j] in this.columns)){
						this.columns[this.names[j]]=[]
					}
					if(!(j in this.columns)){
						this.columns[j]=[];
					}
					this.columns[this.names[j]][i]=row[j];
					this.columns[j][i]=row[j];
					//shadow[i][j]=row[j];
					this.rows[i][j]=row[j];
				}
			this.width=maxWidth;
			this.height=height;
			
			_THIS.AfterAddRow()(_THIS,row,i);
			
			history.add({
				command:'addRow',parameters:[row]
				,undo:{command:'deleteRow',parameters:[i]}
			});
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.replaceRow=function(rowIndex,row){
			var maxWidth=this.width,minWidth=this.width,height=this.height;
			var old_row=this.rows[rowIndex];
			
			_THIS.BeforeReplaceRow()(_THIS,old_row,row,rowIndex);
			
			var i=rowIndex;
				//shadow[i]=row;
				this.rows[i]=row;
				if(maxWidth<row.length){maxWidth=row.length;}
				if(minWidth>row.length){minWidth=row.length;}
				for(var j=0;j<row.length;j++){
					if(!(this.names[j] in this.columns)){
						this.columns[this.names[j]]=[]
					}
					if(!(j in this.columns)){
						this.columns[j]=[];
					}
					this.columns[this.names[j]][i]=row[j];
					this.columns[j][i]=row[j];
					//shadow[i][j]=row[j];
					this.rows[i][j]=row[j];
				}
			this.width=maxWidth;
			this.height=height;
			
			_THIS.AfterReplaceRow()(_THIS,old_row,row,rowIndex);
			
			history.add({command:'replaceRow',parameters:[rowIndex,row]
				,undo:{command:'replaceRow',parameters:[rowIndex,old_row]}})
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.deleteRow=function(rowIndex){
			var maxWidth=this.width,minWidth=this.width,height=this.height-1;
			var old_row=this.rows[rowIndex];
			
			_THIS.BeforeDeleteRow()(_THIS,old_row,rowIndex);
			
			var i=rowIndex;
				deleted[deleted.length]={index:i,row:shadow[i].splice(i,1)};
				this.rows.splice(i,1);
				for(var j in this.columns){
					this.columns[j].splice(i,1)
				}
				try{
					shadow.splice(i,1);
				}catch(err){}
			this.height=height;
			history.add({command:'deleteRow',parameters:[rowIndex]
			,undo:{command:'addRow',parameters:[old_row]}})
			_THIS.OnDatasetChanged()(_THIS);
			return _THIS;
		}
		this.hasDiffs=function(){
			if(deleted.length>0)return true;
			
			for(var i=0;i<this.rows.length;i++){
				var row=this.rows[i];
				var sh_row=shadow[i];
				for(var j=0;j<row.length;j++){
					if(sh_row[j]!=row[j]){
						return true;
					}
				}
			}
			return false;
		}
		this.isRowChanged=function(rowIndex){
			var row=this.rows[rowIndex];
			var sh_row=shadow[rowIndex];
			var is_changed=false;
			for(var j=0;j<row.length;j++){
				if(sh_row[j]!=row[j]){
					is_changed=true;
					break;
				}
			}
			return is_changed;
		}
		this.computeRowChange=function(rowIndex){
			var tc=_THIS.t_codes;
			var change=null;
			var row=this.rows[rowIndex];
			var sh_row=shadow[rowIndex];
			if(sh_row===undefined){
				change=deserializeDict(serializeDict(mapTableRow(tc,this.rows[rowIndex])));
				change.type='insert';
				change.internalIndex=rowIndex;
			}else{
				if(this.isRowChanged(rowIndex)){
					var mapold=mapTableRow(tc,sh_row);
					var mapnew=mapTableRow(tc,row);
					change=fuseDict(mapnew,mapold,'old_');
					change.type='update';
					change.internalIndex=rowIndex;
				}
			}
			return change;
		}
		this.getChangedRows=function(){
			var ch={update:[],insert:[],_delete:[]}
			for(var i=0;i<this.rows.length;i++){
				var row=this.rows[i];
				var sh_row=shadow[i];
				if(sh_row===undefined){
					ch.insert[ch.insert.length]={internalIndex:i,'NEW':row};
					continue;
				}
				var is_changed=false;
				for(var j=0;j<row.length;j++){
					if(sh_row[j]!=row[j]){
						is_changed=true;
						break;
					}
				}
				if(is_changed)ch.update[ch.update.length]={internalIndex:i,'old':shadow[i],'NEW':row};
			}
			if(deleted.length>0){
				for(var i=0;i<deleted.length;i++){
					ch._delete[ch._delete.length]={internalIndex:i,'old':deleted[i]};
				}
			}
			return ch;
		}
		this.prepareComBodies=function(changedRows){
			var tc=_THIS.t_codes;
			var ch=[]
			var cr=changedRows;
			for(var i=0;i<cr.update.length;i++){
				var mapold=mapTableRow(tc,cr.update[i].old);
				var mapnew=mapTableRow(tc,cr.update[i].NEW);
				ch[i]=fuseDict(mapnew,mapold,'old_');
				ch[i].type='update';
				ch[i].internalIndex=cr.update[i].internalIndex;
			}
			for(var i=0;i<cr.insert.length;i++){
				ch[i+cr.update.length]=mapTableRow(tc,cr.insert[i].NEW);
				ch[i+cr.update.length].type='insert';
				ch[i].internalIndex=cr.insert[i].internalIndex;
			}
			for(var i=0;i<cr._delete.length;i++){
				ch[i+cr.update.length+cr.insert.length]=mapTableRow(tc,cr._delete[i].old);
				ch[i+cr.update.length+cr.insert.length].type='delete';
				ch[i].internalIndex=cr._delete[i].internalIndex;
			}
			return ch;
		}
		this.commitChanges=function(index){
			if(index==undefined){
				shadow=deserializeTable(serializeTable(this.rows));
			}else{
				shadow[index]=deserializeList(serializeList(this.rows[index]));
			}
		}
		this.replicateTableHead=function(){
			var tdata=deserializeTable(DATA_ARRAY_STRING);
			tdata.splice(5);
			var newTable=new Table().init(tdata);
			return newTable;
		}
		this.replicateTable=function(){
			var tdata=deserializeTable(DATA_ARRAY_STRING);
			tdata.splice(5);
			tdata.concat(deserializeTable(serializeTable(this.rows)));
			var newTable=new Table().init(tdata);
			return newTable;
		}
		this.computeCurrentRangeOf=function Table_computeCurrentRangeOf(colName){
			var range={};
			for(var i=0;i<this.columns[colName].length;i++){
				range[this.columns[colName][i]]=this.columns[colName][i];
			}
			return range;
		}
		CLASS.TT[CLASS.TT.length]=_THIS;
	}
	CLASS.TT=[]
	return CLASS;
})();