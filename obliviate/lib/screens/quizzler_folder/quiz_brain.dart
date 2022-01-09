class Question {
  late String questionText;
  late bool questionAnswer;

  Question(String q, bool a) {
    questionText = q;
    questionAnswer = a;
  }
}

class QuizBrain {
  int _questionNumber = 0;

  List<Question> _questionBank = [
    Question('Alzheimer and dementia are the same thing.', false),
    Question('Red wine and grape juice can help reverse Alzheimer', false),
    Question('Sun rises in the east.', true),
    Question('There are 8 continents in the world', false),
    Question('Cat barks and Dogs hoot', false),
    Question('There are 365 days in a year', true),
    Question(
        'Humans are cold blooded animals',
        false),
    Question(
        'Ranchi is the capital of India',
        false),
    Question(
        'Wednesday comes after Tuesday',
        true),
    Question(
        'The total surface area of two human lungs is approximately 70 square metres.',
        true),
    Question('Google was originally called \"Backrub\".', true),
    Question(
        'Chocolate affects a dog\'s heart and nervous system; a few ounces are enough to kill a small dog.',
        true),
    Question(
        'In West Virginia, USA, if you accidentally hit an animal with your car, you are free to take it home to eat.',
        true),
  ];

  void nextQuestion() {
    if (_questionNumber < _questionBank.length - 1) {
      _questionNumber++;
    }
  }

  String getQuestionText() {
    return _questionBank[_questionNumber].questionText;
  }

  bool getCorrectAnswer() {
    return _questionBank[_questionNumber].questionAnswer;
  }



  bool isFinished() {
    if (_questionNumber >= _questionBank.length - 1) {

      print('Now returning true');
      return true;

    } else {
      return false;
    }
  }


  void reset() {
    _questionNumber = 0;
  }
}