import React from 'react';

/**
 * Component for displaying a multi-select list of topics to choose from.
 * The selected values are handled by the parent component.
 */
export default class Topics extends React.Component {
    constructor(props) {
      super(props);
      this.state = {error: null, isLoaded: false, topics: []};
      this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
      fetch("http://localhost:3000/topics")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              topics: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    handleChange(event) {
      this.props.onTopicsChange(event.target.value);
    }
  
    render() {
      const {error, isLoaded, topics} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return (<div>Loading...</div>);
      }
      else {
        const topicsJSX = []
        for (var key in topics) {
          topicsJSX.push(<option value={topics[key].id}>{topics[key].text}</option>)
        }
        return (
          <div>
            <select multiple={true} value={this.props.selectedTopics} onChange={this.handleChange}>
              {topicsJSX}
            </select>
          </div>);
      }
    }
  }