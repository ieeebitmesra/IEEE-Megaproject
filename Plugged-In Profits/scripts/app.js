
function getdata(){
  $(".getdata").text("");
var keyword = $("#keywrd").val();

var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+keyword+"&apikey=5UURJ27EF3L9EKR0";

$.get (url,(data)=>{
    console.log(data);

    var html = `<div class="containerx">
    <div class="card">
      <div class="box">
        <div class="content">
          
          <h3>${data.bestMatches[0]["2. name"]}</h3>
          <p class="card-text">Type : ${data.bestMatches[0]["3. type"]}<br>
      Region : ${data.bestMatches[0]["4. region"]}<br>
      Currency : ${data.bestMatches[0]["8. currency"]}<br>
      Market Opens at :  ${data.bestMatches[0]["5. marketOpen"]} local<br>
      Market Closes at : ${data.bestMatches[0]["6. marketClose"]} local</p>
          
        </div>
      </div>
    </div>
  </div>
  <br>`;
$(".getdata").append(html);
});

}

getGainers();
function getGainers(){
var url2 = "https://financialmodelingprep.com/api/v3/stock/gainers?apikey=00c78b98526925c7460fcd9725012f2d";

$.get (url2,(data)=>{
    console.log(data);
    var html2 = `<div class="main-container">
    <div class="cards">
      <div class="cardz card-1">
        <h2 class="card__title">1. ${data.mostGainerStock[0].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostGainerStock[0].changesPercentage}%<br>
        Current Price : $${data.mostGainerStock[0].price}<br>
        Change in Price : $${data.mostGainerStock[0].changes}<br>
          </b>
        </p>
      </div>
      <div class="cardz card-2">
        <h2 class="card__title">2. ${data.mostGainerStock[1].companyName}</h2>
        <p class="card__apply"><b>Percentage Change : ${data.mostGainerStock[1].changesPercentage}%<br>
        Current Price : $${data.mostGainerStock[1].price}<br>
        Change in Price : $${data.mostGainerStock[1].changes}<br>
        
          </b>
        </p>
      </div>
      <div class="cardz card-3">
        <h2 class="card__title">3. ${data.mostGainerStock[2].companyName}</h2>
        <p class="card__apply"><b>Percentage Change : ${data.mostGainerStock[2].changesPercentage}%<br>
        Current Price : $${data.mostGainerStock[2].price}<br>
        Change in Price : $${data.mostGainerStock[2].changes}<br>
          </b>
        </p>
      </div>
      <div class="cardz card-4">
        <h2 class="card__title">4. ${data.mostGainerStock[3].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostGainerStock[3].changesPercentage}%<br>
        Current Price : $${data.mostGainerStock[3].price}<br>
        Change in Price : $${data.mostGainerStock[3].changes}<br>
          </b>
        </p>
      </div>
      
    </div>
  </div>`;
$(".getGainers").append(html2);
});
}

getLosers();
function getLosers(){
var url2 = "https://financialmodelingprep.com/api/v3/stock/losers?apikey=00c78b98526925c7460fcd9725012f2d";

$.get (url2,(data)=>{
    console.log(data);
    var html2 = `<div class="main-container">
        <div class="cards">
          <div class="cardz card-2">
            <h2 class="card__title">1. ${data.mostLoserStock[0].companyName}</h2>
            
            <p class="card__apply"><b>Percentage Change : ${data.mostLoserStock[0].changesPercentage}%<br>
            Current Price : $${data.mostLoserStock[0].price}<br>
            Change in Price : $${data.mostLoserStock[0].changes}<br>
              </b>
            </p>
          </div>
          
          <div class="cardz card-3">
            <h2 class="card__title">2. ${data.mostLoserStock[1].companyName}</h2>
            
            <p class="card__apply"><b>Percentage Change : ${data.mostLoserStock[1].changesPercentage}%<br>
            Current Price : $${data.mostLoserStock[1].price}<br>
            Change in Price : $${data.mostLoserStock[1].changes}<br>
              </b>
            </p>
          </div>
          
          <div class="cardz card-1">
            <h2 class="card__title">3. ${data.mostLoserStock[2].companyName}</h2>
            
            <p class="card__apply"><b>Percentage Change : ${data.mostLoserStock[2].changesPercentage}%<br>
            Current Price : $${data.mostLoserStock[2].price}<br>
            Change in Price : $${data.mostLoserStock[2].changes}<br>
              </b>
            </p>
          </div>
          
          <div class="cardz card-4">
            <h2 class="card__title">4. ${data.mostLoserStock[3].companyName}</h2>
            
            <p class="card__apply"><b>Percentage Change : ${data.mostLoserStock[3].changesPercentage}%<br>
            Current Price : $${data.mostLoserStock[3].price}<br>
            Change in Price : $${data.mostLoserStock[3].changes}<br>
              </b>
            </p>
          </div>
          </div>
          </div>`;
$(".getLosers").append(html2);
});
}

getActives();
function getActives(){
var url2 = "https://financialmodelingprep.com/api/v3/stock/actives?apikey=00c78b98526925c7460fcd9725012f2d";

$.get (url2,(data)=>{
    console.log(data);
    var html3 = `<div class="main-container">
    <div class="cards">
      <div class="cardz card-3">
        <h2 class="card__title">1. ${data.mostActiveStock[0].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostActiveStock[0].changesPercentage}%<br>
        Current Price : $${data.mostActiveStock[0].price}<br>
        Change in Price : $${data.mostActiveStock[0].changes}<br>
          </b>
        </p>
      </div>
      <div class="cardz card-1">
        <h2 class="card__title">2. ${data.mostActiveStock[1].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostActiveStock[1].changesPercentage}%<br>
        Current Price : $${data.mostActiveStock[1].price}<br>
        Change in Price : $${data.mostActiveStock[1].changes}<br>
          </b>
        </p>
      </div>
      <div class="cardz card-4">
        <h2 class="card__title">3. ${data.mostActiveStock[2].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostActiveStock[2].changesPercentage}%<br>
        Current Price : $${data.mostActiveStock[2].price}<br>
        Change in Price : $${data.mostActiveStock[2].changes}<br>
          </b>
        </p>
      </div>
      <div class="cardz card-2">
        <h2 class="card__title">4. ${data.mostActiveStock[3].companyName}</h2>
        
        <p class="card__apply"><b>Percentage Change : ${data.mostActiveStock[3].changesPercentage}%<br>
        Current Price : $${data.mostActiveStock[3].price}<br>
        Change in Price : $${data.mostActiveStock[3].changes}<br>
          </b>
        </p>
      </div>
  </div>
  </div>`;
$(".getActives").append(html3);
});
}