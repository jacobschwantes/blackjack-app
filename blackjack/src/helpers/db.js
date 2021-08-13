import { db } from "../services/firebase";
// Update user profile data
export function writeUserData(userId, name, imageUrl) {
  return db.ref("users/profile/" + userId).update({
    username: name,
    picture: imageUrl,
    uid: userId
  });
}
export function updateSettings(userId, darkMode, enabled) {
  return db.ref("users/settings/" + userId).update({
    dark_mode: darkMode,
    chat_enabled: enabled
  });
}
export function writeXP(userId, xp) {
  return db.ref("users/profile/" + userId).update({
    xp,
    lvl: (Math.trunc(xp / 1000) + 1)
  });
}
// Update user stats
export function writeUserHands(userId, hands) {
  return db.ref("users/session/" + userId + "/stats").update({
    hands: hands,
  });
}
export function writeUserStats(userId) {
  return db.ref("users/session/" + userId + "/stats").update({
    hands: 0,
    blackjacks: 0,
    wins: 0
  });
}
export function writeUserBlackjack(userId, blackjacks) {
  return db.ref("users/session/" + userId + "/stats").update({
    blackjacks: blackjacks
  });
}
export function writeUserWins(userId, wins) {
  return db.ref("users/session/" + userId + "/stats").update({
    wins: wins
  });
}
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
export function writeDealerHiddenCard(userID, card) {
  return db.ref("users/session/" + userID + "/game/dealer_hidden").push({
    card
  })
}
export function writeDealerHiddenScore(userID, score) {
  return db.ref("users/session/" + userID + "/game").update({
    dealer_hidden_score: score
  })
}
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







