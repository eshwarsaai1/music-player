var songs = [
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
    }
]

var index=0;
var flag=1;


var bars=document.querySelector(".bars");
var listback=document.querySelector(".fa-bars");
var playlist=document.querySelector(".playlist");
var next=document.querySelector(".forward");
var prev=document.querySelector(".backward");
var albumnImg=document.querySelector(".albumn-img");
var song_name=document.querySelector(".song-name");
var artist=document.querySelector(".artist");

var favorites=document.querySelector(".favorites");
var heart=document.querySelector(".heart");
var favlist=document.querySelector(".favlist");
var favul=document.querySelector(".favul");

var app=document.querySelector(".app");
var song=document.querySelector(".song");
var progress=document.getElementById("progress");
var plyBtn=document.querySelector(".play-icon");
var albumn=document.querySelector(".play");

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
    var isSongplaying = true;
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

var ul=document.querySelector(".playul");
function createPlaylist(){
    songs.forEach((arrayElement) => {
        var li=document.createElement("li");
        li.classList.add("list-item", "playlist-item")
        var num=document.createElement("span");
        num.classList.add("song-number");
        num.innerHTML= arrayElement.num;
        li.appendChild(num);
        var img=document.createElement("img");
        img.alt="albumn image";
        img.src=arrayElement.img;
        img.classList.add("playlistImage")
        li.appendChild(img);
        var div=document.createElement("div");
        div.classList.add("name");
        var heading=document.createElement("h1");
        heading.innerHTML=arrayElement.name;
        var artistEle=document.createElement("p");
        artistEle.innerHTML=arrayElement.artist;
        div.appendChild(heading);
        div.appendChild(artistEle);
        li.appendChild(div);
        var duration=document.createElement("span");
        duration.classList.add("song-duration");
        duration.innerHTML=arrayElement.duration;
        li.appendChild(duration);
        var favIcon=document.createElement("i");
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

songs.forEach((ele) => {
    var media=document.createElement("audio");
    media.src = ele.song;
    media.load();
    media.addEventListener("loadedmetadata", () => {
        var time = parseInt(media.duration);
        var m= Math.floor(time/60);
        var s= time - (m*60)
        ele.duration = m+":"+s;
    })
})
createPlaylist();

var hide=document.querySelector(".hide");

function openPlaylist(){
    listback.classList.toggle("fa-angle-left");
    playlist.classList.toggle("visible");
    hide.classList.toggle("hidden");
    favorites.classList.toggle("hidden");
}

var addToFavs = (li) => {
    var num=li.children[0].innerHTML;
    index=num-1;
    favul.appendChild(li);
    li.children[(li.children.length)-1].classList.add("fa-solid");
    var lis=favul.querySelectorAll("li");
    var c=1;
    lis.forEach((li) =>{
        li.children[0].innerHTML=c;
        c++;
    })
    
    li.children[2].addEventListener(("click"), () => {
        if(!song.paused) song.pause();
            song.src=songs[index].song;
            albumnImg.src=songs[index].img;
            song_name.innerHTML=songs[index].name;
            artist.innerHTML=songs[index].artist;
            playpause();
            heart.classList.toggle("fa-angle-left");
            favlist.classList.toggle("visible");
            hide.classList.toggle("hidden");
            bars.classList.toggle("hidden");
            saveData();
    })
    console.log(songs[index]);
    li.children[(li.children.length)-1].addEventListener("click", () => {
        var playlis=playlist.querySelectorAll(".playlist-item");
        playlis.forEach((playli) => {
            if(playli.children[2].innerHTML.trim() === li.children[2].innerHTML.trim()){
                playli.children[(li.children.length)-1].classList.remove("fa-solid");
            }
        })
        songs[index].fav = false;
        removeFromFavs(li);
    })
}

var removeFromFavs =(removeli) => {
    var favlis=favul.querySelectorAll("li");
    var c=1;
    var f=0;
    console.log(songs[index]);
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
    var isSongplaying = true;
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
    var isSongplaying = true;
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
    flag=0;
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
    var isSongplaying = true;
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