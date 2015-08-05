<?php 
$dir="portail/library/_table.lib";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/Table.class.js' type='text/javascript'></script>";
}else{
	echo file_get_contents("Table.class.js")."\n";
}
?>