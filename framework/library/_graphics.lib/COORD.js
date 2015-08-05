COORD = {
	Lam72toWgs84 : function _Lam72toWgs84(X, Y) {

		// BIDOUILLE A PARTIE DES SOURCES :
		// http://www.xs4all.nl/~estevenh/1/index.html
		var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
		var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z;
		var dX,dY,lamE,lamN,UtmN,UtmE,zone;
		
		A = -71.3747;
		B = 1858.8407;
		C = -5.4504;
		D = -16.9681;
		E = 4.0783;
		F = 0.2193;

		if (X < 1000)
			X *= 1000;
		if (Y < 1000)
			Y *= 1000;

		x = X / 100000;
		y = Y / 100000;
		P = x;
		Q = y;
		R = P * x - Q * y;
		S = P * y + Q * x;
		T = R * x - S * y;
		U = R * y + S * x;

		dX = A * P - B * Q + C * R - D * S + E * T - F * U;
		dY = B * P + A * Q + D * R + C * S + F * T + E * U;

		lamE = 449681.702 + X + dX;
		lamN = 5460505.326 + Y + dY;

		var UtmN = lamN;
		var UtmE = lamE;
		var zone = 31;

		// UTM ------ >>>>>> RD
		var E01,E02,N01,N02,A1,A2,B1,B2,C1,C2,D1,D2,E1,E2,F1,F2,G1,G2,H1,H2
		
		E01 = 663395.607;
		E02 = 252957.480;
		N01 = 5781194.380;
		N02 = 5784656.250;
		A1 = 56.619;
		A2 = 168.607;
		B1 = 3290.362;
		B2 = -4977.456;
		C1 = 20.184;
		C2 = -30.103;
		D1 = -0.861;
		D2 = -1.686;
		E1 = 2.082;
		E2 = 2.065;
		F1 = -0.023;
		F2 = 0.149;
		G1 = 0.070;
		G2 = 0.078;
		H1 = -0.025;
		H2 = -0.001;

		if (zone == 31) {
			E = UtmE;
			N = UtmN;
			x = (E - E01) / 100000;
			y = (N - N01) / 100000;
		}

		if (zone == 32) {
			E = UtmE.value;
			N = obj.UtmN.value;
			x = (E - E02) / 100000;
			y = (N - N02) / 100000;
		}

		P = x;
		Q = y;
		R = P * x - Q * y;
		S = P * y + Q * x;
		T = R * x - S * y;
		U = R * y + S * x;
		V = T * x - U * y;
		W = T * y + U * x;

		if (zone == 31) {
			dX = A1 * P - B1 * Q + C1 * R - D1 * S + E1 * T - F1 * U + G1 * V
					- H1 * W;
			dY = B1 * P + A1 * Q + D1 * R + C1 * S + F1 * T + E1 * U + H1 * V
					+ G1 * W;
			X = E - E01 + 155000 - dX;
			Y = N - N01 + 463000 - dY;
		}

		if (zone == 32) {
			dX = A2 * P - B2 * Q + C2 * R - D2 * S + E2 * T - F2 * U + G2 * V
					- H2 * W;
			dY = B2 * P + A2 * Q + D2 * R + C2 * S + F2 * T + E2 * U + H2 * V
					+ G2 * W;
			X = E - E02 + 155000 - dX;
			Y = N - N02 + 463000 - dY;
		}

		X = Math.round(100 * X) / 100;
		Y = Math.round(100 * Y) / 100;

		// RD ---->>> LAT LONG
		
		var x0,y0,f0,l0,a01,b10,a20,b11,a02,b12,a21,b30,a03,b31,a22,b13,a40,b32,a23,b14,a41,b50,a04,b33,a42,b51,a24,b15;
		
		x0 = 155000.000;
		y0 = 463000.000;

		f0 = 52.156160556;
		l0 = 5.387638889;
		
		
		
		a01 = 3236.0331637;
		b10 = 5261.3028966;
		a20 = -32.5915821;
		b11 = 105.9780241;
		a02 = -0.2472814;
		b12 = 2.4576469;
		a21 = -0.8501341;
		b30 = -0.8192156;
		a03 = -0.0655238;
		b31 = -0.0560092;
		a22 = -0.0171137;
		b13 = 0.0560089;
		a40 = 0.0052771;
		b32 = -0.0025614;
		a23 = -0.0003859;
		b14 = 0.0012770;
		a41 = 0.0003314;
		b50 = 0.0002574;
		a04 = 0.0000371;
		b33 = -0.0000973;
		a42 = 0.0000143;
		b51 = 0.0000293;
		a24 = -0.0000090;
		b15 = 0.0000291;
		
		var dx,dy,df,dl,f,f0,dl,l;
		
		
			dx = (X - x0) * Math.pow(10, -5);
			dy = (Y - y0) * Math.pow(10, -5);

			df = a01 * dy + a20 * Math.pow(dx, 2) + a02 * Math.pow(dy, 2) + a21
					* Math.pow(dx, 2) * dy + a03 * Math.pow(dy, 3)
			df += a40 * Math.pow(dx, 4) + a22 * Math.pow(dx, 2) * Math.pow(dy, 2) + a04
					* Math.pow(dy, 4) + a41 * Math.pow(dx, 4) * dy
			df += a23 * Math.pow(dx, 2) * Math.pow(dy, 3) + a42 * Math.pow(dx, 4) * Math.pow(dy, 2)
					+ a24 * Math.pow(dx, 2) * Math.pow(dy, 4);
			f = f0 + df / 3600;

			dl = b10 * dx + b11 * dx * dy + b30 * Math.pow(dx, 3) + b12 * dx
					* Math.pow(dy, 2) + b31 * Math.pow(dx, 3) * dy;
			dl += b13 * dx * Math.pow(dy, 3) + b50 * Math.pow(dx, 5) + b32 * Math.pow(dx, 3)
					* Math.pow(dy, 2) + b14 * dx * Math.pow(dy, 4);
			dl += b51 * Math.pow(dx, 5) * dy + b33 * Math.pow(dx, 3) * Math.pow(dy, 3) + b15
					* dx * Math.pow(dy, 5);
			l = l0 + dl / 3600;
		
		
		var fWgs,lWgs
		fWgs = f + (-96.862 - 11.714 * (f - 52) - 0.125 * (l - 5)) / 100000;
		lWgs = l + (-37.902 + 0.329 * (f - 52) - 14.667 * (l - 5)) / 100000;

		fWgs = Math.round(fWgs * 10000000) / 10000000;
		lWgs = Math.round(lWgs * 10000000) / 10000000;

		/*alert(fWgs);
		alert(lWgs);*/
		return {lat:fWgs,lng:lWgs}
	}
	,DegTodecDeg:function transformTo_WGS84(MyCoord){
		var deg;
		var Min;
		var dec;
		MyCoord=MyCoord+'';
		if((parseInt(MyCoord)+'').length > 3){
			deg = MyCoord.substring(0,2)*1;
			Min = Math.floor(MyCoord.substring(2));
			dec = MyCoord.substring(2) - Min;
		}else{
			deg = MyCoord.substring(0,1)*1;
			Min = Math.floor(MyCoord.substring(1));
			dec = MyCoord.substring(1) - Min;
		}
		MyCoord = deg + ((Min+ dec)/60 )
		return MyCoord;
	}
}