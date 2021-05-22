'use strict';

let firstimgElement = document.getElementById('firstimg');
let secondimgElement = document.getElementById('secondimg');
let thirdimgElement = document.getElementById('thirdimg');

let showResult = document.getElementById('showresult');


let busmall = [];
let firstimag;
let secondimag;
let thirdimag;
let voting = 25;
let userClic = 0;
let productName = [];
let countVote = [];
let productShown = [];

function CAtalogbusmall(name, path, times) {
    this.name = name;
    this.path = path;
    this.times = times;
    this.counterclic = 0
    busmall.push(this);
    productName.push(this.name);
    setProduct();
}
new CAtalogbusmall('bag', 'img/bag.jpg', 0);
new CAtalogbusmall('banana', 'img/banana.jpg', 0);
new CAtalogbusmall('bathroom', 'img/bathroom.jpg', 0);
new CAtalogbusmall('boots', 'img/boots.jpg', 0);
new CAtalogbusmall('breakfast', 'img/breakfast.jpg', 0);
new CAtalogbusmall('bubblegum.', 'img/bubblegum.jpg', 0);
new CAtalogbusmall('chair', 'img/chair.jpg', 0);
new CAtalogbusmall('cthulhu', 'img/cthulhu.jpg', 0);
new CAtalogbusmall('dog-duck', 'img/dog-duck.jpg', 0);
new CAtalogbusmall('dragon', 'img/dragon.jpg', 0);
new CAtalogbusmall('pen', 'img/pen.jpg', 0);
new CAtalogbusmall('pet-sweep', 'img/pet-sweep.jpg', 0);
new CAtalogbusmall('scissors', 'img/scissors.jpg', 0);
new CAtalogbusmall('shark', 'img/shark.jpg', 0);
new CAtalogbusmall('sweep', 'img/sweep.png', 0);
new CAtalogbusmall('tauntaun.', 'img/tauntaun.jpg', 0);
new CAtalogbusmall('unicorn', 'img/unicorn.jpg', 0);
new CAtalogbusmall('water-can', 'img/water-can.jpg', 0);
new CAtalogbusmall('wine-glass', 'img/wine-glass.jpg', 0);

function gitRandomImage() {
    return Math.floor(Math.random() * busmall.length);
}
// console.log(Math.floor(Math.random() * busmall.length));
//------------------------------ Add local storage-----------------------------------
function setProduct() {
    let productdata = JSON.stringify(busmall);
    //console.log(productdata);
    localStorage.setItem('CAtalogbusmall', productdata);
}
let checkimg = [];
checkimg = [firstimag, secondimag, thirdimag];

function randomImage() {

    firstimag = gitRandomImage();
    secondimag = gitRandomImage();
    thirdimag = gitRandomImage();

    
    // console.log(checkimg);

    do {
        secondimag = gitRandomImage();
        thirdimag = gitRandomImage();
    } while (secondimag === thirdimag ||
        secondimag === firstimag ||
        firstimag === thirdimag ||
        checkimg.includes(firstimag) ||
        checkimg.includes(secondimag) ||
            checkimg.includes(thirdimag)
    )

    // console.log(busmall[firstimag]);
    // console.log(busmall[secondimag]);
    // console.log(busmall[thirdimag]);

    firstimgElement.src = busmall[firstimag].path
    secondimgElement.src = busmall[secondimag].path
    thirdimgElement.src = busmall[thirdimag].path

    firstimgElement.times = busmall[firstimag].times++;
    secondimgElement.times = busmall[secondimag].times++;
    thirdimgElement.times = busmall[thirdimag].times++;
}

randomImage();

let displayimg = document.getElementById('busmallimg');
displayimg.addEventListener('click', clickImage);

// firstimgElement.addEventListener('click', clickImage);
// secondimgElement.addEventListener('click', clickImage);
// thirdimgElement.addEventListener('click', clickImage);
//----------------------------------------------------------------------------------------------
let formimg = document.getElementById('numproduct');
formimg.addEventListener('submit', numberOfproduct);

let textOfp = document.getElementById('textofp');

function numberOfproduct(event) {
    event.preventDefault();
    voting = event.target.numchoice.value;
    textOfp.textContent = `The Number of chise broduct is ${voting}`;

}

function clickImage(event) {
    userClic++;
    if (userClic < voting) {
        console.log(userClic);

        if (event.target.id === 'firstimg') {
            busmall[firstimag].counterclic = busmall[firstimag].counterclic + 1;
        } else if (event.target.id === 'secondimg') {
            busmall[secondimag].counterclic = busmall[secondimag].counterclic + 1;

        } else {
            busmall[thirdimag].counterclic = busmall[thirdimag].counterclic + 1;

        }
        // randomImage();


    } else {
        displayimg.removeEventListener('click', clickImage);
        // secondimgElement.removeEventListener('click', clickImage);
        // thirdimgElement.removeEventListener('click', clickImage);




    }

    showResult.addEventListener('click', listofresult);
    randomImage();
}
let liImge = document.getElementById('listresult');
function listofresult(event) {
    let ullist = document.createElement('ul')
    liImge.appendChild(ullist);
    let listImage;
    for (let i = 0; i < busmall.length; i++) {
        listImage = document.createElement('li');
        ullist.appendChild(listImage);
        listImage.textContent = `${busmall[i].name}  had ${busmall[i].counterclic} , and was seen ${busmall[i].times} times.`;

    }

    for (let i = 0; i < busmall.length; i++) {
        countVote.push(busmall[i].counterclic);
        productShown.push(busmall[i].times);

        for (let i = 0; i < busmall.length; i++) {
            countVote.push(busmall[i].counterclic);
            productShown.push(busmall[i].times);

        }
    }
    risultChart();


}
function risultChart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productName
            ,
            datasets: [{
                label: '# of product choice',
                data: countVote,
                backgroundColor: 'rgba(201, 76, 76, 0.6)',
                borderColor: 'rgba(0,255,0,0.3)',
                borderWidth: 1
            },
            {
                label: '# of product shown',
                data: productShown,
                backgroundColor: '#8A2B45',
                borderColor: '#3A1742',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

console.log(productShown);