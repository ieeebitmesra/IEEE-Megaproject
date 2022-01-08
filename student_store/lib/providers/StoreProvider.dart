import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class StoreProvider extends ChangeNotifier {
  StoreProvider() {
    fetchProducts();
  }
  List<Product> products = [
    new Product("Kishaloy Kar Choudhary", "Frontend Tester",
        "assets/Icons/Kishaloy.png", 10000),
    new Product("Kshitij Raj", "Back-end Developer",
        "assets/Icons/DS Front.png", 10000),
    new Product("Souhardya Dutta", "React Native Developer",
        "assets/Icons/Souhardya.png", 7000),
    new Product("Bodhisatwa Bhattacharya", "SkillHub Founder",
        "assets/Icons/DS Back.png", 50000,
        featured: true),
    new Product("Divya Uchenya", "Computer Networks and Cryptography",
        "assets/Icons/DSA Front.png", 35000),
    new Product("Ayushman Dutta", "Computer Vision and Deep Learning",
        "assets/Icons/DWT Front.png", 20000),
    new Product(
        "Rana Safal", "SkillHub Founder", "assets/Icons/ESDS Front.png", 50000,
        featured: true),
    new Product(
        "Shivam Sharma", "SkillHub Founder", "assets/Icons/Pal.png", 50000,
        featured: true),
  ];

  Future<void> fetchProducts() async {
    await FirebaseFirestore.instance.collection('Products').get().then((value) {
      value.docs.forEach((doc) {
        Product product = new Product(doc['name'], doc['description'],
            doc['image'], double.parse(doc['price'].toString()),
            featured: doc['featured']);
        products.add(product);
      });
    });
    notifyListeners();
  }

  void updateCart(Product p) {
    products.forEach((element) {
      if (element.name == p.name) {
        element.addedToCart = !element.addedToCart;
        notifyListeners();
      }
    });
  }

  Future<void> purchase() async {
    //Payment Logic
  }
}

class Product {
  String name;
  String description;
  String image;
  double price;
  bool featured;
  bool addedToCart;
  Product(this.name, this.description, this.image, this.price,
      {this.featured = false, this.addedToCart = false});
}
