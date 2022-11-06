const uploadFile = (targetElem) => {
    document.querySelector(targetElem).addEventListener('change', (event) => {
        const target = event.target || event.srcElement || event.currentTarget;
        const file = target.files[0];

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/uploads/' + file.name, true);
        xhr.setRequestHeader('Content-Type', 'application/octate-stream');
        xhr.onreadystatechange = () => {
            event = null;

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    (() => {
                        console.log(xhr);
                        document.querySelector('.image-preview').src = './images/' + xhr.responseText;

                        imageNameHandler(xhr.responseText);
                        headerHandler('Push "Upload"');
                        buttonHandler('btn--ready');
                    })()
                }
            }
        }
        xhr.send(file);

        event.target.value = '';
    });
}