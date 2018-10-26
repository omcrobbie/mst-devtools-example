import React from "react";
import CardSection from "./CardSection";
import styled from "styled-components";

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const CardContents = ({ room, setChild, setAdult }) => {
  return (
    <CardBody disabled={room.disabled}>
      <CardSection
        valuesKey={"adultSelector"}
        title={"Adults\n(18+)"}
        room={room}
        onChange={setAdult}
      />
      <CardSection
        valuesKey={"childSelector"}
        title={"Children\n(0-17)"}
        room={room}
        onChange={setChild}
      />
    </CardBody>
  );
};
export default CardContents;
