import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:obliviate_app/screens/recreation.dart';
class MusicScreen extends StatefulWidget {
  const MusicScreen({Key? key}) : super(key: key);

  @override
  _MusicScreenState createState() => _MusicScreenState();
}

class _MusicScreenState extends State<MusicScreen> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(


          floatingActionButtonLocation: FloatingActionButtonLocation.startTop,
          floatingActionButton: Padding(
            padding: const EdgeInsets.all(2.0),
            child: FloatingActionButton(
              onPressed: () {
                // logout(context);
                Navigator.push(context, MaterialPageRoute(
                    builder: (context) => RecreationScreen()));
              },

              backgroundColor: Colors.white38,
              child: const Icon(Icons.close),
            ),
          ),

          backgroundColor: Colors.teal[900],
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(

                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [

                  getView(1 , Colors.red,"--"),
                  getView(7, Colors.yellowAccent,"--"),
                  getView(2 , Colors.deepOrange,"--"),
                  getView(6, Colors.white,"--"),
                  getView(3 , Colors.yellow,"--"),
                  getView(5, Colors.pinkAccent,"--"),
                  getView(4 , Colors.lightGreenAccent,"--"),
                  getView(3, Colors.white,"--"),
                  getView(5 , Colors.green,"--"),
                  getView(4, Colors.yellow,"--"),
                  getView(6 , Colors.lightBlueAccent,"--"),
                  getView(2, Colors.white,"--"),
                  getView(7 , Colors.purple,"--"),
                  getView(1, Colors.red,"--"),
                  // getView(1 , Colors.black,"--"),
                  // getView(7, Colors.white,"                                   ---------------"),
                  // getView(2 , Colors.black,"--"),
                  // getView(6, Colors.white,"                                   ---------------"),
                  // getView(3 , Colors.black,"--"),
                  // getView(5, Colors.white,"                                   ---------------"),
                  // getView(4 , Colors.black,"--"),
                  // getView(3, Colors.white,"                                   ---------------"),
                  // getView(5 , Colors.black,"--"),
                  // getView(4, Colors.white,"                                   ---------------"),
                  // getView(6 , Colors.black,"--"),
                  // getView(2, Colors.white,"                                   ---------------"),
                  // getView(7 , Colors.black,"          -------"),
                  // getView(1, Colors.white,"                                   ---------------"),
                ],
              ),
            ),
          )
      ),
    );
  }

  Widget getView(int pos , Color color, String name){
    return  Expanded(
      child: TextButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(color)
        ),
        onPressed: (){
          playSound(pos);
        },
        child: Text("${name}",style: TextStyle(
            color: Colors.black87,
            fontSize: 25,fontWeight: FontWeight.w500),),
      ),
    );
  }

  void playSound(int pos) {
    final audioPlayer = AudioCache();
    audioPlayer.play('assets_note$pos.wav');
  }
}