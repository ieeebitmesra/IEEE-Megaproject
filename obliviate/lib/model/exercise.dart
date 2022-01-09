class Exercise{
   final String name,img , tt, descrip;
  Exercise({required this.name,
    required this.img,
    required this.tt,
    required this.descrip
  });
}
final exer = [Exercise(
    name: "Marching",
    img: 'assets/exercise/e1.png',
    tt: "20 mins",
    descrip: "Endurance/Aerobic"),

  Exercise(
      name: "Yoga",
      img: 'assets/exercise/yoga.png',
      tt: "60 mins",
      descrip: "Meditation"),

  Exercise(
      name: "Muscle Flexiblity",
      img: 'assets/exercise/muscle.png',
      tt: "30 mins",
      descrip: "Flexible Enhancement"),

  Exercise(
      name: "Stretching",
      img: 'assets/exercise/e2.png',
      tt: "40 mins",
      descrip: "Enhances Tolerance"),

  Exercise(
      name: "Bending",
      img: 'assets/exercise/knee.png',
      tt: "40 mins",
      descrip: "Enhances Retentivity"),


];


