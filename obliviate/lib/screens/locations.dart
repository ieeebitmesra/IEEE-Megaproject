import 'package:flutter/material.dart';

import 'package:url_launcher/url_launcher.dart';

class LocationsPage extends StatefulWidget {
  const LocationsPage({Key? key}) : super(key: key);

  @override
  _LocationsPageState createState() => _LocationsPageState();
}

class _LocationsPageState extends State<LocationsPage> {
  final String myLoc =
      "https://www.google.com/maps/search/?api=1&query=" + "40.7128,74.0060";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.teal,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Locations',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body:
      ListView(

        children: <Widget>[
          ListTile(
            onTap: () => _launchURL(myLoc),
            contentPadding: EdgeInsets.symmetric(horizontal: 20.0),
            leading: Icon(
              Icons.home,
              color: Colors.teal,
            ),
            title: Text(
              'Home',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'East road,West street',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            trailing: PopupMenuButton(
              itemBuilder: (_) => const <PopupMenuItem<String>>[
                PopupMenuItem<String>(
                    child: Text('Remove label'), value: 'remove'),
              ],
            ),
          ),
          ListTile(
            onTap: () {
              _launchURL(myLoc);
            },
            contentPadding: EdgeInsets.symmetric(horizontal: 20.0),
            leading: Icon(
              Icons.local_hospital_rounded,
              color: Colors.teal,
            ),
            title: Text(
              'Dr. Emir Sarrafoglu',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Patna High Street',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            trailing: PopupMenuButton(
              itemBuilder: (_) => const <PopupMenuItem<String>>[
                PopupMenuItem<String>(
                    child: Text('Remove label'), value: 'remove'),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // Add your onPressed code here!
          _launchURL(myLoc);
        },
        label: const Text('Add'),
        icon: const Icon(Icons.add_location),
        backgroundColor: Colors.teal,
      ),
    );
  }

  void _launchURL(url) async {
    await launch(url);
  }
}