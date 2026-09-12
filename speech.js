// Thin wrapper around the browser's built-in Web Speech API.
// Works in Chrome/Edge out of the box. Safari has partial support.
// No API key or cost involved — this runs entirely in the browser.

const SpeechEngine = (() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognizer = null;

  function isSupported() {
    return !!SpeechRecognition && !!window.speechSynthesis;
  }

  function listenOnce({ onResult, onError, onEnd }) {
    if (!SpeechRecognition) {
      onError && onError("Speech recognition isn't supported in this browser. Try Chrome.");
      return;
    }
    recognizer = new SpeechRecognition();
    recognizer.lang = "en-US";
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    recognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      onResult && onResult(transcript, confidence);
    };
    recognizer.onerror = (event) => onError && onError(event.error);
    recognizer.onend = () => onEnd && onEnd();

    recognizer.start();
  }

  function stopListening() {
    recognizer && recognizer.stop();
  }

  function speak(text, { rate = 0.95, onEnd } = {}) {
    window.speechSynthesis.cancel(); // stop anything currently speaking
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = rate;
    utter.onend = onEnd || null;
    window.speechSynthesis.speak(utter);
  }

  // Very simple pronunciation check: compares the recognized words
  // against the target phrase. Good enough for a first version —
  // swap in a dedicated pronunciation-scoring API later if you want
  // phoneme-level accuracy.
  function scorePronunciation(target, heard) {
    const clean = (s) => s.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/);
    const targetWords = clean(target);
    const heardWords = clean(heard);
    let matches = 0;
    targetWords.forEach((w, i) => {
      if (heardWords[i] === w) matches++;
    });
    return Math.round((matches / targetWords.length) * 100);
  }

  return { isSupported, listenOnce, stopListening, speak, scorePronunciation };
})();
