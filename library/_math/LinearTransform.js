var LinearTransform = (function() {
	var CLASS = function LinearTransform() {
		var _THIS = this;
		
		this.newPublicProperty = {};
		QProperty.call(this, [ 'Matrix' ]);
		_THIS.Matrix([[1]]);
		QProperty.call(this, [ 'OnBeforeTransform' ]);
		_THIS.OnBeforeTransform(function _abstract(args){});
		QProperty.call(this, [ 'OnAfterTransform' ]);
		_THIS.OnAfterTransform(function _abstract(args){});
		
		this.transform = function _transform() {
			var m = _THIS.Matrix()
			var result = params;
			_THIS.OnBeforeTransform()(params);
			result = m.multiply(result);
			_THIS.OnAfterTransform()(result)
			return result;
		};
	};
	return CLASS;
})();