// Necesito una variable global donde guardar el archivo que arrastre
let file;

const Message = document.querySelector(".message"),
        button = document.querySelector(".green-button"),
        input = document.querySelector("input"),
        error = document.querySelector(".errorMessage"),
        errorButton = document.querySelector(".close-button");

button.onclick = () => {
    input.click();
}

input.addEventListener("change", function () {
    file = this.files[0];
    showFile();
});

// Seleccionar el area donde se va a dejar los documentos
let dropArea = document.querySelector(".dragNdrop");

// Hacer que esta area "escuche" cuando se le arrastra un documento 
dropArea.addEventListener("dragover", (event) => {
    //console.log("Me activo cuando arrastro un archivo adentro? Si");
    event.preventDefault();
    Message.textContent = "Suelta para cargar tus archivos";
    showFile();
});

dropArea.addEventListener("dragleave", (event) => {
    //console.log("Me activo cuando arrastro un archivo fuera? Si");
    event.preventDefault();
    Message.textContent = "Arrastra tus archivos aquí";
});


dropArea.addEventListener("drop", (event) => {
    //console.log("Me activo cuando sueltoo un archivo dentro? Si");
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
});

function showFile() {
    let fileType = file.type;

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)) {
        // console.log("This is a " + fileType);
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }

    else {
        //console.log("This data type is not supported");
        Message.textContent = "Arrastra tus archivos aquí";
        error.classList.remove("hidden");
    }

    
}

errorButton.addEventListener("click", function() {
    error.classList.add("hidden")
});