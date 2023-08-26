import React, { useState, useEffect, useCallback } from "react";
import PlacesAutocomplete, { getLatLng } from "react-places-autocomplete";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { geocodeByPlaceId } from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0");
Geocode.enableDebug();

const MapPayment = ({ onClickMapsValue, onClickCoordinateValue, clickCoordinate }) => {
  const [address, setAddress] = useState("");
  const [animation, setAnimation] = useState(2);
  let [coordinates, setCoordinates] = useState({ lat: 39.627, lng: 66.975 });

  useEffect(() => {
    // console.log(address);
  }, [address]);

  const handleSelect = async (value, placeId, suggestion) => {
    // const results = await geocodeByAddress(value);
    const results = await geocodeByPlaceId(placeId);
    const latLng = await getLatLng(results[0]);
    onClickMapsValue(value);
    // onClickCoordinateValue(latLng);
    setAddress(value);
    onClickCoordinateValue(latLng)
    setCoordinates(latLng);
  };
  const [map, setMap] = useState(null);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "100%",
    marginTop: "1rem",
    height: "360px",
  };
  const apikey = "AIzaSyAoud-_7sLGaEDVV5s8QvtTeGzI9dunLqU";

  return (
    <div>
      <PlacesAutocomplete
        bounds={coordinates}
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <div className="input-autocomplete">
                <TextField
                  id="outlined-basic"
                  label="Найти адрес на карте"
                  className="inputProps w-full"
                  variant="outlined"
                  {...getInputProps({ placeholder: "Введите адрес" })}
                />
              </div>
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions
                  .filter(
                    (sugg) =>
                      sugg?.formattedSuggestion?.secondaryText?.includes(
                        "Уз"
                      ) ||
                      sugg?.formattedSuggestion?.secondaryText?.includes("Uzb")
                  )
                  .map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    return (
                      <>
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
      <LoadScriptNext googleMapsApiKey={apikey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={13}
          center={coordinates}
          onUnmount={onUnmount}
          ref={setMap}
          onClick={(e) => {
            setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            clickCoordinate(coordinates);
            setAnimation(animation === 1 ? 2 : 1)
          }}
        >
          {coordinates && (
            <Marker
              animation={animation}
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
            />
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default MapPayment;
