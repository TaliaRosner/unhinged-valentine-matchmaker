// script.js

// ---------------------------
// 0) Elements
// ---------------------------
const startCard = document.getElementById("startCard");
const introCard = document.getElementById("introCard");
const gameCard = document.getElementById("gameCard");
const resultCard = document.getElementById("resultCard");

const continueBtn = document.getElementById("continueBtn");
const startBtn = document.getElementById("startBtn");

const promptText = document.getElementById("promptText");
const stepTitle = document.getElementById("stepTitle");
const choicesEl = document.getElementById("choices");

const matchImgEl = document.getElementById("matchImg");
const matchNameEl = document.getElementById("matchName");
const matchTagEl = document.getElementById("matchTag");
const matchBlurbEl = document.getElementById("matchBlurb");

const songTitleEl = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");

const againBtn = document.getElementById("againBtn");
const shareBtn = document.getElementById("shareBtn");
const textTaliaBtn = document.getElementById("textTaliaBtn");

const sassTextEl = document.getElementById("sassText");
const quizUI = document.getElementById("quizUI");

const promptBoxEl = promptText?.parentElement;

const originalShareBtnText = shareBtn?.textContent || "Share your results!";

// ---------------------------
// 1) Prompts (Multiple Choice)
//--------------------------
const prompts = [
  {
    text: "You get a “u up?” text at 1:37 AM. What do you do?",
    choices: [
      {
        label: "Ignore it and go back to sleep like a functional adult",
        vibe: "wholesome",
      },
      { label: "Reply: who is this 😒", vibe: "bickering" },
      { label: "Reply something unhinged for entertainment", vibe: "chaos" },
      {
        label: "Reply with full-sentence confidence and boundaries.",
        vibe: "smooth",
      },
    ],
  },
  {
    text: "Your ideal date night is:",
    choices: [
      { label: "Cozy food + deep convo + early bedtime", vibe: "wholesome" },
      {
        label: "Arguing about nothing then making up over snacks",
        vibe: "bickering",
      },
      { label: "Something that will ruin your reputation", vibe: "chaos" },
      {
        label: "Group outing. Matching fits. Emotional support besties.",
        vibe: "group",
      },
    ],
  },
  {
    text: "Pick your relationship motto:",
    choices: [
      { label: "Peace and emotional safety", vibe: "wholesome" },
      {
        label: "If we’re not lightly fighting, are we even bonding?",
        vibe: "bickering",
      },
      { label: "Bad decisions build character", vibe: "chaos" },
      { label: "Hot but emotionally confusing", vibe: "spicy" },
    ],
  },
  {
    text: "Your friends would describe your dating history as:",
    choices: [
      {
        label: "Surprisingly wholesome and emotionally mature",
        vibe: "wholesome",
      },
      {
        label: "A series of debates disguised as relationships",
        vibe: "bickering",
      },
      { label: "A Netflix documentary waiting to happen", vibe: "chaos" },
      { label: "Basically a group project with feelings.", vibe: "group" },
    ],
  },
  {
    text: "Pick your red flag:",
    choices: [
      { label: "Over-communicates feelings", vibe: "wholesome" },
      { label: "Always has a counter-argument ready", vibe: "bickering" },
      { label: "Thrives in mess and confusion", vibe: "chaos" },
      { label: "Flirts for sport", vibe: "spicy" },
    ],
  },
];

let currentPromptIndex = 0;
const answers = [];
let sassIndex = 0;

// ---------------------------
// 2) Match Options
// ---------------------------
const matches = [
  {
    id: "dolly",
    name: "Dolly Parton",
    tag: "Chaotic Wholesome",
    img: "assets/dolly.jpg",
    blurb:
      "You’re dating joy in rhinestones. You will be emotionally supported, lightly roasted, and occasionally gifted life advice disguised as kindness. Everyone loves your partner more than you and honestly? Fair.",
    weddingSong: { title: "I Will Always Love You", artist: "Dolly Parton" },
  },
  {
    id: "larry",
    name: "Larry David",
    tag: "Love = Bickering",
    img: "assets/larry.jpg",
    blurb:
      "Your relationship is 90% petty arguments about nothing and 10% deep loyalty. You fight in public, reconcile over snacks, and somehow this is foreplay.",
    weddingSong: { title: "Toxic", artist: "Britney Spears" },
  },
  {
    id: "ghostface",
    name: "Ghostface (Scream)",
    tag: "Hot But Will Kill You",
    img: "assets/ghostface.jpg",
    blurb:
      "You are attracted to danger, drama, and men who call from inside the house. Your friends are worried. You are thriving.",
    weddingSong: { title: "Poison", artist: "Bell Biv DeVoe" },
  },
  {
    id: "badbunny",
    name: "Bad Bunny",
    tag: "Hot + Soft Boi Energy",
    img: "assets/badbunny.jpg",
    blurb:
      "You’re dating a global thirst trap who is secretly emotional. You will be ignored for studio time, then worshipped like a deity at 2am. Worth it.",
    weddingSong: { title: "Después de la Playa", artist: "Bad Bunny" },
  },
  {
    id: "spice",
    name: "The Spice Girls",
    tag: "You’re Dating a Group Now, Congrats",
    img: "assets/spicegirls.jpg",
    blurb:
      "You didn’t choose poly life, poly life chose you. Your calendar is chaos. Your outfits are better. You now travel with backup dancers and emotional support Brits.",
    weddingSong: { title: "Wannabe", artist: "Spice Girls" },
  },
  {
    id: "obama",
    name: "Barack Obama",
    tag: "Cool, Calm, Low-Key Charisma",
    img: "assets/obama.jpg",
    blurb:
      "Your partner texts in full sentences and listens to your problems like it’s a State of the Union. You feel safe, supported, and weirdly inspired to drink more water.",
    weddingSong: { title: "Let’s Stay Together", artist: "Al Green" },
  },
];

// ---------------------------
// 3) Scoring
// ---------------------------
function scoreChoice(vibe) {
  const s = {
    dolly: 0,
    larry: 0,
    ghostface: 0,
    badbunny: 0,
    spice: 0,
    obama: 0,
  };

  if (vibe.includes("wholesome")) s.dolly += 2;
  if (vibe.includes("bickering")) s.larry += 3;
  if (vibe.includes("chaos")) s.ghostface += 3;
  if (vibe.includes("spicy")) s.badbunny += 3;
  if (vibe.includes("group")) s.spice += 3;
  if (vibe.includes("smooth")) s.obama += 3;

  if (vibe.includes("smooth")) s.badbunny += 1;
  if (vibe.includes("group")) s.badbunny += 1;
  if (vibe.includes("chaos")) s.badbunny += 1;

  return s;
}

function totalScores(allAnswers) {
  const totals = {
    dolly: 0,
    larry: 0,
    ghostface: 0,
    badbunny: 0,
    spice: 0,
    obama: 0,
  };

  allAnswers.forEach((vibe) => {
    const scored = scoreChoice(vibe);
    Object.keys(totals).forEach((k) => (totals[k] += scored[k] || 0));
  });

  return totals;
}

function pickWinner(totals) {
  const groupCount = answers.filter((v) => v === "group").length;
  const smoothCount = answers.filter((v) => v === "smooth").length;

  if (groupCount >= 2) return "spice";
  if (smoothCount >= 2) return "obama";

  const entries = Object.entries(totals);
  let max = -Infinity;
  entries.forEach(([, v]) => (max = Math.max(max, v)));
  const tied = entries.filter(([, v]) => v === max).map(([k]) => k);
  return tied[Math.floor(Math.random() * tied.length)];
}

function getMatchById(id) {
  return matches.find((m) => m.id === id);
}

// ---------------------------
// 4) Sass Lines
// ---------------------------
const sassLines = [
  "Your therapist warned me about you.",
  "Interesting choice. Bold. Concerning.",
  "This is why your friends have opinions.",
  "Okay but who hurt you?",
  "We’re learning things today…",
];

// ---------------------------
// Helpers: enter/exit sass mode
// ---------------------------
function enterSassMode(line) {
  // hide question UI
  stepTitle.classList.add("hidden");
  if (promptBoxEl) promptBoxEl.classList.add("hidden");
  choicesEl.innerHTML = "";

  // show sass
  gameCard.classList.add("sass-mode");
  sassTextEl.textContent = line;
  sassTextEl.classList.remove("hidden");
}

function exitSassMode() {
  sassTextEl.classList.add("hidden");
  gameCard.classList.remove("sass-mode");

  // show question UI again
  stepTitle.classList.remove("hidden");
  if (promptBoxEl) promptBoxEl.classList.remove("hidden");
}

// ---------------------------
// 5) Render Prompts
// ---------------------------
function renderPrompt() {
  promptText.classList.remove("loading-text");
  gameCard.classList.remove("loading-state");

  sassTextEl.classList.add("hidden");
  gameCard.classList.remove("sass-mode");

  stepTitle.classList.remove("hidden");
  if (promptBoxEl) promptBoxEl.classList.remove("hidden");

  const stepNum = currentPromptIndex + 1;
  stepTitle.textContent = `Question ${stepNum} of ${prompts.length}`;
  promptText.textContent = prompts[currentPromptIndex].text;
  choicesEl.innerHTML = "";

  prompts[currentPromptIndex].choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;

    btn.onclick = () => {
      answers.push(choice.vibe);

      // show sass transition
      const line = sassLines[sassIndex % sassLines.length];
      sassIndex++;
      enterSassMode(line);

      setTimeout(() => {
        exitSassMode();
        sassTextEl.classList.add("hidden");

        currentPromptIndex++;

        if (currentPromptIndex >= prompts.length) {
          showResults();
        } else {
          renderPrompt();
        }
      }, 1850);
    };

    choicesEl.appendChild(btn);
  });
}

// ---------------------------
// 6) Results Flow
// ---------------------------
function showResults() {
  // ✅ Hide "Question 5 of 5" during loading
  stepTitle.classList.add("hidden");

  // show loading text in the prompt area
  if (promptBoxEl) promptBoxEl.classList.remove("hidden");

  gameCard.classList.add("loading-state");
  promptText.textContent =
    "Cupid clocked out early. Prepare for unhinged results…";
  promptText.classList.add("loading-text");
  choicesEl.innerHTML = "";

  setTimeout(() => {
    const totals = totalScores(answers);
    const winnerId = pickWinner(totals);
    const match = getMatchById(winnerId);

    matchNameEl.textContent = match.name;
    matchTagEl.textContent = match.tag;
    matchBlurbEl.textContent = match.blurb;

    // ✅ split into title + artist (both centered in CSS)
    songTitleEl.textContent = match.weddingSong.title;
    songArtistEl.textContent = `by ${match.weddingSong.artist}`;

    // ✅ update SMS link AFTER we know the match
    const TALIA_NUMBER = "17865069669";
    const msg = `Something is wrong with you. I got matched with ${match.name} 💀`;
    if (textTaliaBtn) {
      textTaliaBtn.href = `sms:${TALIA_NUMBER}?&body=${encodeURIComponent(msg)}`;
    }

    if (matchImgEl && match.img) {
      matchImgEl.src = match.img;
      matchImgEl.alt = `${match.name} photo`;
    }

    gameCard.classList.add("hidden");
    resultCard.classList.remove("hidden");
  }, 2000);
}

// ---------------------------
// 7) Events
// ---------------------------
if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    startCard.classList.add("hidden");
    introCard.classList.remove("hidden");
  });
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    introCard.classList.add("hidden");
    gameCard.classList.remove("hidden");
    renderPrompt();
  });
}

if (againBtn) {
  againBtn.addEventListener("click", () => {
    answers.length = 0;
    currentPromptIndex = 0;
    sassIndex = 0;

    // reset UI
    promptText.classList.remove("loading-text");
    gameCard.classList.remove("loading-state");
    sassTextEl.classList.add("hidden");
    gameCard.classList.remove("sass-mode");

    // reset share button text (nice-to-have)
    if (shareBtn) shareBtn.textContent = originalShareBtnText;

    resultCard.classList.add("hidden");
    gameCard.classList.remove("hidden");
    renderPrompt();
  });
}

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const text = `💘 My Valentine Match: ${matchNameEl.textContent} — ${matchTagEl.textContent}

I took the "Cupid Clocked Out Early" quiz and my results were spiritually accurate.

Take it here: ${window.location.href}
`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Cupid Clocked Out Early",
          text,
          url: window.location.href,
        });
      } catch {
        // user canceled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        shareBtn.textContent = "Share text copied ✅";
        setTimeout(() => (shareBtn.textContent = originalShareBtnText), 1500);
      } catch {
        alert(text);
      }
    }
  });
}

// ---------------------------
// 8) Init
// ---------------------------
if (gameCard) gameCard.classList.add("hidden");
if (resultCard) resultCard.classList.add("hidden");
