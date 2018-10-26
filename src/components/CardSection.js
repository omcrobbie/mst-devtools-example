import React from "react";
import styled from "styled-components";

const AppCardSection = styled.div`
  margin: 20px;
`;
const CardSection = ({
  title,
  valuesKey,
  room,
  onChange
}) => {
  const values = room[valuesKey].values;
  const selectedVal = room[valuesKey].selectedValue;
  return (
    <AppCardSection>
      <div>{title}</div>
      <select disabled={room.disabled} onChange={e => onChange(room.id, e.target.value)} value={selectedVal}>
        {values.map(val => {
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </AppCardSection>
  );
};
export default CardSection;
