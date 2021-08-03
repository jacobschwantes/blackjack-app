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
      modal: true,
      game_over: true
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
      <div className="w-full h-full relative">
        {this.state.game_over ? 
        <div className="w-full h-full z-10  absolute items-center justify-center flex ">
          <div className="bg-white border-gray-200 border-2 shadow-lg p-4 rounded-lg flex flex-col  items-center justify-center">
            <h1 className=" text-6xl italic font-bold m-4 text-gray-800  ">Player Wins!</h1>
            <p className="bold text-2xl">19 - 17</p>
            <div className="mt-5 w-full flex  justify-center">
              <button className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.setState({game_over: false})}>Play again</button>
              <button className="inline-flex  flex-grow justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.setState({game_over: false})}>Reshuffle</button>
            </div></div>
        </div> : null}
        
        <div className={(this.state.game_over ? "filter blur-sm" : null) }>
      <div className="flex h-50">
        {this.props.cards.map((card, i) => {
              return (
                <div key={i} className={"w-50 h-50 contain animate-fade-in-right" + (i === 0 ? null : " -ml-40") }>
                  <img alt="card" src={card.image}></img>
                </div>
              )
            })}
           
      </div>
      
       <button disabled={this.state.game_over} className="bg-black text-white rounded p-2 mt-3  mx-1" onClick={() => this.props.newCard()}>draw card</button>
       <button disabled={this.state.game_over} className="bg-black text-white rounded p-2 mt-3 mx-1" onClick={() => this.props.shuffle()}>shuffle</button>
       <button disabled={this.state.game_over} className="bg-black text-white rounded p-2 mt-3 mx-1 " onClick={() => this.props.clear()}>clear cards</button> 
       <h1>cards left: {this.props.cards_remaining}</h1>
       <h1>soft score: {this.props.soft}</h1>
       <h1>hard score: {this.props.hard}</h1>
       </div>
      </div>
    )
  }
}