import 'package:http/http.dart' as http;

Future<http.Response> fetchMsgs(String id) async {
  var msg = 'https://schat-backend.azurewebsites.net/msg/$id';
  return await http.get(Uri.parse(msg));
}

List<String> msg = [];
List<String> tempMsg = [];
