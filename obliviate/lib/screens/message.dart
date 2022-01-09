import 'package:flutter/material.dart';
import 'package:obliviate_app/model/message_model.dart';
import 'package:url_launcher/url_launcher.dart';
class MessageScreen extends StatefulWidget {


  const MessageScreen({Key? key,}) : super(key: key);


  @override
  _MessageScreenState createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {

  @override
  Widget build(BuildContext context) {


    return Scaffold(

      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.cyan[900],
        // backgroundColor: Colors.cyan[800],
        title: Text("Send Reminders",), centerTitle: true,foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(82.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[

           Padding(padding: EdgeInsets.all(35)),


            for(int i=0; i<reminder.length; i++)
              MsgCard( reminder : reminder[i] ),



          ],

        ),
      ),
    );
  }
}


class MsgCard extends StatelessWidget {
  final Reminder reminder;
  const MsgCard({Key? key,required this.reminder}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(onPressed: () => launch("sms:${reminder.call}"), child: Container(
      child: Container(

        child:Column(
          children: [
            Card(

              color: Colors.cyan[800],
              shadowColor: Colors.white,
              elevation: 10,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),


              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(

                children: [
                  Icon(Icons.sms,size: 30,color: Colors.white,),
                  Text(" ${reminder.name} " ,
                    style: TextStyle(fontSize: 25,color:Colors.white,
                      fontWeight: FontWeight.bold),),
                ],
            ),
              ),
      ),
            SizedBox(height: 20,),
          ],
        ),
      ),
    ));
  }
}
