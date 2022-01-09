# Tackling Dengue And Malaria Cases
![Icon1](https://user-images.githubusercontent.com/91798475/148276972-33566223-ee5c-4e4c-a206-aba43c456853.png)

## Project Details:
**Domain:** Machine Learning, Web Development, Satellite Imagery               
**Project Name:** Malattie Trasmesse

## Project Description:
**The Problem:** 
Dengue and malaria have worsened in Delhi with more than 9000 cases and 15 deaths in 2021. They are spread to people through the bite of an infected Aedes species mosquito and Anopheles mosquito which breeds in damp locations and stagnant water pools. Detection and elimination of mosquito breeding sources can help to reduce the number of cases.

## Our Solution:
<i>The name of our project "Malattie Trasmesse" stands for transmitted diseases.</i> We will create a dengue and malaria information website that shows the predictions of dengue and malaria cases in Delhi in the upcoming months from real time data such as climate such as precipitation, humidity and temperature giving an advanced indicator of when dengue and malaria will emerge and use satellite data that will determine the potential stagnant water areas. Through our website people can be well prepared in advance in case of a dengue outbreak and take necessary prevention steps. They can also contact the local government officials in case their area lies in the potential hotspots in order to take necessary actions.

## Features of the Project:
1. Predicts Dengue cases in Delhi for upcoming months:
     * Used Chart JS to display the graph showing comparison of actual and predicted dengue cases
     * This will make people aware and help them prepare in advance for the situation
     <img src="https://user-images.githubusercontent.com/91798475/148655089-f45d9e9c-b946-4389-8af5-b153e8f07f24.png" width="50%"/>
2. Predicts Malaria cases in Delhi for upcoming months:
     * Used Chart JS to display the graph showing comparison of actual and predicted malaria cases
     * This will make people aware and help them prepare in advance for the situation
     <img src="https://user-images.githubusercontent.com/91798475/148655207-cbc523b9-e747-41cc-a047-f3ed4fcf639f.png" width="50%"/>
3. Determines stagnant water areas:
     * Used mapbox to display these areas. These areas mark the potential breeding grounds for mosquitos
     * The map has a search box that will help to locate the stagnant water areas near them and avoid such areas
     <img src="https://user-images.githubusercontent.com/91798475/148655273-7f095ebd-c70d-484e-84e3-f6214b127448.JPG" width="50%"/>
4. Suggest safer route:
     * Used mapbox to suggest and display the safer route from source to destination which is far from dengue and malaria hotspots
     * The map also gives the directions to reach the destination. This will help people to avoid stagnant water hotspots and keep themselves safe
     <img src="https://user-images.githubusercontent.com/91798475/148655351-95bb2c4a-01c0-44ad-9cd0-d9d4ffaaff60.png" width="50%"/>
5. Contact Hospitals:
     * Used mapbox to display all the location all the hospitals in Delhi
     * This will help them to locate nearby hospitals faster in case of emergency
     * The map also provides route directions from the user's place to the chosen hospital
     <img src="https://user-images.githubusercontent.com/91798475/148655463-7ffd9e0e-91e4-4010-a10c-5084de434ef0.png" width="50%"/>
6. ChatBot:
    * It helps to answer queries of users in an interactive and effecient manner
    * It answers questions regarding how dengue and malaria spread and tells abouts actions that be taken for self protection from modsquito bites. It also gives the contact       number of fumigation team.
    <img src="https://user-images.githubusercontent.com/91798475/148655528-1689a0a7-ee71-4d7b-b608-43248db84769.JPG" height="400px"/>
7. FAQs:
    * Helps to answer many unanswered question so as to raise awareness about dengue and malaria
    <img src="https://user-images.githubusercontent.com/91798475/148655641-e7ddef44-1645-496f-a68e-90ce6e0f0a3c.JPG" width="60%"/>


## Dengue and Malaria Prediction Model:
### Data Description:
1. To predict number of dengue cases- We used web scrapping in order to find the number of monthly dengue cases and climate details (precipitation, humidity and  temperature) in Delhi. 
2. To predict number of malaria cases- We used web scrapping in order to find the number of monthly malaria cases and climate details (precipitation, humidity and  temperature) in Delhi. 

### Model Description:
1. To predict number of dengue cases:
      * We used the dengue data set to train a SVM classifier which includes the following features, year, month, precipitation, humidity, temperature and number of cases per         month. Since this a time series data, so to obtain better results we added a column of previous month's dengue cases. We used different models such as KNN, Random             Forest and SVM. In the end, data trained on SVM gives the best testing result with mean absolute error of 64.
2. To predict number of malaria cases:
      * We used the malaria data set to train a SVM classifier which includes the following features, year, month, precipitation, humidity, temperature and number of cases           per month. Since this a time series data, so to obtain better results we added a column of previous month's malaria cases. We used different models such as KNN,               Random Forest and SVM. In the end, data trained on KNN gives the best testing result with mean absolute error of 16.7.
<img  src="https://user-images.githubusercontent.com/91798475/148654013-f1a3fc25-99f8-4b53-a78c-d025fa2990ba.jpg" width= "50%"/>


## Stagnant Water Prediction:
### Data Description:
1. Used QGIS to extract Sentinal-2 satellite images from Copernicus Sentinal Hub Service 
2. Sentinal-2 satellite data contains 12 bands, we extracted band 3[Green], band 4[Red] and band 8[NIR]

### Model Description:
1. Stagnant water (i.e. mosquito-breeding environments were derived using Fraction of Absorbed Photosynthetically Active Radiation (FAPAR) to derive a Vegetation Index and      the Normalized Difference Water Index (NDWI).
2. When a location hits a certain FAPAR and NDWI thresholds it indicates the possibility of a stagnant water pool.
#### NDWI:
NDWI index uses gren and NIR bands to detect water bodies. It's formula is:
```math 
   NDWI= (Xgreen-Xnir)/(Xgreen+Xnir)
   ```
pixels having NDWI index greater than .2 are marked as stagnant water

#### FAPAR:
FAPAR index uses red and NIR bands to detect stagnant water. It's formula is:
```math 
   FAPAR= ((Xnir-Xred)/(Xgreen+Xnir)*(1.25-0.025))
   ```
pixels having FAPAR index less than .2 are marked as stagnant water

#### STAGNANT WATER AREAS:
FAPAR and NDWI indexes are combined using and operation to determine the final stagnant water areas
The folling image displays the predicted water pixels where white pixels represent water regions and back represents land region
<img src="https://user-images.githubusercontent.com/91798475/148656563-215b852f-bf8a-43f1-b433-d7dffe7a9667.png" width="50%"/>

## Website Link:
Click on the link to view the website:
[Site Link](https://malattietrasmesse.netlify.app/)

## Team Contributors:
Name: Mollika Garg                                                      
Github Link: https://github.com/mollikagarg

Name: Shreya Sharma                 
Github Link: https://github.com/shreya-S51

Name: Koushiki Chakrabarti                     
Github Link: https://github.com/kc2409
