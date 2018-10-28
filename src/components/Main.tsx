import * as React from "react";
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
class Main extends React.Component<any, any> {
  
  componentDidMount() {
    const { fetchState } = this.props.actions;
    fetchState();
  }
  render() {
    const { fetching, rooms, actions, error, saving } = this.props;
    if (fetching) {
      return <h1>LOADING...</h1>
    }
    return (
      <div className="App">
        {error && <div style={{color: 'red' }}>ERROR: {error}</div>}
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
        <button onClick={actions.pushState}>Submit</button>
        <button onClick={actions.resetData}>Reset</button>
        {saving && <span>SAVING...</span>}
      </div>
    );
  }
}
const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(roomActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);
