<?php
$txt=file_get_contents("cookies.txt");
die($txt);

if(isset($_GET['center'])){$center=$_GET['center'];}else{$center='0.000000000%2c0.000000000';}//Brooklyn+Bridge,New+York,NY;
if(isset($_GET['zoom'])){$zoom=$_GET['zoom'];}else{$zoom='11';}//1,2,3,...,20;
if(isset($_GET['size'])){$size=$_GET['size'];}else{$size="600x300";}//600x300;
if(isset($_GET['maptype'])){$maptype=$_GET['maptype'];}else{$maptype="roadmap";};//roadmap|hybrid|satellite
if(isset($_GET['markers'])){
	$markers_array=$_GET['markers'];
	$markers=implode('&markers=',$markers_array);
}else{
	$markers="";
};

if(isset($_GET['sensor'])){$sensor=$_GET['sensor'];}else{$sensor='false';};//false
if(isset($_GET['format'])){$format=$_GET['format'];}else{$format='png';};//png|jpeg|gif|bmp
$parameters=array(
		"center=$center"
		,"zoom=$zoom"
		,"size=$size"
		,"maptype=$maptype"
		,"markers=$markers"
		,"sensor=$sensor"
		,"format=$format"
);
// Create a stream
$opts = array(
		'http'=>array(
				'method'=>"GET",
				'header'=>
				"Host: maps.googleapis.com\r\n"
				."Proxy-Connection: keep-alive\r\n"
				."Cache-Control: no-cache\r\n"
				."Proxy-Authorization: Negotiate TlRMTVNTUAADAAAAGAAYAIAAAAAYABgAmAAAAAwADABYAAAAEAAQAGQAAAAMAAwAdAAAABAAEACwAAAAFQKI4gYBsR0AAAAPYdhdxeMbvh6uxCzcB2IYwEYAQQBNAEkATABZAGEAbABmAGUAcgBhAHIAdQBJAFQATABTADIAMwB2zoPj1IAfUwAAAAAAAAAAAAAAAAAAAADotxYvn3gGCnEJi+k01fEmaNFuAL+ITUMrZQjA6BFwDSLrFzS7sfD7\r\n"
				."Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
				."Pragma: no-cache\r\n"
				."User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31\r\n"
				."Accept-Encoding: gzip,deflate,sdch\r\n"
				."Accept-Language: en-US,en;q=0.8\r\n"
				."Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3\r\n"
				."Cookie: BCSI-CS-308ac3e5b39fc7fc=2\r\n"
		)
);

$context = stream_context_create($opts);

$static_call="http://www.google.com/maps/api/staticmap?".implode("&",$parameters);

$img=file_get_contents($static_call, false, $context);

$length=strlen($img);
$day=new DateInterval();
$day->day=1;
$now=new DateTime();$now=$now->format(DateTime::RFC850);

//$tomorrow=new DateTime();$tomorrow=$tomorrow->add($day);$tomorrow=$tomorrow->format(DateTime::RFC850);
//date ("D, d MMM YYYY HH:mm:ss e");
header("Cache-Control:public, max-age=86400");
header("Connection:Keep-Alive");
header("Content-Length:$length");
header("Content-Type:image/$format");
header("Date:$now");
//header("Expires:$tomorrow");
header("Proxy-Connection:Keep-Alive");
header("Server:staticmap");
header("Vary:Accept-Language");
header("X-Frame-Options:SAMEORIGIN");
header("X-XSS-Protection:1; mode=block");
echo $img;
?>