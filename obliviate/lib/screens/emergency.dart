import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';

import 'package:url_launcher/url_launcher.dart';
class EmergencyCall extends StatefulWidget {
  const EmergencyCall({Key? key}) : super(key: key);

  @override
  _EmergencyCallState createState() => _EmergencyCallState();
}

class _EmergencyCallState extends State<EmergencyCall> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("EMERGENCY-DESK",), centerTitle: true,foregroundColor: Colors.white,

      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(32.0),
            child: Card(
              shadowColor: Colors.greenAccent,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),

              child: Container(
                child: Column(
                  children: [
                    Image.network('https://www.iconsdb.com/icons/preview/green/ambulance-5-xxl.png',width: 110,height: 110,),
                    Row(
                      children: [
                        SizedBox(width: 50,),
                        IconButton(icon: Icon(Icons.call,size: 30,), onPressed: () async {
                          launch('tel://102');
                          await FlutterPhoneDirectCaller.callNumber('tel://102');
                        },),
                        SizedBox(width: 10,),
                        Text("AMBULANCE", style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.green),)
                      ],
                    ),

                  ],
                ),
              ),
            ),
          ),
          //fire brigade
          Padding(
            padding: const EdgeInsets.all(32.0),
            child: Card(
              shadowColor: Colors.redAccent,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),

              child: Container(
                child: Column(
                  children: [
                    Image.network('https://image.freepik.com/free-vector/fire-truck-goes-call-extinguish-fire-flat-vector-illustration_124715-1144.jpg',width: 110,height: 110,),
                    Row(
                      children: [
                        SizedBox(width: 50,),
                        IconButton(icon: Icon(Icons.call,size: 30,), onPressed: () async {
                          launch('tel://111');
                          await FlutterPhoneDirectCaller.callNumber('tel://111');
                        },),
                        SizedBox(width: 10,),
                        Text("FIRE BRIGADE", style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.red),)
                      ],
                    ),

                  ],
                ),
              ),
            ),
          ),
          //police control

          //helpline desk
          Padding(
            padding: const EdgeInsets.all(32.0),
            child: Card(
              shadowColor: Colors.blueAccent,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),

              child: Container(
                child: Column(
                  children: [
                    Image.network('https://previews.123rf.com/images/ankomando/ankomando1609/ankomando160900035/63208303-police-officers-and-police-station.jpg',width: 110,height: 110,),
                    Row(
                      children: [
                        SizedBox(width: 30,),
                        IconButton(icon: Icon(Icons.call,size: 30,), onPressed: () async {
                          launch('tel://101');
                          await FlutterPhoneDirectCaller.callNumber('tel://101');
                        },),
                        SizedBox(width: 5,),
                        Text("POLICE DEPARTMENT", style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.blue),)
                      ],
                    ),

                  ],
                ),
              ),
            ),
          ),
         // service call
          Padding(
            padding: const EdgeInsets.all(32.0),
            child: Card(
              shadowColor: Colors.amberAccent,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),

              child: Container(
                child: Column(
                  children: [
                    Image.network('https://previews.123rf.com/images/faysalfarhan/faysalfarhan1502/faysalfarhan150201162/36499382-support-customer-care-icon-yellow-glossy-round-button.jpg',width: 110,height: 110,),
                    Row(
                      children: [
                        SizedBox(width: 50,),
                        IconButton(icon: Icon(Icons.call,size: 30,), onPressed: () async {
                          launch('tel://911');
                          await FlutterPhoneDirectCaller.callNumber('tel://911');
                        },),
                        SizedBox(width: 10,),
                        Text("HELP-CENTER", style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.amber),)
                      ],
                    ),

                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
