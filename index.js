
const imageTag = document.getElementById('image');



console.log(window.electronAPI.getImage((event, data) => {

    imageTag.src = data;
    window.electronAPI.closeWindow2();
}));