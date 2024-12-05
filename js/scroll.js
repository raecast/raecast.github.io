

const navbar = document.querySelector('#navbar');
const navbar_offset = navbar.offsetTop;

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


}


