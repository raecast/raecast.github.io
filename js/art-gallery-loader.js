
function ApplyImageItemClasses(to_page_image)
{
    const image_info = new Image();
    image_info.src = to_page_image.src;
    const image_width = image_info.naturalWidth;
    const image_height = image_info.naturalHeight;

    if (image_width > image_height)  
    {
        // console.log(to_page_image, ' is wide. ', to_page_image.src);
        to_page_image.classList.add('wide-item');
    }

    return to_page_image;
}

function CreateGalleryItem(url, modal_data, collection_info)
{
    const new_item = document.createElement('div');
    new_item.classList.add('gallery-item');

    const modal_element = CreateImageModal(modal_data, url, collection_info);
    // new_item.after(modal_element);
    document.body.appendChild(modal_element);

    // console.log(modal_element);

    for (const image_index in collection_info.images)
    {
        const new_page_image = CreatePageImage(modal_element, collection_info, image_index);
        new_item.appendChild(ApplyImageItemClasses(new_page_image));
    }
    
    return new_item;
}

function PopulateGallery(modal_data, gallery_box, with_data)
{
    const tags = gallery_box.attributes.tags.value.split(' ');
    // console.log(tags);
    with_data.projects.forEach(project => 
    {
        const url = with_data.project_data_directory + project;
        FetchJSON(url).then(collection_info => 
        {
            // console.log(collection_info.tags, collection_info.tags.find(tag => tags.includes(tag)));
            if (!tags.includes('all') && !(tags.includes('featured') && collection_info.featured) 
                && !collection_info.tags.find(tag => tags.includes(tag))) return;

            const new_item = CreateGalleryItem(url, modal_data, collection_info);
            // console.log(new_item);
            gallery_box.appendChild(new_item);
        });
    });
}

function PopulateGalleries(with_data)
{
    const gallery_boxes = document.querySelectorAll('.gallery-box');

    FetchImageModalData().then(modal_data => { gallery_boxes.forEach(gallery_box => 
    { PopulateGallery(modal_data, gallery_box, with_data) });});
}

async function FetchArtProjectData()
{
    const response = await fetch('../data/art-projects.json');
    return await response.json();
}

async function FetchJSON(url)
{
    const response = await fetch(url);
    return await response.json();
}

FetchArtProjectData().then(data => PopulateGalleries(data));
