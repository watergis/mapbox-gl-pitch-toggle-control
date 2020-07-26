# mapbox-gl-pitch-toggle-control
![](https://github.com/watergis/mapbox-gl-pitch-toggle-control/workflows/Node.js%20Package/badge.svg)
![GitHub](https://img.shields.io/github/license/watergis/mapbox-gl-pitch-toggle-control)

Simple pitch on/off button in Mapbox GL JS style. 

I forked [tobinbradley/mapbox-gl-pitch-toggle-control](https://github.com/tobinbradley/mapbox-gl-pitch-toggle-control) repository, then changed it to typescript and registered package. I also did some changes for optional parameters.

## Installation:

```bash
npm i @watergis/mapbox-gl-pitch-toggle-control --save
```
## Demo:

![demo](https://i.imgur.com/iW7CQ23.gif)

See [demo](https://watergis.github.io/mapbox-gl-pitch-toggle-control/).

## Usage:
```ts
import MapboxPitchToggleControl from '@watergis/mapbox-gl-pitch-toggle-control';
import '@watergis/mapbox-gl-pitch-toggle-control/css/styles.css';
map.addControl(new PitchToggle({minpitchzoom: 11})); 
```

Options (optional):

*   *bearing*: Bearing for 3d mode. Default is NULL.
*   *pitch*: Pitch for 3D mode. Default it 70.
*   *minpitchzoom*: Minimum zoom level for 3D mode, so you don't have flying polygons gouging out eyeballs. Default it null (i.e. stays at same zoom).

Note that the control is as an ES6 class, so running it through something like Babel is necessary.

## Test:

```
npm run build
npm start
```
