var SSE = (function() {
	var CLASS = function SSE() {
		var _S_S_E = this;
		var source;
		
		this.attachEventListener=function(_callback){
			source.addEventListener(_callback.name,_callback);
			return this;
		}
		
		QProperty.call(this, [ 'Server' ]);
		this.Server.afterSet = function(_server) {
			source = new EventSource(_server)
		};
		
		QProperty.call(this, [ 'OnMessage' ]);
		this.OnMessage.beforeSet = function(_callback) {
			source.removeEventListener('message', _S_S_E.OnMessage());
		};
		this.OnMessage.afterSet = function(_callback) {
			source.addEventListener('message', _callback, false);
		};
		
		QProperty.call(this, [ 'OnOpen' ]);
		this.OnOpen.beforeGet = function(_callback) {
		};
		this.OnOpen.beforeSet = function(_callback) {
			source.removeEventListener('open', _S_S_E.OnOpen());
		};
		this.OnOpen.afterSet = function(_callback) {
			source.addEventListener('open', _callback, false);
		};
		
		QProperty.call(this, [ 'OnError' ]);
		this.OnError.beforeSet = function(_callback) {
			source.removeEventListener('error', _S_S_E.OnError());
		};
		this.OnError.afterSet = function(_callback) {
			source.addEventListener('error', _callback, false);
		};
	};
	return CLASS;
})();