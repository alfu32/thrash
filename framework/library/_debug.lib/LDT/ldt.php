<?php
$addr=$_GET['url']."";
$ext=explode('.',$addr);
$ext=$ext[count($ext)-1];

$line=$_GET['line'];
header("Content-Type: text/html");
?>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>LDT Generic Syntax Highlighter Demo</title>
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="stylesheet" type="text/css" href="lib/TextareaDecorator.css">
<style>
        /* highlight styles */
        .ldt .comment { color: silver; }
        .ldt .string { color: green; }
        .ldt .number { color: navy; }
        /* setting inline-block and margin to avoid misalignment bug in windows */
        .ldt .keyword { font-weight: bold; display: inline-block; margin-bottom: -1px; color: blue; }
        .ldt .variable { color: cyan; }
        .ldt .define { color: #122227;}
        .ldt .dom { color: #FF8800; }
        .ldt .css { color: #8800FF; }
        .ldt .make { font-weight: bold; display: inline-block; margin-bottom: -1px; color: magenta; }
        .ldt .widget { font-weight: bold; display: inline-block; margin-bottom: -1px; color: magenta; }
</style>
<script src="lib/Parser.js" type="text/javascript"></script>
<script src="lib/TextareaDecorator.js" type="text/javascript"></script>
<style type="text/css">
.CodeMirror {
	border-top: 1px solid #888;
	border-bottom: 1px solid #888;
	height: 100%
}
body{
background-image: url(data:image/gif;base64,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);
background-position: 50% 50%;
background-repeat: no-repeat;

}
</style>
<script>
APP=(function(){
	return function APP(){
	var gl_extension="<?php echo $ext; ?>";
		var iframe=document.getElementById("page_frame");
		var doc; 
		var parser = new Parser({
				dom:  /(accessKey|attributes|baseURI|childElementCount|childNodes|children|classList|className|clientHeight|clientLeft|clientTop|clientWidth|contentEditable|control|dataset|dir|draggable|firstChild|firstElementChild|form|hidden|htmlFor|id|innerHTML|innerText|isContentEditable|lang|lastChild|lastElementChild|localName|namespaceURI|nextElementSibling|nextSibling|nodeName|nodeType|nodeValue|offsetHeight|offsetLeft|offsetParent|offsetTop|offsetWidth|onabort|onbeforecopy|onbeforecut|onbeforepaste|onblur|onchange|onclick|oncontextmenu|oncopy|oncut|ondblclick|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onerror|onfocus|oninput|oninvalid|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onmousewheel|onpaste|onreset|onscroll|onsearch|onselect|onselectstart|onsubmit|onwebkitfullscreenchange|onwebkitfullscreenerror|outerHTML|outerText|ownerDocument|parentElement|parentNode|prefix|previousElementSibling|previousSibling|scrollHeight|scrollLeft|scrollTop|scrollWidth|spellcheck|style|tabIndex|tagName|textContent|title|translate|webkitInsertionParent|webkitPseudo|webkitShadowRoot|webkitdropzone)/gi,
				widget: /(CALENDAR_UTILS|NORM|GET|SET|SERVER)/gi,
				css:  /(alignmentBaseline|backgroundAttachment|backgroundClip|backgroundColor|backgroundImage|backgroundOrigin|backgroundPosition|backgroundPositionX|backgroundPositionY|backgroundRepeat|backgroundRepeatX|backgroundRepeatY|backgroundSize|background|baselineShift|border|borderBottom|borderBottomColor|borderBottomLeftRadius|borderBottomRightRadius|borderBottomStyle|borderBottomWidth|borderCollapse|borderColor|borderImage|borderImageOutset|borderImageRepeat|borderImageSlice|borderImageSource|borderImageWidth|borderLeft|borderLeftColor|borderLeftStyle|borderLeftWidth|borderRadius|borderRight|borderRightColor|borderRightStyle|borderRightWidth|borderSpacing|borderStyle|borderTop|borderTopColor|borderTopLeftRadius|borderTopRightRadius|borderTopStyle|borderTopWidth|borderWidth|bottom|boxShadow|boxSizing|bufferedRendering|captionSide|clear|clip|clipPath|clipRule|color|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|content|counterIncrement|counterReset|cssText|cursor|direction|display|dominantBaseline|emptyCells|enableBackground|fill|fillOpacity|fillRule|filter|float|floodColor|floodOpacity|font|fontFamily|fontSize|fontStretch|fontStyle|fontVariant|fontWeight|glyphOrientationHorizontal|glyphOrientationVertical|height|imageRendering|kerning|left|length|letterSpacing|lightingColor|lineHeight|listStyle|listStyleImage|listStylePosition|listStyleType|margin|marginBottom|marginLeft|marginRight|marginTop|marker|markerEnd|markerMid|markerStart|mask|maskType|maxHeight|maxWidth|minHeight|minWidth|opacity|orphans|outline|outlineColor|outlineOffset|outlineStyle|outlineWidth|overflow|overflowWrap|overflowX|overflowY|padding|paddingBottom|paddingLeft|paddingRight|paddingTop|page|pageBreakAfter|pageBreakBefore|pageBreakInside|parentRule|pointerEvents|position|quotes|resize|right|shapeRendering|size|speak|src|stopColor|stopOpacity|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|tabSize|tableLayout|textAlign|textAnchor|textDecoration|textIndent|textLineThrough|textLineThroughColor|textLineThroughMode|textLineThroughStyle|textLineThroughWidth|textOverflow|textOverline|textOverlineColor|textOverlineMode|textOverlineStyle|textOverlineWidth|textRendering|textShadow|textTransform|textUnderline|textUnderlineColor|textUnderlineMode|textUnderlineStyle|textUnderlineWidth|top|transition|transitionDelay|transitionDuration|transitionProperty|transitionTimingFunction|unicodeBidi|unicodeRange|vectorEffect|verticalAlign|visibility)/gi,
				make: /(View|Parent|Widget|_THIS|CLASS|PROTO|QProperty|MAKE|div|span|iframe|table|td|tr|tbody|th|img|input)(?!\w|=)/gi,
				whitespace: /\s+/,
				comment: /\/\*([^\*]|\*[^\/])*(\*\/?)?|(\/\/|#)[^\r\n]*/gi,
				string: /"(\\.|[^"\r\n])*"?|'(\\.|[^'\r\n])*'?/gi,
				number: /0x[\dA-Fa-f]+|-?(\d+\.?\d*|\.\d+)/gi,
				keyword: /(case|catch|class|const|delete|do|else|extends|false|finally|for|function|if|new|null|private|protected|public|return|static|switch|this|throw|true|try|var|void|while)(?!\w|=)/gi,
				variable: /[\$\%\@](\->|\w)+(?!\w)|\${\w*}?/gi,
				define: /[$A-Z_a-z0-9]+/gi,
				op: /[\+\-\*\/=<>!]=?|[\(\)\{\}\[\]\.\|]/gi,
				other: /\S+/gi
		});
		if(iframe.contentDocument) { 
		    doc = iframe.contentDocument; 
		} else {
		    doc = iframe.contentWindow.document; 
		}
	setTimeout(function(){
				var text=doc.body.innerText;
				var textarea = document.getElementById('codeArea');
				// lets set it to something interesting
				if(gl_extension=='html' || gl_extension=='html' || gl_extension=='php')textarea.value = '<!DOCTYPE html>\n<html>\n\t' + doc.body.innerHTML + '\n</html>';
				if(gl_extension=='js')textarea.value ='<!DOCTYPE html>\n<html>\n\t<scri'+'pt type="text/javascript">' + text+ '\n</scr'+'ipt>\n</html>';
				// start the decorator
				decorator = new TextareaDecorator( textarea, parser );
				decorator.gotoLine("<?php echo $line; ?>");
				document.body.style.backgroundImage='url()';
				textarea.style.display='none';
				document.body.children[1].children[0].style.tabSize='2';
		},1000);
	}
})();
</script>
<body onload='setTimeout(function(){new APP()},2000)'>
<div><?php echo "$addr / $ext / $line";?></div>
	<textarea id="codeArea"  class='input' spellcheck='false' style="tab-size:2"><?php echo $addr; ?></textarea>
	<iframe id="page_frame" name="page_frame" src="<?php echo $addr.'?innerframe=true'; ?>" style="display:none;"></iframe>

</body>
