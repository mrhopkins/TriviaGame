var triviaQuestions = [{
    question: "What is the name of main protagonist in A Nightmare on Elm Street franchise?",
    answerList: ["Kristen Parker", "Alice Johnson", "Sidney Prescott", "Nancy Thompson"],
    answer: 3
}, {
        question: "What is Freddy Kreuger's weapon of choice?",
        answerList: ["Chainsaw", "Glove with Knife Fingers", "Kitchen Knife", "Machete"],
    answer: 1
}, {
        question: "What is the sequel to Night of the Living Dead?",
    answerList: ["Return of the Living Dead", "Dawn of the Dead", "Day of the Dead", "Land of the Dead"],
    answer: 1
}, {
        question: "Which of following characters has the most appearances in Final Destination franchise?",
        answerList: ["Alex Browning", "Kimberly Corman", "Wendy Christensen", "Clear Rivers"],
    answer: 3
}, {
        question: "Jebediah Morningside (Tall Man) is the main antagonist in which horror franchise?",
        answerList: ["Haunting", "Re-Animator", "Silent Night, Deadly Night", "Phantasm"],
    answer: 3
}, {
        question: "In what camp does Friday the 13th take place?",
        answerList: ["Springwood", "Crystal Lake", "Haddonfield", "Woodsboro"],
    answer: 1
}, {
        question: "What is the last archetype of character that could survive in The Cabin in the Woods?",
        answerList: ["Athlete", "Virgin", "Fool", "Scholar"],
    answer: 1
}, {
        question: "Who is the main character in the Re-Animator film series?",
        answerList: ["Dr. Daniel Challis", "Dr. Carl Hill", "Herbert West", "Dan Cain"],
    answer: 2
}, {
    question: "Who directed Poltergeist?",
        answerList: ["Steven Spielberg", "Tobe Hooper", "Wes Craven", "John Carpenter"],
    answer: 1
}, {
        question: "Who is the killer in Friday the 13th (1980)?",
        answerList: ["Michael Myers", "Freddy Krueger", "Jason Voorhees", "Pamela Voorhees"],
    answer: 3
}, {
        question: "Which of the following things did Alice use to defeat Freddy in A Nightmare on Elm Street 4: The Dream Master",
        answerList: ["Mirror", "Crucifix", "Holy Water", "Dagger"],
    answer: 0
}, {
        question: "What is the name of the book from the Evil Dead franchise?",
        answerList: ["Klaatu", "Necronomicon", "Kandarian Book", "Verata"],
    answer: 1
}, {
        question: "What is the name of child, which is presumed to be satan's son in The Omen?",
        answerList: ["Dylan Porter", "Reggie Pearson", "Damien Thorn", "Angela Baker"],
    answer: 2
}, {
        question: "The original Halloween mask was based on...",
        answerList: ["William Shatner's face", "Leonard Nimoy's face", "Nick Castle's face", "George Takei's face"],
    answer: 0
}, {
        question: "What is the name of the cat who survived Alien?",
        answerList: ["Jingles", "Jasper", "Jonesy", "Jinx"],
    answer: 2
}];

var gifArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yes!",
    incorrect: "Sorry, that's the wrong answer.",
    endTime: "Time's Up!",
    finished: "Let's see if you survived..."
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    // sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    // clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); // clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
    // checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
