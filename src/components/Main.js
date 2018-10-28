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
    const { startAsync, hydrate } = this.props.actions;
    hydrate();
  }
  render() {
    const { fetching, rooms, actions, error, saving } = this.props;
    if (fetching) {
      return <h1>FETCHING...</h1>
    }
    return (
      <div className="App">
        {error && <div style={{color: 'red' }}>ERROR: {error}</div>}
        {saving && <div>SAVING...</div>}
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
const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(roomActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);
