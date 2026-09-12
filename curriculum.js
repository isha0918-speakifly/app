// Curriculum content, kept as plain data so non-developers can extend it
// without touching any app logic. Add more units/words freely.

const CURRICULUM = [
  {
    id: "level0",
    title: "Level 0 · Foundation",
    subtitle: "For learners starting with zero English words",
    units: [
      {
        id: "l0-u1",
        title: "Greetings & yourself",
        words: [
          { en: "Hello", hint: "a greeting" },
          { en: "My name is...", hint: "introducing yourself" },
          { en: "Yes", hint: "" },
          { en: "No", hint: "" },
          { en: "Please", hint: "" },
          { en: "Thank you", hint: "" },
          { en: "Sorry", hint: "" },
          { en: "I am fine", hint: "" }
        ],
        speakingPrompt:
          "Practice introducing yourself: say your name, where you are from, and one thing you like."
      },
      {
        id: "l0-u2",
        title: "Numbers & family",
        words: [
          { en: "One", hint: "" }, { en: "Two", hint: "" }, { en: "Three", hint: "" },
          { en: "Mother", hint: "" }, { en: "Father", hint: "" },
          { en: "Brother", hint: "" }, { en: "Sister", hint: "" }
        ],
        speakingPrompt: "Count from one to ten out loud, then describe your family in 3 short sentences."
      }
    ]
  },
  {
    id: "level1",
    title: "Level 1 · Basic Communication (A1)",
    subtitle: "Simple present tense, daily topics",
    units: [
      {
        id: "l1-u1",
        title: "Daily routine",
        words: [
          { en: "I wake up", hint: "" }, { en: "I eat breakfast", hint: "" },
          { en: "I go to work", hint: "" }, { en: "I sleep", hint: "" }
        ],
        speakingPrompt: "Describe your daily routine from morning to night, one sentence per activity."
      },
      {
        id: "l1-u2",
        title: "Ordering food",
        words: [
          { en: "I would like...", hint: "" }, { en: "How much is this?", hint: "" },
          { en: "The bill, please", hint: "" }, { en: "Delicious", hint: "" }
        ],
        speakingPrompt: "Role-play ordering a meal at a restaurant with the AI speaking partner."
      }
    ]
  },
  {
    id: "level2",
    title: "Level 2 · Everyday Fluency (A2)",
    subtitle: "Past & future tense, storytelling",
    units: [
      {
        id: "l2-u1",
        title: "Talking about yesterday",
        words: [
          { en: "I went", hint: "" }, { en: "I saw", hint: "" },
          { en: "I ate", hint: "" }, { en: "It was fun", hint: "" }
        ],
        speakingPrompt: "Tell the AI partner what you did yesterday, in at least five sentences."
      }
    ]
  },
  {
    id: "level3",
    title: "Level 3 · Conversational Confidence (B1)",
    subtitle: "Opinions, agreement, debate",
    units: [
      {
        id: "l3-u1",
        title: "Sharing opinions",
        words: [
          { en: "I think that...", hint: "" }, { en: "I agree", hint: "" },
          { en: "I disagree because...", hint: "" }, { en: "In my opinion...", hint: "" }
        ],
        speakingPrompt: "Debate with the AI partner: is it better to live in a city or a village?"
      }
    ]
  },
  {
    id: "level4",
    title: "Level 4 · Fluency & Nuance (B2)",
    subtitle: "Free conversation, tone, idioms",
    units: [
      {
        id: "l4-u1",
        title: "Free talk",
        words: [
          { en: "To be honest...", hint: "" }, { en: "That said...", hint: "" },
          { en: "On the other hand...", hint: "" }
        ],
        speakingPrompt: "Have a completely free 10-minute conversation with the AI partner on any topic you choose."
      }
    ]
  }
];
