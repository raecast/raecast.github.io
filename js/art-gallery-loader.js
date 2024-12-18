
const image_directory = "../content/images/gallery/";
const blurb_directory = "../content/blurbs/";

async function PopulateProjectData()
{
    const data_directory = '../data/art-projects.json';
    const request = new Request(data_directory);

    const response = await fetch(request);
    const data = await response.json();

    for (const index in data.projects)
    {
        const project = data.projects[index];
        DisplayArt(index, project)
    }
}

async function DisplayArt(index, project_info)
{
    const gallery_box = document.querySelector('#gallery-box');
    const gallery_item_template = document.querySelector('#gallery-item-template');

    const image_list_item_template = document.querySelector('#image-list-item-template');


    const new_item = gallery_item_template.content.cloneNode(true);

    const blurb_request = new Request(blurb_directory + project_info.blurb);
    const blurb_responce = await fetch(blurb_request);
    const blurb_data = await blurb_responce.text()

    new_item.querySelector('.preview').src = image_directory + project_info.images[0];
    // new_item.querySelector('.blurb').innerHTML = blurb_data;

    const image_list = new_item.querySelector('.image-list');

    

    project_info.images.forEach(image_name => {
        const new_image_list_item = image_list_item_template.content.cloneNode(true);
        new_image_list_item.querySelector('img').src = image_directory + image_name;
        image_list.appendChild(new_image_list_item);
    });

    const preview_image = new Image();
    preview_image.src = image_directory + project_info.images[0];
    const image_width = preview_image.naturalWidth;
    const image_height = preview_image.naturalHeight;

    if (image_width > image_height)  
    {
        // console.log(project_info.images[0], ' is wide', new_item.querySelector('.gallery-item'));
        new_item.querySelector('.gallery-item').classList.add('wide-item');
    }

    const id = 'gallery-item-modal' + index;
    new_item.querySelector('.modal').id = id;
    new_item.querySelector('.preview').onclick = function() { OpenModal(id); };

    gallery_box.appendChild(new_item);
}

PopulateProjectData();
console.log('art gallery loader');
