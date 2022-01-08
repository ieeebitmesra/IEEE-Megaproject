import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:s_chat/Chat_Page/chats.dart';
import 'package:s_chat/Chat_Page/fetching_message.dart';
import 'package:s_chat/Friend_list/Friends/friends_page.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';

class FriendBox extends StatefulWidget {
  final String name;
  final bool msg;
  const FriendBox(this.name, this.msg, {Key? key}) : super(key: key);

  @override
  State<FriendBox> createState() => _FriendBoxState();
}

class _FriendBoxState extends State<FriendBox> {
  bool touch = false;
  String mIN(String a, String b) {
    int val = a.compareTo(b);
    return val == -1 ? a : b;
  }

  String mAX(String a, String b) {
    int val = a.compareTo(b);
    return val == 1 ? a : b;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.msg == false) {
      touch = false;
    }
    return TextButton(
      onPressed: () async {
        setState(() {
          touch = !touch;
        });

        String id =
            mIN(usrname, widget.name) + '!!!' + mAX(usrname, widget.name);
        var mssggs = await fetchMsgs(id);
        final msgg = jsonDecode(mssggs.body);
        String z = 'l';
        msg.clear();
        for (String k in msgg['msgs'].keys) {
          if (usrname == mIN(usrname, widget.name)) {
            z = k[0] == 'b' ? 'l' : 'r';
          } else {
            z = k[0] == 'a' ? 'l' : 'r';
          }
          msg.add(z + msgg['msgs'][k]);
        }
        setState(() {
          touch = !touch;
        });
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => ChatDetailPage(widget.name, id)),
        );
      },
      child: SizedBox(
        width: double.infinity,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Icon(
                Icons.account_circle,
                color: touch ? Colors.red : Colors.white,
                size: 60,
              ),
            ),
            Text(
              widget.name,
              style: TextStyle(
                  fontSize: 20, color: touch ? Colors.red : Colors.white),
            ),
            const SizedBox(
              width: 40,
            ),
            if (touch) spinner()
          ],
        ),
      ),
    );
  }
}
