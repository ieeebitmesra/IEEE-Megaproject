import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
class FamilyScreen extends StatefulWidget {
  const FamilyScreen({Key? key}) : super(key: key);

  @override
  _FamilyScreenState createState() => _FamilyScreenState();
}

class _FamilyScreenState extends State<FamilyScreen> {
  Widget buildBottomSheet(BuildContext context)
  {
    return Container(
      child: Column(
        children: [
          Text('Add Image',style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20.0,
          ),),
          Icon(Icons.add_a_photo,size: 100.0,),
          Text('Add name',style: TextStyle(
          ),),
          TextField(autofocus: false,
            textAlign: TextAlign.center,),
          Text('Add relation'),
          TextField(
            autofocus: false,
            textAlign: TextAlign.center,
          ),
          Expanded(
            child: FlatButton(
                color: Colors.teal,
                onPressed: null, child:Text('Add',style: TextStyle(
              color: Colors.teal,
            ),)),
          )
        ],
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.teal,
        child: Icon(Icons.add_a_photo),
        onPressed: (){
          showModalBottomSheet(context: context, builder: buildBottomSheet);
        },
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.only(
                top: 60.0, left: 30.0, right: 30.0, bottom: 30.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  child: Icon(Icons.insert_photo, size: 30.0,
                    color: Colors.teal,),
                  backgroundColor: Colors.white,
                  radius: 30.0,
                ),
                SizedBox(
                  height: 10.0,
                ),
                Text('Family Gallery',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 26.0,
                      fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(

              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0),
                ),
              ),
              child: ListView(
                children: [

                  Row(
                    children:  [
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://i5.walmartimages.com/asr/f3c08547-715c-4c30-9987-4b3ba9b71f4c_1.828d27d85c6b708c117934bde9d5f283.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
                            ),
                              radius: 50.0,
                            ),
                            Text('Harry'),
                            Text('Brother in law')
                          ]),

                      SizedBox(
                        width: 50.0,
                      ),
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrsbXiRg093LNFS-jfLok5MsfTTOASZz2YxvPLTzubfS8oFzvd1ZMUNQe1L3G7D-mr4o&usqp=CAU'),
                            ),
                              radius: 50.0,
                            ),
                            Text('Hermione'),
                            Text('Wife')
                          ]),
                    ],
                  ),
                  SizedBox(
                    height: 30.0,
                  ),
                  Row(
                    children:  [
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://i.pinimg.com/474x/6d/d9/1e/6dd91eef5bb3fb88ee8adc2cf54f8ca1.jpg')),
                              radius: 50.0,
                            ),
                            Text('Ginny'),
                            Text('Sister')
                          ]),

                      SizedBox(
                        width: 50.0,
                      ),
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://i.pinimg.com/originals/7f/3f/d6/7f3fd6ca8c477081f305f85d2a618663.jpg'),
                            ),
                              radius: 50.0,
                            ),
                            Text('Fred'),
                            Text('Brother')]),
                    ],
                  ),
                  SizedBox(
                    height: 30.0,
                  ),
                  Row(
                    children:  [
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://static.wikia.nocookie.net/harry-potter-fanfictional/images/0/02/Hugo.png/revision/latest/top-crop/width/360/height/450?cb=20160820170431'),
                              height: 75.0,),
                              radius: 50.0,
                              backgroundColor: Colors.teal,
                            ),
                            Text('Hugo'),
                            Text('Son')]),

                      SizedBox(
                        width: 50.0,
                      ),
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://pbs.twimg.com/profile_images/823655208668581888/QyfRsyJQ_400x400.jpg'),
                              height: 71,

                            ),
                              radius: 50.0,
                              backgroundColor: Colors.teal,
                            ),
                            Text('Albus'),
                            Text('Nephew')]),
                    ],
                  ),
                  SizedBox(
                    height: 30.0,
                  ),
                  Row(
                    children:  [
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://static.wikia.nocookie.net/harrypotter/images/b/b1/HPDH2-3922.jpg/revision/latest?cb=20141202001907'),
                              height: 71.0,

                            ),
                              radius: 50.0,
                              backgroundColor: Colors.teal,
                            ),
                            Text('James'),
                            Text('Nephew')]),

                      SizedBox(
                        width: 50.0,
                      ),
                      Column(
                          children:[
                            CircleAvatar
                              (child: Image(image: NetworkImage('https://static.wikia.nocookie.net/harrypotter/images/e/e6/Lily_L._Potter.jpg/revision/latest?cb=20180412223932'),
                              height: 78.0,
                            ),
                              radius: 50.0,
                              backgroundColor: Colors.teal,
                            ),
                            Text('Lily'),
                            Text('Neice')]),
                    ],
                  ),
                  SizedBox(
                    height: 30.0,
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
