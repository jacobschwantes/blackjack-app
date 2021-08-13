import React, { Component } from "react";
export default class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="w-full h-full relative px-3 ">
        {this.props.new_player === true || (this.props.game_over && this.props.victor) ?
          <div className="w-full h-full z-10  absolute items-center justify-center flex animate-fade-in">
            <div className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-800 border-2 shadow-lg p-4 rounded-lg flex flex-col  items-center justify-center">
              <h1 className="dark:text-white text-6xl italic font-bold m-4 text-gray-800 text-center  ">{this.props.new_player ? 'Blackjack' : this.props.victor === 'push' ? "It's a push!" : this.props.victor + ' Wins!'}</h1>
              <p className="dark:text-white bold text-3xl mb-2">{this.props.new_player ? "Click play to begin" : this.props.reason}</p>
              {this.props.summary ? this.props.summary.map((award) => {
                return  <p className="dark:text-gray-200 bold text-sm ">{award.event}: <span className="text-cyan-400">{award.value}XP</span></p>
              }): null}
              <div className="mt-5 w-full flex  justify-center">

                <button className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => this.props.play()}>{this.props.new_player ? 'Play' : 'Play again'}</button>
                {!this.props.new_player ? <button className="inline-flex  flex-grow justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => this.props.shuffle()}>Reshuffle</button> : null}
              </div></div>
          </div> : null}

        <div className={" h-full flex flex-col w-full " + (this.props.game_over ? " filter blur-sm" : null)}>

          <div name="dealer_card_container" className="lg:px-4 p-4 lg:max-w-full  flex  flex-1  justify-center lg:mr-36 mr-32">
            {this.props.dealer ? this.props[this.props.turn === 'player' ? 'dealer_hidden' : 'dealer'].map((card) => {
              return (

                <img alt="card" className="object-contain  animate-fade-in-right lg:-mr-36 -mr-32" src={"cards/" + card.code + ".svg"}></img>

              )
            }) : null}

          </div>
          <h1 className="mx-2 text-center  text-xl mt-1 dark:text-gray-50 ">{this.props.turn === 'player' && this.props.player_hard > 0 && this.props.dealer_hard > 0 ? this.props.dealer_hidden_score : this.props.dealer_soft !== this.props.dealer_hard && this.props.dealer_soft < 21 ? (this.props.dealer_soft + ' / ' + this.props.dealer_hard) : this.props.dealer_soft === 21 ? this.props.dealer_soft : this.props.turn === 'dealer' ? this.props.dealer_hard : null}</h1>

          <div name="player_card_container" className="lg:px-4 p-4  flex-1  lg:max-w-full   flex justify-center lg:mr-36 mr-32">
            {this.props.player ? this.props.player.map((card) => {
              return (

                <img alt="card" className="object-contain animate-fade-in-right lg:-mr-36 -mr-32" src={"cards/" + card.code + ".svg"}></img>

              )
            }) : null}

          </div>
          <h1 className="text-center text-xl pb-4 dark:text-gray-50 ">{this.props.player_hard === 0 ? null : (this.props.player_soft !== this.props.player_hard && this.props.player_soft < 21 ? (this.props.player_soft + ' / ' + this.props.player_hard) : this.props.player_soft === 21 ? this.props.player_soft : this.props.player_hard)}</h1>
          <div className="flex  items-center mb-4  ">
            <div className="flex  flex-1  ">
              <button disabled={this.props.game_over || this.props.turn === 'dealer' || this.props.player_bust || this.props.player_hard > 21} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => this.props.newCard('player')}>Hit</button>
              <button disabled={this.props.game_over || this.props.turn === 'dealer' || this.props.player_bust} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => { this.props.updateTurn(this.props.user.uid, 'dealer'); setTimeout(() => { this.props.stand() }, 1000) }}>Stand</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}