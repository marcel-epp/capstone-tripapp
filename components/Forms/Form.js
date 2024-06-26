// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift as faGiftSolid } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight as faRotateRightSolid } from "@fortawesome/free-solid-svg-icons";
import { faUmbrellaBeach as faUmbrellaBeachSolid } from "@fortawesome/free-solid-svg-icons";
// import components for styles
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
        return place.activities.some(
          (activity) => activity.activityname === data.activity
        );
      });
    } else if (data.region && data.activity === "disabled") {
      results = places.filter((place) => place.region === data.region);
    } else if (data.region && data.activity) {
      results = places.filter(
        (place) =>
          place.region === data.region &&
          place.activities.some(
            (activity) => activity.activityname === data.activity
          )
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
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormHeadline>Create your Trip!</StyledFormHeadline>
        <StyledFormInfo>
          Choose your Region or an activity you like.
        </StyledFormInfo>
        <StyledFieldset>
          <StyledLabel htmlFor="region"></StyledLabel>
          <StyledSelect name="region" id="region">
            <option value="disabled">---</option>
            {getUniqueValues("region").map((region, id) => (
              <option key={id} value={region}>
                {region}
              </option>
            ))}
          </StyledSelect>

          <StyledLabel htmlFor="activity"></StyledLabel>
          <StyledSelect name="activity" id="activity">
            <option value="disabled">---</option>
            {getUniqueValues("activities").map((activity, id) => (
              <option key={id} value={activity}>
                {activity}
              </option>
            ))}
          </StyledSelect>
        </StyledFieldset>

        <StyledFieldset>
          <StyledPrimaryButton type="submit">
            <span>Submit</span>&nbsp;
            <FontAwesomeIcon icon={faUmbrellaBeachSolid} />
          </StyledPrimaryButton>
          <StyledSecondaryButton type="button" onClick={handleSurprise}>
            <span>Surprise me</span>&nbsp;
            <FontAwesomeIcon icon={faGiftSolid} />
          </StyledSecondaryButton>
          <StyledSecondaryButton type="reset" onClick={handleFormReset}>
            <span>Reset</span>&nbsp;
            <FontAwesomeIcon icon={faRotateRightSolid} />
          </StyledSecondaryButton>
        </StyledFieldset>
      </StyledForm>
    </StyledSection>
  );
}

export const StyledSection = styled.section`
  padding: var(--main-padding-mobile);
  background-image: url(/images/hero.jpg);
  background-size: cover;
  border-radius: var(--border-radius);
  @media only screen and (min-width: 600px) {
    margin: 0 2em;
    padding: 4.5em;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color-background);
  padding: 1em;
  border-radius: 0.3em;
  @media only screen and (min-width: 600px) {
    width: 50%;
    padding: 1em 1em 1em 0;
  }
  @media only screen and (max-width: 799px) {
    width: 100%;
  }
`;

export const StyledFormHeadline = styled.h1`
  margin-top: 0.2em;
  margin-bottom: 0;
  @media only screen and (min-width: 600px) {
    padding-left: 0.6em;
  }
`;

export const StyledFormInfo = styled.p`
  color: var(--primary-color);
  margin: 0;
  @media only screen and (min-width: 600px) {
    padding-left: 1em;
  }
`;

export const StyledFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1em;
  border: none;
  padding: 0;
  margin-top: 1em;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    gap: 0.4em;
  }
`;

export const StyledLabel = styled.label`
  display: none;
`;

export const StyledSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  background-image: url(/images/arrow-down.svg);
  background-repeat: no-repeat;
  background-position: 95%;
  flex-grow: 1;
  color: var(--secondary-color-background);
  background-color: var(--secondary-color);
  padding: 0.5em;
  border: 1px solid var(--secondary-color);
  border-radius: 0.3em;
  @media only screen and (min-width: 600px) {
    margin-left: 0.9em;
  }
`;

export const StyledPrimaryButton = styled.button`
  flex-grow: 1;
  color: var(--secondary-color-background);
  background-color: var(--primary-color);
  padding: 0.5em;
  border: 1px solid var(--primary-color);
  border-radius: 0.3em;
  cursor: pointer;
  @media only screen and (min-width: 600px) {
    margin-left: 0.9em;
  }
  &:hover {
    color: var(--primary-color);
    background-color: var(--secondary-color-background);
    transition: 500ms ease-in-out;
  }
`;

export const StyledSecondaryButton = styled.button`
  flex-grow: 1;
  color: var(--primary-color);
  background-color: var(--secondary-color-background);
  padding: 0.5em;
  border: 1px solid var(--primary-color);
  border-radius: 0.3em;
  cursor: pointer;
  @media only screen and (min-width: 600px) {
    margin-left: 0.9em;
  }
  &:hover {
    color: var(--secondary-color-background);
    background-color: var(--primary-color);
    transition: 500ms ease-in-out;
  }
`;
