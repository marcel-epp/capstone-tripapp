import styled from "styled-components";

export default function Form({
  setFormResults,
  handleResults,
  getUniqueValues,
  places,
  setRandomSurprise,
  handleSurprise,
}) {
  // Function to get the user inputs from form
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let results = [];

    if (data.activity && data.region === "disabled") {
      results = places.filter((place) => {
        return place.activity.includes(data.activity);
      });
    } else if (data.region && data.activity === "disabled") {
      results = places.filter((place) => place.region === data.region);
    } else if (data.region && data.activity) {
      results = places.filter(
        (place) =>
          place.region === data.region && place.activity.includes(data.activity)
      );
    }

    if (results.length === 0) {
      results = -1;
    }

    handleResults(results);
  }

  // handle form reset
  function handleFormReset() {
    setFormResults(0);
    setRandomSurprise(0);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="region">Choose your region</label>
      <select name="region" id="region">
        <option value="disabled">---</option>
        {getUniqueValues("region").map((region, id) => (
          <option key={id} value={region}>
            {region}
          </option>
        ))}
      </select>

      <label htmlFor="activity">Choose your activity</label>
      <select name="activity" id="activity">
        <option value="disabled">---</option>
        {getUniqueValues("activity").map((activity, id) => (
          <option key={id} value={activity}>
            {activity}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
      <button type="reset" onClick={handleFormReset}>
        Reset
      </button>
      <button type="button" onClick={handleSurprise}>
        Surprise me
      </button>
    </StyledForm>
  );
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
