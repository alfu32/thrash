var GoogleMap = (function () {
    var MAPVIEW = function GoogleMap() {
        var _THIS = this;
        Widget.call(this);

        var geocoder = new google.maps.Geocoder();

        var v, map;

        this.View(v = MAKE.div({className: 'GoogleMapInput'}, {height: '580px'}));

        var earthTypeOptions = {
            maxZoom: 13,
            minZoom: 0,
            zoom: 8,
            center: new google.maps.LatLng(50, 4),
            disableDoubleClickZoom: true,
            mapTypeId: google.maps.MapTypeId.TERRAIN, panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            zoomControlOptions: {style: google.maps.ZoomControlStyle.LARGE}
        };

        this.Parent.afterSet = function (parent) {
            parent.appendChild(_THIS.View());
            _constructor(earthTypeOptions);
        }

        QProperty.call(this, ['init']);
        this.init(function (map, _this) {
        })
        QProperty.call(this, ['Center']);
        this.Center.afterSet = function (point) {
            try {
                map.setCenter(new google.maps.LatLng(point.x, point.y));
            } catch (err) {
            }
        }

        QProperty.call(this, ['Size']);
        this.Size.afterSet = function (size) {
            SET.css(v, size);
            try {
                google.maps.event.trigger(map, "resize");
            } catch (err) {
            }
        }

        QProperty.call(this, ['OnMarkerClick']);
        this.OnMarkerClick(function (map, data, index, marker) {
        })
        QProperty.call(this, ['MarkerAtIndex']);
        this.MarkerAtIndex(function (_map, _data, _index) {
            var newMarker = new google.maps.Marker({
                position: new google.maps.LatLng(50, 4),
                map: _map,
                title: 'Marker'
            });
            google.maps.event.addListener(newMarker, 'click', function (event) {
                _THIS.OnMarkerClick()(_map, _data, _index, newMarker);
            });
            newMarker.setIcon('https://cdn1.iconfinder.com/data/icons/30_Free_Black_ToolBar_Icons/40/Black_MapDrop.png');
            return newMarker;
        });
        QProperty.call(this, ['OnViewportChanged']);
        this.OnViewportChanged(function (_map, _this) {
            var lat0 = _map.getBounds().getNorthEast().lat();
            var lng0 = _map.getBounds().getNorthEast().lng();
            var lat1 = _map.getBounds().getSouthWest().lat();
            var lng1 = _map.getBounds().getSouthWest().lng();
        })
        var markers = [];
        QProperty.call(this, ['Markers']);
        this.Markers.beforeSet = function (_markers_map) {
        }
        this.Markers.afterSet = function (_markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
                //console.log(markers[i]);
            }
            markers.length = 0;
            //console.log(_markers);
            for (var i = 0; i < _markers.length; i++) {
                markers[i] = _THIS.MarkerAtIndex()(map, _markers, i);
            }
        }
        function _constructor(options) {
            map = new google.maps.Map(v, options);
            _THIS.Center.afterSet(_THIS.Center());
            _THIS.Markers.afterSet(_THIS.Markers());
            _THIS.Size.afterSet(_THIS.Size());
            _THIS.OnViewportChanged()(map, _THIS);
            var styles = [
                {
						 "featureType": "water",
						 "stylers": [
							{ "visibility": "on" },
							{ "hue": "#00ff22" },
							{ "color": "#909f80" }
						 ]
					  },{
						 "featureType": "landscape.natural.landcover",
						 "stylers": [
							{ "hue": "#ff9100" }
						 ]
					  },{
						 "featureType": "landscape.natural.landcover",
						 "elementType": "geometry.fill",
						 "stylers": [
							{ "weight": 1.4 },
							{ "hue": "#ffdd00" },
							{ "gamma": 0.39 },
							{ "lightness": -11 },
							{ "saturation": 23 }
						 ]
					  },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "administrative.country",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "administrative.land_parcel",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "administrative.locality",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "administrative.locality",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "administrative.neighborhood",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road.arterial",
                    elementType: "all",

                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road.local",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [
                        { visibility: "off" },
                        { hue: "#00ffe6" },
                        { saturation: -20 }
                    ]
                },
                {
                    featureType: "all",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ];

            map.setOptions({styles: styles});

            google.maps.event.addListener(map, 'zoom_changed', function (event) {
                try {
                    _THIS.OnViewportChanged()(map, _THIS);
                } catch (err) {
                }
            });
            google.maps.event.addListener(map, "center_changed", function (event) {
                viewportChanged = true;
            });
            var viewportChanged = false;
            google.maps.event.addListener(map, "mouseup", function () {
                if (viewportChanged) {
                    try {
                        _THIS.OnViewportChanged()(map, _THIS);
                    } catch (err) {
                    }
                    viewportChanged = false;
                }
            });

            google.maps.event.addListener(map, "mousedown", function () {

            });
            _THIS.init()(map, _THIS);
        }

        this.getMap = function () {
            return map;
        }
    };
    WidgetStatic.call(MAPVIEW);
    return MAPVIEW;
})();


/* example
 var ___MAP___=new GoogleMap()
 .Center({x:50.88,y:4.365})
 .OnViewportChanged(function(_map,_this){
 try{
 var lat0 = _map.getBounds().getNorthEast().lat();
 var lng0 = _map.getBounds().getNorthEast().lng();
 var lat1 = _map.getBounds().getSouthWest().lat();
 var lng1 = _map.getBounds().getSouthWest().lng();
 }catch(err){
 console.log(err);
 }
 })
 .OnMarkerClick(function(_map,_data,_index,_marker){
 var row=_data[_index];
 })
 .MarkerAtIndex(function(_map,_data,_index){
 var dat=_data[_index];
 var _x_=30,_y_=30;
 var newMarker = new google.maps.Circle({
 center:new google.maps.LatLng(_x_,_y_),
 strokeColor: '',
 strokeOpacity:.5,
 strokeWeight:1,
 fillColor: '',
 fillOpacity: 0.1,
 radius: 30000,
 map:_map
 });
 google.maps.event.addListener(newMarker, 'click', function(event) {
 _map.OnMarkerClick()(_map,_data,_index,newMarker);
 });
 return newMarker;
 })
 .Markers([])//REQ_TABLE({cmd:'get_map',te:-50,rri:-50,b:50,le:50})
 //.Parent(document.getElementById('map_container'));
 */
