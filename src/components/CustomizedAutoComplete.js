import { getAddressFromLocationId } from "src/utils/getAddressFromLocationId";

const { Autocomplete, TextField } = require("@mui/material");
const { useState, useRef, useCallback, useEffect } = require("react");
const { getPlaceSuggests } = require("src/utils/getPlaceSuggestions");

const CustomizedAutoComplete = ({ label, setLocation, location }) => {
  console.log(location);
  const timer = useRef();
  const [currentState, setCurrentState] = useState({
    loading: false,
    suggestions: [],
  });

  const inputRef = useRef();

  const handleSelectItem = async (e, value) => {
    console.log(value);
    if (value) {
      const detail = await getAddressFromLocationId(value.locationId);
      setLocation({
        description: value.label,
        coordinates: {
          lat: detail.latitude,
          lng: detail.longitude,
        },
      });
    }
  };

  const getSuggestions = useCallback(async (q) => {
    setCurrentState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const data = await getPlaceSuggests(q);

    let suggestions = [];
    data?.suggestions?.forEach((suggestion) => {
      suggestions.push({
        id: suggestion.locationId,
        label: `${suggestion.address.houseNumber ? suggestion.address.houseNumber + " " : ""}${
          suggestion.address.street ? suggestion.address.street + ", " : ""
        }${suggestion.address.district ? suggestion.address.district + ", " : ""}${
          suggestion.address.county ? suggestion.address.county + ", " : ""
        }${suggestion.address.country}`,
        locationId: suggestion.locationId,
      });
      console.log("this");
    });

    console.log(suggestions);

    setCurrentState(() => ({
      suggestions: [...suggestions],
      loading: false,
    }));
    console.log(suggestions);
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={currentState.suggestions}
      onChange={handleSelectItem}
      sx={{ width: "100%" }}
      onInputChange={(e) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          if (e.target.value == "") {
            return;
          }
          getSuggestions(e.target.value);
        }, 500);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      loading={currentState.loading}
    />
  );
};
export default CustomizedAutoComplete;
