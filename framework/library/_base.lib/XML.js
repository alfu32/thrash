var XML=(function(){
	var CLASS=function XML(){
        Base.call(this,['XML']);
		var _THIS=this;
		_THIS.serializeXml=function serializeXmlNode(xmlNode) {}
		
		
		if (typeof window.DOMParser != "undefined") {
		    _THIS.parseXml = function parseXml(xmlStr) {
		        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
		    };
		} else if (typeof window.ActiveXObject != "undefined" &&
		       new window.ActiveXObject("Microsoft.XMLDOM")) {
		    _THIS.parseXml = function parseXml(xmlStr) {
		        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
		        xmlDoc.async = "false";
		        xmlDoc.loadXML(xmlStr);
		        return xmlDoc;
		    };
		} else {
			_THIS.parseXml = function parseXml(xmlStr) {
				return null;
			}
		    throw new Error("No XML parser found");
		}
		_THIS.serializeXml=function serializeXmlNode(xmlNode) {
		    if (typeof window.XMLSerializer != "undefined") {
		        return (new window.XMLSerializer()).serializeToString(xmlNode);
		    } else if (typeof xmlNode.xml != "undefined") {
		        return xmlNode.xml;
		    }
		    return "";
		}
	}
	return CLASS;
})()