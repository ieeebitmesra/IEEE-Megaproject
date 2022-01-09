import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:image_picker/image_picker.dart';
import 'package:obliviate_app/screens/home.dart';
class FamilyScreen extends StatefulWidget {
  const FamilyScreen({Key? key}) : super(key: key);

  @override
  _FamilyScreenState createState() => _FamilyScreenState();
}

class _FamilyScreenState extends State<FamilyScreen> {
  final ImagePicker _picker = ImagePicker();
  List<XFile> _imageList =[];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
      floatingActionButton: Padding(
        padding: const EdgeInsets.all(0.5),
        child: FloatingActionButton(
          mini: true,
          onPressed: () {
            // logout(context);
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => HomeScreen()));
          },

          backgroundColor: Colors.black87,
          child: const Icon(Icons.close,size: 20,),
        ),
      ),
      body: SafeArea(

        child: Column(


          children: [
            SizedBox(height: 10,),
            Card(
              shadowColor: Colors.tealAccent,
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30),
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(Icons.collections,size: 100,),
              ),
            ),
            SizedBox(height: 10,),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                child: Text("---- Keep Your Family Close ----"),
              ),
            ),
            SizedBox(height: 30,),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: OutlinedButton(onPressed: () {
                imageSelect();
              }, child: const Text("Upload Image")),
            ),
            // Container(
            //   width: 30,
            //   height: 30,
            //   child: Image.asset('assets/img2.png'),
            // ),
            Column(
              children: [
                Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        width: 110,
                        height: 100,
                        child: Image.network('https://media.istockphoto.com/photos/portrait-of-smiling-optimistic-beard-pensioner-man-wear-light-blue-picture-id1287789056?b=1&k=20&m=1287789056&s=170667a&w=0&h=Z5fxguvjTc6keKU8HUbqTznSA3LNnIsn0ZYl9UyRhTc=',fit: BoxFit.cover,),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        width: 110,
                        height: 100,
                        child: Image.network('https://image.shutterstock.com/image-photo/smiling-senior-woman-front-white-260nw-401804362.jpg',fit: BoxFit.cover,),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        width: 110,
                        height: 100,
                        child: Image.network('https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373__480.jpg',fit: BoxFit.cover,),
                      ),
                    ),

                  ],
                ),
              ],
            ),
            Column(
              children: [
                Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("BROTHER                "),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("  SISTER                "),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text("GRANDCHILD"),
                    ),
                  ],
                ),

              ],
            ),
            Expanded(
              child: GridView.builder(gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
                  itemCount: _imageList.length,
                  itemBuilder: (BuildContext context , int index){
                    return Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Stack(
                        fit: StackFit.expand,

                        children: [
                          Image.file(File(_imageList[index].path), fit: BoxFit.cover,),
                          Align(

                            alignment: Alignment.bottomCenter,
                            child:TextField (
                              decoration: InputDecoration(
                                border: OutlineInputBorder(),

                              ),
                            ),
                          ),
                    ],


                      ),
                    );
                  }
              ),
            )

          ],
        ),
      ),
    );

  }

  void imageSelect() async{
    final XFile? selectedImage = await _picker.pickImage(source: ImageSource.gallery);
    if(selectedImage!.path.isNotEmpty){
      _imageList.add(selectedImage);
    }
    // print(selectedImage!.path.toString());
    setState(() {

    });
  }


}