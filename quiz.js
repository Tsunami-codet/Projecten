// Quiz App - JavaScript
// Author: Vadym Rusanov
// School: Astrum College - MBO4 Software Developer 2025-2026

const questions = [
  {
    question: "Wat is de uitvoer van: console.log(typeof null)?",
    options: ["null", "undefined", "object", "string"],
    correct: 2,
    explanation: "typeof null geeft 'object' — een bekende bug in JavaScript!"
  },
  {
    question: "Welke methode voegt een element toe aan het EINDE van een array?",
    options: ["unshift()", "push()", "pop()", "shift()"],
    correct: 1,
    explanation: "push() voegt toe aan het einde. unshift() voegt toe aan het begin."
  },
  {
    question: "Wat betekent 'MBO4' in het onderwijs?",
    options: ["Middelbaar Beroeps Onderwijs niveau 4", "Modern Business Opleiding", "Master Bedrijfs Opleiding", "Middelbare Beroeps Oriëntatie"],
    correct: 0,
    explanation: "MBO staat voor Middelbaar Beroeps Onderwijs, niveau 4 is het hoogste MBO-niveau."
  },
  {
    question: "Wat is de output van: console.log(0.1 + 0.2 === 0.3)?",
    options: ["true", "false", "undefined", "NaN"],
    correct: 1,
    explanation: "Door floating-point precisie is 0.1+0.2 = 0.30000000000000004, dus false!"
  },
  {
    question: "Welk keyword gebruik je voor een constante in JavaScript?",
    options: ["var", "let", "const", "static"],
    correct: 2,
    explanation: "const declareert een constante variabele die niet opnieuw kan worden toegewezen."
  }
];

class Quiz {
  constructor(questions) {
    this.questions = this.shuffle([...questions]);
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  answer(optionIndex) {
    const q = this.getCurrentQuestion();
    const isCorrect = optionIndex === q.correct;
    if (isCorrect) this.score++;
    this.answers.push({ question: q.question, correct: isCorrect, explanation: q.explanation });
    this.currentIndex++;
    return isCorrect;
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  getResult() {
    const pct = Math.round((this.score / this.questions.length) * 100);
    let grade;
    if (pct >= 90) grade = "10 🏆";
    else if (pct >= 80) grade = "8-9 ⭐";
    else if (pct >= 60) grade = "6-7 👍";
    else grade = "< 6 📚";

    return {
      score: this.score,
      total: this.questions.length,
      percentage: pct,
      grade,
      answers: this.answers
    };
  }
}

// Demo (Node.js compatible)
function runDemo() {
  const quiz = new Quiz(questions);
  console.log("=".repeat(50));
  console.log("  💻 JAVASCRIPT QUIZ - Vadym Rusanov");
  console.log("  Astrum College | MBO4 Software Developer");
  console.log("=".repeat(50));

  // Simuleer antwoorden
  const demoAnswers = [2, 1, 0, 1, 2]; // Mix van goed en fout
  let i = 0;

  while (!quiz.isFinished()) {
    const q = quiz.getCurrentQuestion();
    const chosen = demoAnswers[i++];
    const correct = quiz.answer(chosen);

    console.log(`\nVraag ${i}: ${q.question}`);
    console.log(`  Jouw antwoord: ${q.options[chosen]}`);
    console.log(`  ${correct ? "✅ Correct!" : "❌ Fout!"}`);
    if (!correct) console.log(`  💡 ${q.explanation}`);
  }

  const result = quiz.getResult();
  console.log("\n" + "=".repeat(50));
  console.log(`  EINDRESULTAAT: ${result.score}/${result.total} (${result.percentage}%)`);
  console.log(`  Cijfer: ${result.grade}`);
  console.log("=".repeat(50));
}

runDemo();
