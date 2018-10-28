import * as React from "react";
import CardContents from "./CardContents";
import styled from "styled-components";

const AppCard = styled.div`
  border: solid 3px rgb(230, 230, 230);
  border-radius: 10px;
  height: 150px;
  width: 180px;
  margin: 10px;
  background: ${props => (props.disabled ? "lightgrey" : "none")};
`;
const AppCardHeader = styled.div`
  height: 20px;
  background: ${props =>
    props.disabled ? "transparent" : "rgb(230, 230, 230)"};
  padding: 5px;
`;
const Card = ({ room, actions }) => {
  return (
    <AppCard disabled={room.disabled}>
      <AppCardHeader disabled={room.disabled}>
        <input
          type="checkbox"
          checked={!room.disabled}
          onChange={() => actions.handleClick(room.id)}
          hidden={room.id === 1}
        />
        Room {room.id}
      </AppCardHeader>
      <CardContents room={room} {...actions}  />
    </AppCard>
  );
};
export default Card;
