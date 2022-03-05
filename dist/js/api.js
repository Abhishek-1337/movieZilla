const main_view = document.querySelector('.main__section-one-books');
const videoTag=document.querySelector('#my-video');
const descVideo = document.querySelector('#info p');
const uList = document.querySelector('#genre-detail');
const titleTag = document.querySelector('#title li span');
const ttl = document.querySelector('#case-title');
const rating = document.querySelector('#rating-case');
const starCast = document.querySelector('#starring');
const cert = document.querySelector('#certs');

let count = 0;
let movieArr = [];
let options = {};
let api_key = 'f67fd29370msh40c96b525cf9a1ap1a8dbdjsn36c31690b32c';
let api_host = 'imdb8.p.rapidapi.com';
     options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows',
            params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
            headers: {
                'x-rapidapi-host': api_host,
                'x-rapidapi-key': api_key
            } 
     };
    //  options = {
    //     method: 'GET',
    //     url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
    //     params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
    //     headers: {
    //       'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    //       'x-rapidapi-key': 'f67fd29370msh40c96b525cf9a1ap1a8dbdjsn36c31690b32c'
    //     }
    // };
    const videoPlayback=(videoId)=>{
        console.log(videoId);
        axios.request({
            ...options, 
            url: 'https://imdb8.p.rapidapi.com/title/get-video-playback',  
            params: {viconst: videoId, region: 'US'}
        })
        .then((reply)=>{
            videoTag.src=reply.data.resource.encodings[3].playUrl;
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    const getVideo=(ttid)=>{
        axios.request({...options,url:'https://imdb8.p.rapidapi.com/title/get-videos',params: {tconst: ttid, limit: '25', region: 'US'}})
        .then((res)=>{
            let reg=/vi\d+/;
            let videoId=res.data.resource.videos[0].id.match(reg);
            descVideo.classList.remove('hide');
            descVideo.innerText = res.data.resource.videos[0]["description"];
            videoPlayback(videoId[0]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    const getMetaData = (ttid) => {
        axios.request({...options, url:'https://imdb8.p.rapidapi.com/title/get-meta-data',params: {ids: ttid, region: 'US'}})
        .then((response)=>{
            let ratingData = response.data[ttid].ratings.rating;
            let genres = response.data[ttid].genres;
            let titleName = response.data[ttid].title.title;
            uList.classList.remove('toggleDisplay');
            for(let  i = 0; i < 3 && i < genres.length; i++){
                let listItem = document.createElement('li');
                listItem.innerHTML = genres[i];
                uList.appendChild(listItem);  
            }
            titleTag.innerText = titleName;
            ttl.innerText = titleName;
            rating.innerText = ratingData;
            let list = document.createElement('li');
            list.innerText = response.data[ttid].certificate;
            cert.appendChild(list);
        }).catch((error)=>{
            console.error(error);
        })
    }
    const getCastName = (castId) => {
       
          axios.request({...options, url:'https://imdb8.p.rapidapi.com/actors/get-bio', params:{nconst: castId}})
          .then(function (response) {
              let list = document.createElement('li');
              let span = document.createElement('span');
              span.innerText = response.data.name;
              list.appendChild(span);
              starCast.appendChild(list);
          })
          .catch(function (error) {
              console.error(error);
          })
    }
    
    const getCastId = (ttid) =>{
        let castArr = [];
        axios.request({...options, url:'https://imdb8.p.rapidapi.com/title/get-top-cast', params:{tconst: ttid}})
        .then(function (response) {
            console.log(response.data);
            const castMem = response.data;
            let regex=/nm\d+/;
            for(let  i = 0; i < 3 && i < castMem.length; i++){
                 castArr = [...castArr,...castMem[i].match(regex)];
                 getCastName(castArr[i]);
            }
            console.log(castArr);
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    setTimeout(()=>{
        axios.request({...options, url:'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies'}).then((response)=>{
            let regex=/tt\d+/;
            console.log(response.data);
            let matchReg=response.data[4].id.match(regex);
            getMetaData(...matchReg);
            setTimeout(()=>{
                getCastId(...matchReg);
            },2000);
            getVideo(...matchReg); 
        }).catch(function (error) {
            console.error(error);
        });
    },1000);

    axios.request(options)
    .then((res)=>{     
        for(let i = 0; i< 10; i++){
            let regex = /tt\d+/;
            let matchReg = res.data[i].match(regex);
            movieArr = movieArr.concat(matchReg);
        }
        console.log(movieArr);
        getData(movieArr);
    })
    .catch((err)=>{
     console.error(err);
    });

  function getData(movieArr){  
      let hero = 1;
       setTimeout(()=>{
              let char = movieArr[count];
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
                axios.request(options)
                .then( (response)=>{
                    console.log(response.data[char].title.title);
                    let divT = document.createElement('div');
                    divT.classList.add('main__section-one-books-card');
                    let divStar = document.createElement('div');
                    divStar.classList.add('stars');
                    for(let i = 0; i<5; i++){
                        let spanItems=document.createElement('span');
                        spanItems.classList.add('fa','fa-star');
                        spanItems.style.marginRight="0.2rem";
                        divStar.appendChild(spanItems);
                    }
                    divT.style.marginRight = "1.5rem";
                    divT.style.fontSize = "0.9rem";
                    let image = document.createElement('img');
                    image.src = response.data[char].title.image.url;
                    image.style.width = "157px";
                    image.style.height = "232px";
                    image.style.paddingBottom = "0.8125rem";
                    let h4 = document.createElement('h4');
                    let bold = document.createElement('b');
                    bold.innerText = response.data[char].title.title;
                    h4.appendChild(bold);
                    let para = document.createElement('p');
                    para.innerText = response.data[char].genres[0];
                    mainSec.appendChild(divT);
                    divT.appendChild(image);
                    divT.appendChild(h4);
                    divT.appendChild(para); 
                    divT.appendChild(divStar);      
                })
                .catch((error)=>{
                    console.error(error);
                })
                if(count<movieArr.length){
                    getData(movieArr);
                }
       },1000);

  }
