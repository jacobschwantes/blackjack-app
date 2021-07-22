import { db } from "../services/firebase";

export function readChats() {
  let abc = [];
  db.ref("cards").on("value", snapshot => {
    snapshot.forEach(snap => {
      abc.push(snap.val())
    });
    return abc;
  });
}

export function writeChats(message) {
  return db.ref("cards").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
    profileSrc: message.profileSrc,
    displayName: message.displayName
  });
}
