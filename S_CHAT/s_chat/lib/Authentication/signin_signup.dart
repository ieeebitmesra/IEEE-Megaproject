import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:s_chat/Friend_list/listpage.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';
import 'package:s_chat/shared_preference.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class SignIn extends StatefulWidget {
  const SignIn({Key? key}) : super(key: key);

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  TextEditingController otpController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController userController = TextEditingController();
  bool flag = false;
  bool isLoggedIn = false;
  String name = '';

  FirebaseAuth auth = FirebaseAuth.instance;

  @override
  void initState() {
    super.initState();
    autoLogIn();
  }

  void autoLogIn() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userId = prefs.getString('name');

    if (userId != null) {
      setState(() {
        isLoggedIn = true;
        name = userId;
      });
      return;
    }
  }

  bool otpVisibility = false;
  var f = 1;
  String verificationID = "";
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[900],
      child: Center(
        child: SizedBox(
          width: 300,
          height: 350,
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Column(
                  children: const [
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text(
                        'Authentication',
                        style: TextStyle(
                          fontSize: 24,
                          color: Colors.blue,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 14, right: 14),
                      child: Divider(
                        color: Colors.white,
                        height: 4,
                        thickness: 2,
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    TextField(
                      controller: userController,
                      obscureText: false,
                      decoration: const InputDecoration(labelText: "User name"),
                      keyboardType: TextInputType.text,
                    ),
                    TextField(
                      controller: phoneController,
                      decoration:
                          const InputDecoration(labelText: "Phone number"),
                      keyboardType: TextInputType.phone,
                    ),
                    TextField(
                        controller: otpController,
                        decoration: const InputDecoration(labelText: "OTP"),
                        keyboardType: TextInputType.number),
                    TextButton(
                      onPressed: () async {
                        setState(() {
                          flag = true;
                        });
                        var msgg = await checkuser(
                            userController.text, phoneController.text);
                        var msgz = jsonDecode(msgg.body);
                        var lmsg = msgz['result'];

                        if (lmsg == "old bakra") {
                          loginWithPhone();
                        } else if (lmsg == "new bakra") {
                          f = 2;
                          loginWithPhone();
                        } else {
                          Fluttertoast.showToast(
                            msg: lmsg,
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.CENTER,
                            timeInSecForIosWeb: 1,
                            backgroundColor: Colors.red,
                            textColor: Colors.white,
                            fontSize: 16.0,
                          );
                        }
                      },
                      child: const Text(
                        'Generate OTP',
                        style: TextStyle(fontSize: 16, color: Colors.pink),
                      ),
                    ),
                  ],
                ),
                TextButton(
                   onPressed: verifyOTP,
                  /*onPressed: () {
                    SaveData.setUSERNAME('deependu1234');
                    navigation('deependu1234');
                  },*/
                  child: const Text(
                    "VERIFY",
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  void loginWithPhone() async {
    auth.verifyPhoneNumber(
      phoneNumber: "+91" + phoneController.text,
      verificationCompleted: (PhoneAuthCredential credential) async {
        await auth.signInWithCredential(credential).then((value) {});
      },
      verificationFailed: (FirebaseAuthException e) {},
      codeSent: (String verificationId, int? resendToken) {
        otpVisibility = true;
        verificationID = verificationId;
        setState(() {});
      },
      codeAutoRetrievalTimeout: (String verificationId) {},
    );
  }

  void verifyOTP() async {
    PhoneAuthCredential credential = PhoneAuthProvider.credential(
        verificationId: verificationID, smsCode: otpController.text);

    await auth.signInWithCredential(credential).then(
      (value) async {
        Fluttertoast.showToast(
          msg: "You are logged in successfully",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
        await addUser(phoneController.text, userController.text);
        usrname = userController.text;
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('name', userController.text);

        setState(() {
          name = userController.text;
          isLoggedIn = true;
        });
        SaveData.setUSERNAME(usrname);
        userController.clear();
        navigation(usrname);
      },
    );
  }

  navigation(String zzn) async {
    var ussr = await fetchUserDetails(zzn);

    final usr = jsonDecode(ussr.body);
    usrname = usr['name'];
    phoneNo = usr['phone_no'];
    for (String k in usr['friends'].keys) {
      friends.add(usr['friends'][k]);
    }

    Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => ListPage(zzn),
        ));
  }
}
