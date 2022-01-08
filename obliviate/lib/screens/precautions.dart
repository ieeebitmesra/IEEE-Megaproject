import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/home.dart';
import 'package:obliviate_app/screens/phone.dart';
class PrecautionScreen extends StatefulWidget {
  const PrecautionScreen({Key? key}) : super(key: key);

  @override
  _PrecautionScreenState createState() => _PrecautionScreenState();
}

class _PrecautionScreenState extends State<PrecautionScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButtonLocation: FloatingActionButtonLocation.miniStartFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(
              builder: (context) => PhoneScreen()));
        },
        backgroundColor: Colors.blue[200],
        child: const Icon(Icons.medication,color: Colors.black,size: 35,),
      ),

      backgroundColor: Colors.blue[100],
      body: Stack(
        children:<Widget> [
          Positioned(
            top:-5,
            height: MediaQuery.of(context).size.height*0.35,
            left: 0,
            right: 0,

            child: ClipRRect(
              borderRadius:  const BorderRadius.vertical(
                bottom:  const Radius.circular(160),
              ),
              child: Container(
                color: Colors.white,
                child: Image.asset('assets/warn.png',width: 100,height: 110,),
              ),
            ),),

        Positioned(
        top: MediaQuery.of(context).size.height * 0.33,
         left: 0,
        right: 0,

          child:Container(
           height : MediaQuery.of(context).size.height * 0.6,
           color: Colors.blue[100],

          child: Column(
           crossAxisAlignment: CrossAxisAlignment.start,

           children: <Widget>[

            Padding(
             padding: const EdgeInsets.only(
             top: 30,bottom: 20,left: 32,right: 16,),
            child: Text("   When to contact a doctor?",style: TextStyle(fontSize: 25,
            fontWeight: FontWeight.bold),),
           ),
             SizedBox(height: 5,),
          Padding(
            padding: const EdgeInsets.all(4.0),
            child: Card(
              shadowColor: Colors.blueGrey,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
                child: Center(
                  child: Column(
                    children: [
                      SizedBox(height: 10,),
                      Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Text("Don't Have a Bowel Movement for 4 days",
                          style: TextStyle(fontSize: 15,color: Colors.black54,
                              fontWeight: FontWeight.bold),),
                      ),
                      // SizedBox(width: 300,height: 30,),

                    ],
                  ),
                ) ,
            ),
          ),
             SizedBox(height: 5,),
             Padding(
               padding: const EdgeInsets.all(4.0),
               child: Card(
                 shadowColor: Colors.blueGrey,
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                   borderRadius: BorderRadius.circular(10),
                 ),
                 child: Center(
                   child: Column(
                     children: [
                       SizedBox(height: 10,),
                       Padding(
                         padding: const EdgeInsets.all(10.0),
                         child: Text("Suddenly stops eating/drinking for more than 24 hrs without any sign of illnes",
                           style: TextStyle(fontSize: 15,color: Colors.black54,
                               fontWeight: FontWeight.bold),),
                       ),],),) ,),),
             SizedBox(height: 5,),
             Padding(
               padding: const EdgeInsets.all(4.0),
               child: Card(
                 shadowColor: Colors.blueGrey,
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                   borderRadius: BorderRadius.circular(10),
                 ),
                 child: Center(
                   child: Column(
                     children: [
                       SizedBox(height: 10,),
                       Padding(
                         padding: const EdgeInsets.all(10.0),
                         child: Text("Have a low-grade fever for more than 24 hours",
                           style: TextStyle(fontSize: 15,color: Colors.black54,
                               fontWeight: FontWeight.bold),),
                       ),],),) ,),),
             SizedBox(height: 5,),
             Padding(
               padding: const EdgeInsets.all(4.0),
               child: Card(
                 shadowColor: Colors.blueGrey,
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                   borderRadius: BorderRadius.circular(10),
                 ),
                 child: Center(
                   child: Column(
                     children: [
                       SizedBox(height: 10,),
                       Padding(
                         padding: const EdgeInsets.all(10.0),
                         child: Text("Stops eating/drinking  after a change in Medication",
                           style: TextStyle(fontSize: 15,color: Colors.black54,
                               fontWeight: FontWeight.bold),),
                       ),],),) ,),),
             SizedBox(height: 5,),
             Padding(
               padding: const EdgeInsets.all(4.0),
               child: Card(
                 shadowColor: Colors.blueGrey,
                 elevation: 8,
                 shape: RoundedRectangleBorder(
                   borderRadius: BorderRadius.circular(10),
                 ),
                 child: Center(
                   child: Column(
                     children: [
                       SizedBox(height: 10,),
                       Padding(
                         padding: const EdgeInsets.all(10.0),
                         child: Text("Are breathing faster than usual",
                           style: TextStyle(fontSize: 15,color: Colors.black54,
                               fontWeight: FontWeight.bold),),


                       ),],),) ,),),






          ],),),),












        ],

      ),

    );
  }
}
