import React from "react";
import Card from "./Card";
import styled from "styled-components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import roomActions from '../store/actions/roomActions';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
class Main extends React.Component {

  componentDidMount() {
    if (window.location.search) {
      this.props.actions.hydrate();
    }
  }
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
        <button onClick={actions.dehydrate}>Submit</button>
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
  actions: bindActionCreators(roomActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);
