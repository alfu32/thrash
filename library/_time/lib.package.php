<?php 
$dir="portail/library/_time.lib";
if(!isset($_GET['text_plain'])){
	echo "<script src='";echo include('Calendar.input.js.php');echo"' type='text/javascript'></script>";
}else{
	echo include('$dir/Calendar.input.js.php')."\n";
}
?>