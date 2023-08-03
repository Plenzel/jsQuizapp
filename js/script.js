let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was ist der Zweck der HTML-Sprache?",
        "answer_1": "Grafikdesign erstellen",
        "answer_2": "Audio-Streaming",
        "answer_3": "Webseiten erstellen",
        "answer_4": "Filme produzieren",
        "right_answer": 3
    },
    {
        "question": "Welches HTML-Element wird verwendet, um eine Überschrift erster Ordnung (H1) zu erstellen?",
        "answer_1": "h1",
        "answer_2": "head",
        "answer_3": "p",
        "answer_4": "br",
        "right_answer": 1
    },
    {
        "question": "Was ist die Bedeutung der HTML-Tag-Attribute 'href'?",
        "answer_1": "Es definiert den Namen des Elements.",
        "answer_2": "Es verweist auf eine externe Stylesheet-Datei.",
        "answer_3": "Es gibt den Wert einer Zelle in einer Tabelle an.",
        "answer_4": "Es gibt den Hyperlink für einen Anker (Link) an.",
        "right_answer": 4
    },
    {
        "question": "Welche HTML-Auszeichnung wird verwendet, um ein Bild einzufügen?",
        "answer_1": "img",
        "answer_2": "picture",
        "answer_3": "image",
        "answer_4": "src",
        "right_answer": 1
    },
    {
        "question": "Welches HTML-Element wird verwendet, um eine geordnete Liste zu erstellen?",
        "answer_1": "ul",
        "answer_2": "ol",
        "answer_3": "li",
        "answer_4": "dl",
        "right_answer": 2
    },
    {
        "question": "Was ist die richtige HTML-Struktur für ein einfaches HTML-Dokument?",
        "answer_1": "header, body, footer",
        "answer_2": "head, main, footer",
        "answer_3": "title, content, end",
        "answer_4": "doctype, html, body",
        "right_answer": 4
    }
]

let currentQuestion = 0;
let countCorrect = 0;
var AUDIO_SUCCESS = new Audio('../audio/success.mp3');
var AUDIO_FAIL = new Audio('../audio/fail.mp3');

function init(){
    document.getElementById("all-questions").innerHTML = questions.length;
    showQuestion();
}

function showQuestion(){
    if(gameIsOver()){
        showResult();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length * 100;
    document.getElementById("progress-bar").innerHTML = Math.round(percent);
    document.getElementById("progress-bar").style = `width: ${percent}%;`;
}

function updateToNextQuestion(){
    let question = questions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion+1;
    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];    
}

function answer(selection){
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question["right_answer"]}`;
    if(rightAnswerSelected(selectedQuestionNumber, question)){
        document.getElementById(selection).parentNode.classList.add("bg-success");
        AUDIO_SUCCESS.play();
        countCorrect++;
    } else {
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
        AUDIO_FAIL.play();
    }
    document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion(){
    resetAnswerButtons();
    currentQuestion++;
    showQuestion();
    document.getElementById("next-button").disabled = true;
}

function resetAnswerButtons(){
    for(let i = 1; i < 5; i++){
        document.getElementById("answer_"+i).parentNode.classList.remove("bg-success");
        document.getElementById("answer_"+i).parentNode.classList.remove("bg-danger");
    }
}

function showResult(){
    document.getElementById("endScreen").style = "";
    document.getElementById("question-body").style = "display: none;"

    document.getElementById("all-questions-result").innerHTML = questions.length;
    document.getElementById("question-number-result").innerHTML = countCorrect;
    document.getElementById("header-image").src = "../img/trophy.png"
}

function restartGame(){
    document.getElementById("header-image").src = "../img/logo.png";
    currentQuestion = 0;
    countCorrect = 0;
    document.getElementById("endScreen").style = "display: none";
    document.getElementById("question-body").style = "";
    init();
}