const submitForm = () => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();

        const form = document.querySelector('form').elements;
        console.log(form);

        fetch('/save-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                "filename": form['filename'].value,
                "imagename": form['imagename'].value,
                "username": form['username'].value
            })
        })
            .then(res => res.text())
            .then(res => console.log(res));
    });
}