import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:s_chat/Friend_list/Messages/box.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class FriendsPage extends StatefulWidget {
  const FriendsPage({Key? key}) : super(key: key);

  @override
  State<FriendsPage> createState() => _FriendsPageState();
}

class _FriendsPageState extends State<FriendsPage> {
  bool flag = false;
  @override
  Widget build(BuildContext context) {
    String val = '';
    return Padding(
      padding: const EdgeInsets.only(top: 75, left: 30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Add friend',
            style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.lightBlueAccent),
          ),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  enabled: !flag,
                  onChanged: (value) {
                    val = value;
                  },
                  autofocus: false,
                  textInputAction: TextInputAction.next,
                  decoration: InputDecoration(
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.white),
                    ),
                    contentPadding: const EdgeInsets.fromLTRB(20, 15, 20, 15),
                    hintText: 'enter username',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: ElevatedButton(
                    onPressed: () async {
                      setState(() {
                        flag = true;
                      });
                      var msgg = await addFriend(val, usrname);
                      var msgz = jsonDecode(msgg.body);
                      var lmsg = msgz['result'];

                      var ussr = await fetchUserDetails(usrname);
                      final usr = jsonDecode(ussr.body);
                      usrname = usr['name'];
                      phoneNo = usr['phone_no'];
                      friends.clear();
                      for (String k in usr['friends'].keys) {
                        friends.add(usr['friends'][k]);
                      }
                      setState(() {
                        flag = false;
                      });
                      Fluttertoast.showToast(
                        msg: lmsg,
                        toastLength: Toast.LENGTH_SHORT,
                      );
                    },
                    child: flag == false ? txt() : spinner()),
              ),
            ],
          ),
          const SizedBox(
            height: 30,
          ),
          const Text(
            'Your friends',
            style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.lightBlueAccent),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(0),
              itemCount: friends.length,
              itemBuilder: (context, index) {
                return FriendBox(friends[index], false);
              },
            ),
          )
        ],
      ),
    );
  }
}

Widget txt() {
  return const Text(
    'ADD',
    style: TextStyle(
      fontSize: 20,
    ),
  );
}

Widget spinner() {
  return const SpinKitRing(
    color: Colors.white,
    size: 30.0,
  );
}
