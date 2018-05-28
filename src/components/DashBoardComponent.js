import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addList } from './actions';

class Dashboard extends Component {

  constructor(props) {
    super();
    this.state = {
      inputValue: ''
    };
    this.addListGroup = this.addListGroup.bind(this);
  }

  componentWillMount() {

  }

  addListGroup() {
    const { inputValue } = this.state;
    this.props.addList({
      name: inputValue
    });
  }

  render() {
    const { fetchData } = this.props;

    return (
      <div>
        <input type="text" onChange={(e) => this.setState({ inputValue: e.target.value })} />
        <button onClick={this.addListGroup}>Add</button>
      </div>
    );
  }
}

const mapStateToProps = (props) => {

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addList: addList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
