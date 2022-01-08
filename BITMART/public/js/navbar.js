

let pathname=window.location.pathname;
let pages=['/', '/products', '/products', '/products/new', '', '/cart', '/wishlist', '/users']
let navItem=document.getElementsByClassName('nav-item');
let params=(new URL(document.location)).searchParams;
let type=params.get("type");
let keyword=params.get("keyword");

for (let i=0; i<navItem.length; i++) {
    if (i==7) {
        if (pathname.includes(pages[i])) {
            navItem[i].className='active '+navItem[i].className;
        }
    }
    else if (pathname==pages[i]) {
        if (i==1&&type=='sell') {
            navItem[i].className+=' active';
        }
        else if (i==2&&type=='rent') {
            navItem[i].className+=' active';
        }
        else if (i!=1&&i!=2) {
            navItem[i].className+=' active';
        }
    }
}

