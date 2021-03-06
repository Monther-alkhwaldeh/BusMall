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
const extinsion = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg'];
const leftimage = document.getElementById('left-image');
const centerimage = document.getElementById('center-image');
const rightimage = document.getElementById('right-image');
const imagesection = document.getElementById('pselect')
function product(name, extinsion) {
    this.name = name;
    this.path = `./images/${name}.${extinsion}`;
    this.votes = 0;
    this.views = 0;
    product.all.push(this);
}

product.all = [];
for (let i = 0; i < names.length; i++) {
    new product(names[i], extinsion[i]);
}

function retrive() {
        if(localStorage.length>0){
            const pastVotes=JSON.parse(localStorage.getItem("productVotes"));
            const pastViews=JSON.parse(localStorage.getItem("productViews"));
            for(let i=0;i<product.all.length;i++){
                votesI[i]+=pastVotes[i];
                viewsI[i]+=pastViews[i];

            }

        }
    // const products =JSON.parse(localStorage.getItem("product"));
    // if (products) {
    //     // for(let i=0;i<products.length;i++){
    //     // localStorage.setItem("product",JSON.stringify(product.all));
    //     new product(products);
    // }
}

function render() {
    let leftIndex = randomNumber(0, product.all.length - 1);
    let centerIndex = randomNumber(0, product.all.length - 1);
    let rightIndex = randomNumber(0, product.all.length - 1);
    while (leftIndex === rightIndex || leftIndex === centerIndex) {
        leftIndex = randomNumber(0, product.all.length - 1);
        centerIndex = randomNumber(0, product.all.length - 1);
        rightIndex = randomNumber(0, product.all.length - 1);
    }

    product.all[leftIndex].views++;
    leftimage.src = product.all[leftIndex].path;
    leftimage.alt = product.all[leftIndex].name;
    leftimage.title = product.all[leftIndex].name;
    while (centerIndex === rightIndex || centerIndex === leftIndex) {
        leftIndex = randomNumber(0, product.all.length - 1);
        centerIndex = randomNumber(0, product.all.length - 1);
        rightIndex = randomNumber(0, product.all.length - 1);
    }

    product.all[centerIndex].views++;
    centerimage.src = product.all[centerIndex].path;
    centerimage.alt = product.all[centerIndex].name;
    centerimage.title = product.all[centerIndex].name;
    while (rightIndex === leftIndex || leftIndex === centerIndex) {
        leftIndex = randomNumber(0, product.all.length - 1);
        centerIndex = randomNumber(0, product.all.length - 1);
        rightIndex = randomNumber(0, product.all.length - 1);
    }

    product.all[rightIndex].views++;
    rightimage.src = product.all[rightIndex].path;
    rightimage.alt = product.all[rightIndex].name;
    rightimage.title = product.all[rightIndex].name;
}
pselect.addEventListener('click', handleClick);

let stop = 25;
function handleClick(event) {
    event.preventDefault();
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
        createChart();
        listp();
        localStorage.removeItem("productVotes");
        localStorage.removeItem("productViews");
        localStorage.setItem("productVotes", JSON.stringify(votesI));
        localStorage.setItem("productViews", JSON.stringify(viewsI));
        pselect.removeEventListener('click', handleClick);
    }

}

//  -------------------------------------------

const conatiner = document.getElementById('list');
const ul1 = document.createElement('ul')
conatiner.appendChild(ul1);

function listp() {
    for (let i = 0; i < product.all.length; i++) {
        const li1 = document.createElement('li');
        ul1.appendChild(li1);
        li1.textContent = `"product name" ${product.all[i].name} "votes = "  ${votesI[i]} "views =" ${viewsI[i]}`;
    }
}

render();

function randomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min
}

const votesI=[];
const viewsI=[];
if(votesI.length<1){
    for(let i=0;i <product.all.length;i++){
        votesI.push(0);
        viewsI.push(0);
    }
}

function createChart() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // const productName = [];
    // const productVotes = [];
    // const productViews = [];
    for (let i = 0; i < product.all.length; i++) {
        
        votesI[i]+=product.all[i].votes;
        viewsI[i]+=product.all[i].views;

    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels:
                names,

            datasets: [
                {
                    barPercentage: 1.0,
                    borderWidth: 5,
                    label: '# of votes:',
                    backgroundColor: 'rgb(255,0,0)',
                    borderColor: 'rgb(0, 0, 0)',
                    data: votesI,
                },
                {
                    barPercentage: 1.0,
                    borderWidth: 5,
                    label: '# of views:',
                    backgroundColor: 'rgb(255,0,0)',
                    borderColor: 'rgb(0, 0, 0)',
                    data: viewsI,
                },
            ],
        },

        options: {},
    });
}
// product.all=ret;
retrive();
// listp();
// createChart();
// render();
