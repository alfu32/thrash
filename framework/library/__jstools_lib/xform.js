xform={}
xform.POST2PHP=function xform_post_2_php(reqstr) {
	var aa = deserializeDict(reqstr, '=', '&');
	var zz = "";
	for ( var i in aa) {
		zz += '$' + i + '=mysql_escape_string(decodeFromIso($_PARMS["' + i + '"]));\n\r'
	}
	;
	return zz;
}
xform.POST2PHP_SELECT=function xform_post_2_php(reqstr) {
	var aa = deserializeDict(reqstr, '=', '&');
	var params = "";
	var query = "SELECT ##QS## FROM ##TNAME## WHERE ##COND##";
	for ( var i in aa) {
		params += '$' + i + '=mysql_escape_string($_PARMS["' + i + '"]);\n';
		query+="SELECT "
	}
	;
}
xform.POST2PHP_INSERT=function xform_post_2_php(reqstr) {
	var aa = deserializeDict(reqstr, '=', '&');
	var REPLACE={POST_DATA : "",COLUMNS : "",VALUES : ""};
	var FUNCTION = "function "+aa['cmd']+"() {\n"
	+"	global $gl_dbserver_dbname;\n"
	+"	global $_PARMS;\n"
	+"	global $gl_uid,$gl_username,$gl_usergroup,$gl_userlanguage,$gl_application,$gl_env;\n"
	+"	##POST_DATA##;\n"
	+"	$ECHO.=(Query::executeStatement(\"\n"
	+"		INSERT INTO \n"
	+"			`##TABLENAME##`\n"
	+"		(\n"
	+"			##COLUMNS##) \n"
	+"		VALUES (\n"
	+"			##VALUES##);\n"
	+"	\"));\n"
	+"	echo encode($ECHO);\n"
	+"}";
	for ( var i in aa) {
		REPLACE.POST_DATA += '$' + i + "=mysql_escape_string(decodeFromIso($_PARMS['" + i + "']));\n";
		if(i=='cmd')continue;
		REPLACE.COLUMNS+="`"+i+"`,\n"
		REPLACE.VALUES+="'$"+i+"',\n"
	}
	console.log(REPLACE);
	for(var i in REPLACE){
		FUNCTION=FUNCTION.replace("##"+i+"##",REPLACE[i]);
	}
	return FUNCTION;
}
xform.POST2PHP_INSERTUPDATE=function xform_post_2_php(reqstr) {
	var aa = deserializeDict(reqstr, '=', '&');
	var REPLACE={POST_DATA : "",COLUMNS : "",VALUES : "",SETS : ""};
	var FUNCTION = "function "+aa['cmd']+"() {\n"
	+"	global $gl_dbserver_dbname;\n"
	+"	global $_PARMS;\n"
	+"	global $gl_uid,$gl_username,$gl_usergroup,$gl_userlanguage,$gl_application,$gl_env;\n"
	+"	##POST_DATA##;\n"
	+"	$ECHO.=(Query::executeStatement(\"\n"
	+"		INSERT INTO \n"
	+"			`##TABLENAME##`\n"
	+"		(\n"
	+"			##COLUMNS##) \n"
	+"		VALUES (\n"
	+"			##VALUES##)\n"
	+"		ON DUPLICATE KEY UPDATE\n"
	+"		SET ##SETS##;\n"
	+"	\"));\n"
	+"	echo encode($ECHO);\n"
	+"}";
	for ( var i in aa) {
		REPLACE.POST_DATA += '$' + i + "=mysql_escape_string(decodeFromIso($_PARMS['" + i + "']));\n";
		if(i=='cmd')continue;
		REPLACE.COLUMNS+="`"+i+"`,\n"
		REPLACE.VALUES+="'$"+i+"',\n"
		REPLACE.SETS+="`"+i+"`=VALUES(`"+i+"`),\n"
	}
	console.log(REPLACE);
	for(var i in REPLACE){
		FUNCTION=FUNCTION.replace("##"+i+"##",REPLACE[i]);
	}
	return FUNCTION;
}
xform.POST2PHP_UPDATE=function xform_post_2_php(reqstr) {
	var aa = deserializeDict(reqstr, '=', '&');
	var REPLACE={POST_DATA : "",SETS : ""};
	var FUNCTION = "function "+aa['cmd']+"() {\n"
	+"	global $gl_dbserver_dbname;\n"
	+"	global $_PARMS;\n"
	+"	global $gl_uid,$gl_username,$gl_usergroup,$gl_userlanguage,$gl_application,$gl_env;\n"
	+"	##POST_DATA##;\n"
	+"	$ECHO.=(Query::executeStatement(\"\n"
	+"		UPDATE \n"
	+"			`##TABLENAME##`\n"
	+"		SET \n"
	+"			##SETS## \n"
	+"	\"));\n"
	+"	echo encode($ECHO);\n"
	+"}";
	for ( var i in aa) {
		REPLACE.POST_DATA += '$' + i + "=mysql_escape_string(decodeFromIso($_PARMS['" + i + "']));\n";
		if(i=='cmd')continue;
		REPLACE.SETS+="`"+i+"`='$"+i+"',\n"
	}
	for(var i in REPLACE){
		FUNCTION=FUNCTION.replace(new RegExp("##"+i+"##","gi"),REPLACE[i])
	}
	return FUNCTION;
}
xform.POST2PHP_DELETE=function xform_post_2_php(reqstr) {
}
xform.list2script=function(list){
	var r="";
	for(var n in list){
		r+="<script type='text/javascript' src='lib.manager.php?load="+n+"'></script>\n"
	}
	return r;
}
xform.SQL_TCODES2HTML_FORM=function xform_post_2_php(reqstr,prefix) {
	var aa = deserializeDict(reqstr, '=', '&');
	var zz = "<style>."+prefix+"_rw{display:table-row}."+prefix
		+"_cll{display:table-cell;padding:4px;border-right:1px solid #122227}."+prefix
		+"_clr{display:table-cell;padding:4px;background-color:#FEFEFF}</style>\n"
    	+"<form method='get' action='*.php'>";
	for ( var tcode in aa) {
		var readable_name=aa[tcode];
		zz += "<div class='"+prefix+"_rw'><span align='right' class='"+prefix+"_cll'>"+readable_name+"</span>"
		+"<span name='"+tcode+"' align='left' class='"+prefix+"_clr'></span><input type='hidden' name='"+tcode+"'/></div>\n";
	};
	zz+="</form>"
	return zz;
}