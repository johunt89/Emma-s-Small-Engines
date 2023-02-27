const collapsedClass = "nav--collapsed";
const lskey = "navCollapsed";
const tooltipClass = "active";

const nav= document.querySelector(".inventory_header");
const navBorder = nav.querySelector(".nav__border");
//const menu = nav.querySelector(".menu");

if (localStorage.getItem(lskey)==="true"){
    nav.classList.add(collapsedClass);
    nav.classList.add(tooltipClass);
}

navBorder.addEventListener("click", () =>{
    nav.classList.toggle(collapsedClass);
    nav.classList.toggle(tooltipClass);
    localStorage.setItem(lskey, nav.classList.contains(collapsedClass));
});