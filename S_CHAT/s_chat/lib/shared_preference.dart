import 'package:shared_preferences/shared_preferences.dart';

class SaveData {
  String nAME = '';
  static void setUSERNAME(String val) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('nAME', val);
  }

  static Future<String> getUSERNAME() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('nAME') ?? '';
  }
}
