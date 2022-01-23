const main_view=document.querySelector('.main__section-one-books');

let count=0;
let movieArr=[];
let options={};
let api_host='imdb8.p.rapidapi.com';
let api_key='f67fd29370msh40c96b525cf9a1ap1a8dbdjsn36c31690b32c';
     options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows',
            params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
            headers: {
                'x-rapidapi-host': api_host,
                'x-rapidapi-key': api_key
            }
    };
    axios.request(options)
    .then((res)=>{     
        for(let i=0; i< 10; i++){
            let regex=/tt\d+/;
            let matchReg=res.data[i].match(regex);
            movieArr=movieArr.concat(matchReg);
        }
        console.log(movieArr);
        getMetaData(movieArr);
    })
    .catch((err)=>{
     console.log(err);
    });
  function getMetaData(movieArr){  
       setTimeout(()=>{
              let char=movieArr[count];
              count++;
              options = {
                    method: 'GET',
                    url: 'https://imdb8.p.rapidapi.com/title/get-meta-data',
                    params: {ids: char, region: 'US'},
                    headers: {
                        'x-rapidapi-host': api_host,
                        'x-rapidapi-key': api_key
                    }
                }
                axios.request(options).then( (response)=>{
                    console.log(response.data[char].title.title);
                    let divT=document.createElement('div');
                    divT.classList.add('.main__section-one-books-card');
                    let divStar=document.createElement('div');
                    divStar.classList.add('.stars');
                    for(let i=0; i<5; i++){
                        let spanItems=document.createElement('span');
                        spanItems.classList.add('fa','fa-star');
                        divStar.appendChild('spanItems');
                    }
                    divT.style.marginRight="1.5rem";
                    divT.style.fontSize="0.8rem";
                    let image=document.createElement('img');
                    image.src=response.data[char].title.image.url;
                    image.style.width="157px";
                    image.style.height="232px";
                    image.style.paddingBottom="0.8125rem";
                    let h4=document.createElement('h4');
                    let bold=document.createElement('b');
                    bold.innerText=response.data[char].title.title;
                    h4.appendChild(bold);
                    let para=document.createElement('p');
                    para.innerText=response.data[char].genres[0];
                    main_view.appendChild(divT);
                    divT.appendChild(image);
                    divT.appendChild(h4);
                    divT.appendChild(para);       
                }).catch((error)=>{
                    console.error(error);
                })
                if(count<movieArr.length){
                    getMetaData(movieArr);
                }
       },1000);

  }

