import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:obliviate_app/model/user_model.dart';
import 'package:obliviate_app/screens/login.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  User? user = FirebaseAuth.instance.currentUser;
  UserModel loggedInUser = UserModel();

  @override
  void initState() {

    super.initState();
    FirebaseFirestore.instance
        .collection("users")
        .doc(user!.uid)
        .get()
        .then((value){  this.loggedInUser = UserModel.fromMap(value.data());
    setState(() {

    });

    });
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        // backgroundColor: Colors.transparent,
        // elevation: 0,
        // leading: IconButton(),


        title: Text("YOUR PROFILE",), centerTitle: true,foregroundColor: Colors.white,),
      body:Center(
        child: Padding(
          padding:EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              CircleAvatar(
                radius: 60.0,
                backgroundColor: Colors.white,
                backgroundImage: AssetImage('assets/avatar.png'),

              ),
              SizedBox(
                height: 30,
              ),
              Text("You Can Close eyes to ", style: TextStyle(fontSize: 15,fontWeight: FontWeight.w300),),
              SizedBox(
                height: 2,
              ),
              Text("Reality but not to memories :)", style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
              SizedBox(
                height: 30,
              ),
              Container(
                padding: EdgeInsets.all(13),
                color: Colors.black26,
                margin: EdgeInsets.symmetric(vertical: 10,horizontal: 25),

                child: Row(
                  children: <Widget>[
                    Icon(
                      Icons.person,
                      color: Colors.teal[900],
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Text(
                        "${loggedInUser.firstName} ${loggedInUser.secondName}",
                        style: TextStyle(
                          fontSize: 15,
                          color: Colors.teal[900],
                          fontWeight: FontWeight.bold,
                        )),




                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(10),
                color: Colors.black26,
                margin: EdgeInsets.symmetric(vertical: 10,horizontal: 25),

                child: Row(
                  children: <Widget>[
                    Icon(
                      Icons.mail,
                        color: Colors.teal[900],
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Text(
                        "${loggedInUser.email}",
                        style: TextStyle(
                          color: Colors.teal[900],
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        )),



                  ],
                ),
              )


            ],
          ),
        ),

      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.miniEndFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          logout(context);
        },
        backgroundColor: Colors.teal,
        child: const Icon(Icons.logout),
      ),

    );
  }

  Future<void> logout(BuildContext context) async{
    await FirebaseAuth.instance.signOut();
    Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context)=>LoginScreen()));
  }


}

