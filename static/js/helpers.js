const clickHandler = (elemToListen, elemToTrigger) => {
    document.querySelector(elemToListen).addEventListener('click', () => {
        document.querySelector(elemToTrigger).click();
    });
}

const imageNameHandler = (imageName) => {
    const imgNameInp = document.querySelector('input[name="imagename"]');

    const fileNameInp = document.querySelector('input[name="filename"]');
    fileNameInp.value = imageName;

    if (imageName !== '') {
        const fullName = imageName.split('');
        const lastDotInd = fullName.findLastIndex((elem) => elem === '.');
        const shortName = fullName.slice(0, lastDotInd);

        imgNameInp.value = shortName.join('');
    } else {
        imgNameInp.value = '';
    }    
}

const headerHandler = (headerText) => {
    document.querySelector('h1').textContent = headerText;
}

const buttonHandler = (cssClass) => {
    document.querySelector('.btn').classList.add(cssClass);
}