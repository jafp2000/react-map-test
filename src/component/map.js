import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';

const ARC = {
    lat: 48.873947,
    lng: 2.295038
  };
  
const TOWER= {
    lat: 48.858608,
    lng: 2.294471
};

class Map extends Component {
    componentDidMount(){
        loadGoogleMapsAPI( this.props.config ).then( googleMaps => {
            this.map = new googleMaps.Map( this.refs.map, {
                center: this.props.initialPosition,
                zoom: 16
            } );
          }).catch( err => {
            console.warning( 'Something went wrong loading the map', err );
          });
    }

    moveToArc(){
        this.map.panTo(ARC);
    }

    moveToTower(){
        this.map.panTo(TOWER);
    }

    render() {
        return (
            <div>
                <h1>mapa</h1>
                <button onClick={this.moveToArc.bind(this)}>To Arc</button>
                <button onClick={this.moveToTower.bind(this)}>To Tower</button>                
                <div ref="map" style={{width: 500, height: 500, border: '1px solid black'}}>
                    loading map...
                </div>
            </div>
        )
    }
}

export default Map;