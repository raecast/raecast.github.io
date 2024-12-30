
const image_directory = "../content/images/gallery/";

async function PopulateProjectData()
{
    const data_directory = '../data/art-projects.json';
    const request = new Request(data_directory);

    const response = await fetch(request);
    const data = await response.json();

    for (const index in data.projects)
    {
        fetch(new Request(data.project_data_directory + data.projects[index]))
        .then(response => response.json()).then(project_info => DisplayArt(index, project_info));
    }
}

async function DisplayArt(index, project_info)
{
    const gallery_box = document.querySelector('#gallery-box');
    const gallery_item_template = document.querySelector('#gallery-item-template');

    const new_item = gallery_item_template.content.cloneNode(true);
    // const new_item = document.createElement('div');
    // new_item.classList.add('.gallery-item');


    const image_list = new_item.querySelector('.image-list');

    const modal_id = 'gallery-item-modal' + index;
    new_item.querySelector('.modal').id = modal_id;


    for (const index in project_info.images)
    {
        const image_name = project_info.images[index];

        const new_image = document.createElement('img');
        new_image.src = image_directory + image_name;
        new_image.classList.add('image-item');
        new_item.querySelector('.gallery-item').appendChild(new_image);//

        const image_info = new Image();
        image_info.src = image_directory + image_name;
        const image_width = image_info.naturalWidth;
        const image_height = image_info.naturalHeight;

        if (image_width > image_height)  
        {
            // console.log(image, ' is wide', new_image);
            new_image.classList.add('wide-item');
        }

        new_image.onclick = function() { OpenImageModal(modal_id, index); };

        const new_image_list_item = document.createElement('img');
        new_image_list_item.src = image_directory + image_name;
        new_image_list_item.onclick = function() { OpenImageModal(modal_id, index); };
        image_list.appendChild(new_image_list_item);

        if (project_info.images.length == 1)
        {
            // image_list.classList.add('hidden');
            image_list.style = 'display: none;';
        }
    }

    // new_item.querySelector('.preview').src = image_directory + project_info.images[0];

    

    // project_info.images.forEach(image_name => {
    //     const new_image_list_item = document.createElement('img');
    //     new_image_list_item.src = image_directory + image_name;
    //     image_list.appendChild(new_image_list_item);
    // });

    // new_item.querySelector('.gallery-item').onclick = function() { OpenModal(modal_id); };//.querySelector('.preview')


    if (project_info.link)
    {
        // console.log(project_info.link);

        const blurb_fill = new_item.querySelector('.blurb-fill');
        const project_link = new_item.querySelector('.project-link');
        project_link.href = project_info.link;

        const response = await fetch(project_info.link);
        const data = await response.text();

        const parser = new DOMParser();
        const module_document = parser.parseFromString(data, 'text/html');
        blurb_fill.appendChild(module_document.querySelector('.blurb'));
    }
    else
    {
        const blurb_box = new_item.querySelector('.blurb-box');
        blurb_box.style = 'display: none;';
    }




    gallery_box.appendChild(new_item);
    // gallery_box.insertBefore(new_item, buffer_div);

    // console.log('finished adding item ', index);
}

// const buffer_div = document.createElement('div');
// document.querySelector('#gallery-box').appendChild(buffer_div);
PopulateProjectData();

// async function setup_gallery()
// {
//     await PopulateProjectData();

//     console.log('add buffer');

//     const buffer_div = document.createElement('div');
//     document.querySelector('#gallery-box').appendChild(buffer_div);
// }

// setup_gallery();
// console.log('art gallery loader');
