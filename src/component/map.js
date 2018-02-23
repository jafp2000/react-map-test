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

const content = '<h1>Hola mundo</h1>';

class Map extends Component {
    constructor(){
        super();
        this.state = {
            lat: 0,
            lng: 0,
            markers: markers,
            address: ''
        }
        this.setLatLng = this.setLatLng.bind(this);
        this.search = this.search.bind(this);
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
            var infowindow = new googleMaps.InfoWindow({
                content: content
            });
            this.state.markers.map(m => {
                var marker = new googleMaps.Marker({
                    map: this.map,
                    icon: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
                    position: m
                })
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                });
                return marker;
            });
          }).catch( err => {
            console.error(err);
          });
    }

    setLatLng(lat, lng){
        this.setState({
            lat: lat,
            lng: lng
        });
    }

    moveToArc(){
        this.map.panTo(ARC);
    }

    moveToTower(){
        this.map.panTo(TOWER);
    }

    search(){
        if(this.state.lat !== 0 || this.state.lng !== 0){
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&language=es&key=${this.props.config.key}`;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results)
                this.setState({
                    address: data.results[0].formatted_address
                })
            })
        }else{
            console.log("nada")
        }
    }

    render() {
        return (
            <div>
                <h1>mapa</h1>
                <button onClick={this.moveToArc.bind(this)}>To Arc</button>
                <button onClick={this.moveToTower.bind(this)}>To Tower</button>                
                <p>Lat: {this.state.lat} - Lng: {this.state.lng}</p>
                <button onClick={this.search}>Buscar</button>
                <h5>{this.state.address}</h5>
                <div ref="map" style={{width: 500, height: 500, border: '1px solid black'}}>
                    loading map...
                </div>
            </div>
        )
    }
}

export default Map;