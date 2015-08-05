Measure=(function(){
	var PROTO=function Measure() {
		Base.call(this,['Measure']);
		var _this = this;
		var x = [], dx = [], ddx = [], t = [], dt = [];
		this.add = function(val) {
			t[t.length] = new Date().getTime();
			x[x.length] = val;
			if (t.length > 1) {
				dt[dt.length] = t[t.length - 1] - t[t.length - 2];
			}
			if (x.length > 1) {
				dx[dx.length] = x[x.length - 1] - x[x.length - 2];
			}
			if (dx.length > 1) {
				ddx[ddx.length] = dx[dx.length - 1] - dx[dx.length - 2];
			}
		}
		this.clear=function(){
			x = [], dx = [], ddx = [], t = [], dt = [];
		}
		this.getPosition = function measure_position() {
			return x[x.length - 1];
		}
		this.getSpeed = function measure_speed() {
			if (dt.length > 0) {
				return dx[dx.length - 1] / dt[dt.length - 1];
			} else {
				return 0;
			}
		}
		this.getAcceleration = function measure_acceleration() {
			if (dt.length > 1) {
				return ddx[ddx.length - 1]
						/ (dt[dt.length - 1] - dt[dt.length - 2]);
			} else {
				return 0;
			}
		}
		this.getXTotal = function measure_val_average() {
			if (t.length > 1) {
				return (x[x.length - 1] - x[0]);
			} else {
				return 0;
			}
		}
		this.getTTotal = function measure_val_average() {
			if (t.length > 1) {
				return (t[t.length - 1] - t[0]);
			} else {
				return 0;
			}
		}
		this.getSpeedAverage = function measure_speed_average() {
			if (t.length > 1) {
				return (x[x.length - 1] - x[0]) / (t[t.length - 1] - t[0]);
			} else {
				return 0;
			}
		}
		this.getAccelerationAverage = function measure_acceleration_average() {
			if (dt.length > 1) {
				return (dx[dx.length - 1] - dx[0]) / (dt[dt.length - 1] - dt[0]);
			} else {
				return 0;
			}
		}
	}
	return PROTO;
})()