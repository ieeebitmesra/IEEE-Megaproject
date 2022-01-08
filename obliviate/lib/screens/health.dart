import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/curescreen.dart';
import 'package:obliviate_app/screens/home.dart';
import 'package:obliviate_app/screens/message.dart';
import 'package:obliviate_app/screens/notScreen.dart';
import 'package:obliviate_app/screens/nutriton.dart';

import 'package:obliviate_app/screens/todo_list/todo_list_screen.dart';


class HealthScreen extends StatefulWidget {
  const HealthScreen({Key? key}) : super(key: key);

  @override
  _HealthScreenState createState() => _HealthScreenState();
}

class _HealthScreenState extends State<HealthScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.cyan[50],
      backgroundColor: Colors.cyan[200],
      floatingActionButtonLocation: FloatingActionButtonLocation.miniEndFloat,
      floatingActionButton: FloatingActionButton(
        foregroundColor: Colors.white,
        onPressed: ()  {
          Navigator.push(context, MaterialPageRoute(builder: (context) => MessageScreen()));

          // logout(context);
        },
        backgroundColor: Colors.white38,
        child: const Icon(Icons.message),
      ),
      appBar: AppBar(
        backgroundColor: Colors.black38,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white,size: 40,),
          onPressed: (){
            //passing back to homescreen
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => HomeScreen()));

          },
        ),
        title: Text("Health",), centerTitle: true,foregroundColor: Colors.white,
      ),

      body: HealthPage(),

    );
  }}

class HealthPage extends StatefulWidget {
  const HealthPage({Key? key}) : super(key: key);

  @override
  _HealthPageState createState() => _HealthPageState();
}

class _HealthPageState extends State<HealthPage> {
  @override
  Widget build(BuildContext context) {
    return Center(

      child: Column(
        // mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,

        children: [
          Padding(padding: EdgeInsets.all(25)),
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

           child: Image.asset('assets/health/pill.png',width: 120,height: 120,), ),
            SizedBox(
              width: 10,
            ),
            SizedBox(
              height: 50,
              child: TextButton(
                onPressed: ()
                {
                  Navigator.push(context, MaterialPageRoute(
                      builder: (context) => TodoListScreen()));

                },
                child: Text("Tasks",
                  style: TextStyle(
                       color: Colors.white70,
                      fontSize: 25,fontWeight: FontWeight.w500),),
              ), ),
         ],
    ),
          SizedBox(height: 5,),
          //exercise section
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

                child: Image.asset('assets/health/exercise.logo.png',width: 120,height: 120,), ),
              SizedBox(
                width: 10,
              ),
              SizedBox(
                height: 50,
                child: TextButton(
                  onPressed: ()
                  {
                    Navigator.push(context, MaterialPageRoute(
                        builder: (context) => CureScreen()));

                  },
                  child: Text("Exercises",
                    style: TextStyle(
                        color: Colors.white70,
                        fontSize: 25,fontWeight: FontWeight.w500),),
                ), ),
            ],
          ),
          //sleep tracker section
          SizedBox(height: 5,),
          //exercise section
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

                child: Image.asset('assets/health/notes.png',width: 120,height: 120,), ),
              SizedBox(
                width: 10,
              ),
              SizedBox(
                height: 50,
                child: TextButton(
                  onPressed: ()
                  {
                    Navigator.push(context, MaterialPageRoute(
                        builder: (context) => NoteScreen()));

                  },
                  child: Text("Notes Maker",
                    style: TextStyle(
                        color: Colors.white70,
                        fontSize: 25,fontWeight: FontWeight.w500),),
                ), ),
            ],
          ),
          //nutrition section
          SizedBox(height: 5,),
          //exercise section
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

                child: Image.asset('assets/health/diet.png',width: 120,height: 120,), ),
              SizedBox(
                width: 10,
              ),
              SizedBox(
                height: 50,
                child: TextButton(
                  onPressed: ()
                  {
                    Navigator.push(context, MaterialPageRoute(
                        builder: (context) => DietScreen()));

                  },
                  child: Text("Nutrition",
                    style: TextStyle(
                        color: Colors.white70,
                        fontSize: 25,fontWeight: FontWeight.w500),),
                ), ),
            ],
          ),
    ],
      ),


    );

  }
}
