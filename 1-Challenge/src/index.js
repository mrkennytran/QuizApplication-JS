/**
 * Create a JavaScript-based quiz application that will prompt the user with a random question and allow the user to supply the answer. 
 * Requirements: 
 - 
 */

// Advanced: Incorporate an api that fetches a random question with answers 

let retakeQuiz = false; 
let questionaireList = [
  {
    "question" : "What does GIS stand for?",
    "answers": [
      "Graphic Informational System", "Geospatial Informations System", "Geometric Insight Signals", "Geographic Informational System"           
    ],
    "correctAnswer": "Geospatial Informations System"
  },
  {
    "question": "What city is GEO Jobe's headquarters currently located in?",
    "answers": ["Nashville", "Long Beach", "Gulfport", "Biloxi"], 
    "correctAnswer": "Gulfport"
  },
  {
    "question": "What does ESRI stand for?",
    "answers": ["Environmental Systems Research Institute", "Environmental Signals Research Inc", "Environmental Systems Routing Initiative", "Environmental Science Research Institute"], 
    "correctAnswer": "Environmental Systems Research Institute"
  },
  {
    "question": "Who is the CEO of GEO Jobe?",
    "answers": ["Neil Jobe", "Daniel Menikheim", "Eric Goforth", "David Hansen"], 
    "correctAnswer": "David Hansen"
  },
  {
    "question": "Which of the following is not a GEO Jobe product?",
    "answers": ["Admin Tools", "Backup My Org", "ArcGIS Online", "Scheduler"], 
    "correctAnswer": "ArcGIS Online"
  }
];

let shuffleAndDrawQuestion = (questions) => { // selects a question from the array and displays it along with the possible answers
  let currentIndex = questions.length;
  // While there remain elements to shuffle... 

  while(currentIndex !== 0){
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; 

    // Swap random index value with current index 
    [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
  }
  
  return questions[0];
};

let displayRandomQuestion = (question, retryCounter, numOption) => { // Print results onto web browser page 
  answer = prompt(`${question.question}\n- Enter number to answer. (attempts: ${3 - retryCounter})` + '\n\n' + question.answers.map(ans => {return `${numOption += 1}. ${ans}`}).toString().replaceAll(',', '\n'));
  if(answer !== null ){
    answer = answer.trim();
  }
  return answer;
}


let runQuiz = (questions) => {
  let questionRef = []; 
  let totalQuestions = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let answer = ''; 
  let root = document.getElementById('myList');
  let ol = document.createElement('ol');
  let ul = document.createElement('ul');
  root.appendChild(ol);

  questions.forEach(element => {
    totalQuestions++    
  });
  
  do {    
    let completedQuestion = false;
    let retryCounter = 0; 
    let question = shuffleAndDrawQuestion(questions);

    // Render question 
    if(retryCounter === 0) {
      li = document.createElement('li');
      li.appendChild(document.createTextNode(`${question.question}`));
      ol.appendChild(li);
    } 
        
    do {      
      let parsedValue = 0; 
      let isValidNumericAns;   
      do { // Checks if user input is a valid  
        let numOption = 0; 
        answer = displayRandomQuestion(question, retryCounter, numOption);
        parsedValue = Number(answer);
        retryCounter++;
        isValidNumericAns = parsedValue >= 1 && parsedValue <= 4;
      } while (!isValidNumericAns && retryCounter < 3);

      // Checks if user's answer is correct
      answer = question.answers[answer - 1];
      if(answer === undefined) answer = '';
      if(retryCounter < 3 && question.correctAnswer.toLowerCase() !== answer.toLowerCase()) { // Incorrect answer AND have retries left        
        let ul = document.createElement('ul');
        ol.appendChild(ul);
        l2 = document.createElement('li');
        l2.appendChild(document.createTextNode(`Your Answer: ${answer} - INCORRECT`));
        ul.appendChild(l2);
      }
      else if(question.correctAnswer.toLowerCase() === answer.toLowerCase()){ // Correct answer
        let ul = document.createElement('ul');
        correctCount++;
        ol.appendChild(ul);
        l2 = document.createElement('li');
        l2.appendChild(document.createTextNode(`Answer: ${answer} - CORRECT`));
        ul.appendChild(l2);
        completedQuestion = true;    
      }
      else { // Incorrect answer AND all out of retries
        let ul = document.createElement('ul');
        incorrectCount++;    
        ol.appendChild(ul);
        l2 = document.createElement('li');
        l2.appendChild(document.createTextNode(`Your Answer: ${answer} - INCORRECT`));
        ul.appendChild(l2);

        let l3 = document.createElement('li');
        l3.appendChild(document.createTextNode(`Correct Answer: ${question.correctAnswer}`));
        l2.appendChild(l3);
        completedQuestion = true; 
      }
    } while (!completedQuestion);
    retryCounter = 0;
    completedQuestion = false; 

    // Removes answer question
    questionRef.push(questions[0]);
    questions.shift();
  } while(questions.length !== 0);    // counter !== questions.length - 1)
  if(totalQuestions === undefined) totalQuestions = 0; 
  let grade = Math.floor((correctCount / totalQuestions) * 100);
  li = document.createElement('li');
  li.appendChild(document.createTextNode(`Quiz Grade: ${grade}%`));
  ol.appendChild(li);
  questions = questionRef;
  return questions;
}

do {
  questionaireList = runQuiz(questionaireList); // Start quiz 
  let response;
  do {
    response = prompt('Would you like to retake this quiz? (Answer y or n)');
  } while(response.toLowerCase() !== 'y' && response.toLowerCase() !== 'n');
  if(response === 'y'){
    retakeQuiz = true; 
  }  
} while(retakeQuiz);




