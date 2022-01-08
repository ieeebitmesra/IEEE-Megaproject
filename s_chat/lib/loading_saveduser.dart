import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:s_chat/Friend_list/Friends/friends_page.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';
import 'package:s_chat/Friend_list/listpage.dart';

class Loader extends StatefulWidget {
  final String zznz;
  const Loader(this.zznz, {Key? key}) : super(key: key);

  @override
  _LoaderState createState() => _LoaderState();
}

class _LoaderState extends State<Loader> {
  navigation(String zzn, BuildContext context) async {
    var ussr = await fetchUserDetails(zzn);

    final usr = jsonDecode(ussr.body);
    usrname = usr['name'];
    phoneNo = usr['phone_no'];
    for (String k in usr['friends'].keys) {
      friends.add(usr['friends'][k]);
    }
    Navigator.pushReplacement<void, void>(
      context,
      MaterialPageRoute<void>(
        builder: (BuildContext context) => ListPage(zzn),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    navigation(widget.zznz, context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Spacer(
            flex: 3,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: const [
              Text(
                'SIMPLE',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Text('|',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              Text('SECURE',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              Text('|',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              Text('SMART',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
          const Spacer(
            flex: 1,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [spinner(), const Text('   please wait...')],
          ),
          const Spacer(
            flex: 3,
          ),
        ],
      ),
    );
  }
}
