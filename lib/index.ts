import { IControl, Map as MapboxMap } from "mapbox-gl";

export default class MapboxPitchToggleControl implements IControl{
    
    private _container: HTMLElement;
    private _map?: MapboxMap;
    private _btn: HTMLButtonElement;

    private _bearing: number | null;
    private _pitch: number;
    private _minpitchzoom: number | null;

    /**
     * Pitch Toggle Control
     * @param {Object} options
     * @param {number} options.pitch - Pitch for 3D mode. Default it 70.
     * @param {number} options.bearing - Bearing for 3d mode. Default is NULL.
     * @param {number} options.minpitchzoom - Minimum zoom level for 3D mode, so you don't have flying polygons gouging out eyeballs. Default it null (i.e. stays at same zoom).
     */
    constructor({pitch = 70, bearing = null, minpitchzoom = null,}) {
        this._bearing = bearing;
        this._pitch = pitch;
        this._minpitchzoom = minpitchzoom;
    }

    onAdd(map: MapboxMap): HTMLElement {
        this._map = map;
        let _this = this; 

        this._btn = document.createElement('button');
        this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
        this._btn.type = 'button';
        this._btn['aria-label'] = 'Toggle Pitch';
        this._btn.onclick = function() { 
            if (map.getPitch() === 0) {
                let options = {pitch: _this._pitch, bearing: 0, zoom: map.getZoom()};
                if (!_this._bearing){
                    options.bearing = map.getBearing();
                }else{
                    options.bearing = _this._bearing;
                }
                if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                    options.zoom = _this._minpitchzoom;
                }
                map.easeTo(options);
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
            } else {
                map.easeTo({pitch: 0, bearing: map.getBearing()});
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
            } 
        };

        this._map.on('pitchend', function() {
            if (!_this._map){return};
            if (_this._map.getPitch() === 0) {
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
            }else{
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
            }
        });
        

        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.appendChild(this._btn);

        return this._container;
    }

    onRemove() {
        if (!this._container || !this._container.parentNode || !this._map) {
            return;
        }
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

}