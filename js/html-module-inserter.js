



const modules = document.querySelectorAll('module');

modules.forEach(module => {
    load_file(module.attributes.src.value, function(text) {
        module.insertAdjacentHTML('afterend', text);
        module.remove();
    });
});

function load_file(filename, callback) {
    fetch(filename).then(response => response.text()).then(text => callback(text));
}
