import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

import { StyledCard } from "./PreviewCard";
import { StyledCardImage } from "./PreviewCard";
import { StyledTitle } from "./PreviewCard";
import { StyledInfo } from "./PreviewCard";

export default function SpotlightCard({
  randomSurprise,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <StyledCard key={randomSurprise._id}>
      <Link href={`/places/${randomSurprise._id}`}>
        <StyledCardImage
          src={randomSurprise.image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width="0"
          height="0"
          alt={randomSurprise.name}
          loading="lazy"
        />
      </Link>
      <StyledCardBody>
        <Link href={`/places/${randomSurprise._id}`}>
          <StyledTitle>{randomSurprise.name}</StyledTitle>
        </Link>
        <FavoriteButton
          id={randomSurprise._id}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />

        <StyledInfo>
          {randomSurprise.region} &#183;
          {randomSurprise.activities
            .map((activity) => activity.activityname)
            .join(", ")}
        </StyledInfo>
      </StyledCardBody>
    </StyledCard>
  );
}

export const StyledCardBody = styled.div`
  position: relative;
  padding: 1em;
  background-color: var(--secondary-color-background);
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  background-color: rgba(244, 177, 87, 0.3);
`;
