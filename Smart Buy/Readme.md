<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">Smart Buy</h1>

  <p align="center">
    Smart Buy helps users to Compare Products across different E-Commerce websites like Amazon & Flipkart.It works by dynamically fetching updated prices, features, reviews, descriptions, and all essential information on various products from different e-commerce sites.
    <br />
    <a href="https://github.com/AshutoshJawanpuria/Smart-Buy.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/github_username/repo_name">View Demo</a>
    · -->
    <a href="https://www.linkedin.com/in/chandrachud-shrivastava-2b1680201/">Request Feature</a>
    ·
    <a href="https://www.linkedin.com/in/ashutosh-jawanpuria-898166177/">Report Bug</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#MILESTONES-ACHIEVED">MILESTONES ACHIEVED</a></li>
    <li><a href="#UNIQUE">UNIQUE</a></li>
    <li><a href="#Team">Team</a></li>
    <li><a href="#Domain-Of-Project">Domain Of Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#SCOPE-OF-IMPROVEMENT">SCOPE OF IMPROVEMENT</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Smart Buy is an E-Commerce Website that Helps Users to compare prices of different products across the internet.It works by dynamically fetching updated prices, features, reviews, descriptions, and all essential information on various products from different e-commerce sites. All this data is then tailored in a structured manner for easy understanding.
<br/>
Users Can Also Create Profiles and Save the Products or Can Order Them directly.
<br/>
The Project mainly consist of three parts.First one is Web Scraping Python script which uses BeautifulSoup for fetching data from Different E-Commerce Websites.
We Have Used Django framework for integrating the Python Script with Webpages.We have also Used Django For user Signup and Authentication and for maintaining User's Database.
For Product Database we Have Used Mongodb as it has PyMongo library which stores Data In dictionary like format which can easily be accessed.

<p align="right">(<a href="#top">back to top</a>)</p>

## MILESTONES ACHIEVED
* Flipkart Search - Product Search and its image and URL Display
* Amazon Search - Product Search and its image and URL Display
* Used Django framework For Running Web scraping Python Script At Backend.
* Added "Add To Card" Feature. 
* Used Mongodb as Database For Saving Products.
* Used Django Models For User Sign up and Authentication.

## Unique
   Initially We got stuck in product scraping at Amazon.The E-commerce websites such as Amazon and Flipkart have different structure for electronic and household products.We Corrected It using Two for Loops for covering maximum range of products.Additionally Due to High Security At Amazon Our Requests were often blocked.We fixed This Issue By Sending Requests at random time intervals.

## Team : #include

*  Chandrachud Shrivastava
*  Ashutosh Jawanpuria
*  Chirag Jha

## Domain Of Project
*  Web development
<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

* [Python](https://www.python.org)
* [Bootstrap](https://getbootstrap.com)
* [Django](https://www.djangoproject.com)
* [MongoDb](https://www.mongodb.com)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started
You can head over to the website by clicking on the link <a href="https://smartbuybitmesra.herokuapp.com/">SmartBuy</a> 
or you can clone our project to run a local copy on your device.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* Python
* MongoDB
* Beautiful Soup
  ```sh
  pip install beautifulsoup4
  ```
* django
  ```sh
  pip install Django==4.0.1
  ```
* PyMongo
  ```sh
  pip install pymongo
  ```
<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AshutoshJawanpuria/Smart-Buy.git
   ```
2. Install the Packages Mentioned in Prerequisites.
3. Using A Terminal in Directory of The Project Run the Following Command -
   ```
   python manage.py runserver
   ```
4. Now that the server’s running, visit http://127.0.0.1:8000/ with your web browser.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## SCOPE OF IMPROVEMENT
Search Results can be made More Accurate with help of different algorithms.
<br/>
Webpages can be made more attractive and interactive.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
We'd like to thank IEEE BIT Mesra for This Megaproject Event.
<br/>
We'd like to thank Our Mentor Utkarsh Singh for his insightful advice regarding our Project.
<p align="right">(<a href="#top">back to top</a>)</p>

