var MultipageLayout = (function() {
	var CLASS = function MultipageLayout(){
    	Base.call(this,['MultipageLayout']);
		var _THIS = this;
		Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){
			//console.log('MultipageLayout',children,name,visibility
		})
		var view;
		_THIS.Children.afterSet=function(_children){
			renderView();
		}
		
		var _sequence,sequenceController;
		QProperty.call(this,['IteratorType'])
		_THIS.IteratorType(CLASS.ITERATOR_TYPES);
		_THIS.IteratorType.afterSet=function(itt){
			renderView()
		}
		var renderView = function() {
		//	CLASS.clearView(_THIS.View());
			_sequence=new SequenceLayout()
				.OnShowChild(function(children,name,visibility){
					_THIS.OnShowChild()(children,name,visibility,sequenceController);
				})
				.Children(_THIS.Children());
			_sequence.View().style.borderCollapse='collapse';
			_sequence.View().style.backgroundColor='#EEE';
			sequenceController=new SequenceController(_sequence).renderView()
			var l=new VLayout().Children([
			    sequenceController,_sequence
			])
			
			sequenceController.Parent().align='left';
			l.View().style.borderCollapse='collapse';
			l.View().style.width='100%';
			_THIS.View(MAKE.div({align:'center'},{},[l.View()]));
			return _THIS;
		}
		_THIS.getSequenceController=function(){
			return sequenceController;
		}
	}
	WidgetStatic.call(CLASS)
	CLASS.ITERATOR_TYPES={'Iterator':Iterator,'CircularIterator':CircularIterator}
	return CLASS;
})();