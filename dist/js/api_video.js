// import { api_host,api_key } from "./api";
const videoTag=document.querySelector('video');


const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
    params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': 'f67fd29370msh40c96b525cf9a1ap1a8dbdjsn36c31690b32c'
    }
};
const videoPlayback=()=>{
    axios.request({...options, url: 'https://imdb8.p.rapidapi.com/title/get-video-playback',  params: {viconst: 'vi589675545', region: 'US'}})
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
        videoPlayback();
    })
    .catch((err)=>{
        console.log(err);
    })
}

axios.request(options).then(function (response) {
    let regex=/tt\d+/;
    let matchReg=response.data[0].id.match(regex);
    getVideo(...matchReg); 
}).catch(function (error) {
	console.error(error);
});
