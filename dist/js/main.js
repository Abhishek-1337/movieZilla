const scrollDuration = 300;

const searchImg = document.querySelector('#searchImg');
const leftPaddle = document.querySelector('.left-paddle');
const rightPaddle = document.querySelector('.right-paddle');
const mainSec = document.querySelector('.main__section-one-books');

leftPaddle.addEventListener('click',()=>{
     document.querySelector('.main__section-one-books').scrollLeft -= 300;

     if(document.querySelector('.main__section-one-books').scrollLeft === 0){
          leftPaddle.classList.remove('opacity');
          rightPaddle.classList.add('opacity');
     }
});

rightPaddle.addEventListener('click',()=>{
     document.querySelector('.main__section-one-books').scrollLeft +=300;
     console.log(document.querySelector('.main__section-one-books').scrollLeft);
});

mainSec.addEventListener('mouseover',()=>{
     leftPaddle.classList.remove('opacity');
     rightPaddle.classList.remove('opacity');
})
mainSec.addEventListener('mouseout',()=>{
     leftPaddle.classList.add('opacity');
     rightPaddle.classList.add('opacity');
})

const btn=document.querySelectorAll('.dropdown');
[...btn].forEach((b,i)=>{
     b.addEventListener('mouseover',()=>{
          document.querySelector('#myDropdown'+i).classList.add('show'); 
     });
     b.addEventListener('mouseout',()=>{
          document.querySelector('#myDropdown'+i).classList.remove('show'); 
     });
});



