import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/games.dart';
import 'package:obliviate_app/screens/home.dart';
import 'package:obliviate_app/screens/music.dart';
import 'package:obliviate_app/screens/quizzler_folder/quizzler.dart';

class RecreationScreen extends StatefulWidget {
  const RecreationScreen({Key? key}) : super(key: key);

  @override
  _RecreationScreenState createState() => _RecreationScreenState();
}

class _RecreationScreenState extends State<RecreationScreen> {
  @override
  Widget build(BuildContext context) {
     return Scaffold(

      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white,size: 50,),
          onPressed: (){
            //passing back to homescreen
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => HomeScreen()));

          },
        ),
        title: Text("RECREATION",), centerTitle: true,foregroundColor: Colors.white,
      ),

      body: RecreationPage(),



    );
  }}
class RecreationPage extends StatefulWidget {
  const RecreationPage({Key? key}) : super(key: key);

  @override
  _RecreationPageState createState() => _RecreationPageState();
}

class _RecreationPageState extends State<RecreationPage> {
  @override
  Widget build(BuildContext context) {
    return Center(

      child: Column(
        // mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,

        children: [
          Padding(padding: EdgeInsets.all(65)),

          Row(
              children:<Widget> [
                SizedBox(
                  width: 50,

                ),
                Card(
                  shadowColor: Colors.tealAccent,
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),

                  child: Image.asset('assets/images/quiz.png',width: 110,height: 110,),
                ),
                SizedBox(
                  width: 40,
                ),
                Card(
                  shadowColor: Colors.tealAccent,
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: Image.asset('assets/images/music.png',width: 110,height: 110,),
                ),

              ]

          ),
          SizedBox(
            height: 30,
          ),
          Row(
            children: [
              SizedBox(
                width: 60,

              ),
              SizedBox(
                height: 50,
              child: TextButton(
           onPressed: ()
              {
             Navigator.push(context, MaterialPageRoute(
                 builder: (context) => QuizScreen()));

            },

            child: Text("Quizzler",
                  style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
              ),),
              SizedBox(
                width: 90,
              ),
              SizedBox(
                height: 50,
                child: TextButton(
                  onPressed: ()
                  {
                    Navigator.push(context, MaterialPageRoute(
                        builder: (context) => MusicScreen()));

                  },

                  child: Text("Musics",
                    style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
                ), ),
            ],
          ),

          Row(
              children:<Widget> [
                SizedBox(
                  width: 50,
                ),
                Card(
                  shadowColor: Colors.tealAccent,
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Image.asset('assets/images/games.png',width: 110,height: 110,),
                ),
                SizedBox(
                  width: 40,
                ),
                Card(

                  // color: Colors.teal,
                  shadowColor: Colors.tealAccent,
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),


                  child: Image.asset('assets/images/chatbot.png',width: 110,height: 110,),
                ),



              ]

          ),
          SizedBox(
            height: 30,
          ),
          Row(
            children: [
              SizedBox(
                width: 60,

              ),
              SizedBox(
                height: 30,
              child: TextButton(
              onPressed: ()
              {
              Navigator.push(context, MaterialPageRoute(
              builder: (context) => GameScreen()));

              },
                child: Text("  Games",
                  style: TextStyle(fontSize: 15,
                      fontWeight: FontWeight.bold),),
              ),),
              SizedBox(
                width: 90,
              ),
              SizedBox(
                height: 30,
                child: TextButton(
                  onPressed: ()
                  async {
                    // Navigator.push(context, MaterialPageRoute(
                    //     builder: (context) => GameScreen()));
                    try {
                      dynamic conversationObject = {
                        'appId': 'a23f440623216dbeb41afad50aaed5c1' // The [APP_ID](https://dashboard.kommunicate.io/settings/install) obtained from kommunicate dashboard.
                      };
                      dynamic result = await KommunicateFlutterPlugin.buildConversation(conversationObject);
                      print("Conversation builder success : " + result.toString());
                    } on Exception catch (e) {
                      print("Conversation builder error occurred : " + e.toString());
                    }

                  },

                  child: Text( "Chatbot",
                    style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
                ),),
            ],
          ),


        ],
      ),
    );


  }
}
