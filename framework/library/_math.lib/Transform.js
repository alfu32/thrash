var Transform = (function() {
	var CLASS = function Transform() {
		Base.call(this,['Transform']);
		var _THIS = this;
		QProperty.call(this, [ 'Transform' ]);
		_THIS.Transform(function _abstract(args){});
		
		QProperty.call(this, [ 'OnBeforeTransform' ]);
		_THIS.OnBeforeTransform(function _abstract(args){});
		QProperty.call(this, [ 'OnAfterTransform' ]);
		_THIS.OnAfterTransform(function _abstract(args){});

		this.transform = function _transform() {
			_THIS.OnBeforeTransform()(params);
			var result = _THIS.Transform()(params);
			_THIS.OnAfterTransform()(result)
			return result;
		};
	};
	return CLASS;
})();