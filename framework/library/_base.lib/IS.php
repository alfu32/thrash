<?php
CLASS IS{
	public static function matchString($str){
		$userAgent=$_SERVER['HTTP_USER_AGENT'];
		return strpos($userAgent,$str)!==false?1:0;
	}
	public static function WEBKIT(){
		@header("DETECTED_webkit:".(IS::matchString('AppleWebKit')));
		return IS::matchString('AppleWebKit')!==0;
	}
	public static function IE(){
		@header("DETECTED_MSIE:".(IS::matchString('MSIE')));
		return IS::matchString('MSIE')!==0;
	}
	public static function FF(){
		@header("DETECTED_Firefox:".(IS::matchString('Firefox')));
		return IS::matchString('Firefox')!==0;
	}
	public static function WINDOWS(){
		@header("DETECTED_Windows:".(IS::matchString('Windows')));
		return IS::matchString('Windows NT')!==0;
	}
	public static function LINUX(){
		@header("DETECTED_Linux:".(IS::matchString('Linux')));
		return IS::matchString('Linux')!==0;
	}
	public static function OSX(){
		@header("DETECTED_OSX:".(IS::matchString('OS X')));
		return IS::matchString('Intel Mac OS X')!==false?1:0;
	}
}