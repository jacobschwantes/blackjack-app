import { updateTimestamp, writeDeck } from "./db";
export async function checkDeck(uid, data) {
    // checks if deck node exists in db
    if (data) {
        // checks if deck id is expired; if expired fetches and sets new deck id
        if (new Date() - data.last_used > (7 * 24 * 60 * 60 * 1000)) {
            let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
                .then(response => response.json())
                .then(data => { return data })
            writeDeck(uid, deck.deck_id, Date.now())
            return deck.deck_id

        }
        // not expired; sets state with deck id
        else {
            return data.deck_id
        }
    }
    // deck node does not exist; fetch new deck id and set state and db
    else {
        let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
            .then(response => response.json())
            .then(data => { return data })
        writeDeck(uid, deck.deck_id, Date.now())
        return deck.deck_id
    }
}

export async function drawCards(uid, deck_id, count) {
    updateTimestamp(uid, Date.now())
    return await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`,{ 
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
        .then(response => response.json())
        .then(data => { return data })
        .catch(err => {return err})
}

export async function shuffleDeck(deck_id) {
    return await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
        .then(response => response.json())
        .then(data => data.success)
}