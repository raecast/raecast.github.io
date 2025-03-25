

const navbar = document.querySelector('#navbar');
const navbar_offset = navbar.offsetTop;

window.onscroll = function()
{
    let distance_to_top = navbar_offset - document.documentElement.scrollTop;

    // console.log(distance_to_top);

    if (distance_to_top < 0 && !navbar.classList.contains('stuck'))
    {
        navbar.classList.add('stuck');
    }
    else if (distance_to_top >= 0 && navbar.classList.contains('stuck'))
    {
        navbar.classList.remove('stuck');
    }
}

const path = window.location.pathname;
const page = path.split("/").pop();

const home_link = document.querySelector('#navbar-link-home');
const art_link = document.querySelector('#navbar-link-art');
const games_link = document.querySelector('#navbar-link-games');

function set_current_page()
{
    home_link.classList.remove('current-page');
    art_link.classList.remove('current-page');
    games_link.classList.remove('current-page');

    switch (page) 
    {
        case 'index.html':
            home_link.classList.add('current-page');
            break;
        case 'gallery.html':
            art_link.classList.add('current-page');
            break;
        case 'games.html':
            games_link.classList.add('current-page');
            break;
        default:
            break;
    }
}
set_current_page();

