
import 'package:flutter/material.dart';
import 'package:obliviate_app/model/nutrtion_model.dart';


class DietScreen extends StatefulWidget {


  @override
  _DietScreenState createState() => _DietScreenState();
}

class _DietScreenState extends State<DietScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
                child: Image.asset('assets/diets/diet.png',width: 100,height: 100,),
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

                    ), child: Text("Healthy Nutrition",style: TextStyle(fontSize: 25,
                      fontWeight: FontWeight.bold),),
                  ),
                  Expanded(child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: <Widget>[
                        SizedBox(width: 32,),
                        for(int i=0; i<diet.length; i++)
                          _DietCard( dd : diet[i] ),

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
                            Icon(Icons.attach_email_outlined,color: Colors.white,size: 32,),
                            SizedBox(height: 5,),
                            Text(" The Mind diet focused  ",

                              style: TextStyle(fontSize: 20,color: Colors.white70,
                                  fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 5,),
                            Text("   on plant based food ",

                              style: TextStyle(fontSize: 20,color: Colors.white70,
                                  fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 5,),
                            Text(" linked to dementia prevention.",

                              style: TextStyle(fontSize: 20,color: Colors.white70,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ))

                      // child: ,
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
class _DietCard extends StatelessWidget {
  final Diet dd;

  const _DietCard({Key? key, required this.dd}) : super(key: key);

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
                  child: Image.asset(dd.img,
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
                      Text(dd.tt, style: TextStyle(fontSize: 10,
                          fontWeight: FontWeight.bold),),
                      Text(dd.name, style: TextStyle(fontSize: 18,
                          fontWeight: FontWeight.w500),),
                      Text(dd.cal, style: TextStyle(fontSize: 10,
                          fontWeight: FontWeight.bold),),

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

