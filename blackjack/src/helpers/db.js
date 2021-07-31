import { db } from "../services/firebase";

export function writeUserData(userId, name, imageUrl) {
  return db.ref("users/" + userId).update({
    username: name,
    picture : imageUrl,
    uid: userId
  });
}

export function writeUserStats(userId, hands, wins, blackjacks) {
  return db.ref("users/" + userId + "/stats").update({
    hands: hands,
    wins : wins,
    blackjacks: blackjacks
  });
}

export function getUserInfo(uid) {
  let userRef = db.ref("users/" + uid);
  userRef.on('value', (snapshot) => {
  const data = snapshot.val();
  return data;
});
}





