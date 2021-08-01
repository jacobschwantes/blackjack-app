import React, { Component } from "react";

export default class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.checkDeck = this.checkDeck.bind(this);
  }
  checkDeck() {
    this.props.updateDeck();
  }

  render() {
    return (
      <div>
      <h1>{this.props.deck_id}</h1>
      <button onClick={this.checkDeck}>click me</button>
      </div>
    )
  }
}