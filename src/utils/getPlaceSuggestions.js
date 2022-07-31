import axios from "axios";
import jsonp from "jsonp";
import fetchJsonp from "fetch-jsonp";
export const getPlaceSuggests = async (q) => {
  try {
    const response = await axios.get(
      "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json",
      {
        params: {
          apiKey: process.env.NEXT_PUBLIC_HERE_MAP_API_KEY,
          query: q,
        },
        headers: {},
      }
    );
    const data = response.data;
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
    });
   
    return suggestions;
  } catch (e) {
    console.log("Cant fetch data: ", e);
    return []
  }

  // fetchJsonp("https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json", {
  //   apiKey: process.env.NEXT_PUBLIC_HERE_MAP_API_KEY,
  //   query: q,
  // })
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (json) {
  //     console.log("parsed json", json);
  //   })
  //   .catch(function (ex) {
  //     console.log("parsing failed", ex);
  //   });

  // console.log(process.env.NEXT_PUBLIC_HERE_MAP_API_KEY)
  // jsonp(
  //   "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json",
  //   {
  //     param: { apiKey: process.env.NEXT_PUBLIC_HERE_MAP_API_ROUTE, query: q },
  //   },
  //   (err, data) => {
  //     if (data) handle(data);
  //   }
  // );
};
