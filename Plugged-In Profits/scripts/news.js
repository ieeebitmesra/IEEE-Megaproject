// to trigger click when clicked enter
var input = document.getElementById("keyword");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button-addon2").click();
  }
});


// function to call the news api to display required news
getnews();
function getnews(){

    $(".getnews").text("");
var keyword = $("#keyword").val();

if(keyword == ''){
    keyword = "bse";
}

var url = "https://newsdata.io/api/1/news?apikey=pub_304807a11a986a20ea166c10a4b89bea9d7a&country=in&language=en&q=" + keyword;

$.get (url,(response)=>{
    console.log(response.results);
    k = 0;
    for(i=1 ; k<5;i= i+2){
        while(response.results[i].image_url == null){
        i = i + 1;
        }
        str = response.results[i].description;
        if(str.length > 250){
        var s = str.substr(0,400);
        }
        k++;
        var html = `<div class="card mb-3 shadow">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${response.results[i].image_url}"
                class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${response.results[i].title}</h5>
                <p class="card-text">${s}</p>
                <p class="card-text"><small class="text-muted">${response.results[i].pubDate} | ${response.results[i].source_id} | ${response.results[i].creator}</small></p>
                <a href="${response.results[i].link}" class="btn btn-primary">Explore</a>
            </div>
            </div>
            </div>
            </div>`;
            i = i - 1;
            
        $(".getnews").append(html);
    }

});
}