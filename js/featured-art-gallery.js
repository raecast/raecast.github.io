
// const image_directory = "content/images/gallery/";
// const blurb_directory = "content/blurbs/";

async function PopulateProjectData()
{
    const data_directory = '/data/art-projects.json';
    const request = new Request(data_directory);

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data.projects);

    for (const index in data.projects)
    {
        const project = data.projects[index];
        if (project.featured)
        {
            DisplayFeaturedArt(index, project)
        }
    }
}

const featured_art_box = document.querySelector('#featured-art-box');
const featured_art_template = document.querySelector('#featured-art-template')

async function DisplayFeaturedArt(index, project_info)
{
    const new_feature = featured_art_template.content.cloneNode(true);

    const blurb_request = new Request(blurb_directory + project_info.blurb);
    const blurb_responce = await fetch(blurb_request);
    const blurb_data = await blurb_responce.text()

    new_feature.querySelector('.preview').src = image_directory + project_info.images[0];
    new_feature.querySelector('.blurb').innerHTML = blurb_data;

    const id = 'art-modal' + index;
    new_feature.querySelector('.modal').id = id;
    new_feature.querySelector('.preview-box').onclick = function() { OpenModal(id); };

    featured_art_box.appendChild(new_feature);
}

PopulateProjectData();