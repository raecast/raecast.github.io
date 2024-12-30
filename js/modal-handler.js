
// let image_modal_module; 
// fetch('../modules/image-modal.html').then(response => response.text()).then(text => image_modal_module = text);

// function CreateImageModal(parent, id, images)
// {
//     const new_modal = parent.insertAdjacentHTML('afterend', image_modal_module);
// }

function OpenModal(id)
{
    const modal = document.getElementById(id);
    if (modal.classList.contains('active')) return modal;
    modal.classList.add('active');
    LockScroll();
    return modal;
}

function OpenImageModal(id, image_index)
{
    const modal = OpenModal(id);
    const image_src = modal.querySelector('.image-list').querySelectorAll('img')[image_index].src;

    // console.log(modal, ' ', image_src);

    modal.querySelector('.current-image').src = image_src;
}

function OpenModalObj(modal)
{
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




