import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/quiz_brain.dart';
class Question {
  late String questionText;
  late bool questionAnswer;

  Question(String q, bool a) {
    questionText = q;
    questionAnswer = a;
  }
}