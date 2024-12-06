
const modal = document.querySelector('.modal');

console.log(modal);

function OpenModal()
{
    if (modal.classList.contains('active')) return;
    modal.classList.add('active');
    LockScroll();
}

function CloseModal()
{
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    UnlockScroll();
}


function LockScroll()
{
    document.body.style.overflowY = "hidden";
}

function UnlockScroll()
{
    document.body.style.overflowY = "auto";
}
