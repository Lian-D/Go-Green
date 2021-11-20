import './App.css';
import React  from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";


//const WrappedMap = withScriptjs(withGoogleMap((props) => (<GoogleMap defaultZoom={10} defaultCenter={{lat: 43, lng: -79}}/>)));

function Map(){
    return (
        <GoogleMap
        defaultZoom={10}
        defaultCenter={{lat: 49, lng: -123}}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {

    return (
       /* <div>
            Origin: <input type="text" />
            Destination: <input type="text"/>
            Within Time: <input type="text"/>
            <button>Search</button>
            <div style={{width: '100vw', height: '100vh'}}>
                <WrappedMap
                            googleMapURL = {`https://www.google.com/maps/@?api=${key_here}&map_action=map`}
                            loadingElement= {<div style={{height: "100%"}} />}
                            containerElement = {<div style={{height: "100%"}} />}
                            mapElement = {<div style={{height: "100%"}} />}
                />
            </div>

        </div>*/
        <div style={{width: '100vw', height: '100vh'}}>
            <WrappedMap
                googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
                loadingElement= {<div style={{height: "100%"}} />}
                containerElement = {<div style={{height: "100%"}} />}
                mapElement = {<div style={{height: "100%"}} />}
            />
        </div>
    )
}



