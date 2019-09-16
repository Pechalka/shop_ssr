import React from 'react';

const isServer = typeof window === 'undefined';

class Map extends React.Component {
	componentDidMount() {
		// if (isServer) return ;

		// var myMap = new ymaps.Map("map", {
	 //        center: [53.91, 27.6],
	 //        zoom: 12
	 //    });

		// myMap.geoObjects.add(new ymaps.Placemark(
		// 	[53.91, 27.61]       
		// ));

		// myMap.geoObjects.add(new ymaps.Placemark(
		// 	[53.91, 27.62]       
		// ));

		// myMap.geoObjects.add(new ymaps.Placemark(
		// 	[53.91, 27.63]       
		// ));
	}
	render() {
		return (
			<div>
			<div id="map" className="map">
			
			</div>
			<script src="https://api-maps.yandex.ru/2.1/?apikey=5d051c36-3521-451f-8945-4b544cc5b2d6&lang=ru_RU" type="text/javascript" />
			</div>
		)
	}
}


export default Map;