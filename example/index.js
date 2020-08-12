import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxPitchToggleControl from '../dist/index';
import '../css/styles.css';

$(function(){
    const map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/streets-v11',
        style:'https://narwassco.github.io/mapbox-stylefiles/unvt/style.json',
        center: [35.87063, -1.08551],
        zoom: 12,
        hash:true,
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new MapboxPitchToggleControl({
        pitch: 70,
        bearing: null,
        minpitchzoom: null,
    }), 'top-right');
})