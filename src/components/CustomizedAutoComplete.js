import { letterSpacing } from "@mui/system";
import { getAddressFromLocationId } from "src/utils/getAddressFromLocationId";

const { Autocomplete, TextField } = require("@mui/material");
const { useState, useRef, useCallback, useEffect } = require("react");
const { getPlaceSuggests } = require("src/utils/getPlaceSuggestions");

const CustomizedAutoComplete = ({ label, setLocation, location }) => {
  const timer = useRef();
  const [currentState, setCurrentState] = useState({
    loading: false,
    suggestions: [],
  });
  console.log(currentState.suggestions);
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

  const getSuggestions = async (q) => {
    setCurrentState({
      loading: true,
      suggestions: [],
    });
    let data = await getPlaceSuggests(q);

    setCurrentState({
      suggestions: [...data],
      loading: false,
    });
  };

  //handle input
  const [inputValue, setInputValue] = useState(location.description);

  useEffect(() => {
    setInputValue(location.description);
  }, [location]);

  return (
    <Autocomplete
      filterOptions={(option) => option}
      defaultValue={location.description}
      disablePortal
      options={currentState.suggestions}
      onChange={handleSelectItem}
      sx={{ width: "100%" }}
      inputValue={inputValue}
      onInputChange={(e) => {
        setInputValue(e?.target.value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          if (e?.target?.value == "") {
            return;
          }
          e && getSuggestions(e.target.value);
        }, 500);
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      loading={currentState.loading}
    />
  );
};
export default CustomizedAutoComplete;
