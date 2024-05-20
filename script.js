let songs = [
    {
        num:1,
        song: "songs/shape of you.mp3",
        img: "images/shape of you.webp",
        name: "Shape Of You",
        artist: " Ed sheeran",
        duration: "3:24",
        fav: false
    },
    {
        num:2,
        song:"songs/Poolamme Pilla.mp3",
        img: "images/amritha.jpg",
        name: "Poolamme Pilla",
        artist: " Gowra Hari",
        duration: "3:02",
        fav: false
    },
    {
        num:3,
        song: "songs/kaise Hua.mp3",
        img: "images/kabir singh.jpg",
        name: "Kaise Hua",
        artist: " Vishal Mishra",
        duration: "3:41",
        fav: false
    },
    {
        num:4,
        song: "songs/Attention.mp3",
        img: "images/charlieputh.jpeg",
        name: "Attention",
        artist: " charlie puth",
        duration: "2:54",
        fav: false
    },
    {
        num:5,
        song: "songs/Taki Taki.mp3",
        img: "images/taki taki.jpg",
        name: "Taki Taki",
        artist: " Dj snake, Selena",
        duration: "3:14",
        fav: false
    },
    {
        num:6,
        song:"songs/Hips Dont Lie.mp3",
        img: "images/shakira.webp",
        name: "Hips Dont Lie",
        artist: " Shakira",
        duration: "3:35",
        fav: false
    },
    {
        num:7,
        song: "songs/Baby - Justin Bieber.mp3",
        img: "images/justin.jpg",
        name: "Baby",
        artist: " Justin Bieber",
        duration: "3:23",
        fav: false
    },
    {
        num:8,
        song: "songs/Baby Calm Down.mp3",
        img: "images/calm down.jpg",
        name: "Calm Down",
        artist: " Rema, Selena",
        duration: "2:54",
        fav: false
    },
    {
        num:9,
        song: "songs/see you again.mp3",
        img: "images/see you again.png",
        name: "see you again",
        artist: "charlie puth, wiz khalifa",
        duration: "2:54",
        fav: false
    }
    
]

let index=0;


let bars=document.querySelector(".bars");
let listback=document.querySelector(".fa-bars");
let playlist=document.querySelector(".playlist");
let next=document.querySelector(".forward");
let prev=document.querySelector(".backward");
let albumnImg=document.querySelector(".albumn-img");
let song_name=document.querySelector(".song-name");
let artist=document.querySelector(".artist");

let favorites=document.querySelector(".favorites");
let heart=document.querySelector(".heart");
let favlist=document.querySelector(".favlist");
let favul=document.querySelector(".favul");

let app=document.querySelector(".app");
let song=document.querySelector(".song");
let progress=document.getElementById("progress");
let plyBtn=document.querySelector(".play-icon");
let albumn=document.querySelector(".play");

next.addEventListener("click", playNext);
prev.addEventListener("click", playprev);
// document.addEventListener("click", (e) => {
//     if(!playlist.contains(e.target) && !bars.contains(e.target) && playlist.classList.contains("visible")){ 
//         hide.classList.toggle("hidden");
//         listback.classList.toggle("fa-angle-left");
//         playlist.classList.remove("visible");}
//     }
// );

bars.addEventListener("click", openPlaylist);
albumn.addEventListener("click", playpause);
favorites.addEventListener("click", openFavorites);


function openFavorites(){
    heart.classList.toggle("fa-angle-left");
    favlist.classList.toggle("visible");
    hide.classList.toggle("hidden");
    bars.classList.toggle("hidden");
};

document.addEventListener("keydown", (e) => {
    let isSongplaying = true;
    if(song.paused){
        isSongplaying = false;
    }
    if((e.keyCode === 32)){
        playpause();
    }
    else if(e.keyCode === 37){
        if(isSongplaying) song.pause();
        console.log(song.currentTime);
        song.currentTime = Math.max(0,song.currentTime-5);
        console.log(song.currentTime);
        progress.value = song.currentTime;
        if(isSongplaying) song.play();
    }
    else if(e.keyCode === 39){
        if(isSongplaying) song.pause();
        song.currentTime = Math.min(song.duration,song.currentTime+5);
        progress.value = song.currentTime;
        if(isSongplaying) song.play();
    }
})

app.addEventListener("wheel", (e) => {
    song.volume = Math.max(0,Math.min(song.volume + (e.deltaY * -0.0009),1));
})

let ul=document.querySelector(".playul");
function createPlaylist(){
    songs.forEach((arrayElement) => {
        let li=document.createElement("li");
        li.classList.add("list-item", "playlist-item")
        let num=document.createElement("span");
        num.classList.add("song-number");
        num.innerHTML= arrayElement.num;
        li.appendChild(num);
        let img=document.createElement("img");
        img.alt="albumn image";
        img.src=arrayElement.img;
        img.classList.add("playlistImage")
        li.appendChild(img);
        let div=document.createElement("div");
        div.classList.add("name");
        let heading=document.createElement("h1");
        heading.innerHTML=arrayElement.name;
        let artistEle=document.createElement("p");
        artistEle.innerHTML=arrayElement.artist;
        div.appendChild(heading);
        div.appendChild(artistEle);
        li.appendChild(div);
        let duration=document.createElement("span");
        duration.classList.add("song-duration");
        duration.innerHTML=arrayElement.duration;
        li.appendChild(duration);
        let favIcon=document.createElement("i");
        favIcon.classList.add("fa-regular", "fa-heart", "favIcon");
        li.appendChild(favIcon);
        ul.appendChild(li);
        favIcon.addEventListener("click", () =>{
            if(arrayElement.fav){
                removeFromFavs(li);
                arrayElement.fav=false;
                // favIcon.style.color = "black" ;
            }
            else{
                arrayElement.fav=true;
                addToFavs(li.cloneNode(true));
                // favIcon.style.color = "rgb(209, 52, 52)";
            }
            favIcon.classList.toggle("fa-solid");
        })
        div.addEventListener("click", () => {
            if(!song.paused) song.pause();
            index=(num.innerHTML)-1;
            song.src=songs[index].song;
            albumnImg.src=img.src;
            song_name.innerHTML=songs[index].name;
            artist.innerHTML=songs[index].artist;
            duration.innerHTML = songs[index].duration;
            playpause();
            playlist.classList.toggle("visible");
            listback.classList.toggle("fa-angle-left");
            hide.classList.toggle("hidden");
            favorites.classList.toggle("hidden");
            saveData();
        });
    })
    playlist.appendChild(ul);
}
createPlaylist();
songs.forEach((ele) => {
    let media=document.createElement("audio");
    media.src = ele.song;
    media.load();
    media.addEventListener("loadedmetadata", () => {
        let time = parseInt(media.duration);
        let m= Math.floor(time/60);
        let s= time - (m*60)
        ele.duration = m+":"+s;
    })
})


let hide=document.querySelector(".hide");

function openPlaylist(){
    listback.classList.toggle("fa-angle-left");
    playlist.classList.toggle("visible");
    hide.classList.toggle("hidden");
    favorites.classList.toggle("hidden");
}

let addToFavs = (li) => {
    let num=li.children[0].innerHTML;
    let favIndex=num-1;
    favul.appendChild(li);
    li.children[(li.children.length)-1].classList.add("fa-solid");
    let lis=favul.querySelectorAll("li");
    let c=1;
    lis.forEach((li) =>{
        li.children[0].innerHTML=c;
        c++;
    })
    
    li.children[2].addEventListener(("click"), () => {
        if(!song.paused) song.pause();
            song.src=songs[favIndex].song;
            albumnImg.src=songs[favIndex].img;
            song_name.innerHTML=songs[favIndex].name;
            artist.innerHTML=songs[favIndex].artist;
            playpause();
            heart.classList.toggle("fa-angle-left");
            favlist.classList.toggle("visible");
            hide.classList.toggle("hidden");
            bars.classList.toggle("hidden");
            index=favIndex;
            saveData();
    })
    li.children[(li.children.length)-1].addEventListener("click", () => {
        let playlis=playlist.querySelectorAll(".playlist-item");
        playlis.forEach((playli) => {
            if(playli.children[2].innerHTML.trim() === li.children[2].innerHTML.trim()){
                playli.children[(li.children.length)-1].classList.remove("fa-solid");
            }
        })
        songs[favIndex].fav = false;
        // favul.removeChild(li);
        removeFromFavs(li);
    })
}

let removeFromFavs =(removeli) => {
    let favlis=favul.querySelectorAll("li");
    let c=1;
    let f=0;
    favlis.forEach((li) =>{
        if(li.children[2].innerHTML.trim() === removeli.children[2].innerHTML.trim()){
            favul.removeChild(li);
            f=1;
            c--;
        }
        if(f===1){
            li.children[0].innerHTML=c;
        }
        c++;
    })
}

function playNext(){
    let isSongplaying = true;
    if(song.paused){
        isSongplaying = false;
    }
    if(index<(songs.length-1)){
        if(isSongplaying) song.pause();
        index++;
        song.src=songs[index].song;
        albumnImg.src=songs[index].img;
        song_name.innerHTML=songs[index].name;
        artist.innerHTML=songs[index].artist;
        if(isSongplaying) song.play();
    }
    else{
        alert("You're at last song of list");
    }
    saveData();
}

function playprev(){
    let isSongplaying = true;
    if(song.paused){
        isSongplaying = false;
    }
    if(index>0){
        if(isSongplaying) song.pause();
        index--;
        song.src=songs[index].song;
        albumnImg.src=songs[index].img;
        song_name.innerHTML=songs[index].name;
        artist.innerHTML=songs[index].artist;
        if(isSongplaying) song.play();
    }
    else{
        alert("You're at first song of list");
    }
    saveData();
}

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playpause(){
    if(!song.paused){
        song.pause();
        // albumnImg.style.animation ="none";
        plyBtn.src="images/play.png";
        plyBtn.style.width="30px";
        plyBtn.style.height="30px";
    }else{
        song.play();
        // albumnImg.style.animation = "rotateAnimation 0.2s linear infinite";
        plyBtn.src="images/pause.png";
        plyBtn.style.width="50px";
        plyBtn.style.height="60px";
    }
}

function resume(){
    plyBtn.src="images/pause.png";
    plyBtn.style.width="50px";
    plyBtn.style.height="60px"; 
}

song.addEventListener("play",() => {
    setInterval(()=>{
        if(song.currentTime == song.duration){
            if(index<(songs.length-1)){
                playNext();
                song.play();
            }
            else{
                index=-1;
                playNext();
                song.play();
            }
        }
        progress.value = song.currentTime;
        saveData();
    },500);
});

progress.onchange = function(){
    let isSongplaying = true;
    if(song.paused){
        isSongplaying = false;
    }
    if(isSongplaying) song.play();
    song.currentTime=progress.value;
    if(isSongplaying) resume();
    saveData();
}

function saveData(){
    localStorage.setItem("index", index);
    localStorage.setItem("time", song.currentTime);
}

function loadData(){
    song.currentTime = localStorage.getItem("time");
    index=localStorage.getItem("index");
    song.src=songs[index].song;
    albumnImg.src=songs[index].img;
    song_name.innerHTML=songs[index].name;
    artist.innerHTML=songs[index].artist;
}
loadData();