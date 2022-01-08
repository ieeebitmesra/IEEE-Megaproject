import 'package:flutter/material.dart';
import 'package:s_chat/Friend_list/Messages/box.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';

class Msgs extends StatelessWidget {
  const Msgs({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          flex: 1,
          child: Container(
            color: Colors.blue[900],
            width: double.infinity,
            height: 120,
            child: const Align(
                alignment: Alignment.bottomLeft,
                child: Padding(
                  padding: EdgeInsets.all(25.0),
                  child: Text(
                    'S-Chat',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 30,
                        fontWeight: FontWeight.bold),
                  ),
                )),
          ),
        ),
        Expanded(
          flex: 4,
          child: ListView.builder(
            
            padding: EdgeInsets.zero,
            physics: const ClampingScrollPhysics(),
            itemCount: friends.length,
            itemBuilder: (context, index) {
              return FriendBox(friends[index], true);
            },
          ),
        ),
      ],
    );
  }
}
