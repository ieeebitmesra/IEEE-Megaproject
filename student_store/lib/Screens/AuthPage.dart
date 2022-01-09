import 'package:flutter/material.dart';
import 'package:student_store/Screens/ProductCatalog.dart';
import 'package:student_store/Screens/CreateProfile.dart';

class AuthPage extends StatelessWidget {
  //const AuthPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.purple[900],
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Stack(
          alignment: Alignment.center,
          children: [
            Positioned(top: 70, child: Image.asset("assets/Icons/logo.png")),
            Positioned(
              top: 50,
              child: Padding(
                padding: const EdgeInsets.only(top: 300.0),
                child: Text("",
                    style: TextStyle(
                        color: Color(0xffD7A74F),
                        fontSize: 30,
                        fontFamily: 'BeVietnamPro')),
              ),
            ),
            Text("Skill Hub",
                style: TextStyle(
                    color: Color(0xffD7A74F),
                    height: 10,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Merriweather')),
            Positioned(
              bottom: 35,
              child: Padding(
                padding: const EdgeInsets.only(top: 40, bottom: 80),
                child: ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all(Color(0xffD7A74F)),
                        padding: MaterialStateProperty.all(
                            EdgeInsets.symmetric(vertical: 15, horizontal: 30)),
                        shape: MaterialStateProperty.all(RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(40))),
                        side: MaterialStateProperty.all(
                            BorderSide(width: 2, color: Colors.white))),
                    onPressed: () {
                      Navigator.pushReplacement(context,
                          MaterialPageRoute(builder: (_) => ProductCatalog()));
                    }
                    //FirebaseUser user = auth.signInWithCredential(new Credential());

                    //Navigator.pushReplacement(context, MaterialPageRoute(builder: (_)=> CreateProfilePage()));

                    ,
                    child: Text('Press to Enter',
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold))),
              ),
            ),
            Positioned(
                bottom: 10,
                child: Text("Copyrights Reserved",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    )))
          ],
        ),
      ),
    );
  }
}
