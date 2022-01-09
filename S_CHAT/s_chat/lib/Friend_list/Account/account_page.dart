import 'package:flutter/material.dart';
import 'package:s_chat/Friend_list/details_user/details.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    int len = friends.length;
    return Center(
      child: SizedBox(
        height: 240,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            const CircleAvatar(
              radius: 50,
              backgroundColor: Colors.white,
              child: Icon(
                Icons.person_rounded,
                size: 80,
                color: Colors.blue,
              ),
            ),
            Text(
              usrname,
              style: const TextStyle(fontSize: 22, color: Colors.white),
            ),
            Text(
              phoneNo,
              style: const TextStyle(fontSize: 22, color: Colors.white),
            ),
            Text(
              '$len  friends',
              style: const TextStyle(fontSize: 22, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
