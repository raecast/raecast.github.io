


function OpenModal(id)
{
    let modal = document.getElementById(id);
    if (modal.classList.contains('active')) return;
    modal.classList.add('active');
    LockScroll();
}

function CloseOpenModals()
{
    const modals = document.querySelectorAll('.modal');
    // console.log(modals);
    modals.forEach(modal => { 
        if (modal.classList.contains('active'))
        { 
            // console.log(modal);
            modal.classList.remove('active'); 
        }
    })
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




