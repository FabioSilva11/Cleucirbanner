const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const mergeButton = document.getElementById('mergeButton');
const downloadButton = document.getElementById('downloadButton');

const defaultImageSrc = '1724377557836.png';  // Substitua pelo caminho da imagem padrão
const defaultImageSize = { width: 1080, height: 1080 };

canvas.width = defaultImageSize.width;
canvas.height = defaultImageSize.height;

let userImage = null;

// Carregar a imagem padrão
const defaultImage = new Image();
defaultImage.src = defaultImageSrc;
defaultImage.onload = () => {
    ctx.drawImage(defaultImage, 0, 0, defaultImageSize.width, defaultImageSize.height);
};

// Carregar a imagem do usuário
uploadImage.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userImage = new Image();
            userImage.src = e.target.result;
            userImage.onload = () => {
                // Calcular o corte da imagem
                const cropWidth = userImage.width > userImage.height ? userImage.height : userImage.width;
                const cropHeight = cropWidth;
                const x = (userImage.width / 2) - (cropWidth / 2);
                const y = (userImage.height / 2) - (cropHeight / 2);
                
                // Limpar o canvas e desenhar a imagem cortada
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(userImage, x, y, cropWidth, cropHeight, 0, 0, defaultImageSize.width, defaultImageSize.height);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Mesclar as imagens
mergeButton.addEventListener('click', () => {
    if (userImage) {
        ctx.drawImage(defaultImage, 0, 0, defaultImageSize.width, defaultImageSize.height);
    }
});

// Baixar a imagem fundida
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'merged_image.png';
    link.href = canvas.toDataURL();
    link.click();
});
