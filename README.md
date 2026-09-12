# Speak Up — English speaking fluency course

A level-based English speaking course with account login, progress tracking,
and an AI speaking partner students can talk to out loud.

## What's inside

```
index.html              landing page + sign up / log in
dashboard.html           level overview with progress bars
lesson.html               units, vocabulary, pronunciation practice
speaking-partner.html    voice conversation with the AI
css/styles.css             all styling
data/curriculum.js         lesson content (edit this to add levels/units/words)
js/firebase-config.js      your Firebase project keys go here
js/auth.js                sign up / log in / log out
js/progress.js             reads & writes progress in Firestore
js/speech.js                browser speech-to-text and text-to-speech
js/ai-partner.js            talks to the Cloud Function proxy below
functions/index.js         server-side proxy that calls the Claude API
firestore.rules             security rules (users can only see their own data)
```

## How it fits together

- **Hosting**: GitHub Pages serves the static files (HTML/CSS/JS) for free.
- **Accounts + database**: Firebase Authentication + Firestore (also free at this scale).
- **Voice**: the browser's built-in Web Speech API — no cost, no extra setup, works in Chrome/Edge.
- **AI speaking partner**: a Firebase Cloud Function holds your Claude API key
  server-side and forwards chat messages to it, so the key is never exposed
  in the browser's source code.

## Setup steps

### 1. Create a Firebase project
1. Go to console.firebase.google.com → **Add project** (free "Spark" plan is enough to start).
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. In **Build → Firestore Database**, click **Create database** (start in test mode, then apply the rules below).
4. In **Project settings → General → Your apps**, click the web icon `</>` to register a web app, and copy the config object it gives you.
5. Paste that config into `js/firebase-config.js`.

### 2. Apply the security rules
Install the Firebase CLI once: `npm install -g firebase-tools`, then:
```
firebase login
firebase init firestore   # point it at this folder, keep the default file names
firebase deploy --only firestore:rules
```

### 3. Deploy the AI speaking partner function
1. Get an Anthropic API key from console.anthropic.com.
2. From this project folder:
   ```
   firebase init functions     # choose JavaScript, don't overwrite functions/index.js
   cd functions && npm install
   firebase functions:config:set anthropic.key="YOUR_ANTHROPIC_API_KEY"
   cd ..
   firebase deploy --only functions
   ```
3. Copy the URL it prints (looks like `https://us-central1-yourproject.cloudfunctions.net/chatWithPartner`)
   and paste it into `CLOUD_FUNCTION_URL` in `js/ai-partner.js`.

> **Want to test instantly without deploying a function first?** You can
> temporarily call the Claude API directly from `ai-partner.js` with your
> API key pasted in the browser code. This works for trying things out on
> your own machine, but never publish a site like that — anyone could read
> your key from the page source and run up your bill. Switch to the Cloud
> Function before sharing the site with real students.

### 4. Push to GitHub and turn on Pages
```
git init
git add .
git commit -m "Speak Up course site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/speak-up.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Source: Deploy from branch → main → / (root)**.
Your site will be live at `https://YOUR_USERNAME.github.io/speak-up/`.

### 5. Try it
Open the live URL, create an account, pick Level 0, and start a lesson.
The microphone button needs HTTPS to work in the browser — GitHub Pages
already serves over HTTPS, so this works out of the box once deployed
(on `localhost` it also works for local testing).

## Extending the course

All lesson content lives in `data/curriculum.js` as plain JavaScript objects —
add new levels, units, or vocabulary words there without touching any other file.
Each unit needs: a title, a list of `{ en, hint }` words, and a `speakingPrompt`
string used to open the AI conversation for that unit.

## Notes & next steps worth knowing about

- **Pronunciation scoring** in `speech.js` currently does simple word-matching.
  For real phoneme-level scoring, look into a dedicated pronunciation API later.
- **Cost**: Claude API calls cost a small amount per message (check current
  pricing at anthropic.com). Firebase's free tier comfortably covers a few
  hundred active students.
- **Safari support** for the Web Speech API is partial — Chrome and Edge give
  the most reliable experience for now.
