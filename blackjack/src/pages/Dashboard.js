import React, { Component } from "react";
import { auth } from "../services/firebase";
import ProfileNav from "../components/ProfileNav";
import Chat from "./Chat";
import { db } from "../services/firebase";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Blackjack from "../components/Blackjack";
import { checkDeck } from "../helpers/api";
import Notification from "../components/Notification";
import { drawCards } from "../helpers/api";
import { shuffleDeck } from "../helpers/api";
import Form from "../components/Form";
import {
  BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { endGame, newSession, updateScore, updateTurn, writeCard, writeUserBlackjack, writeUserData, writeUserHands, writeUserStats, writeUserWins } from "../helpers/db";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      url: auth().currentUser.photoURL,
      username: auth().currentUser.displayName,
      open: false,
      modal: true,
      stats: [
        { label: 'Hands played', value: 0 },
        { label: 'Wins', value: 0 },
        { label: 'Blackjacks', value: 0 },
      ],
      readError: null,
      notification: false,
      deck_id: '',
      player: [{
        "image": "https://deckofcardsapi.com/static/img/KH.png",
        "value": "KING",
        "suit": "HEARTS",
        "code": "KH"
    },],
      dealer: [{
        "image": "https://deckofcardsapi.com/static/img/KH.png",
        "value": "KING",
        "suit": "HEARTS",
        "code": "KH"
    },],
      dealer_hidden: [],
      dealer_hidden_score : 0,
      cards_remaining: 0,
      player_soft: 0,
      player_hard: 0,
      dealer_hard: 0,
      dealer_soft: 0,
      player_bust: false,
      dealer_bust: false,
      settings: false,
      error: null,
      notification_message: null,
      game_over: true,
      turn: 'player',
      victor: false,
      reason: '',
      wins: 0,
      hands: 0,
      blackjacks: 0
    };
    this.update = this.update.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.pushCard = this.pushCard.bind(this);
    this.checkScore = this.checkScore.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.handleError = this.handleError.bind(this);
    this.playGame = this.playGame.bind(this);
    this.checkVictor = this.checkVictor.bind(this);
    this.stand = this.stand.bind(this);
    this.myRef = React.createRef();
  }
  async componentDidMount() {
    try {
      db.ref("users/" + this.state.user.uid + "/stats").on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
          this.setState({
            stats: [
              { label: 'Hands played', value: data.hands },
              { label: 'Wins', value: data.wins },
              { label: 'Blackjacks', value: data.blackjacks },
            ],
            wins: data.wins,
            hands: data.hands,
            blackjacks: data.blackjacks
          });
        }else {
            writeUserStats(this.state.user.uid)
          }
      })
      db.ref("users/" + this.state.user.uid + "/deck").on("value", snapshot => {
        let data = snapshot.val();
        checkDeck(this.state.user.uid, data)
          .then(response => { this.setState(() => ({ deck_id: response })) })
      })
      db.ref("users/" + this.state.user.uid + "/session/player_cards").on("value", snapshot => {
        let player = [];
        snapshot.forEach((snap) => {
          player.push(snap.val().card);
        });
        this.setState({ player });
      });
      db.ref("users/" + this.state.user.uid + "/session/dealer_cards").on("value", snapshot => {
        let dealer = [];
        snapshot.forEach((snap) => {
          dealer.push(snap.val().card);
        });
        this.setState({ dealer });
      });
      db.ref("users/" + this.state.user.uid + "/session").on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
          this.setState({
            game_over: data.game_over,
            dealer_bust: data.dealer_bust,
            player_bust: data.player_bust,
            player_soft: data.player_soft,
            player_hard: data.player_hard,
            dealer_soft: data.dealer_soft,
            dealer_hard: data.dealer_hard,
            turn: data.turn,
            victor: data.victor
          });
        } 
        else { 
          newSession(this.state.user.uid)
        }
        
      })
    }
    catch (error) {
      this.setState({ readError: error })
      this.setState({
        stats: [
          { label: 'Hands played', value: 0 },
          { label: 'Wins', value: 0 },
          { label: 'Blackjacks', value: 0 },
        ]
      });
    }

  }

  update(status) {
    this.setState({ settings: status })
  }
  async updateUser(name, url) {
    await writeUserData(auth().currentUser.uid, name, url);
    await auth().currentUser.updateProfile({
      displayName: name,
      photoURL: url
    });
    this.setState({
      url: url,
      username: name
    })
  }
  async checkScore(player, card) {
    if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      return [10, 10]
    }
    else if (card.value.includes('ACE')) {
      if(this.state[player+'_soft'] + 11 <= 21) {
        return [11, 1]
    }
    else {
      return [1, 1]
    }
  }
    else {
      return [parseInt(card.value), parseInt(card.value)]
    }
  }
  async pushCard(player) {
    if(!this.state.player_bust) {
 let response = await drawCards(this.state.user.uid, this.state.deck_id, 1);
    if(response.cards) {
      await writeCard(this.state.user.uid, player, response.cards[0], this.state[player])
    this.setState(() => ({
      cards_remaining: response.remaining
    }));
    let score = await this.checkScore(player, response.cards[0])
    await updateScore(this.state.user.uid, player, (this.state[player + '_soft'] + score[0]), (this.state[player + '_hard'] + score[1]))
    if(player === 'player' && (this.state.player_hard || this.player_soft) === 21) {
      await updateTurn(this.state.user.uid, 'dealer');
      this.stand();
    }
    if (player === 'dealer' && this.state.dealer.length === 1) {
      if (score[0] === score[1]) {
        this.setState({dealer_hidden_score: score[0]})
      }
      else {
        this.setState({dealer_hidden_score: score[0] + ' / ' + score[1]})
      }
    }
    if(this.state[player + '_hard'] > 21) {
      this.setState({reason: player === 'dealer' ? 'Dealer bust' : 'Player bust'})
      setTimeout(() => {

if(player === 'dealer') {
          writeUserWins(this.state.user.uid, (this.state.wins + 1)); 
          writeUserHands(this.state.user.uid, (this.state.hands + 1)) 
        }
        else {
          writeUserHands(this.state.user.uid, (this.state.hands + 1))
        }
        endGame(this.state.user.uid, player === 'dealer' ? 'Player' : 'Dealer')

      }, 500)
        
      
   
      if(this.state.cards_remaining < 121) {
        await this.shuffleCards()
      }
    }
    }
    else {
      await this.pushCard(player)
    }

    }
   
    
  }

  async playGame() {
    this.setState({player_bust : false})
    await newSession(this.state.user.uid)
    this.setState({dealer_hidden: []})
    await this.pushCard('player');
    await this.pushCard('dealer');
    this.setState({ dealer_hidden: [...this.state.dealer_hidden, this.state.dealer[0] ]})
    await this.pushCard('player');
    await this.pushCard('dealer');
    this.setState({ dealer_hidden: [...this.state.dealer_hidden, {
      "image": "https://i.pinimg.com/236x/6c/a0/16/6ca016115a894f69dea75cc80f95ad92--game-cards-card-games.jpg",
  } ]});
  if(this.state.dealer_soft === 21 || this.state.player_soft === 21 ) { 
    if(this.state.player_soft === 21) {
      writeUserBlackjack(this.state.user.uid, (this.state.blackjacks + 1)); 
    }
    await updateTurn(this.state.user.uid, 'dealer');
    setTimeout(() => {this.checkVictor()}, 1000)
   
  }
  }
  async checkVictor() {
    let dealerTrueScore;
    let playerTrueScore;
    if(this.state.dealer_soft <= 21) {
      dealerTrueScore = this.state.dealer_soft;
    }
    else {
      dealerTrueScore = this.state.dealer_hard;
    };
    if (this.state.player_soft <= 21) {
      playerTrueScore = this.state.player_soft;
    }
    else {
      playerTrueScore = this.state.dealer_hard
    };
    this.setState({ reason: playerTrueScore + ' - ' + dealerTrueScore});
    setTimeout(() => {
      if(playerTrueScore > dealerTrueScore) {
        writeUserWins(this.state.user.uid, (this.state.wins + 1)); 
        writeUserHands(this.state.user.uid, (this.state.hands + 1)) 
      } else {
        writeUserHands(this.state.user.uid, (this.state.hands + 1))
      }; 
      endGame(this.state.user.uid, playerTrueScore === dealerTrueScore ? 'push' : playerTrueScore > dealerTrueScore ? 'Player' : 'Dealer')
    }, 500);
     
  }
  
async shuffleCards() {
  let response = await shuffleDeck(this.state.deck_id)
    if(response.remaining) {
      this.setState(() => ({
      cards_remaining: response.remaining,
      notification_message: "Cards have been shuffled.",
      notification: true
    }))
    }
    else {
      this.setState({error: 'There was a problem with that request. Please try again.'})
      this.setState({notification: true}) 
    }
}
async stand() {
  if(!this.state.game_over) {
    if (this.state.dealer_hard >= 17 || (this.state.dealer_soft >= 17 && this.state.dealer_soft <= 21)) {
        await this.checkVictor()
  }
  else {
    await this.pushCard('dealer');
    setTimeout(() => {this.stand();}, 1000)
  }
} 
}

updateNotification() {
  this.setState(() => ({ 
    notification: false,
    error: null,
    notification_message: null
   }))
}
handleError(message) {
  this.setState({error: message}); 
  this.setState({notification: true});
}
classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


render() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Popover as="header" className="pb-24 bg-gradient-to-r from-sky-800 to-cyan-600">
        {({ open }) => (
          <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                  <a href="/">
                    <h1 className=" tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl text-white xl:inline">Blackjack</h1>
                  </a>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">

                  {/* Profile dropdown */}
                  <ProfileNav {...this.state} update={this.update} />
                </div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay static className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                              alt="Workflow"
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={this.state.url} alt="" />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                          </div>
                          <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {userNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 h-1/6">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-2 items-start lg:grid-cols-3 lg:gap-5">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-3 lg:col-span-2">
              {/* Welcome panel */}
              <section aria-labelledby="profile-overview-title" >
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <Welcome {...this.state} />
                      <div className="mt-5 flex justify-center sm:mt-0">
                        <button
                          onClick={() => this.setState({settings: true})}
                          className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View profile
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    {this.state.stats.map((stat) => (
                      <div key={stat.label} className="px-6 py-4 text-sm font-medium text-center">
                        <span className="text-gray-900">{stat.value}</span>{' '}
                        <span className="text-gray-600">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Actions panel */}
              <section aria-labelledby="quick-links-title" className="h-screen w-full">
                <div className=" h-5/6 rounded-lg bg-white overflow-hidden shadow p-4">
                  {this.state.settings ? <Form {...this.state} updateProfile={this.updateUser} close={() => this.setState({settings: false})}/> : 
                  <Blackjack {...this.state} play={this.playGame} newCard={this.pushCard} error={this.handleError} shuffle={this.shuffleCards} stand={this.stand} updateTurn={updateTurn} />}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="h-screen">
              {/* Announcements */}
              <section aria-labelledby="announcements-title" className="h-full">
                <Chat alert={this.handleError}/>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Notification {...this.state} close={this.updateNotification} />
      <Footer />
      
    </div>
  )
}
}
