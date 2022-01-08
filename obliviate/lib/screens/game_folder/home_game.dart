import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:obliviate_app/screens/recreation.dart';
import 'package:obliviate_app/screens/routes.dart';

class Home extends StatelessWidget {
  Home({Key? key}) : super(key: key);

  final buttonStyle = ElevatedButton.styleFrom(
      padding: EdgeInsets.fromLTRB(75, 15, 75, 15));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(

          child: Stack(
            children: [
              Positioned(
                top:0,
                height: MediaQuery.of(context).size.height*0.35,
                left: 0,
                right: 0,

                child: ClipRRect(
                  borderRadius:  const BorderRadius.vertical(
                    bottom:  const Radius.circular(160),
                  ),
                  child: Container(
                    color: Colors.white,
                    child: Image.asset('assets/games/icon.png',width: 100,height: 110,),
                  ),
                ),),
              Positioned(
              top: MediaQuery.of(context).size.height * 0.23,
               left: 0,
                right: 0,

              child:Container(
               height : MediaQuery.of(context).size.height * 0.6,

              child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('MindBlowing', style: TextStyle(fontSize: 50)),
                const Text('----Sharpen Your Memory----', style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w300),
                ),
                const SizedBox(height: 50),
                ElevatedButton(
                  child: const Text('Play', style: TextStyle(fontSize: 25)),
                  onPressed: () {
                    Navigator.of(context).push(Routes.createRoute(context));
                  },
                  style: buttonStyle,
                )
              ],

            ),
              ),
              ),

          ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(
              builder: (context) => RecreationScreen()));
        },
        child: const Icon(Icons.arrow_back),
      ),

    );
  }
}