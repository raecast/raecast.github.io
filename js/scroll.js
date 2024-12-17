

// const navbar = document.querySelector('#navbar');
// const navbar_offset = navbar.offsetTop;

let navbar;
let navbar_offset;

window.onload = function()
{
    navbar = document.querySelector('#navbar');
    navbar_offset = navbar.offsetTop;
    console.log('navbar script on load');
}

window.onscroll = function()
{
    let distance_to_top = navbar_offset - document.documentElement.scrollTop;

    if (distance_to_top <= 0 && !navbar.classList.contains('stuck'))
    {
        navbar.classList.add('stuck');
    }
    else if (distance_to_top > 0 && navbar.classList.contains('stuck'))
    {
        navbar.classList.remove('stuck');
    }

    // console.log(distance_to_top)
}

console.log('navbar script');