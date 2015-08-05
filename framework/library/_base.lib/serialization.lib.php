<?php 
abstract class Delegate{
	abstract function delegate();
}

function serializeTable($table,$CS="|",$RS=";"){
	$t=$table;$r=array();
	for($i=0;i<$t.length;$i++){
		$r[$i]=implode($CS,$t[$i]);
	}
	return implode($RS,$r);
}
function deserializeTable($string,$CS="|",$RS=";"){
	$t=explode($RS,$string);
	$r=array();
	for($i=0;i<$t.length;$i++){
		$r[$i]=explode($CS,$t[$i]);
	}
	return $r;
}
function serializeList($list,$CS="|"){
	return implode($CS,$list);
}
function deserializeList($string,$CS="|"){
	return explode($CS,$string);
}
function serializeDict($dict,$CS="=",$RS="&"){
	$r=array();
	foreach ($dict as $key => $value) {
		$r[$i]="$key$CS$value";
	}
	return implode($RS,$r);
}
function deserializeDict($string,$CS="=",$RS="&"){
	$t=explode($RS,$string);
	$r=array();
	for($i=0;i<$t.length;$i++){
		$k=explode($CS,$t[$i]);
		$r[$k[0]]=$k[1];
	}
	return $r;
}
function deserializeQueryString_sort($a,$b){
	return ($a['pos']-$b['pos']);
}
function deserializeQueryString($string,$keys){
	$s="&$string";
	
	$result=array();
	
	$index=array();
	foreach ($keys as $value) {
		$t=array("pos"=>strpos($s,"&$value="),"name"=>$value,"spos"=>"&$value=");
		$index[]=$t;
	}
	usort($index,"deserializeQueryString_sort");

	foreach ($index as $value) {
		$t=array("pos"=>strpos($s,"&$value="),"name"=>$value,"spos"=>"&$value=");
	}
	
	$l=count($index);
	if($l>1){
		for ($i = 1; $i < $l; $i++) {
			$key=$index[$i-1]['name'];$pos0=$index[$i-1]['pos']+2+strlen($key);
			$result[$key]=substr($s,$pos0,$index[$i]['pos']-$pos0);
		}
	}
	$key=$index[$l-1]['name'];$pos0=$index[$l-1]['pos']+2+strlen($key);
	$result[$key]=substr($s,$pos0);
	
	return $result;
	
}