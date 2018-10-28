import * as React from "react";
import styled from "styled-components";

const AppCardSection = styled.div`
  margin: 20px;
`;
interface CardSelectorProps {
  title: string;
  valuesKey: string;
  room: IRoom;
  onChange: Function;
}
const CardSection = ({
  title,
  valuesKey,
  room,
  onChange
}: CardSelectorProps) => {
  const values = room[valuesKey].values;
  const selectedVal = room[valuesKey].selectedValue;
  return (
    <AppCardSection>
      <div>{title}</div>
      <select 
        disabled={room.disabled} 
        onChange={e => onChange(room.id, e.target.value)} 
        value={selectedVal}>
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
