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
        {this.props.game_over ? 
        <div className="w-full h-full z-10  absolute items-center justify-center flex ">
          <div className="bg-white border-gray-200 border-2 shadow-lg p-4 rounded-lg flex flex-col  items-center justify-center">
            <h1 className=" text-6xl italic font-bold m-4 text-gray-800 text-center  ">{this.props.player_bust ? 'Dealer' : 'Player'} Wins!</h1>
            <p className="bold text-2xl">{this.props.player_bust || this.props.dealer_bust ? this.props.dealer_bust ? 'Dealer bust' : 'Player bust' : this.props.player_soft > this.props.player_hard && this.props.player_soft <= 21 ? this.props.player_soft : this.props.player_hard + ' - ' + this.props.dealer_soft > this.props.dealer_hard && this.props.dealer_soft <= 21 ? this.props.dealer_soft : this.props.player_hard}</p>
            <div className="mt-5 w-full flex  justify-center">
              <button className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.props.play()}>Play again</button>
              <button className="inline-flex  flex-grow justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.props.shuffle()}>Reshuffle</button>
            </div></div>
        </div> : null}
        
        <div className={"h-full w-full" +(this.props.game_over ? " filter blur-sm" : null) }>
      <div className="h-2/5 mt-1 flex justify-center mr-24 ">
        {this.props.player ? this.props.dealer.map((card, i) => {
              return (
                <div key={i} className=" contain animate-fade-in-right -mr-24">
                  <img alt="card" className="h-full" src={card.image}></img>
                </div>
              )
            }) : null }
           
      </div>
      <h1 className="mx-2 text-center  text-xl mt-1">{this.props.player_hard === 0 ? null : (this.props.dealer_soft !== this.props.dealer_hard && this.props.dealer_soft < 21 ? (this.props.dealer_soft + ' / ' + this.props.dealer_hard) : this.props.dealer_soft === 21 ? this.props.dealer_soft : this.props.dealer_hard )}</h1>
      
      <div className=" h-2/5 flex mt-1 justify-center mr-24">
        {this.props.player ? this.props.player.map((card, i) => {
              return (
                <div key={i} className=" contain animate-fade-in-right -mr-24">
                  <img alt="card" className="h-full" src={card.image}></img>
                </div>
              )
            }) : null }
           
      </div>
      <h1 className="text-center text-xl mt-3">{this.props.player_hard === 0 ? null : (this.props.player_soft !== this.props.player_hard &&  this.props.player_soft < 21 ? (this.props.player_soft + ' / ' + this.props.player_hard) : this.props.player_soft === 21 ? this.props.player_soft : this.props.player_hard) }</h1>
      <div className="flex mt-5 items-center flex-col">
        <div className="flex w-full absolute bottom-0 mb-2">
       <button disabled={this.props.game_over} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.props.newCard('player')}>Hit</button>
       <button disabled={this.props.game_over} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.props.shuffle()}>Shuffle</button>
       <button disabled={this.props.game_over} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" onClick={() => this.props.clear()}>Clear</button> 
       </div>
       
       </div>
       </div>
      </div>
    )
  }
}