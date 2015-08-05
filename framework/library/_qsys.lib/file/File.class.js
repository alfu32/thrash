var _File = (function() {
	var CLASS = function File() {
    	Base.call(this,['File']);
		var _FILE = this;
		this.MIMEtype = "text/unicode";
		this.name = "";
	};
	return CLASS;
})();

var _FileStatic = (function() {
	var CLASS = function FileStatic() {
    	Base.call(this,['FileStatic']);
		var _FILE_STATIC = this;

		this.templateView = new QTemplate(
				"<div><div>##NAME##</div><img src='##MIME_IMG##'/></div>");
		this.read = function _read() {
			//TODO
		};
		this.write = function _write() {
			//TODO
		};
		this.append = function _append() {
			//TODO
		};
		_THIS.newMethod.after = function(data) {
			//TODO
		}
		_THIS.newMethod.before = function(data) {
			//TODO
		}
	};
	return CLASS;
})();