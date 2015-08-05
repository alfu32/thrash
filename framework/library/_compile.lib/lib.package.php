<?php 
if(!isset($_GET['text_plain'])){
	if(isset($_GET['phype'])||isset($_GET['all'])){
		echo "<script src='library/_compile.lib/phypeLoader.js' type='text/javascript'></script>";
		echo "<script src='library/_compile.lib/phypeParser.js' type='text/javascript'></script>";
	}
	if(isset($_GET['Expression'])||isset($_GET['all'])){
		echo "<script src='library/_compile.lib/phypeParser.js' type='text/javascript'></script>";
	}
}else{
	if(isset($_GET['phype'])||isset($_GET['all'])){
		echo file_get_contents("phypeLoader.js")."\n";
		echo file_get_contents("phypeParser.js")."\n";
	}
	if(isset($_GET['Expression'])||isset($_GET['all'])){
		echo file_get_contents("Expression.class.js")."\n";
	}
}
?>