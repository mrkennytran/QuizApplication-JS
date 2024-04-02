/**
 * Create a JavaScript-based quiz application that will prompt the user with a random question and allow the user to supply the answer. 
 * Requirements: 
 - 
 */

// Advanced: Incorporate an api that fetches a random question with answers 

let questionaireList = [
  {
    "question" : "What does GIS stand for?",
    "answers": [
      "Graphic Informational System", "Geospatial Informations System", "Geometric Insight Signals", "Geographic Iniformational System"           
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

let shuffleQuestions = (questions) => { // selects a question from the array and displays it along with the possible answers
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
  return prompt(`${question.question}\n- Enter number to answer. (attempts: ${3 - retryCounter})` + '\n\n' + question.answers.map(ans => {return `${numOption += 1}. ${ans}`}).toString().replaceAll(',', '\n')).trim();
}


let runQuiz = (questions) => {
  let answer = ''; 
  let retakeQuiz = false;   
  do {    
    let completedQuestion = false;
    let retryCounter = 0; 
    let question = shuffleQuestions(questions);           
    do {      
      let parsedValue = 0; 
      let isValidNumericAns; 
      do {
        let numOption = 0; 
        answer = displayRandomQuestion(question, retryCounter, numOption);
        parsedValue = Number(answer);
        retryCounter++;
        isValidNumericAns = parsedValue >= 1 && parsedValue <= 4;
      } while (typeof parsedValue !== NaN);

      let validAnswer = (answer !== null); //  && (.includes(answer.toLowerCase()))
      if(validAnswer && question.correctAnswer.toLowerCase() === answer.toLowerCase()){ // Correct answer
        let list = document.getElementById("question");  
        let entry = document.createElement('li');
        entry.appendChild(document.createTextNode(`${question.question}\nYour Answer: ${answer}\nResult: Correct`));
        list.appendChild(entry);
        completedQuestion = true;    
      }
      else if(retryCounter < 2){ // Retry 
        document.getElementById("question").innerHTML = `Incorrect. Try again.`;
        document.getElementById("your-answer").innerHTML = `Your answer: ${answer}`;
        document.getElementById("correct-answer").innerHTML = ``;    
        retryCounter++;  
      }
      else { // 
        document.getElementById("question").innerHTML = question.question;
        document.getElementById("your-answer").innerHTML = `Your answer: ${answer}`;
        document.getElementById("correct-answer").innerHTML = `Correct answer: ${question.correctAnswer}`; 
        retryCounter = 0;
        completedQuestion = true; 
      }
     // else {
     //   document.getElementById("question").innerHTML = question.question;
     //   document.getElementById("your-answer").innerHTML = `Your answer: ${answer}`;
     //   document.getElementById("correct-answer").innerHTML = `Invalid entry. Try again.`;
     // }
    } while (!completedQuestion);

    completedQuestion = false; 
    // Removes answer question
    questions.shift();

    /*
    counter++; 
    if(counter === questions.length - 1){ // Quiz has ended and opts if user wants to retake
      do {
        let userEntry = prompt("Would you like to retake this quiz? Enter 'Yes' or 'No': ");
        switch (userEntry.toLowerCase()) {
          case "yes":
            retakeQuiz = yes;   
            break;
          case "no":
            retakeQuiz = false; 
          default:
            document.getElementById("question").innerHTML = "Invalid entry. Try Again.";
            document.getElementById("answer").innerHTML = "";
            break;
        }
      } while (true);
      
    }    */
  } while(questions.length !== 0);    // counter !== questions.length - 1)
  console.log(done);
}


runQuiz(questionaireList); // Start quiz 




