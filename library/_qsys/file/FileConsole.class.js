var FileConsole = (function() {
	var CLASS = function FileConsole() {
		var _FILE_CONSOLE = this;

		QProperty.call(this, [ 'Server' ]);
		this.Server.beforeGet = function(byRefvalue) {
		};
		this.Server.beforeSet = function(byRefvalue) {
		};
		this.Server.afterSet = function(byRefvalue) {
			Server_ListCap();
		};
		this.Server_ListCap = function _Server_ListCap() {
			var reqData = {
				cmd : "get_functions"
			}
			var response = CallText2(_FILE_CONSOLE.Server(), reqData)
			var fs = deserializeDict(response);
			for ( var n in fs) {
				_FILE_CONSOLE.Server[n] = fs[n];
			}
		};
		this.List = function List(_reference) {
			_THIS.List.beforeExec(_reference);
			var reqData = {
				cmd : "ls",
				dir : CURRENT
			}
			var response = CallText2(_FILE_CONSOLE.Server(), reqData);
			_reference.response = deserializeTable(response);
			_THIS.List.afterExec(_reference);
			return this;
		};
		_THIS.List.after = function(data) {
		}
		_THIS.List.before = function(data) {
			if (_reference.response.error != '200') {
				_FILE_CONSOLE.onList(_reference.response)
			} else {
				_FILE_CONSOLE.onError(_reference.response)
			}
		}
		this.ChangeDir = function ChangeDir(_reference) {
			_THIS.ChangeDir.beforeExec(_reference);
			var reqData = {
				cmd : "cd",
				dir : CURRENT + _reference.parameters.dir
			}
			var response = CallText2(_FILE_CONSOLE.Server(), reqData);
			_reference.response = deserializeTable(response);
			_THIS.ChangeDir.afterExec(_reference);
			return this;
		};
		_THIS.ChangeDir.after = function(data) {
		}
		_THIS.ChangeDir.before = function(data) {
			if (_reference.response.error != '200') {
				_FILE_CONSOLE.onChangeDir(_reference.response)
			} else {
				_FILE_CONSOLE.onError(_reference.response)
			}
		}
		this.ReadFile = function ReadFile(_reference) {
			_THIS.ReadFile.beforeExec(_reference);
			var reqData = {
				cmd : "read",
				file : CURRENT + _reference.parameters.filename
			}
			var response = CallText2(_FILE_CONSOLE.Server(), reqData);
			_reference.response = deserializeTable(response);
			_THIS.ReadFile.afterExec(_reference);
			return this;
		};
		_THIS.ReadFile.after = function(data) {
		}
		_THIS.ReadFile.before = function(data) {
			if (_reference.response.error != '200') {
				_FILE_CONSOLE.onFileRead(_reference.response)
			} else {
				_FILE_CONSOLE.onError(_reference.response)
			}
		}
	};
	return CLASS;
})();