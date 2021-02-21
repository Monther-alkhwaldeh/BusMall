const names = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
];
const leftimage = document.getElementById('left-image');
const centerimage = document.getElementById('center-image');
const rightimage = document.getElementById('right-image');
const imagesection = document.getElementById('pselect')
function product(name) {
    this.name = name;
    this.path = `./images/${name}.jpg`;
    this.votes = 0;
    this.views = 0;
    product.all.push(this);
}
product.all = [];
for (let i = 0; i < names.length; i++) {
    new product(names[i]);
}

function render() {
    const leftIndex = randomNumber(0, product.all.length - 1);
    leftimage.src = product.all[leftIndex].path;
    leftimage.alt = product.all[leftIndex].name;
    leftimage.title = product.all[leftIndex].name;

    const centerIndex = randomNumber(0, product.all.length - 1);
    centerimage.src = product.all[centerIndex].path;
    centerimage.alt = product.all[centerIndex].name;
    centerimage.title = product.all[centerIndex].name;

    const rightIndex = randomNumber(0, product.all.length - 1);
    rightimage.src = product.all[rightIndex].path;
    rightimage.alt = product.all[rightIndex].name;
    rightimage.title = product.all[rightIndex].name;
}
pselect.addEventListener('click', handleClick);
let stop = 25;
function handleClick(event) {
    if (event.target.id !== 'pselect') {
        for (let i = 0; i < product.all.length; i++) {
            if (product.all[i].name === event.target.title) {
                product.all[i].votes++;
                stop--;    
             }
             
        }
    }
    render();
    if (stop === 0) {
        pselect.removeEventListener('click', handleClick);
        listp();
    }
}

console.log(product.all);
//  -------------------------------------------

const conatiner = document.getElementById('list');
const ul1 = document.createElement('ul')
conatiner.appendChild(ul1);

function listp() {
    for (let i = 0; i < product.all.length; i++) {
        const li1 = document.createElement('li');
        ul1.appendChild(li1);
        li1.textContent = `"product name" ${product.all[i].name} "votes = "  ${product.all[i].votes} "views =" ${product.all[i].views}`;
    }
}

// ----------------------------------------------
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

render();  