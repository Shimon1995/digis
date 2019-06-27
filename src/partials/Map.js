/* globals google */
import React from "react";
import _ from "lodash";
import { withProps, lifecycle } from "recompose";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import Button from "./MapControl";
import btnStyle from "./BtnStyle";
import uniq from "uniqid";
import location from "./Geolocation";
import { whileStatement } from "@babel/types";

const Map = props => (
  <GoogleMap
    ref={props.onMapMounted}
    zoom={props.zoom}
    center={location}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.declareMarkers}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Box"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          background: "white",
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) => (
      <Marker key={index} position={marker.position} />
    ))}
    <Button position={google.maps.ControlPosition.TOP_RIGHT}>
      <div style={btnStyle}>
        <div onClick={props.zoomIn}>+</div>
        <div onClick={props.zoomOut}>-</div>
      </div>
    </Button>
    {props.markersProp.map(marker => (
      <Marker key={uniq()} position={marker} />
    ))}
    <InfoWindow position={props.center}>
      <div>You're here.</div>
    </InfoWindow>
    <Button position={google.maps.ControlPosition.BOTTOM_CENTER}>
      <div style={btnStyle} onClick={props.saveMarkers}>
        SAVE
      </div>
    </Button>
    <Button position={google.maps.ControlPosition.BOTTOM_CENTER}>
      <div style={btnStyle} onClick={props.showMarkers}>
        SHOW
      </div>
    </Button>
  </GoogleMap>
);

const MapWithASearchBox = withProps({
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100vh` }} />,
  mapElement: <div style={{ height: `100%` }} />
})(
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        markersObj: [],
        markersProp: [],
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624
        },
        zoom: 15,
        markers: [],
        declareMarkers: event => {
          this.state.markersObj.push({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          });
          if (this.state.markersObj.length > 5) {
            this.state.markersObj.shift();
          }
        },
        saveMarkers: () => {
          this.setState.markersProp = [];
          for (const mark of this.state.markersObj) {
            this.state.markersProp.push(mark);
          }
        },
        showMarkers: () => {
          this.setState({ markers: this.state.markers });
        },
        zoomIn: () => {
          this.setState({ zoom: this.state.zoom + 1 });
        },
        zoomOut: () => {
          this.setState({ zoom: this.state.zoom - 1 });
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
        }
      });
    }
  })(withScriptjs(withGoogleMap(Map)))
);

export default MapWithASearchBox;
