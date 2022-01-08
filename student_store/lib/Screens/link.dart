import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class Link extends StatefulWidget {
  const Link({Key? key}) : super(key: key);

  @override
  _LinkState createState() => _LinkState();
}

class _LinkState extends State<Link> {
  get child => null;

  get splashRadius => null;

  _launchurl() async {
    const url = 'https://www.linkedin.com/';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw "could not connect";
    }
  }

  @override
  Widget build(BuildContext context) {
    var cyan;
    return Scaffold(
      appBar: AppBar(
        title: const Text("Connect With"),
        iconTheme: const IconThemeData(color: Colors.blue),
        backgroundColor: const Color(0xFF311B92),
      ),
      body: Container(
        alignment: Alignment.center,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/Icons/linkdn.png"),
            fit: BoxFit.cover,
          ),
        ),
        child: IconButton(
          icon: Icon(
            Icons.touch_app_outlined,
            size: 100,
          ),
          alignment: Alignment(0.45, 2.5),
          iconSize: 200,
          tooltip: "click to open",
          onPressed: _launchurl,
        ),
      ),
    );
  }
}
