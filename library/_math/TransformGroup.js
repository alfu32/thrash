var TransformGroup = (function() {
	var CLASS = function TransformGroup() {
		var _THIS = this;

		QProperty.call(this, [ 'Group' ]);
		_THIS.Transform([]);
		this.Group.afterSet = function(byRefvalue) {
			generateDomain()
		};
		QProperty.call(this, [ 'OnDuringTransform' ]);
		
		this.transform = function _transform() {
			var tr = _THIS.Transforms();
			var result = params;
			for ( var i = 0; i < tr.length; i++) {
				result = tr[i].transform(result)
				if (_THIS.OnDuringTransform()(result))
					break;
			}
			return result;
		};
		
		this.generateDomain = function _generateDomain() {
			
		};
	};
	return CLASS;
})();