import React, { Component } from "react";

export default class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: { soft: 0, hard: 0 },
      dealer: { soft: 0, hard: 0 },
      player_bust: false,
      dealer_bust: false,
      player_stand: false,
    };
  }
  /* checkScore(seat){
     let faceCards = ['K', 'Q', 'J', 'A']; 
           if (faceCards.includes(card[0])) {
               if (card[0].code == 'A') {
                 this.setState({
                   seat: {soft: seat.soft + 11, hard: seat.hard++}
                 })
               }
               else {
                 this.setState({
                   seat: {soft: seat.soft + 10, hard: seat.hard + 10}
                 })
               }
           }
           else {
             this.setState({
               seat: {soft: seat.soft + cards[0].value, hard: seat.hard + cards[0].value}
             })
           }
   }
   checkBust() {
     if (this.hardScore > 21) {
           this.bust = true;
           dealerScoreText.innerHTML = this.hardScore + ' - Bust!'
       }
       else {
           if (this.softScore == 21 && this.cards.length == 2) {
               dealerScoreText.innerHTML = 'Blackjack!';
               this.stand();
               this.dealerTurn();
           }
           else if (this.softScore == 21 || this.hardScore == 21) {
               dealerScoreText.innerHTML = 21;
               this.stand();
               this.dealerTurn();
           }
           else if (this.softScore > this.hardScore && this.softScore < 21) {
               dealerScoreText.innerHTML = this.hardScore + '/' + this.softScore;
           }
           else if (this.softScore > 21) {
               dealerScoreText.innerHTML = this.hardScore;
           }
           else {
               dealerScoreText.innerHTML = this.hardScore;
           }
       }
   }
   dealerTurn() {
       while(this.bust == false) {
       if (this.hardScore >= 17 || this.softScore >= 17 && this.softScore <= 21|| playerHand.bust == true || this.bust == true) {
           this.stand();
           break;
       }
       else {
           this.hit();
       }
   }
   }
   */

  render() {
    return (
      <div className="w-full h-full">
      <div className="flex h-50">
        {this.props.cards.map((card, i) => {
              return (
                <div key={i} className={"w-50 h-50 contain animate-fade-in-right" + (i === 0 ? null : " -ml-40") }>
                  <img alt="card" src={card.image}></img>
                </div>
              )
            })}
           
      </div>
       <button className="bg-black text-white rounded p-2 mt-3  mx-1" onClick={() => this.props.newCard()}>draw card</button>
       <button className="bg-black text-white rounded p-2 mt-3 mx-1" onClick={() => this.props.shuffle()}>shuffle</button>
       <button className="bg-black text-white rounded p-2 mt-3 mx-1 " onClick={() => this.props.clear()}>clear cards</button> 
       <h1>cards left: {this.props.cards_remaining}</h1>
       <h1>soft score: {this.props.soft}</h1>
       <h1>hard score: {this.props.hard}</h1>
      </div>
    )
  }
}