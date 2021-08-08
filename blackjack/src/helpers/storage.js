import { storage } from "../services/firebase";

export function uploadPicture(uid, file) {
    return storage.child('profile_pictures/' + uid).put(file)
}


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
