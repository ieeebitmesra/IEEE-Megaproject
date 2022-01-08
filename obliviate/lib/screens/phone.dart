
import 'package:flutter/material.dart';
import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:obliviate_app/model/doctor_model.dart';
import 'package:url_launcher/url_launcher.dart';
class PhoneScreen extends StatefulWidget {
  const PhoneScreen({Key? key}) : super(key: key);

  @override
  _PhoneScreenState createState() => _PhoneScreenState();
}

class _PhoneScreenState extends State<PhoneScreen> {
  // final number = '919835049071';
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
    child: Image.network('https://www.healserv.com/blog/wp-content/uploads/2020/10/isometric-appointment-booking-with-calendar_23-2148565453.jpg',width: 100,height: 100,),
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

    ), child: Text("Book Your Appointment",style: TextStyle(fontSize: 25,
    fontWeight: FontWeight.bold),),
    ),
    Expanded(child: SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    child: Row(
    children: <Widget>[
    SizedBox(width: 32,),
    for(int i=0; i<doc.length; i++)
    _DocCard( doc : doc[i] ),

    ],
    ),
    ),),

    ],
    ),
    ), ),


    ],

    ),
    );
  }
}
class _DocCard extends StatelessWidget {
  final Doctor doc;

  const _DocCard({Key? key, required this.doc}) : super(key: key);

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
                  child: Image.asset(doc.img,
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
                      Text(doc.tt, style: TextStyle(fontSize: 14,
                          fontWeight: FontWeight.bold),),
                      Text(doc.name, style: TextStyle(fontSize: 16,
                          fontWeight: FontWeight.w700),),
                      Row(
                        children: [
                          Text(doc.cal, style: TextStyle(fontSize: 12,
                              fontWeight: FontWeight.bold),),
                          Icon(Icons.star,size: 16,color: Colors.amber,),
                          Icon(Icons.star,size: 16,color: Colors.amber,)
                        ],
                      ),
                          Row(
                            children: [
                              IconButton( icon:Icon(Icons.sms),  onPressed: () => launch("sms:${doc.num}")),
                              IconButton(icon: Icon(Icons.call), onPressed: () async {
                                launch('tel://${doc.num}');
                                await FlutterPhoneDirectCaller.callNumber(doc.num);
                              },),
                              IconButton(icon: Icon(Icons.mail), onPressed: _sendEmail

                              ,),


                            ],
                          ),



                    ],
                  ),
                ),
              ),

            ],
          ),


        ));

  }

  _sendEmail() {
    String? encodeQueryParameters(Map<String, String> params) {
      return params.entries
          .map((e) => '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
          .join('&');
    }
    final Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: 'test@gmail.com',
      query: encodeQueryParameters(<String, String>{
        'subject': 'Fix an Appointment',
        'body' : 'Hey I want to fix an appointment with you tomorrow...'
      }),

    );

    launch(emailLaunchUri.toString());
    

  }
}



