import React from "react";
import Card from "./Card";
import styled from "styled-components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../models/RoomMST';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
class Main extends React.Component {

  onSubmit = () => {
    // const log = {
    //   r1: this.rooms[0].logThis(),
    //   r2: this.rooms[1].logThis(),
    //   r3: this.rooms[2].logThis(),
    //   r4: this.rooms[3].logThis()
    // };
    // const enc = window.btoa(JSON.stringify(log));
    //window.location.search = `?d=${enc}`;
  };
  render() {
    const { rooms, actions } = this.props;
    return (
      <div className="App">
        <Container>
          {rooms.map(room => {
            return (
              <Card
                key={room.id}
                room={room}
                actions={actions}
              />
            );
          })}
        </Container>
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    rooms: state.rooms,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);
