<?php
	// *********************************************
	// * fetch_labels APPLICATION ENGINE *
	// *********************************************
	header ("Content-Type: text/html; charset=UTF-8");
	//header("Accept-Charset: utf-8,utf8,UTF-8,UTF8");
	//header ("Content-Type: text/html; charset=utf-8");
	$gl_application = "17";
	include("library/_base.lib/Echo.class.php");
	include("library/_table.lib/Query.class.php");
	include "portail_lib.php";
	$gl_limit_par_page=14;
	
	switch ($_PARMS["cmd"])
	{
		case "fetch_labels":
			fetch_labels2();
			break;
		default:
			echo "NOK|99";
			break;
	}
	function pad($val,$zeroes){
		$n="1";
		$out=$val;
		$len=strlen($out);
		while($len<$zeroes){
			$out="0".$out;
			$len=strlen($out);
		}
		return $out;
	}
	function encode_str($string){
		return mb_convert_encoding(
				$string
				,mb_detect_encoding($string,"UTF-8, ISO-8859-1, ISO-8859-15")
				,true
				);
	}
	function decode_str($string){
		return mb_convert_encoding(
				$string
				,mb_detect_encoding($string,"UTF-8, ISO-8859-1, ISO-8859-15")
				,true
				);
	}
	function encodeTo($string,$encoding) {
		return mb_convert_encoding($string, $encoding, mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
	}
	
	function encodeToIso($string) {
		return mb_convert_encoding($string, "ISO-8859-15", mb_detect_encoding($string, "UTF-8, ISO-8859-1, ISO-8859-15", true));
	}
	function encode($string){
		$enc="UTF-8";
		header ("Content-Type: text/plain; charset=".$enc);
		return encodeTo($string,$enc);
	}
	function fetch_labels() {
		global $_PARMS;
		global $gl_userlanguage,$gl_uid,$gl_usergroup;
		$libids=$_PARMS['labels'];
		
		$query_string="SELECT `id_label`,`lib_$gl_userlanguage` FROM 
			 lib_labels LL WHERE LL.`id_label` IN ($libids)";
		
		header("Qtr: $query_string");
		
		$_query=new Query($query_string);
		$result=$_query->getArray(";","|");
		echo encode($result["body"].";LANG|$gl_userlanguage;");
	}
	function fetch_labels2() {
		global $_PARMS;
		global $gl_userlanguage,$gl_uid,$gl_usergroup;
		$libids=$_PARMS['labels'];
		$lib_array=explode("','",trim($_PARMS['labels'],"'"));
		foreach($lib_array as $lib){
			$l=GetLib($lib);
		}
		$query_string="SELECT `id_label`,`lib_$gl_userlanguage` FROM 
			 lib_labels LL WHERE LL.`id_label` IN ($libids)";
		
		header("Qtr: $query_string");
		
		$_query=new Query($query_string);
		$result=$_query->getArray(";","|");
		echo encode($result["body"].";LANG|$gl_userlanguage;");
	}
php?>