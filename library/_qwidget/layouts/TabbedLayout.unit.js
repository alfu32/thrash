var HTabsLayout = (function() {
	var CLASS = function HTabsLayout(){
		var _THIS = this;
		Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){})
		var view;
		_THIS.Children.afterSet=function(_children){
			renderView();
		}
		var renderView = function() {
		//	CLASS.clearView(_THIS.View());
			var seq=new SequenceLayout()
				.OnShowChild(function(children,name,visibility){
					_THIS.OnShowChild()(children,name,visibility);
				})
				.Children(_THIS.Children());
			seq.View().style.borderCollapse='collapse';
			seq.View().style.backgroundColor='#EEE';
			var tc=new HTabController(seq).renderView()
			var l=new VLayout().Children([
			    tc,seq
			])
			tc.Parent().align='left';
			l.View().style.borderCollapse='collapse';
			_THIS.View(MAKE.div({align:'center'},{},[l.View()]));
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS)
	return CLASS;
})();
var VTabsLayout = (function() {
	var CLASS = function HTabsLayout(){
		var _THIS = this;
		Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){})
		var view;
		_THIS.Children.afterSet=function(_children){
			renderView();
		}
		var renderView = function() {
		//	CLASS.clearView(_THIS.View());
			var seq=new SequenceLayout()
				.OnShowChild(function(children,name,visibility){
					_THIS.OnShowChild()(children,name,visibility);
				})
				.Children(_THIS.Children());
			seq.View().style.borderCollapse='collapse';
			seq.View().style.backgroundColor='#EEE';
			var ti=new Widget();
			ti.View(MAKE.h2({innerHTML:'Detail'}))
			var tc=new VTabController(seq)
				/*.OnTabShow(
					function(seq,tabName){
						ti.View().innerHTML=tabName
					})*/.renderView()
			var l=new HLayout().Children([
			    tc,new VLayout().Children([ti,seq])
			]).VAlign('top')
			tc.Parent().align='left';
			SET.css(tc.Parent(),{maxWidth:'320px'})
			SET.css(l.View(),{borderCollapse:'collapse',width:'100%'})
			_THIS.View(MAKE.div({align:'center'},{},[l.View()]));
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS)
	return CLASS;
})();