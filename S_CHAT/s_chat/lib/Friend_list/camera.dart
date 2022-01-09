import 'dart:io';
import 'package:rwa_deep_ar/rwa_deep_ar.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

const apikey =
    "1cc390c3b9883742eea0d739ad9cbd8b1485e8fb13a554963ba20b9f5755cb23ac2aa8c540b49222";

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late CameraDeepArController cameraDeepArController;
  int currentPage = 0;
  final vp = PageController(viewportFraction: .24);
  Effects currentEffect = Effects.none;
  Filters currentFilter = Filters.none;
  Masks currentMask = Masks.none;
  bool isRecording = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children: [
            CameraDeepAr(
                onCameraReady: (isReady) {
                  if (kDebugMode) {
                    print("Camera status $isReady");
                  }
                },
                onImageCaptured: (path) {
                  if (kDebugMode) {
                    print("Image Taken $path");
                  }
                },
                onVideoRecorded: (path) {
                  if (kDebugMode) {
                    print("Video Recorded @ $path");
                  }
                },
                //Enter the App key generate from Deep AR
                androidLicenceKey:
                    "1cc390c3b9883742eea0d739ad9cbd8b1485e8fb13a554963ba20b9f5755cb23ac2aa8c540b49222",
                cameraDeepArCallback: (c) async {
                  cameraDeepArController = c;
                  setState(() {});
                }),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 5),
                //height: 250,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: List.generate(Masks.values.length, (p) {
                          bool active = currentPage == p;
                          return GestureDetector(
                            onTap: () {
                              currentPage = p;
                              cameraDeepArController.changeMask(p);
                              setState(() {});
                            },
                            child: Container(
                                margin: const EdgeInsets.all(5),
                                width: active ? 40 : 30,
                                height: active ? 50 : 40,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                    color: active ? Colors.green : Colors.white,
                                    shape: BoxShape.circle),
                                child: Text(
                                  "$p",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: active ? 16 : 14,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w800),
                                )),
                          );
                        }),
                      ),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
