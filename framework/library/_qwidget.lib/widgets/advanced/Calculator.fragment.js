var Calculator=(function(){
	var CLASS=function Calculator(targetElement){
    	Base.call(this,['Calculator']);
		var _THIS=this;
		
		Widget.call(this);
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,time){});
		
		var
		button_style={width:'139px',height:'38px'}
		,input_style={width:'139px',height:'38px'
			,textAlign:'right',fontFamily:'thinFont,Calibri,Consolas'}
		,ssize={width:'38px',height:'38px',margin:'3px',border:'1px solid #444'}
		,ssizeH2={width:'86px',height:'38px',margin:'3px',border:'1px solid #444'}
		,ssizeV2={width:'38px',height:'86px',margin:'3px',border:'1px solid #444'}
		,inp;
		_THIS.View(
			MAKE.table({
				className:'Calculator'
				,onmousedown:function(event){
					var trg=NORM.target(event).childNodes[0].nodeValue+"";
					/*console.log({aa:trg.nodeValue});*/
					switch(trg){
						case '=':
							try{
							inp.value=eval(inp.value);
							}catch(err){}
							break;
						case 'C':
							inp.value='';
							break;
						case 'Bk':
							if(inp.value.length<=0)break;
							inp.value=inp.value.substr(0,inp.value.length-1);
							break;
						default:
							inp.value+=(trg);
							break;
					}
					var val=inp.value;
					if(targetElement!=undefined){
						targetElement.value=val;
					}
					_THIS.OnChange()(_THIS,val);
				}
			},{
				margin:'8px'
			},[
				MAKE.tbody({},{},[
					MAKE.tr({},{},[
						MAKE.td({colSpan:3},{},[
							inp=MAKE.input({
								value:targetElement.value
								,align:'right'
							},input_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('Bk').Size(ssize).View()
							//MAKE.button({innerText:'Bk',innerHTML:'Bk'},button_style)
						])
					])
					,MAKE.tr({},{},[
						MAKE.td({},{},[
							new ImageButton2().Text('7').Size(ssize).View()
							//MAKE.button({innerText:'7',innerHTML:'7'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('8').Size(ssize).View()
							//MAKE.button({innerText:'8',innerHTML:'8'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('9').Size(ssize).View()
							//MAKE.button({innerText:'9',innerHTML:'9'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('-').Size(ssize).View()
							//MAKE.button({innerText:'-',innerHTML:'-'},button_style)
						])
					])
					,MAKE.tr({},{},[
						MAKE.td({},{},[
							new ImageButton2().Text('4').Size(ssize).View()
							//MAKE.button({innerText:'4',innerHTML:'4'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('5').Size(ssize).View()
							//MAKE.button({innerText:'5',innerHTML:'5'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('6').Size(ssize).View()
							//MAKE.button({innerText:'6',innerHTML:'6'},button_style)
						])
						,MAKE.td({rowSpan:2},{},[
							new ImageButton2().Text('+').Size(ssizeV2).View()
							//MAKE.button({innerText:'+',innerHTML:'+'},button_style)
						])
					])
					,MAKE.tr({},{},[
						MAKE.td({},{},[
							new ImageButton2().Text('1').Size(ssize).View()
							//MAKE.button({innerText:'1',innerHTML:'1'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('2').Size(ssize).View()
							//MAKE.button({innerText:'2',innerHTML:'2'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('3').Size(ssize).View()
							//MAKE.button({innerText:'3',innerHTML:'3'},button_style)
						])
					])
					,MAKE.tr({},{},[
						MAKE.td({colSpan:2},{},[
							new ImageButton2().Text('0').Size(ssizeH2).View()
							//MAKE.button({innerText:'0',innerHTML:'0'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('.').Size(ssize).View()
							//MAKE.button({innerText:'.',innerHTML:'.'},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('/').Size(ssize).View()
							//MAKE.button({innerText:'/',innerHTML:'/'},button_style)
						])
					])
					,MAKE.tr({},{},[
						MAKE.td({colSpan:1},{},[
							new ImageButton2().Text('(').Size(ssize).View()
							//MAKE.button({innerText:'(',innerHTML:'('},button_style)
						])
						,MAKE.td({colSpan:1},{},[
							new ImageButton2().Text(')').Size(ssize).View()
							//MAKE.button({innerText:')',innerHTML:')'},button_style)
						])
						,MAKE.td({colSpan:1},{},[
							new ImageButton2().Text('=').Size(ssize).View()
							//MAKE.button({innerText:'=',innerHTML:'='},button_style)
						])
						,MAKE.td({},{},[
							new ImageButton2().Text('*').Size(ssize).View()
							//MAKE.button({innerText:'*',innerHTML:'*'},button_style)
						])
					])
				])
			])
		)
	};
	WidgetStatic.call(CLASS);
	return CLASS;
}

)();