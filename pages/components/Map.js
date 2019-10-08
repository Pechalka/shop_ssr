import React from 'react';

class Map extends React.Component {
  componentDidMount() {
    // TODO: map init logic
  }

  render() {
    return (
      <div>
        <div id="map" className="map" />
        <script src="https://api-maps.yandex.ru/2.1/?apikey=5d051c36-3521-451f-8945-4b544cc5b2d6&lang=ru_RU" type="text/javascript" />
      </div>
    );
  }
}

export default Map;
