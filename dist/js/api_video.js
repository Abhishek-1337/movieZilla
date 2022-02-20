// import { api_host,api_key } from "./api";
const videoTag=document.querySelector('#my-video');
const descVideo = document.querySelector('#info p');

const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
    params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': 'f67fd29370msh40c96b525cf9a1ap1a8dbdjsn36c31690b32c'
    }
};
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

axios.request(options).then((response)=>{
    let regex=/tt\d+/;
    let matchReg=response.data[2].id.match(regex);
    getVideo(...matchReg); 
}).catch(function (error) {
	console.error(error);
});
