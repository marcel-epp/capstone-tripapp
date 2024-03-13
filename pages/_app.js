import { SWRConfig } from "swr";
import useSWR from "swr";
import GlobalStyle from "../styles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Layout from "@/components/Layout";
import { useState } from "react";

//import fake DB from @/lib/db
import { dbPlaces as places } from "@/lib/db";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  //build a useState for the result of the Form
  const [formResults, setFormResults] = useState(0);
  const [randomSurprise, setRandomSurprise] = useState(0);
  const [isPageActive, setPageActive] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});

  const { data, error, isLoading } = useSWR("/api/places", fetcher);

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Data could not be loaded...</h1>;
  }

  const places = data;

  //----------------------------------------------------------------

  // set the favorites
  function onToggleFavorite(id) {
    setIsFavorite((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle favorite status for the given place id
    }));

    // Make API call to update favorite status in the database
    // You can include this part here as well
  }

  //----------------------------------------------------------------

  // toogle the state for the active site, to see where you are
  const togglePageActive = () => {
    setPageActive(!isPageActive);
  };

  //----------------------------------------------------------------

  // Function to get unique values for a given key
  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    places.forEach((place) => {
      if (Array.isArray(place[key])) {
        place[key].forEach((value) => uniqueValues.add(value.activity));
      } else {
        uniqueValues.add(place[key]);
      }
    });
    return Array.from(uniqueValues);
  };

  //----------------------------------------------------------------

  // handle the form results and set the state
  function handleResults(newResults) {
    setFormResults(newResults);
  }

  //----------------------------------------------------------------

  // give a random id for the surprise me card
  function handleSurprise() {
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    setRandomSurprise(randomPlace);
  }

  //----------------------------------------------------------------

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Layout togglePageActive={togglePageActive}>
          <Component
            formResults={formResults}
            setFormResults={setFormResults}
            handleResults={handleResults}
            getUniqueValues={getUniqueValues}
            places={places}
            randomSurprise={randomSurprise}
            setRandomSurprise={setRandomSurprise}
            handleSurprise={handleSurprise}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            {...pageProps}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
