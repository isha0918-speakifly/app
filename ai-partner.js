// Talks to your Firebase Cloud Function proxy (see /functions/index.js),
// which in turn calls the Claude API. The API key never touches the browser.
//
// After deploying the function, paste its URL below. It looks like:
// https://us-central1-YOUR_PROJECT.cloudfunctions.net/chatWithPartner

const CLOUD_FUNCTION_URL = "PASTE_YOUR_CLOUD_FUNCTION_URL_HERE";

const AIPartner = (() => {
  let history = []; // { role: "user" | "assistant", content: string }

  function reset(systemTopic) {
    history = [];
    if (systemTopic) {
      history.push({ role: "assistant", content: systemTopic });
    }
  }

  async function send(userText, level) {
    history.push({ role: "user", content: userText });

    const response = await fetch(CLOUD_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, level })
    });

    if (!response.ok) {
      throw new Error("The AI partner is unavailable right now (" + response.status + ").");
    }

    const data = await response.json();
    const reply = data.reply;
    history.push({ role: "assistant", content: reply });
    return reply;
  }

  function getHistory() {
    return history;
  }

  return { reset, send, getHistory };
})();
