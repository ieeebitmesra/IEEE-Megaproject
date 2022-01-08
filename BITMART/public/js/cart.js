
let taxRate=0.05;
let fadeTime=300;
let p=document.getElementsByClassName('products');
let len=parseInt(p[0].children.length);

let products=document.getElementsByClassName('product-info');

let price=document.getElementsByClassName('products')


let tot=0;
for (let i=0; i<len; i++) {
  
  let quantity=parseInt(products[i].children[2].children[0].innerText);
  tot+=(quantity*parseFloat(products[i].children[1].innerText));
}
let tax=(tot*taxRate);

tot=tot+tax;
tax=tax.toFixed(2);
tot=tot.toFixed(2);
console.log(len);
console.log(tax);
console.log(tot);

document.getElementById("tot-item").innerHTML=len;
document.getElementById("tot-tax").innerHTML=tax;
document.getElementById("tot-price").innerHTML=tot;


