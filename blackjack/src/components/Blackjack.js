// Renders blackjack screen for main container on dashboard
export default function Blackjack(props) {
  return (
    <div className="w-full  h-full relative  ">
      {/* End of game screen - blurs background when active */}
      {props.new_player === true || (props.game_over && props.victor) ?
        <div className="w-full h-full z-10  absolute items-center justify-center flex animate-fade-in">
          <div className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 border shadow-lg p-4 rounded-xl flex flex-col  items-center justify-center">
            <h1 className="dark:text-white text-6xl italic font-bold m-4 text-gray-800 text-center  ">{props.new_player ? 'Blackjack' : props.victor === 'push' ? "It's a push!" : props.victor + ' Wins!'}</h1>
            <p className="dark:text-white bold text-3xl mb-2">{props.new_player ? "Click play to begin" : props.reason}</p>
            {props.summary ? props.summary.map((award) => {
              return <p className="dark:text-gray-200 bold text-sm ">{award.event}: <span className="text-cyan-600">{award.value}XP</span></p>
            }) : null}
            <div className="mt-5 w-full flex  justify-center">
              <button className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => props.play()}>{props.new_player ? 'Play' : 'Play again'}</button>
              {!props.new_player ? <button className="inline-flex  flex-grow justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => props.shuffle()}>Reshuffle</button> : null}
            </div></div>
        </div> : null}
      {/* Dealer cards container */}
      <div className={" h-full flex flex-col " + (props.game_over ? " filter blur-sm" : null)}>
        <div name="dealer_card_container" className="lg:ml-48 ml-32 flex flex-1  w-3/4 lg:px-0 px-8 justify-center ">
          {props.dealer ? props[props.turn === 'player' ? 'dealer_hidden' : 'dealer'].map((card) => {
            return <img alt="card" className="object-contain animate-fade-in-right lg:-ml-48 -ml-40 " src={(props.dark ? "cards_dark/" : "cards/") + card.code + ".svg"}></img>
          }) : null}
        </div>
        {/* Dealer score */}
        <h1 className=" p-2 text-center  text-2xl  mt-1 dark:text-gray-50 ">{props.turn === 'player' && props.player_hard > 0 && props.dealer_hard > 0 ? props.dealer_hidden_score : props.dealer_soft !== props.dealer_hard && props.dealer_soft < 21 ? (props.dealer_soft + ' / ' + props.dealer_hard) : props.dealer_soft === 21 ? props.dealer_soft : props.turn === 'dealer' ? props.dealer_hard : null}</h1>
        {/* Player cards container */}
        <div name="player_card_container" className="lg:ml-48 ml-32 flex flex-1  w-3/4 lg:px-0 px-8 justify-center ">
          {props.player ? props.player.map((card) => {
            return <img alt="card" className="object-contain animate-fade-in-right lg:-ml-48 -ml-40 " src={(props.dark ? "cards_dark/" : "cards/") + card.code + ".svg"}></img>
          }) : null}
        </div>
        {/* Player score */}
        <h1 className="text-center text-2xl p-2  dark:text-gray-50 ">{props.player_hard === 0 ? null : (props.player_soft !== props.player_hard && props.player_soft < 21 ? (props.player_soft + ' / ' + props.player_hard) : props.player_soft === 21 ? props.player_soft : props.player_hard)}</h1>
        {/* Hit / stand button group */}
       
          <div className="flex  w-full pb-2">
            <button disabled={props.game_over || props.turn === 'dealer' || props.player_bust || props.player_hard > 21 || props.dealing} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => props.newCard('player')}>Hit</button>
            <button disabled={props.game_over || props.turn === 'dealer' || props.player_bust} className="inline-flex flex-grow justify-center py-2 mx-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2  focus:ring-cyan-500" onClick={() => { props.updateTurn(props.user.uid, 'dealer'); setTimeout(() => { props.stand() }, 1000) }}>Stand</button>
          
        </div>
      </div>
    </div>
  )
}