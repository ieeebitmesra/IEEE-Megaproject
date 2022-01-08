import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:s_chat/Authentication/signin_signup.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';
import 'package:s_chat/Friend_list/listpage.dart';
import 'package:s_chat/loading_saveduser.dart';
import 'package:s_chat/shared_preference.dart';
import 'Authentication/signin_signup.dart';

String zzname = '';
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  zzname = await SaveData.getUSERNAME();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 's_chat',
      theme: ThemeData.dark(),
      home: Scaffold(
        body: zzname == '' ? const SignIn() : Loader(zzname),
      ),
    );
  }

//  navigation(zzname, context)
  navigation(String zzn, BuildContext context) async {
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

// simple-secure-smart