import { db } from "../services/firebase";
// Update user profile picture url, username, and user id
export function writeUserData(userId, name, imageUrl) {
  return db.ref("users/profile/" + userId).update({
    username: name,
    picture: imageUrl,
    uid: userId
  });
}
// update dark mode and chat visibility preference
export function updateSettings(userId, darkMode, enabled) {
  return db.ref("users/settings/" + userId).update({
    dark_mode: darkMode,
    chat_enabled: enabled
  });
}
// updates user xp and level
export function writeXP(userId, xp) {
  return db.ref("users/profile/" + userId).update({
    xp,
    lvl: (Math.trunc(xp / 1000) + 1)
  });
}
// updates users win and blackjack streak, if it is exceptionally long, a system message will be written to chat announcing it
export function writeStreak(username, userID, win_streak, blackjack_streak) {
  switch (win_streak) {
    case 6:
      writeSystemMessage('win', username, win_streak);
      break;
    case 8:
      writeSystemMessage('win', username, win_streak);
      break;
    case 10:
      writeSystemMessage('win', username, win_streak);
      break;
    default:
      break;
  }
  switch (blackjack_streak) {
    case 3:
      writeSystemMessage('blackjack', username, win_streak);
      break;
    case 4:
      writeSystemMessage('blackjack', username, win_streak);
      break;
    default:
      break;
  }
  // updates streaks
  return db.ref("users/session/" + userID + '/stats').update({
    win_streak,
    blackjack_streak
  });
}
// system message for blackjack and win streaks
export function writeSystemMessage(type, username, streak) {
  return db.ref("chats").push({
    content: (type === 'blackjack' ? "Wow! " + username + " has had " + streak + " blackjacks in a row!" : username + " is on fire! They've won " + streak + " hands in a row!"),
    timestamp: Date.now(),
    uid: 'Rej3CBkXbLch63BMvGv1iWjijSJ3',
  });
}
// updates total hands, blackjacks, and wins
export function writeUserStats(userId, hands, wins, blackjacks) {
  return db.ref("users/session/" + userId + "/stats").update({
    hands,
    blackjacks,
    wins
  });
}
// write xp award summary to be show in after game card
export function writeXPSummary(userId, summary) {
  return db.ref("users/session/" + userId + "/game").update({
    summary
  });
}
// Write deck info; last used and deck id
export function writeDeck(userId, deck_id, timestamp) {
  return db.ref("users/session/" + userId + "/deck").update({
    deck_id: deck_id,
    last_used: timestamp
  });
}
// write remaining cards in deck - used to check when a shuffle is required
export function writeRemaining(userId, remaining) {
  return db.ref("users/session/" + userId + "/deck").update({
    remaining: remaining,
  })
}
// Update timestamp when deck last used; deck ids expire after being inactive for 2 weeks
export function updateTimestamp(userId, timestamp) {
  return db.ref("users/session/" + userId + "/deck").update({
    last_used: timestamp
  });
}
// update game in progress status
export function updateGameStatus(userID, status) {
  return db.ref("users/session/" + userID + "/game").update({
    game_in_progress: status,
  })
}
// Push drawn card to db
export function writeCard(userID, seat, card) {
  return db.ref("users/session/" + userID + "/game/" + seat + "_cards").push({
    card
  })
}
// push dealer hidden card array - to be used during players turn
export function writeDealerHiddenCard(userID, card) {
  return db.ref("users/session/" + userID + "/game/dealer_hidden").push({
    card
  })
}
// update dealers hidden score - based on first card drawn, to be show file it is players turn
export function writeDealerHiddenScore(userID, score) {
  return db.ref("users/session/" + userID + "/game").update({
    dealer_hidden_score: score
  })
}
// write reason for hand result ex. player bust, dealer bust, score. to be show on after hand screen
export function writeReason(userID, reason) {
  return db.ref("users/session/" + userID + "/game").update({
    reason: reason
  })
}
// Update player and dealer bust status
export function updateBust(userID, player, dealer) {
  return db.ref("users/session/" + userID + "/game").update({
    dealer_bust: dealer,
    player_bust: player
  })
}
// Update which seats turn it is
export function updateTurn(userID, seat) {
  return db.ref("users/session/" + userID + "/game").update({
    turn: seat
  })
}
// Update game in progress status to false; ends game
export function endGame(userID, victor) {
  return db.ref("users/session/" + userID + "/game").update({
    game_over: true,
    victor: victor
  })
}
// Update seats soft and hard score
export function updateScore(userID, seat, soft_score, hard_score) {
  return db.ref("users/session/" + userID + "/game").update({
    [seat + '_soft']: soft_score,
    [seat + '_hard']: hard_score
  })
}
// Clears session tree to be ready for a new game
export function newSession(userID) {
  return db.ref("users/session/" + userID + "/game").set({
    game_over: false,
    dealer_cards: [],
    player_cards: [],
    dealer_bust: false,
    player_bust: false,
    player_soft: 0,
    player_hard: 0,
    dealer_soft: 0,
    dealer_hard: 0,
    turn: 'player',
    victor: false,
    dealer_hidden: [],
    dealer_hidden_score: 0,
    reason: '',
    summary: []
  })
}