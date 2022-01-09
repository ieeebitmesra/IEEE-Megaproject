function captcha_generator() {
    //declaring domain for captcha characters-62 char
    var domain= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
                 ,'W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i',
                 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    //lets create 6 letter captcha
    var one=domain[Math.floor(Math.random()*domain.length)];
    var two=domain[Math.floor(Math.random()*domain.length)];
    var three=domain[Math.floor(Math.random()*domain.length)];
    var four=domain[Math.floor(Math.random()*domain.length)];
    var five=domain[Math.floor(Math.random()*domain.length)];
    var six=domain[Math.floor(Math.random()*domain.length)];

    var captcha=one+two+three+four+five+six;

    document.getElementById("captchagen").value=captcha;
}
function checkCaptcha(){
    var user_input=document.getElementById("captchainput").value;
    var captcha=document.getElementById("captchagen").value;
    // console.log(captcha);
    // console.log(user_input);
    if(user_input==captcha && checkPassword()){
        alert("Sign up Successful !");
    }else if(!checkPassword()){
        alert("Password does not match ! Please Enter Again");
    }else{
        alert("Enter correct Captcha !");
    }
}

function checkCaptchalogin(){
    var user_input=document.getElementById("captchainput").value;
    var captcha=document.getElementById("captchagen").value;
    // console.log(captcha);
    // console.log(user_input);
    if(user_input!=captcha){
        alert("Enter correct Captcha !");
    }else{
        window.location.href="home.html";
        alert("Log in Successful !");
    }
}
function checkPassword() {
    var pass=document.getElementById("password").value;
    var confirm_pass=document.getElementById("repassword").value;
    if(pass!=confirm_pass){
        return false;
    }if(pass.length<8){
        return false;
    }if(pass.length>15){
        return false;
    }
    var domain1= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
                 ,'W','X','Y','Z'];
    var flag=0;
    for(let i=0;i<domain1.length;i++){
        for(let j=0;j<pass.length;j++){
            if(pass[j]==domain1[i]){
                flag=1;
                break;
            }
        }
    }
    if(flag==0){
        return false;
    }
    var domain2= ['1','2','3','4','5','6','7','8','9','0'];
    flag=0;
    for(let i=0;i<domain2.length;i++){
        for(let j=0;j<pass.length;j++){
            if(pass[j]==domain2[i]){
                flag=1;
                break;
            }
        }
    }
    if(flag==0){
        return false;
    }
    var domain3= ['#','%','$','@','&'];
    flag=0;
    for(let i=0;i<domain3.length;i++){
        for(let j=0;j<pass.length;j++){
            if(pass[j]==domain3[i]){
                flag=1;
                break;
            }
        }
    }
    if(flag==0){
        return false;
    }
    return true;
}
function showConditions(){
    document.getElementById("PassConditions").style.display="inline-block";
}
// document.getElementById("anim1").style.display="none";
//             document.getElementById("anim2").style.display="none";
//             document.getElementById("anim3").style.display="block";
//             document.getElementById("anim4").style.display="none";
//             document.getElementById("anim5").style.display="none";
//             document.getElementById("anim6").style.display="none";
//             document.getElementById("anim7").style.display="none";
//             document.getElementById("anim8").style.display="none";
//             document.getElementById("anim9").style.display="none";
//             document.getElementById("anim10").style.display="none";