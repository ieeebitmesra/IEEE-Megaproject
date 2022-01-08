import 'package:expandable/expandable.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ExpandableTutorial extends StatefulWidget {
  @override
  _ExpandableTutorialState createState() => _ExpandableTutorialState();
}

class _ExpandableTutorialState extends State<ExpandableTutorial> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("HELP-DESK"),
      ),
      body: ListView(
        children: [
          Card1(),
          Card2(),
          // Card3(),
          Card4(),





        ],
      ),
    );
  }
}



class Card1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ExpandableNotifier(
      child: Padding(
        padding: EdgeInsets.all(10),
        child: Card(
          color: Colors.teal[100],
          child: Column(
            children: [
              SizedBox(
                height: 150,
                child: Container(
                  child: Icon(Icons.psychology,size: 100,),
                  decoration: BoxDecoration(
                    // color: Colors.white60,
                    // shape: BoxShape.circle,
                  ),
                ),
              ),
              ScrollOnExpand(
                child: ExpandablePanel(
                  theme: ExpandableThemeData(
                      tapBodyToCollapse: true,
                      tapBodyToExpand: true
                  ),
                  header: Padding(
                    padding: EdgeInsets.all(10),
                    child: Text(
                      "WHAT'S ALZEHEIMIER?",
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  expanded: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(bottom: 10),
                          child: Text("The greatest known risk factor is increasing age, and the majority of people with Alzheimer's are 65 and older. Alzheimer’s disease is considered to be younger-onset Alzheimer’s if it affects a person under 65. Younger-onset can also be referred to as early-onset Alzheimer’s. People with younger-onset Alzheimer’s can be in the early, middle or late stage of the disease.",
                              softWrap: true,
                              overflow: TextOverflow.fade,
                              style: TextStyle(color: Colors.black)),
                        ),

                    ],
                  ),
                  collapsed: Text("Alzheimer's is not a normal part of aging. ",
                      softWrap: true,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: Colors.black)),
                  builder: (_, collapsed, expanded) {
                    return Padding(
                      padding: EdgeInsets.only(left: 10, right: 10, bottom: 10),
                      child: Expandable(
                        collapsed: collapsed,
                        expanded: expanded,
                        theme: const ExpandableThemeData(crossFadePoint: 0),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
class Card2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ExpandableNotifier(
      child: Padding(
        padding: EdgeInsets.all(10),
        child: Card(
          color: Colors.teal[100],
          child: Column(
            children: [
              SizedBox(
                height: 150,
                child: Container(
                  child: Icon(Icons.adb,size: 100,),
                  decoration: BoxDecoration(
                    // color: Colors.white60,
                    // shape: BoxShape.circle,
                  ),
                ),
              ),
              ScrollOnExpand(
                child: ExpandablePanel(
                  theme: ExpandableThemeData(
                      tapBodyToCollapse: true,
                      tapBodyToExpand: true
                  ),
                  header: Padding(
                    padding: EdgeInsets.all(10),
                    child: Text(
                      "GUIDE",
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  expanded: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[

                        Padding(
                          padding: EdgeInsets.only(bottom: 10),
                          child: Text("Obliviate is a mobile based application that ensures compatibility and stability in its own accord.Our accessible and inclusive application helps to address the disabilities that people with alzheimer's face on a daily basis, developed with various user- friendly features for both caregivers and patients.The database provided in this solution enables cross platform access with up-to-date execution of every functionality. Rather than being a solution for a particular problem, our application ensures multiple solutions for other related problems. It makes it possible for people with Alzheimer's disease to retain a sense of identity during the process of the disease poses a great challenge to care-givers, professionals and family caregivers.",
                              softWrap: true,
                              overflow: TextOverflow.fade,
                              style: TextStyle(color: Colors.black)),
                        ),
                    ],
                  ),
                  collapsed: Text("Aim and objective of obliviate",
                      softWrap: true,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: Colors.black)),
                  builder: (_, collapsed, expanded) {
                    return Padding(
                      padding: EdgeInsets.only(left: 10, right: 10, bottom: 10),
                      child: Expandable(
                        collapsed: collapsed,
                        expanded: expanded,
                        theme: const ExpandableThemeData(crossFadePoint: 0),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Card4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ExpandableNotifier(
      child: Padding(
        padding: EdgeInsets.all(10),
        child: Card(
          color: Colors.teal[100],
          child: Column(
            children: [
              SizedBox(
                height: 150,
                child: Container(
                  // child: Icon(Icons.videocam ,size: 100,),
                  child: IconButton(icon:Icon(Icons.videocam,color: Colors.black,size: 100,), onPressed: () async {
                    final url ="https://youtu.be/zKJ_SAC2948";
                    if (!await launch(url)) throw 'Could not launch $url';
                  },),
                  decoration: BoxDecoration(
                    // color: Colors.white60,
                    // shape: BoxShape.circle,
                  ),
                ),
              ),
              ScrollOnExpand(
                child: ExpandablePanel(
                  theme: ExpandableThemeData(
                      tapBodyToCollapse: true,
                      tapBodyToExpand: true
                  ),
                  header: Padding(
                    padding: EdgeInsets.all(10),
                    child: Text(
                      "VIDEO DEMONSTRATION",
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  expanded: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[

                      Padding(
                        padding: EdgeInsets.only(bottom: 10),
                        child: Text("click on the video camera to see the guide",
                            softWrap: true,
                            overflow: TextOverflow.fade,
                            style: TextStyle(color: Colors.black)),
                      ),
                    ],
                  ),
                  collapsed: Text("Watch the video to know more :)",
                      softWrap: true,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: Colors.black)),
                  builder: (_, collapsed, expanded) {
                    return Padding(
                      padding: EdgeInsets.only(left: 10, right: 10, bottom: 10),
                      child: Expandable(
                        collapsed: collapsed,
                        expanded: expanded,
                        theme: const ExpandableThemeData(crossFadePoint: 0),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}













