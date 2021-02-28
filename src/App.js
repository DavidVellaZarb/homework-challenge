import React from 'react';
import Topics from './Topics';
import Paragraphs from './Paragraphs';

/**
 * Component that allows the user to select a list of topics and displays paragraphs ordered
 * by relevance.  Stores the user's selected topics as a state and passes them as a property 
 * to its child components.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTopics: []};
    this.handleTopicsChange = this.handleTopicsChange.bind(this);
  }

  handleTopicsChange(value) {
    const selectedTopics = this.state.selectedTopics;
    if (!selectedTopics.includes(value)) {
      selectedTopics.push(value);
    }
    else {
        const index = selectedTopics.indexOf(value);
        selectedTopics.splice(index, 1);
    }
    // Although the state was already updated above, this will cause the affected components to render
    this.setState({selectedTopics: selectedTopics});
  }

  render() {
    const { selectedTopics } = this.state;
    return (
      <div>
        <h1>Topics</h1>
        <Topics 
          onTopicsChange = {this.handleTopicsChange}
          selectedTopics = {selectedTopics}/>
          <h1>Paragraphs</h1>
        <Paragraphs 
          selectedTopics = {selectedTopics}/>
      </div>);
  }
}

export default App;
