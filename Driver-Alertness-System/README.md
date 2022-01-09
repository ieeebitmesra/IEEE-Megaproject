# Driver-Alertness-System

**Team : Ctrl-C Ctrl-V**  
<ul>
  <a href="https://www.linkedin.com/in/aditya-pandey-a029141ba/"><li>Aditya Pandey</a></li>
  <a href="https://www.linkedin.com/in/aman-kumar-7a8381196/"><li>Aman Kumar</a></li>
  <a href="https://www.linkedin.com/in/souhardya-dutt-0ba841211/"><li>Souhardya Dutt</a></li>  
</ul>
  
  
  

**Domain :** Deep Learning

**Aim :** Driver Alertness System is a Deep learning based service that can be used to detect the drowsiness measure of the driver. According to a survey, drivers are held responsible for approximately 78% of road accidents. To minimize these fatalities, this algorithm processes a live video feed focused on driver’s eyes closure rates. Haar-cascade classifiers are used to extract face images and hence obtain eyes image. Alarm sounds if the driver’s eye remained closed for a longer duration of time.  

**Achievements :**  
<ul>
  <li>Any type of image data could be trained through the GUI</li>
  <li>Alarm sound is added to alert the user</li>
  <li>Three different tabs are provided in the GUI which are TRAIN, TEST and MAIN</li>
  <li>Secondary Camera (like mobile phone's camera) can also be used to get ROI</li>
  <li>We are performing three tasks which are TRAIN, TEST and MAIN simultaneously </li>
  
</ul>  


**ScreenShots :**    

<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/TRAIN.png">
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/TEST.png">
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/MAIN.png">
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/AWAKE.png">
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/CLOSED.png">
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/NEUTRAL.png">







**Tech-Stack :** 
<ul>
  <a href="https://www.tensorflow.org/api_docs"><li>Tensorflow</a></li>
  <a href="https://docs.python.org/3/library/tk.html"><li>Tkinter</a></li>
  <a href="https://keras.io/api/"><li>Keras</a></li>  
  <a href="https://docs.opencv.org/4.x/d4/db1/tutorial_documentation.html"><li>Open CV</a></li>
  <a href="https://keras.io/api/"><li>Keras</a></li> 
  <a href="https://www.python.org/"><li>Python</a></li> 
  <a href="https://www.pygame.org/news"><li>Pygame</a></li>
  
  
</ul>


# Getting Started :
<img src="https://github.com/Adi1707/Driver-Alertness-System/blob/main/Demo%20Screenshots/GUI%20working%20video.gif">

<ul>
  <li>Clone this repo in your local machine</li>
  <li>Right click and then open with a code editor</li>
  <li>Run main.py and the GUI window appears</li>  
  </ul>
  
  **TRAIN :**  
  
<ul>
  <li>Click in train and then select the path for dataset which consists of positive and negative images</li>
  <li>Positive images must be stored in a folder with name p</li>
  <li>Negative images must be stored in a folder with name n</li>
  <li>Then select optimizer, loss, metrics and epochs</li>
  <li>Then click on start and wait until the message "TRAINING COMPLETED" is displayed</li> 
</ul>

  **TEST :** 
<ul>
  <li>Select Model file and folder for test sample</li>
  <li>Click on start</li>
</ul>


  **MAIN :** 
<ul>
  <li>Press ON to turn on the camera and start the model</li>
  <li>Output can be seen depending upon the state of driver</li>
</ul>




