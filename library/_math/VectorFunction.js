var VectorTransform = (function() {
	var CLASS = function VectorTransform() {
		var _THIS = this;

		QProperty.call(this, [ 'Functions' ]);
		_THIS.Functions({notDefined:function _abstract(o){}})
		
		QProperty.call(this, [ 'OnBeforeTransform' ]);
		_THIS.OnBeforeTransform(function _abstract(args){});
		QProperty.call(this, [ 'OnDuringTransform' ]);
		_THIS.OnDuringTransform(function _abstract(args){});
		QProperty.call(this, [ 'OnAfterTransform' ]);
		_THIS.OnAfterTransform(function _abstract(args){});
		
		this.transform = function _transform() {
			var fns = _THIS.Functions();
			var result = {};
			_THIS.OnBeforeTransform()(params);
			for ( var F in fns) {
				result[F] = fns[F](params[F])
				_THIS.OnDuringTransform()(result)
			}
			_THIS.OnAfterTransform()(result)
			return result;
		};
	};
	return CLASS;
})();