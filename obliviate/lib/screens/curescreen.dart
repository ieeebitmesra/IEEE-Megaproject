import 'package:flutter/material.dart';
import 'package:obliviate_app/model/exercise.dart';
import 'package:obliviate_app/screens/health.dart';
import 'package:url_launcher/url_launcher.dart';

class CureScreen extends StatefulWidget {


  @override
  _CureScreenState createState() => _CureScreenState();
}

class _CureScreenState extends State<CureScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      // floatingActionButtonLocation: FloatingActionButtonLocation.miniEndFloat,
      // floatingActionButton: FloatingActionButton(
      //   onPressed: ()  {
      //
      //     Navigator.push(context, MaterialPageRoute(
      //         builder: (context) => HealthScreen()));
      //     // logout(context);
      //   },
      //   backgroundColor: Colors.teal,
      //   child: const Icon(Icons.arrow_back_ios_new_sharp),
      // ),
      bottomNavigationBar: ClipRRect(
        borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
        child: BottomNavigationBar(

          items: [
            BottomNavigationBarItem(

              icon: Icon(Icons.arrow_back),
              title: Text("Back"),
            ),
          BottomNavigationBarItem(
              icon: Icon(Icons.home),
            title: Text("Home"),

          ),

            BottomNavigationBarItem(
              icon: Icon(Icons.logout),
              title: Text("logout"),

            ),

        ],

        ),
      ),
      body: Stack(
        children: <Widget> [
          Positioned(
              top:0,
              height: MediaQuery.of(context).size.height*0.35,
              left: 0,
              right: 0,

              child: ClipRRect(
                borderRadius:  const BorderRadius.vertical(
                  bottom:  const Radius.circular(40),
                ),
                child: Container(
                  color: Colors.white,
                  child: Image.asset('assets/cure.png',width: 100,height: 100,),
                ),
              ),),
          Positioned(
              top: MediaQuery.of(context).size.height * 0.30,
              left: 0,
              right: 0,

              child:Container(
                height : MediaQuery.of(context).size.height * 0.6,
                color: Colors.white,
                // height: MediaQuery.of(context).size.height,
                child: Column(
                 crossAxisAlignment: CrossAxisAlignment.start,

                  children: <Widget>[

                    Padding(
                        padding: const EdgeInsets.only(
                          top: 40,
                          bottom: 20,
                          left: 32,
                          right: 16,

                        ), child: Text("Exercises",style: TextStyle(fontSize: 25,
                        fontWeight: FontWeight.bold),),
                    ),
                    Expanded(child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 32,),
                          for(int i=0; i<exer.length; i++)
                            _ExerciseCard( exercise : exer[i] ),

                        ],
                      ),
                    ),),
                    SizedBox(height: 20,),
                    Expanded(
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 10,left: 32,right: 32),

                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(30)),
                        color: Colors.teal,
                      ),
                     child: Center(child:
                     Column(
                       children: [
                         SizedBox(height: 20,),
                         IconButton(icon:Icon(Icons.ondemand_video_sharp,color: Colors.white,size: 42,), onPressed: () async {
                           final url ="https://www.youtube.com/watch?v=gECNsPHgbc0";
                           if (!await launch(url)) throw 'Could not launch $url';
                         },),
                         SizedBox(height: 5,),
                         Text("   A little Progress each day ",

                           style: TextStyle(fontSize: 25,color: Colors.white70,
                               fontWeight: FontWeight.bold),
                         ),
                         SizedBox(height: 5,),
                         Text(" adds up to big Results!!",

                           style: TextStyle(fontSize: 25,color: Colors.white70,
                               fontWeight: FontWeight.bold),
                         ),

                       ],
                     ))

                    ),
                    ),

                  ],
                ),
              ), ),


        ],

      ),

    );
  }
}
class _ExerciseCard extends StatelessWidget {
   final Exercise exercise;

  const _ExerciseCard({Key? key, required this.exercise}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin:  const EdgeInsets.only(right: 20,bottom: 10,),
        child: Material(
          borderRadius: BorderRadius.all(Radius.circular(20)),
          elevation: 4,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Flexible(
                fit: FlexFit.tight,
                  child: ClipRRect(
                    borderRadius: BorderRadius.all( Radius.circular(20)),
                      child: Image.asset(exercise.img,
                      width: 150,
                      fit: BoxFit.fitHeight,),

                  ),


              ),
              Flexible(
                fit: FlexFit.tight,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(height: 10,),
                        Text(exercise.name, style: TextStyle(fontSize: 10,
                            fontWeight: FontWeight.bold),),
                        Text(exercise.tt, style: TextStyle(fontSize: 18,
                            fontWeight: FontWeight.w500),),
                        Text(exercise.descrip, style: TextStyle(fontSize: 15,
                            fontWeight: FontWeight.w200),),
                        SizedBox(height: 16,),
                      ],
                    ),
                  ),
              ),

            ],
          ),


        ));
  }
}

