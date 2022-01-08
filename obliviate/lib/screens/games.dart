import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/game_folder/game.dart';
import 'package:obliviate_app/screens/game_folder/home_game.dart';
class GameScreen extends StatefulWidget {
  const GameScreen({Key? key}) : super(key: key);

  @override
  _GameScreenState createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Telly!',
      theme: ThemeData(
        primarySwatch: ([...Colors.primaries]..shuffle()).first,
        fontFamily: 'Covered',
      ),
      home: Home(),
      // defaultRoute: '/home',
      routes: {'/home': (context) => Home(), '/game': (context) => Game()},
    );
  }
}
