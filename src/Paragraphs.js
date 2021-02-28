import React from 'react';

/**
 * Component for displaying a list of paragraphs ordered by relevance.
 * Receives topics selected by the user as a property, and calculates a 
 * relevance score for each paragraph.
 * 
 * Note that there are way better ways of computing relevance, such as by
 * using word embeddings, but that was outside the scope of this assignment.
 */
export default class Paragraphs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {error: null, isLoaded: false, paragraphs: ''};
    }
  
    componentDidMount() {
      fetch("http://localhost:3000/paragraphs")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              paragraphs: result
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
  
    selectParagraphs() {
      const selectedParagraphs = {}; // Dictionary of score: [paragraph/s] pairs
      const paragraphs = this.state.paragraphs;
      for (let i in paragraphs) {
        let score = this.calculateRelevance(paragraphs[i]);
        if (score > 0) { // Relevant paragraph found
          if (score in selectedParagraphs) { // Avoids overwriting
            selectedParagraphs[score].push(paragraphs[i].summary);
          }
          else {
            selectedParagraphs[score] = [paragraphs[i].summary];
          }
        }
      }
      return this.orderParagraphsByScore(selectedParagraphs);
    }

    /**
     * Word embeddings would have been ideal.  However, this simple function runs
     * through the list of topics associated with a paragraph and if relevant to
     * the user then it increments the score.  Assumes the order matters, so if 
     * the paragraph's first topic is relevant it increases score by 1, if the second 
     * topic is relevant then it increases it by 0.5, and so on.
     */
    calculateRelevance(paragraph) {
        const selectedTopics = this.props.selectedTopics;
        let score = 0;
        for (let i in paragraph.topics) {
          if (selectedTopics.includes(paragraph.topics[i])) {
            score += 1/i;
          }
        }
        return score;
    }

    orderParagraphsByScore(selectedParagraphs) {
      const scores = Object.keys(selectedParagraphs);
      scores.sort();
      const orderedParagraphs = [];
      for (let i in scores) {
          for (let j in selectedParagraphs[scores[i]]) {
            orderedParagraphs.push(selectedParagraphs[scores[i]][j]);
        }
      }
      return orderedParagraphs; 
    }
  
    render() {
      const { error, isLoaded } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return (<div>Loading...</div>);
      }
      else {
        const selectedParagraphs = this.selectParagraphs();
        const listItems = selectedParagraphs.map((selectedParagraph) =>
          <li key={selectedParagraph}>{selectedParagraph}</li>
        );
        return (
          <div>
            <ol>{listItems}</ol>
          </div>);
      }
    }
  }