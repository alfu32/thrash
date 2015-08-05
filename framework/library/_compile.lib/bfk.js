var BFk_interpreter=(function(){
	var PROTO=function BFk_interpreter(){
		var _THIS=this;
		var data_pointer=0;
		var data_mem={};
		var instr_pointer=0;
		var instr_mem=[];
		
		_THIS.inputBuffer=[];
		var inbuffer_pointer=0;
		_THIS.outputBuffer=[];
		var outbuffer_pointer=0;
		
		var matchingBraces={};
		
		var reset=function(){
			data_pointer=0;
			data_mem=[0];
			instr_pointer=0;
			instr_mem=[];
			_THIS.inputBuffer=[];
			inbuffer_pointer=0;
			_THIS.outputBuffer=[];
			outbuffer_pointer=0;
		}
		_THIS.execSpeed=50;
		_THIS.afterParseInstruction=function(ref,instrPointer){}
		
		QProperty.call(_THIS,'then');
		_THIS.then(function(){console.log('finished')});
		
		_THIS.execute=function(program){
			reset();
			instr_mem=program.split('');
			
					
			var exec=function(){
				switch(instr_mem[instr_pointer]){
				case '>':
					data_pointer++;
					if(data_mem[data_pointer]==undefined){
						data_mem[data_pointer]=0;
					}
					break;
				case '<':
					data_pointer--;
					if(data_mem[data_pointer]==undefined){
						data_mem[data_pointer]=0;
					}
					break;
				case '+':
					data_mem[data_pointer]++;
					break;
				case '-':
					data_mem[data_pointer]--;
					break;
				case '#':
				case ".":
					_THIS.outputBuffer[_THIS.outputBuffer.length]=data_mem[data_pointer];
					break;
				case '?':
				case ',':
					data_mem[data_pointer]=_THIS.inputBuffer.splice(0);
					break;
				case '[':
					if(data_mem[data_pointer]==0){
						var ob_cnt=0;
						while(ob_cnt>=0){
							instr_pointer++;
							if(instr_mem[instr_pointer]=='[')ob_cnt++;
							if(instr_mem[instr_pointer]==']')ob_cnt--;
						}
						instr_pointer++;
					}
					break;
				case ']':
					if(data_mem[data_pointer]!=0){
						var cb_cnt=0;
						while(cb_cnt>=0){
							instr_pointer--;
							if(instr_mem[instr_pointer]=='[')cb_cnt--;
							if(instr_mem[instr_pointer]==']')cb_cnt++;
						}
						instr_pointer--;
					}
					break;
				}
				_THIS.afterParseInstruction(_THIS,instr_pointer);
				instr_pointer++;
				if(instr_pointer<instr_mem.length){
					setTimeout(exec,_THIS.execSpeed);
				}else{
					_THIS.then()();
				}
			}
			setTimeout(exec,_THIS.execSpeed);
			return _THIS;
		}
	}
	return PROTO;
})();

function ByteArrayToString(array){
	var string='';
	array.forEach(function(value,index,array){
		string+=String.fromCharCode(value);
	});
	return string;
}
function brainfuck_test(){
	var program="++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
	var parser=new BFk_interpreter();
	parser.inputBuffer=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	parser.outputBuffer=[];
	parser.afterParseInstruction=function(ref,instrPointer){
		/*console.log("--------------------------------------------------------------["+instrPointer+']');
		console.log(parser.inputBuffer);
		console.log(parser.outputBuffer);*/
	}
	parser.execute(program).then(function(){
		alert(ByteArrayToString(parser.outputBuffer));
	});;
	
}

