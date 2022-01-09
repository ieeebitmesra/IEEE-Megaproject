import 'dart:math';

class GameData {
  late int level;
  late int score;
  late bool isPlaying;
  int? targetIndex;
  //constructor
  GameData() {
    level = 1;
    score = 0;
    isPlaying = true;
  }

  void reset() {
    level = 1;
    score = 0;
    isPlaying = true;
  }

  void nextLevel(int timeLeft) {
    targetIndex = Random().nextInt((getGridSize() * getGridSize()) - 1);
    level++;
    addScore(level * timeLeft);
    // score = 0;
    print('level: $level');
  }

  void addScore(int value) {
    score += value;
  }

  void endGame() {
    isPlaying = false;
  }

  int getGridSize() {
    // Level 1: 2x2
    // Level 15: 3x3
    // Level 30: 4x4
    // Level 50: 5x5

    if (level >= 15 && level < 30) return 3;
    if (level >= 30 && level < 50) return 4;
    if (level >= 50) return 5;

    // default
    return 2;
  }
}