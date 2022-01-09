import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
class AddNote extends StatefulWidget {
  const AddNote({Key? key}) : super(key: key);

  @override
  _AddNoteState createState() => _AddNoteState();
}

class _AddNoteState extends State<AddNote> {
  late String title;
  late String des;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.all(12),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton(onPressed: (){
                     Navigator.of(context).pop();
                    }, child: Icon(
                      Icons.arrow_back,
                    ),
                    ),
                    //save button
                    ElevatedButton(onPressed: add,
                      child: Text("Save"),


                    ),
                  ],
                ),

               SizedBox(height: 10,),

             Form(child: Column(
               children: [
                 Padding(
                   padding: const EdgeInsets.all(12.0),
                   child: TextFormField(
                     decoration: InputDecoration.collapsed(hintText: "Title"),
                     style: TextStyle(
                       fontSize: 30,
                       fontWeight: FontWeight.bold,
                     ),
                     onChanged: (_val){
                       title = _val;
                     },
                   ),
                 ),
                 //description
                 Container(
                   height: MediaQuery.of(context).size.height * 0.75,
                   padding: const EdgeInsets.all(12.0),
                   child: TextFormField(
                     decoration: InputDecoration.collapsed(hintText: "description"),
                     style: TextStyle(
                       fontSize: 20,
                       fontWeight: FontWeight.bold,
                     ),
                     onChanged: (_val){
                       des = _val;
                     },
                     maxLines: 20,
                   ),
                 ),
               ],
             ))
              ],
            ),
          ),
        )),);
  }

  void add() async{
    // save to database
    CollectionReference ref = FirebaseFirestore.instance.collection('users').doc(
        FirebaseAuth.instance.currentUser!.uid).collection('notes');


    var data = {

      'description' : des,
      'title' : title,
      // 'created' : DateTime.now(),
    };
    ref.add(data);
    //

    Navigator.pop(context);
  }

}
