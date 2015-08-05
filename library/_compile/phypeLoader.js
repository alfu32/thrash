phypeLoader=(function(){
	var CLASS=function phypeLoader(){
		var fromShell = false;
		
		/**
		 * Borrowed from http://snippets.dzone.com/posts/show/2025
		 */
		var ajax={};
		ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}};
		ajax.send=function(u,f,m,a){var x=ajax.x();x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(a)};
		ajax.gets=function(url){var x=ajax.x();x.open('GET',url,false);x.send(null);return x.responseText};
		ajax.get=function(url,func){ajax.send(url,func,'GET')};
		
		function loadPHP() {
			var phpCode = '';
			var scripts = document.getElementsByTagName('script');
			for (var i=0; i<scripts.length; i++) {
				if (scripts[i].type == 'text/php') {
					if (scripts[i].src)
						phpCode += ajax.gets(scripts[i].src);
					else
						phpCode += scripts[i].innerHTML;
				}
			}
		
			return phpCode;
		}
		
		// Set our phypeIn-variable (the return of this function will be parsed by our phypeParser).
		var phypeIn = loadPHP;
		
		// Set our phypeDoc-variable. This should contain the document that phype should output to.
		var phypeDoc = document;
		
		// Set our phypeOut-variable (this function takes the generated parser-output, and should
		// output this somewhere appropriate).
		var phypeOut = function(out) {
			phypeDoc.write(out);
		}
		
		
	}
	return CLASS;
})();
