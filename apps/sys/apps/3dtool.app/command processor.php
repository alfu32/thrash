<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Voxels</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="../../base_UI.js"></script>
	<script type="text/javascript">
	shorts={'cube':'Cube','mesh':'Mesh','plan':'Plane','pface':'Polyface'}
	function processCode(code)
	{
	var cproc='';
	var a=code.split(' ');var instr=a[0];var params=a[1].replace(/([a-z])/g, '');
	if(shorts[instr])
	{
	cproc=shorts[instr]+'('+params+');<br>';
	}
	return cproc;
	
	}
	listeners={
"selectstart":[function(e){var ev=e||window.event;var et=h.eT(ev,this);return h.pD(ev)}],
"contextmenu":[function(e){var ev=e||window.event;var et=h.eT(ev,this);if((et.className=='dragPoint'))return h.pD(ev)}],
"keyup":[function(e){var ev=e||window.event;var et=h.eT(ev,this);if(ev.keyCode==13){dial.innerHTML+=processCode(input.value);input.value=''}}]
}
alerters=[
{object:{},once:true,oldValue:'',handler:function(){}}
];

	function init()
	{
	this.watchers=[
	{toLower:false,element:{nu:null},parameter:['nu'],originalContent:[],
	handler:function(){}
	}
	];
	
	input=h.gt("cmd");
	dial=h.gt("dialog");
appendListeners(document.body,listeners,false);
loadWatchers(this.watchers);
	}
function alertersExecute(alertersEnum)
{
for(i in alertersEnum){var ob=alertersEnum[i].object;var func=alertersEnum[i].handler;func(ob);}
}
	</script>
</head>
<body onload="init()">
	<input type="text" id="cmd" value="command"><br><span id="dialog"></span>
	<script type="text/javascript">
	runall=setInterval("alertersExecute(alerters);Watch(watchers);",41);
	</script>
</body>
	</html>