import React, { Component, Fragment } from "react";
import { auth, db } from "../services/firebase";
import Navigation from "../components/Navigation";
import Chat from "./Chat";
import { Popover, Transition } from '@headlessui/react'
import Blackjack from "../components/Blackjack";
import { checkDeck, drawCards, shuffleDeck } from "../helpers/api";
import Notification from "../components/Notification";
import Settings from "../components/Settings";
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { endGame, newSession, updateScore, updateTurn, writeCard, writeDealerHiddenCard, writeDealerHiddenScore, writeReason, writeUserData, updateTimestamp, updateSettings, writeXP, writeXPSummary, writeStreak, writeUserStats } from "../helpers/db";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { uploadPicture } from "../helpers/storage";
import Modal from "../components/Modal";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      url: 'loading.jpg',
      username: 'Loading',
      open: false,
      modal: false,
      stats: [
        { label: 'Hands played', value: 0 },
        { label: 'Wins', value: 0 },
        { label: 'Blackjacks', value: 0 },
      ],
      readError: null,
      notification: false,
      deck_id: '',
      dealer_hidden: [],
      dealer_hidden_score: 0,
      cards_remaining: 0,
      player_soft: 0,
      player_hard: 0,
      dealer_hard: 0,
      dealer_soft: 0,
      player_bust: false,
      dealer_bust: false,
      error: null,
      notification_message: null,
      game_over: true,
      turn: 'player',
      victor: false,
      reason: '',
      wins: 0,
      hands: 0,
      blackjacks: 0,
      failed: 0,
      chat_enabled: true,
      mobile_open: false,
      dark: true,
      xp: 0,
      lvl: 1,
      active: 'blackjack'
    };
    this.update = this.update.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.pushCard = this.pushCard.bind(this);
    this.checkScore = this.checkScore.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.handleError = this.handleError.bind(this);
    this.playGame = this.playGame.bind(this);
    this.checkVictor = this.checkVictor.bind(this);
    this.stand = this.stand.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.myRef = React.createRef();
  }
  async componentDidMount() {
    try {
      // listen for changes in user stats and updates state
      db.ref("users/session/" + this.state.user.uid + "/stats").on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
          this.setState({
            stats: [
              { label: 'Hands played', value: (data.hands ? data.hands : 0) },
              { label: 'Wins', value: (data.wins ? data.wins : 0) },
              { label: 'Blackjack', value: (data.blackjacks ? data.blackjacks : 0) },
            ],
            wins: (data.wins ? data.wins : 0),
            hands: (data.hands ? data.hands : 0),
            blackjacks: (data.blackjacks ? data.blackjacks : 0),
            win_streak: (data.win_streak ? data.win_streak : 0),
            blackjack_streak: (data.blackjack_streak ? data.blackjack_streak : 0)
          });
        }
      })
      // listens for updates to profile information like level and username and updates state
      db.ref("users/profile/" + this.state.user.uid).on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
          if (data.xp === undefined) {
            writeXP(this.state.user.uid, 0);
            this.setState({
              username: data.username,
              url: data.picture
            });
          } else {
            this.setState({
              xp: data.xp,
              lvl: data.lvl,
              username: data.username,
              url: data.picture
            });
          }
        }
      })
      // listen for changes in dark mode and chat visiblity settings
      db.ref("users/settings/" + this.state.user.uid).on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
          this.setState({
            dark: (data.dark_mode === 'undefined' ? false : data.dark_mode),
            chat_enabled: (data.chat_enabled === 'undefined' ? true : data.chat_enabled),
          });
        }
      })
      // checks if deck id is valid
      db.ref("users/session/" + this.state.user.uid + "/deck").on("value", snapshot => {
        let data = snapshot.val();
        if (!this.state.deletion_in_progress) {
          checkDeck(this.state.user.uid, data)
            .then(response => { this.setState(() => ({ deck_id: response })) })
        }
      })
      // updates player card array
      db.ref("users/session/" + this.state.user.uid + "/game/player_cards").on("value", snapshot => {
        let player = [];
        snapshot.forEach((snap) => {
          player.push(snap.val().card);
        });
        this.setState({ player });
      });
      // updates dealer card array
      db.ref("users/session/" + this.state.user.uid + "/game/dealer_cards").on("value", snapshot => {
        let dealer = [];
        snapshot.forEach((snap) => {
          dealer.push(snap.val().card);
        });
        this.setState({ dealer });
      });
      // update hidden dealer card array - rendered during players turn
      db.ref("users/session/" + this.state.user.uid + "/game/dealer_hidden").on("value", snapshot => {
        let dealer_hidden = [];
        snapshot.forEach((snap) => {
          dealer_hidden.push(snap.val().card);
        });
        this.setState({ dealer_hidden });
      });
      // sets game state properties
      db.ref("users/session/" + this.state.user.uid + "/game").on("value", snapshot => {
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
            victor: data.victor,
            dealer_hidden_score: data.dealer_hidden_score,
            reason: data.reason,
            summary: data.summary
          });
        }
        else {
          this.setState({ new_player: true })
        }
      })
    }
    catch (error) {
      this.setState({ readError: error })
      this.setState({
        stats: [
          { label: 'Hands played', value: 0 },
          { label: 'Wins', value: 0 },
          { label: 'Blackjack', value: 0 },
        ]
      });
    }
  }
// changes which page is show in main container
  update(page) {
    this.setState(() => ({ active: page, mobile_open: false }))
  }
 // check file size of profile picture, user profile information on settings page submit 
  async updateUser(name, file, darkMode, chat) {
    if (file) {
      if (file.size < 4194304) {
        let upload = uploadPicture(this.state.user.uid, file)
        upload.on(
          (error) => {
            this.setState({
              error: error,
              notification: true
            })
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              writeUserData(this.state.user.uid, name, downloadURL);
              updateSettings(this.state.user.uid, darkMode, chat)
              this.state.user.updateProfile({
                displayName: name,
                photoURL: downloadURL
              });
              this.setState({
                username: name,
                url: downloadURL,
                notification_message: "Profile has been updated.",
                notification: true
              })
            });
          }
        );
      } else {
        this.setState({
          error: 'File size is too large. 4MB Limit.',
          notification: true
        })
      }
    }
    else {
      await writeUserData(this.state.user.uid, name, this.state.user.photoURL);
      await updateSettings(this.state.user.uid, darkMode, chat);
      await this.state.user.updateProfile({
        displayName: name
      });
      this.setState({
        notification_message: "Profile has been updated.",
        notification: true
      })
    }
  }
  // check soft and hard score of drawn card
  async checkScore(player, card) {
    if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      return [10, 10]
    }
    if (card.value.includes('ACE')) {
      if (this.state[player + '_soft'] + 11 <= 21) {
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
  // handles drawing card api request, checks if response is valid, checks and updates score, checks for bust and if player score is 21 to auto stand
  async pushCard(player) {
    if (!this.state.player_bust) {
      this.setState({ dealing: true });
      let response = await drawCards(this.state.deck_id, 1);
      if (response.cards) {
        this.setState({ failed: 0 })
        await writeCard(this.state.user.uid, player, response.cards[0], this.state[player])
        this.setState(() => ({
          cards_remaining: response.remaining
        }));
        let score = await this.checkScore(player, response.cards[0])
        updateScore(this.state.user.uid, player, (this.state[player + '_soft'] + score[0]), (this.state[player + '_hard'] + score[1]))
        if (player === 'player' && (this.state.player_hard === 21 || this.state.player_soft === 21)) {
          await updateTurn(this.state.user.uid, 'dealer');
          setTimeout(() => {
            this.stand();
          }, 1000)
        }
        if (player === 'dealer' && this.state.dealer.length === 1) {
          if (score[0] === score[1]) {
            await writeDealerHiddenScore(this.state.user.uid, score[0])
          }
          else {
            writeDealerHiddenScore(this.state.user.uid, score[0] + ' / ' + score[1])
          }
        }
        if (this.state[player + '_hard'] > 21) {
          await updateTurn(this.state.user.uid, 'dealer')
          await writeReason(this.state.user.uid, player === 'dealer' ? 'Dealer bust' : 'Player bust')
          setTimeout(() => {
            // check who bust
            if (player === 'dealer') {
              // dealer bust
              writeUserStats(this.state.user.uid, (this.state.hands + 1), (this.state.wins + 1), this.state.blackjacks)
              writeStreak(this.state.username, this.state.user.uid, (this.state.win_streak + 1), this.state.blackjack_streak);
              writeXP(this.state.user.uid, (this.state.xp + 100))
              writeXPSummary(this.state.user.uid, [{ event: 'Play a hand', value: 50 }, { event: 'Win a hand', value: 100 }])
            }
            else {
              // player bust
              writeUserStats(this.state.user.uid, (this.state.hands + 1), this.state.wins, this.state.blackjacks)
              writeStreak(this.state.username, this.state.user.uid, 0, 0);
              writeXP(this.state.user.uid, (this.state.xp + 50))
              writeXPSummary(this.state.user.uid, [{ event: 'Play a hand', value: 50 }])
            }
            endGame(this.state.user.uid, player === 'dealer' ? 'Player' : 'Dealer')
          }, 750)
          if (this.state.cards_remaining < 121) {
            await this.shuffleCards()
          }
        }
        this.setState({ dealing: false })
      }
      // handles bad response from api
      else {
        this.setState((prevState) => ({
          failed: prevState.failed + 1
        }));
        if (this.state.failed <= 3) {
          await this.pushCard(player)
        }
        else {
          // 3 bad requests in a row - usually lost internet connection
          this.setState({ error: 'There was a problem with that request. Please try again later.' })
          this.setState({ notification: true })
        }
      }
    }
  }
  // initializes game, deals cards, checks if anyone has blackjack
  async playGame() {
    this.setState(() => ({
      new_player: false,
      player_bust: false,
      dealing: true
    }))
    await updateTimestamp(this.state.user.uid, Date.now())
    await newSession(this.state.user.uid)
    await this.pushCard('player');
    await this.pushCard('dealer');
    await writeDealerHiddenCard(this.state.user.uid, this.state.dealer[0]);
    await this.pushCard('player');
    await this.pushCard('dealer');
    await writeDealerHiddenCard(this.state.user.uid, {
      "code": "1B",
    });
    this.setState({ dealing: false });
    if (this.state.dealer_soft === 21 || this.state.player_soft === 21) {
      if (this.state.player_soft === 21 && this.state.dealer_soft !== 21) {
        writeReason(this.state.user.uid, 'Blackjack!');
        endGame(this.state.user.uid, 'Player');
        writeUserStats(this.state.user.uid, (this.state.hands + 1), (this.state.wins + 1), (this.state.blackjacks + 1))
        writeStreak(this.state.username, this.state.user.uid, (this.state.win_streak + 1), (this.state.blackjack_streak + 1));
        writeXP(this.state.user.uid, (this.state.xp + 250));
        writeXPSummary(this.state.user.uid, [{ event: 'Play a hand', value: 50 }, { event: 'Win a hand', value: 50 }, { event: 'Blackjack', value: 150 }]);
      } else {
        updateTurn(this.state.user.uid, 'dealer');
        this.checkVictor();
      }
    }
  }
  // player and dealer have stood, evaluates 'true score' and checks of won
  async checkVictor() {
    let dealerTrueScore = 0;
    let playerTrueScore = 0;
    if (this.state.dealer_soft <= 21) {
      dealerTrueScore = this.state.dealer_soft;
    }
    else {
      dealerTrueScore = this.state.dealer_hard;
    };
    if (this.state.player_soft <= 21) {
      playerTrueScore = this.state.player_soft;
    }
    else {
      playerTrueScore = this.state.player_hard
    };
    await writeReason(this.state.user.uid, playerTrueScore + ' - ' + dealerTrueScore)
    setTimeout(() => {
      if (playerTrueScore > dealerTrueScore) {
        writeUserStats(this.state.user.uid, (this.state.hands + 1), (this.state.wins + 1), this.state.blackjacks)
        writeStreak(this.state.username, this.state.user.uid, (this.state.win_streak + 1), this.state.blackjack_streak);
        writeXP(this.state.user.uid, (this.state.xp + 100))
        writeXPSummary(this.state.user.uid, [{ event: 'Play a hand', value: 50 }, { event: 'Win a hand', value: 50 }])
      } else {
        writeUserStats(this.state.user.uid, (this.state.hands + 1), this.state.wins, this.state.blackjacks)
        writeStreak(this.state.username, this.state.user.uid, 0, 0);
        writeXP(this.state.user.uid, (this.state.xp + 50))
        writeXPSummary(this.state.user.uid, [{ event: 'Play a hand', value: 50 }])
      };
      setTimeout(() => { endGame(this.state.user.uid, playerTrueScore === dealerTrueScore ? 'push' : playerTrueScore > dealerTrueScore ? 'Player' : 'Dealer') }, 500)
    }, 500);
    if (this.state.cards_remaining < 121) {
      await this.shuffleCards()
    }
  }
// shuffle cards - can be called manually after a game or is called automatically when 2/3 of the cards have been dealt
  async shuffleCards() {
    let response = await shuffleDeck(this.state.deck_id)
    if (response.remaining) {
      this.setState(() => ({
        cards_remaining: response.remaining,
        notification_message: "Cards have been shuffled.",
        notification: true
      }))
    }
    else {
      this.setState({ error: 'There was a problem with that request. Please try again.' })
      this.setState({ notification: true })
    }
  }
  // player stands - dealer hits until 17
  async stand() {
    if (!this.state.game_over) {
      if (this.state.dealer_hard >= 17 || (this.state.dealer_soft >= 17 && this.state.dealer_soft <= 21)) {
        this.checkVictor()
      }
      else {
        await this.pushCard('dealer').then(
          setTimeout(() => { this.stand(); }, 1500)
        )
        
      }
    }
  }
// deletes user account, removes all chats from user, profile, session, and settings tree in db
  async removeUser() {
    this.setState(() => ({ modal: false, deletion_in_progress: true }));
    db.ref("chats").get().then(snapshot => {
      snapshot.forEach((snap) => {
        if (snap.val().uid === this.state.user.uid)
          db.ref("chats/" + snap.key).remove()
      });
    }).then(() => {
      this.state.user.delete();
      db.ref("users/profile/" + this.state.user.uid).remove();
      db.ref("users/settings/" + this.state.user.uid).remove();
      db.ref("users/session/" + this.state.user.uid).remove();
    })
  }
  // closes notification
  updateNotification() {
    this.setState(() => ({
      notification: false,
      error: null,
      notification_message: null
    }))
  }
// opens error notification
  handleError(message) {
    this.setState({ error: message });
    this.setState({ notification: true });
  }
  // clears users game - used for stuck game from api errors
  clearSession() {
    db.ref("users/session/" + this.state.user.uid + "/game").remove();
    this.setState({active: 'blackjack'});
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  render() {
    return (
      <div className={this.state.dark ? "dark" : null}>
        <div className=" bg-gray-50 dark:bg-gray-900" >
          <Modal {...this.state} reset={this.removeUser} update={() => this.setState({ modal: false })} />
          <Popover as="header" className={" pb-24  " + (this.state.dark ? null : "bg-gradient-to-r from-sky-800 to-cyan-600")}>
            {({ open }) => (
              <>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                    {/* Logo */}
                    <div className="absolute left-0 py-1 top-0 flex-shrink-0 lg:static">
                      <a href="/">
                        <h1 className="text-3xl tracking-tight font-extrabold sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-gray-50 xl:inline ">Blackjack</h1>
                      </a>
                    </div>
                    {/* Right section on desktop */}
                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                      {/* Profile dropdown */}
                      <Navigation {...this.state} update={this.update} />
                    </div>
                    {/* Menu button */}
                    <div className="absolute right-0 top-1 flex-shrink-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-white dark:text-gray-50 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white ">
                        <span className="sr-only">Open main menu</span>
                        {this.state.mobile_open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" onClick={() => this.setState({ mobile_open: true })} />
                        )}
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <Transition.Root show={this.state.mobile_open} as={Fragment}>
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
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800  divide-gray-200">
                          <div className="pt-4 pb-2">
                            <div className="flex items-center px-5">

                              <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={this.state.url} alt="" />
                              </div>
                              <div className="ml-3 min-w-0 flex-1">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-50 truncate">{this.state.username}</div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{this.state.user.email}</div>
                              </div>
                              <Popover.Button className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon onClick={() => { this.setState({ mobile_open: false }) }} className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                            <div className="mt-3 px-2 space-y-1">

                              <button
                                key="settings"
                                onClick={() => this.update('settings')}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 dark:text-gray-50 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                Settings
                              </button>
                              <button
                                onClick={() => auth().signOut()}
                                key="sign_out"
                                className="block rounded-md px-3 py-2 text-base text-gray-900 dark:text-gray-50 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                Sign out
                              </button>
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
          <main className="-mt-24 lg:h-screen  min-h-screen">
            <div className="max-w-3xl mx-auto px-0 sm:px-6 lg:max-w-7xl lg:px-8 h-full">
              {/* Main 3 column grid */}
              <div className={"h-full lg:mt-0 sm:mt-14 grid grid-cols-1 gap-1 items-start lg:gap-5 " + (this.state.chat_enabled ? "lg:grid-cols-3" : "lg:grid-cols-1")}>
                {/* Left column */}
                <div className={"grid grid-cols-1 lg:col-span-2 lg:h-screen " + (this.state.chat_enabled ? "lg:col-span-2" : "lg:col-span-1")}>
                  <div className="flex flex-col lg:h-screen">
                    {/* Welcome panel */}
                    <section aria-labelledby="profile-overview-title " >
                      <div className="sm:rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow">
                        <h2 className="sr-only" id="profile-overview-title">
                          Profile Overview
                        </h2>
                        <div className="bg-white dark:bg-gray-800 px-5 pt-6 pb-2 ">
                          <div className="sm:flex sm:items-center sm:justify-between flex ">
                            <div className="flex-grow">
                              <Welcome {...this.state} />
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-600 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                          {this.state.stats.map((stat) => (
                            <div key={stat.label} className="px-6 py-4 text-sm font-medium text-center">
                              <span className="text-gray-900 dark:text-gray-50">{stat.value}</span>{' '}
                              <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                    {/* main container */}
                    <section aria-labelledby="quick-links-title" className=" h-screen lg:flex-1 mt-4 sm:rounded-lg bg-white dark:bg-gray-800 lg:overflow-scroll  shadow scrollbar-hide p-4">
                      {this.state.active === 'settings' ? <Settings {...this.state} updateProfile={this.updateUser} clear={this.clearSession} reset={() => this.setState({ modal: true })} close={() => this.setState({ active: 'blackjack' })} /> :
                         <Blackjack {...this.state} play={this.playGame} newCard={this.pushCard} error={this.handleError} shuffle={this.shuffleCards} stand={this.stand} updateTurn={updateTurn} />}
                    </section>
                  </div>
                </div>
                {/* chat container */}
                {this.state.chat_enabled ?
                  <div>
                    <section aria-labelledby="announcements-title" className="h-screen">
                      <Chat alert={this.handleError} {...this.state} />
                    </section>
                  </div>
                  : null
                }
              </div>
            </div>
            <Footer />
          </main>
          <Notification {...this.state} close={this.updateNotification} />
        </div>
      </div>
    )
  }
}
