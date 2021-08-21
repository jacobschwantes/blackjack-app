# Blackjack App
Have fun with others while improving your blackjack game. 
- oAuth google, twitter, and github signin methods 
- Site wide user chat
- User profiles with profile picture upload and name changes
- Stats tracking of total hands played, wins, and blackjacks
- Dark mode and chat visibility toggle
- XP and leveling system
- Responsive, mobile support

## Stack
- React, bootstrapped with create-react-app
- TailwindUI/CSS, styling
- Firebase, serverless data mangement

# Getting Started

## Dependencies

```bash
# install craco to override postcss config
npm i @craco/craco

# install tailwindcss for create-react-app compatibility
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
[Tailwind docs](https://tailwindcss.com/docs/guides/create-react-app)


## Executing program

```bash
# change to parent directory
cd blackjack

# start development server
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployment
You can easily for free using [Vercel](https://vercel.com/).

### Firebase
You will need to create a [Firebase](https://firebase.google.com/) project to obtain your api keys. You then will need to update the config object with your firebase project keys in blackjack/services/firebase.js.

### Realtime DB
After setting up your project you will need to update your realtime database rules with this code below. This prevents people who are not authorized with your app from writing or reading information from your db.
```
{
  "rules": {
    "chats": {
      ".read": "auth != null",
        ".write": "auth != null"
    },
      "users": {
      ".read": "auth != null",
        ".write": "auth != null"
    }
  }
}
```

## Version History

* 0.1
    * Initial Release
