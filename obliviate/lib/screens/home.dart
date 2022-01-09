import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/emergency.dart';
import 'package:obliviate_app/screens/family_gallery.dart';
import 'package:obliviate_app/screens/health.dart';
import 'package:obliviate_app/screens/help.dart';
import 'package:obliviate_app/screens/homemap.dart';
import 'package:obliviate_app/screens/locations.dart';
import 'package:obliviate_app/screens/message.dart';
import 'package:obliviate_app/screens/phone.dart';
import 'package:obliviate_app/screens/precautions.dart';

import 'package:obliviate_app/screens/profile.dart';
import 'package:obliviate_app/screens/recreation.dart';

class SideDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          DrawerHeader(
            child: Center(

              child: Text(
                'Welcome to Oblivate!',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white, fontSize: 25),
              ),

            ),
            decoration: BoxDecoration(
              color: Colors.cyan[900],
            ),
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Profile'),
            onTap: () => {
              Navigator.push(context, MaterialPageRoute(builder: (context) => ProfileScreen()))
            },
          ),
          ListTile(
            leading: Icon(Icons.home),
            title: Text('Home Location'),
            onTap: () => {
              Navigator.push(context, MaterialPageRoute(builder: (context) => HomeMap()))
            },
          ),
          ListTile(
            leading: Icon(Icons.call),
            title: Text('Emergency call'),
            onTap: () => {Navigator.push(context, MaterialPageRoute(builder: (context) => EmergencyCall())) },
          ),
          ListTile(
            leading: Icon(Icons.border_color),
            title: Text('Precautions'),
            onTap: () => {
              Navigator.push(context, MaterialPageRoute(builder: (context) => PrecautionScreen()))
              },
          ),
          ListTile(
            leading: Icon(Icons.info),
            title: Text('Info'),
            onTap: () => {Navigator.push(context, MaterialPageRoute(builder: (context) => ExpandableTutorial()))
    },
          ),
        ],
      ),
    );
  }
}
class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: SideDrawer(),
        appBar: AppBar(
          title: Text("OBLIVIATE",), centerTitle: true,foregroundColor: Colors.white,
        ),

          body: MainPage(),

      floatingActionButtonLocation: FloatingActionButtonLocation.miniEndFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: ()  {

          Navigator.push(context, MaterialPageRoute(
              builder: (context) =>LocationsPage()));
          // logout(context);
        },
        backgroundColor: Colors.teal,
        child: const Icon(Icons.add_location_alt_outlined),
      ),

      );
}}
class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Center(

      child: Column(
        // mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,

        children: [
          Padding(padding: EdgeInsets.all(35)),
          Row(
            children: [
              SizedBox(
                height: 50,
              ),
              SizedBox(
                height: 50,
              ),
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

                  child: Image.asset('assets/img1.png',width: 110,height: 110,),
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
                  child: Image.asset('assets/img2.png',width: 110,height: 110,),
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
               builder: (context) =>HealthScreen()));
                },

               child: Text("Health",
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
                   builder: (context) => RecreationScreen()));

               },

    child: Text("Recreations",
                style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
    ), ),
            ],
          ),
         SizedBox(
          height: 20,
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
                  child: Image.asset('assets/img3.png',width: 110,height: 110,),
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


                  child: Image.asset('assets/img4.jpeg',width: 110,height: 110,),
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
          builder: (context) => PhoneScreen()));
          },

                child: Text("Appointment",
                  style: TextStyle(fontSize: 15,
                      fontWeight: FontWeight.bold),),
              ),),
              SizedBox(
                width: 50,
              ),
              SizedBox(
                height: 50,
                child: TextButton(
                  onPressed: ()
                  {
                    Navigator.push(context, MaterialPageRoute(
                        builder: (context) => FamilyScreen()));
                  },

                 child: Text( "Family Gallery",
               style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold),),
                ),),
            ],
          ),

        ],
      ),


    );



  }
}
