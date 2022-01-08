function sendEmail(){
    
    Email.send({

        Host : "smtp.gmail.com",
        Username : "aryanchoudhary047@gmail.com",
        Password : "ddqdtyfvhkvrssga",
        To : 'aryanchoudhary047@gmail.com',
        From : document.getElementById("email").value,
        Subject : "Contact Form Enquiry",
        Body : "Name : " + document.getElementById("name").value +
                "<br>Email : " +  document.getElementById("email").value +
                "<br>Phone Number : " +  document.getElementById("phone").value +
                "<br>Message : " +  document.getElementById("message").value 
    }).then(
      message => alert("Message Sent Successfully!")
    );
}