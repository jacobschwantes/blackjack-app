
export default function Help(props) {

    return (
        <div className="p-6 ">
            <div className="pb-5 border-b mb-3 border-gray-200 dark:border-gray-600 ">
                <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-white">Game rules</h3>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">The shoe</h1>
                <p className=" text-gray-900 dark:text-gray-400">A dealing shoe, or dealer's shoe is a gaming device, mainly used in casinos, to hold multiple decks of playing cards. In this case we're using a 'virtual-shoe' which uses 6 standard 52-card decks of cards.
                    The shoe is automatically shuffled after 2/3 of the cards have been dealt but the shoe can be shuffled at the request of the player any time after the completion of a hand.
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">Goal of the game</h1>
                <p className=" text-gray-900 dark:text-gray-400">Player attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">The deal</h1>
                <p className=" text-gray-900 dark:text-gray-400">The dealer gives one card face up to the player, and then one card face up to themselves.
                    Another round of cards is then dealt face up to the player, but the dealer takes the second card face down.
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">Blackjack</h1>
                <p className=" text-gray-900 dark:text-gray-400">If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards,
                    this is a natural or "blackjack." If the player has a natural and the dealer does not, the player immediately wins, and vice versa if the dealer has a natural.
                    If both player and dealer have naturals then the hand ends in a tie.
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">The play</h1>
                <p className=" text-gray-900 dark:text-gray-400">The player goes first and must decide whether to "stand" (not ask for another card) or "hit" (ask for another card in an attempt to get closer to a count of 21, or even hit 21 exactly).
                    Thus, a player may stand on the two cards originally dealt to them, or they may ask the dealer for additional cards, one at a time, until deciding to stand on the total (if it is 21 or under), or goes "bust" (if it is over 21).
                    In the latter case, the player loses. The combination of an ace with a card other than a ten-card is known as a "soft hand," because the player can count the ace as a 1 or 11, and either draw cards or not.
                    For example with a "soft 17" (an ace and a 6), the total is 7 or 17. While a count of 17 is a good hand, the player may wish to draw for a higher total.
                    If the draw creates a bust hand by counting the ace as an 11, the player simply counts the ace as a 1 and continues playing by standing or "hitting" (asking the dealer for additional cards, one at a time).
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">Dealers play</h1>
                <p className=" text-gray-900 dark:text-gray-400">When it is the dealers turn, the dealer flips their hidden card and if their total is less than 17 they will continue to hit until getting a 
                score of 17 or greater.
                </p>
            </div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50 my-2">Multiple hands, splits, double down, and insurance</h1>
                <p className=" text-gray-900 dark:text-gray-400">This platform does not currently support playing multiple hands simultaneously or splitting pairs. Also since this platform does not
                have a betting system, the ability to double down or buy insurance is not necessary.
                </p>
            </div>
           
            <div className="mt-2 w-full flex justify-end">
                 <button
                onClick={() => props.close('help', false)}  
                className="ml-2  inline-flex  py-2 px-4     mb-4  shadow-sm text-sm font-medium rounded-md leading-4 text-white dark:text-gray-50 bg-cyan-600 hover:bg-cyan-700  focus:outline-none focus:ring-2  focus:ring-cyan-500"
            >
                Close
            </button>
            </div>
         
        </div>
    )
}
