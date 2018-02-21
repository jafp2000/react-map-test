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

const markers = [
    {
        lat: 48.858608,
        lng: 2.294471 
    },
    {
        lat: 48.873947,
        lng: 2.295038
    },
    {
        lat: 48.85909366998766,
        lng: 2.2909248442467742
    }
]

class Map extends Component {
    constructor(){
        super();
        this.state = {
            lat: 0,
            lng: 0,
            markers: markers
        }
        this.setLatLng = this.setLatLng.bind(this);
    }

    componentDidMount(){
        loadGoogleMapsAPI( this.props.config ).then( googleMaps => {
            this.map = new googleMaps.Map( this.refs.map, {
                center: this.props.initialPosition,
                zoom: 16
            } );
            this.map.addListener('click', (event) => 
                this.setLatLng(event.latLng.lat(), event.latLng.lng())
            );
            this.state.markers.map(marker => 
                googleMaps.Marker({
                    map: this.map,
                    position: marker
                })
            )
          }).catch( err => {
            console.warning( 'Something went wrong loading the map', err );
          });
    }

    setLatLng(lat, lng){
        this.setState({
            lat: lat,
            lng: lng
        })
        console.log(this.state);
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
                <p>Lat: {this.state.lat} - Lng: {this.state.lng}</p>
                <div ref="map" style={{width: 500, height: 500, border: '1px solid black'}}>
                    loading map...
                </div>
            </div>
        )
    }
}

export default Map;