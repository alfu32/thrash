var GoogleMapInput=(function(){
	var MAPVIEW=function GoogleMapInput(target){
		Widget.call(this);
		var _THIS=this;
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(_raw_data){
			renderView((_raw_data+'').split('x'));
		}
		QProperty.call(this,['Markers']);
		this.Markers.afterSet=function(_markers_map){
			for(var i=0;i<_markers_map.length;i++){
				(function(markers,index){
					var markerData=markers[index];
					var coords=markerData.geocoord.split("x");
					var coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
					var newMarker = new google.maps.Marker({
						position:coordinates,
						map: map,
						title: markerData.text
					});
					if(target.value!=coords){
						newMarker.setIcon('image/car-yellow-top.gif');
					}else{
						newMarker.setIcon('image/car-red-top.gif');
					}
					google.maps.event.addListener(newMarker, 'click', function(event) {
						alert(markerData.text+"//"+markerData.date);
					});
				})(_markers_map,i);
			}
		}
		var v=MAKE.div({className:'GoogleMapInput'},{width:"546px",height:'380px'});
		var hint=MAKE.div({innerHTML:'double click to change position'},{fontSize:'12px',fontStyle:'italic'})
		var tt=MAKE.div({innerHTML:'double click to change position'},{fontSize:'12px',fontStyle:'italic'})
		this.View(MAKE.div({className:'Input'},{},[tt,v,hint]));
		var map;

		var geocoder = new google.maps.Geocoder();
		var onGetAddress=function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
			        if (results[1]) {
			          tt.innerHTML=(results[1].formatted_address);
			        }
			      } else {
			        tt.innerHTML=("Geocoder failed due to: " + status);
			      }
			    }
		var renderView=function renderview(coords){
			var coordinates;
			try{
			coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));

			geocoder.geocode({'latLng': coordinates}, onGetAddress);
			}catch(err){
				_THIS.View().style.color='#FFFFFF';
				_THIS.View().style.backgroundImage="url('/portail/image/static.gif')";
			 	//_THIS.View().innerHTML="<?php WriteLib("PARAMETRAGEAD.LABEL.NO_INTERNET_ACCESS")?>";
			 	return;
			}
			  var mapOptions = {
			    zoom: 12,
			    center: coordinates,
			    disableDoubleClickZoom: true,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			    ,panControl: true,
			    zoomControl: true,
			    mapTypeControl: false,
			    scaleControl: true,
			    streetViewControl: false,
			    overviewMapControl: true,
			    zoomControlOptions: {
			        style: google.maps.ZoomControlStyle.LARGE
			    }
			  };
			 //var markerData="<?php WriteLib("PARAMETRAGEAD.LABEL.OLD_POSITION")?>";
			 //var newMarkerData="<?php WriteLib("PARAMETRAGEAD.LABEL.NEW_POSITION")?>";
			 map = new google.maps.Map(v,mapOptions);
			 
			 var newMarker = new google.maps.Marker({
				    position:coordinates,
				    map: map//,
				    //title: '<?php WriteLib("PARAMETRAGEAD.MSG.CLICK_TO_ZOOM")?>'
				  });
			  newMarker.setIcon('image/car-green-top.gif');
			  var lastClick=(new Date()).getTime();
			 google.maps.event.addListener(map, 'dblclick', function(event) {
				 //var click=(new Date()).getTime();
				 //if((click-lastClick)<400){
				 	var lat = event.latLng.lat();
				    var lng = event.latLng.lng();
				    geocoder.geocode({'latLng': event.latLng}, onGetAddress);
				    newMarker.setPosition(event.latLng);
				    //console.log(newMarker);
				    target.value=(lat + "x" + lng);
					target.onchange(event);
					return false;
				 //}else{lastClick=click}
				  });
			 google.maps.event.addListener(map, 'zoom_changed', function(event) {
				 //console.log(map.getZoom());
				 var type=0;
				 var cz=map.getZoom();
				 	if(cz>11)type=1;
				 	if(cz>15)type=2;
				 	if(cz>19)type=3;
				 	switch(type){
				 	case 0:
				 		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
				 		break;
				 	case 1:
				 		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				 		break;
				 	case 2:
				 		map.setMapTypeId(google.maps.MapTypeId.HYBRID);
				 		break;
				 	case 3:
				 		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
				 		break;
				 	}
				 	
				  });
				  /*
			 google.maps.event.addListener(marker, 'click', function(event) {
				alert(markerData);
			 });
			 google.maps.event.addListener(newMarker, 'click', function(event) {
				alert(newMarkerData);
			 });*/
		}
	};
	WidgetStatic.call(MAPVIEW);
	return MAPVIEW;
})();