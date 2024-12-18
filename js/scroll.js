

const navbar = document.querySelector('#navbar');
const navbar_offset = navbar.offsetTop;

// let navbar;
// let navbar_offset;

// function setup()
// {
//     console.log('navbar script setup');
//     navbar = document.querySelector('#navbar');
//     navbar_offset = navbar.offsetTop;
// }

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
// window.onload = setup()

// this.onload = function()
// {
//     console.log('scroll loaded');
// }