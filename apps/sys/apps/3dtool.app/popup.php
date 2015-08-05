<?php
$text = $_GET["txt"];
$libname = $_GET["fileName"];
$library = fopen("./objectLibrary/".$libname, "a+");
fwrite($library,urldecode($text));
fclose($library);
//if($_GET['last']=='true')
//var_dump($_GET["fileName"])
?>