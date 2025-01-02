const image_directory = "../content/images/gallery/";

function PopulateImageModal(modal, collection_info)
{
    const image_list = modal.querySelector('.image-list');

    for (const index in collection_info.images)
    {
        const new_list_image = document.createElement('img');
        new_list_image.src = image_directory +  collection_info.images[index];
        new_list_image.onclick = function() { OpenImageModal(modal.id, index); };
        image_list.appendChild(new_list_image);
    
        if (collection_info.images.length == 1)
        {
            image_list.style = 'display: none;';
        }
    }

    if (collection_info.link)
    {
        const blurb_fill = modal.querySelector('.blurb-fill');
        const project_link = modal.querySelector('.project-link');
        project_link.href = collection_info.link;
    
        fetch(collection_info.link).then(response => response.text()).then(data => 
        {
            const parser = new DOMParser();
            const module_document = parser.parseFromString(data, 'text/html');
            blurb_fill.appendChild(module_document.querySelector('.blurb'));
        });
    }
    else
    {
        const blurb_box = modal.querySelector('.blurb-box');
        blurb_box.style = 'display: none;';
    }
}

function CreatePageImage(modal, collection_info, image_index)
{
    const page_image = document.createElement('img');

    page_image.src = image_directory + collection_info.images[image_index];
    page_image.onclick = function() { OpenImageModal(modal.id, image_index); };

    return page_image;
}

function CreateImageModal(modal_data, url, collection_info)
{
    const parser = new DOMParser();
    const modal_document = parser.parseFromString(modal_data, 'text/html');

    const modal_element = modal_document.querySelector('.modal');
    modal_element.id = url;

    PopulateImageModal(modal_element, collection_info);

    return modal_element;
}

function ReplaceAnchorWithImageModal(anchor, modal_data, url, image_index)
{
    fetch(url).then(response => response.json()).then(collection_info => 
    {
        const existing_modal = document.getElementById(url);
        if (existing_modal)
        {
            anchor.after(CreatePageImage(existing_modal, collection_info, image_index));
        }
        else
        {
            const modal_element = CreateImageModal(modal_data, url, collection_info);
            anchor.after(modal_element);
            anchor.after(CreatePageImage(modal_element, collection_info, image_index));
        }
        anchor.remove();
    });
}

function CreateModals(modal_data)
{
    const modals = document.querySelectorAll('modal');
    modals.forEach(modal => 
    {
        const url = modal.attributes.src.value.split(' ');
        ReplaceAnchorWithImageModal(modal, modal_data, url[0], url[1]);
    });
}

async function FetchImageModalData()
{
    const response = await fetch('../modules/image-modal.html');
    return await response.text();
}
FetchImageModalData().then(modal_data => CreateModals(modal_data));
