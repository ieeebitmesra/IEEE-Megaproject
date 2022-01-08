import 'package:flutter/material.dart';
import 'package:bottom_navy_bar/bottom_navy_bar.dart';
import 'package:s_chat/Friend_list/Account/account_page.dart';
import 'package:s_chat/Friend_list/Friends/friends_page.dart';
import 'package:s_chat/Friend_list/Messages/messages.dart';
import 'package:s_chat/Friend_list/camera.dart';

class ListPage extends StatefulWidget {
  final String userinput;
  const ListPage(this.userinput,{Key? key}) : super(key: key);

  @override
  State<ListPage> createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  int _selectedIndex = 0;
  List<Widget> ls = const [Msgs(), FriendsPage(),MyApp(), AccountPage()];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 35, 38, 51),
        body: ls[_selectedIndex],
        bottomNavigationBar: BottomNavyBar(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          backgroundColor: Colors.black,
          selectedIndex: _selectedIndex,
          showElevation: false, // use this to remove appBar's elevation
          onItemSelected: (index) => setState(() {
            _selectedIndex = index;
            const Duration(microseconds: 50);
          }),
          items: [
            BottomNavyBarItem(
                icon: const Icon(Icons.message),
                title: const Text('Messages'),
                inactiveColor: Colors.grey,
                activeColor: Colors.blue),
            BottomNavyBarItem(
                icon: const Icon(Icons.people),
                title: const Text('Friends'),
                inactiveColor: Colors.grey,
                activeColor: Colors.blue),
            BottomNavyBarItem(
                icon: const Icon(Icons.camera),
                title: const Text('Camera'),
                inactiveColor: Colors.grey,
                activeColor: Colors.blue),
            BottomNavyBarItem(
                icon: const Icon(Icons.person),
                title: const Text('Account'),
                inactiveColor: Colors.grey,
                activeColor: Colors.blue),
          ],
        ));
  }
}
