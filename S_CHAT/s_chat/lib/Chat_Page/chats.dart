import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:s_chat/Chat_Page/fetching_message.dart';
import 'package:s_chat/Chat_Page/send_message.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';

class ChatDetailPage extends StatefulWidget {
  final String name;
  final String id;
  const ChatDetailPage(this.name, this.id, {Key? key}) : super(key: key);

  @override
  _ChatDetailPageState createState() => _ChatDetailPageState();
}

class _ChatDetailPageState extends State<ChatDetailPage> {
  String txt = '';
  final fieldText = TextEditingController();
  Timer? timer;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(milliseconds: 3), (timer) async {
      String id = mIN(usrname, widget.name) + '!!!' + mAX(usrname, widget.name);
      var mssggs = await fetchMsgs(id);
      final msgg = jsonDecode(mssggs.body);
      String z = 'l';
     
      for (String k in msgg['msgs'].keys) {
        if (usrname == mIN(usrname, widget.name)) {
          z = k[0] == 'b' ? 'l' : 'r';
        } else {
          z = k[0] == 'a' ? 'l' : 'r';
        }
        tempMsg.add(z + msgg['msgs'][k]);
      }
      msg = tempMsg;
      
      setState(() {});
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // pepcoding();
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        flexibleSpace: SafeArea(
          child: Container(
            padding: const EdgeInsets.only(right: 16),
            child: Row(
              children: <Widget>[
                IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: const Icon(
                    Icons.arrow_back,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(
                  width: 2,
                ),
                CircleAvatar(
                  child: Icon(
                    Icons.person,
                    color: Colors.blue[400],
                  ),
                  maxRadius: 20,
                ),
                const SizedBox(
                  width: 12,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        widget.name,
                        style: const TextStyle(
                            color: Colors.black,
                            fontSize: 19,
                            fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(
                        height: 4,
                      ),
                      Text(
                        "Available",
                        style: TextStyle(
                            color: Colors.grey.shade600, fontSize: 13),
                      ),
                    ],
                  ),
                ),
                const Icon(
                  Icons.more_vert,
                  color: Colors.black54,
                ),
              ],
            ),
          ),
        ),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: SingleChildScrollView(
              child: ListView.builder(
                 reverse: true,
                itemCount: msg.length,
                shrinkWrap: true,
                padding: const EdgeInsets.only(top: 10, bottom: 10),
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) {
                  return Container(
                    padding: const EdgeInsets.only(
                        left: 16, right: 16, top: 10, bottom: 10),
                    child: Align(
                      alignment: (msg[index][0] == "r"
                          ? Alignment.topRight
                          : Alignment.topLeft),
                      child: Container(
                        constraints: const BoxConstraints(maxWidth: 250),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: (msg[index][0] == "r"
                              ? Colors.white
                              : Colors.blue[200]),
                        ),
                        padding: const EdgeInsets.all(16),
                        child: Text(
                          msg[index].substring(1),
                          style: const TextStyle(color: Colors.black),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              padding: const EdgeInsets.only(left: 10, bottom: 10, top: 10),
              height: 60,
              width: double.infinity,
              color: Colors.white,
              child: Row(
                children: <Widget>[
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      height: 30,
                      width: 30,
                      decoration: BoxDecoration(
                        color: Colors.indigo[900],
                        borderRadius: BorderRadius.circular(30),
                      ),
                      child: const Icon(
                        Icons.add,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                  const SizedBox(
                    width: 15,
                  ),
                  Expanded(
                    child: TextField(
                      controller: fieldText,
                      onChanged: (value) {
                        txt = value;
                      },
                      decoration: const InputDecoration(
                          hintText: "Write message...",
                          hintStyle: TextStyle(color: Colors.black54),
                          border: InputBorder.none),
                      style: const TextStyle(color: Colors.black),
                    ),
                  ),
                  const SizedBox(
                    width: 15,
                  ),
                  FloatingActionButton(
                    onPressed: () async {
                      String tt = txt;
                      setState(() {
                        msg.add('r$txt');
                        txt = '';
                        fieldText.clear();
                      });
                      await sendMessage(tt, widget.id, usrname);
                    },
                    child: const Icon(
                      Icons.send,
                      color: Colors.white,
                      size: 18,
                    ),
                    backgroundColor: Colors.indigo[900],
                    elevation: 0,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

String mIN(String a, String b) {
  int val = a.compareTo(b);
  return val == -1 ? a : b;
}

String mAX(String a, String b) {
  int val = a.compareTo(b);
  return val == 1 ? a : b;
}
