import { storage } from "../services/firebase";
// upload profile picture to firebase storage
export function uploadPicture(uid, file) {
    return storage.child('profile_pictures/' + uid).put(file)
}