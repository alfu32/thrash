var QObject = (function () {
	'use strict';
	var CLASS = function QObject() {};
	return CLASS;
})();
var QProperty = (function () {
	'use strict';
	var CLASS = function QProperty(name) {
		var _PROPERTY = null;
		var _THIS = this;
		_THIS[name] = function (value) {
			if (value === undefined) {
				_THIS.beforeGet(_PROPERTY);
				return _PROPERTY;
			} else {
				_THIS.beforeSet(value);
				_PROPERTY = value;
				_THIS.afterSet(value);
				return _THIS[name];
			}
		}
		_THIS[name].beforeSet = function (_value) {}
		_THIS[name].afterSet = function (_value) {}
		_THIS[name].beforeGet = function (_value) {}

	}
	return CLASS;
})();
var QMethod = (function (name) {
	'use strict';
	var CLASS = function QMethod(name, body) {
		var _METHOD = function () {
			body();
		};
		var _THIS = this;
		QProperty.call(_METHOD, ['Then'])
		_THIS[name] = function () {
			_THIS.before();
			_METHOD();
			_THIS.Then()();
		}
	}
	return CLASS;
})();
