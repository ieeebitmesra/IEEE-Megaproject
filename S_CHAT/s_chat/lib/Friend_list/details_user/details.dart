import 'dart:convert';
import 'package:http/http.dart' as http;

Future<http.Response> fetchUserDetails(String username) async {
  var wwe = 'https://schat-backend.azurewebsites.net/user/$username';
  return await http.get(Uri.parse(wwe));
}

Future<http.Response> getUser(String username) async {
  var wwe = 'https://schat-backend.azurewebsites.net/user/$username';
  return await http.get(Uri.parse(wwe));
}

Future<http.Response> checkuser(String username, String phoneNo) async {
  return http.post(
    Uri.parse('https://schat-backend.azurewebsites.net/auth'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'name': username,
      'phone_no': phoneNo,
    }),
  );
}

Future<http.Response> addUser(String val1, String username1) {
  return http.post(
    Uri.parse('https://schat-backend.azurewebsites.net/addUser'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'name': username1,
      'phone_no': val1,
    }),
  );
}

Future<http.Response> addFriend(String val, String username) {
  return http.post(
    Uri.parse('https://schat-backend.azurewebsites.net/addFriend/$username'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'add': val,
    }),
  );
}

String usrname = '';
String phoneNo = '';
List<String> friends = [];
