var myfav = [ // to keep favorite list
    {
        id : "default1",
        name : "Avengers: Age of Ultron",
        imgUrl : "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
    },
    {
        id : "default2",
        name : "Avengers: Infinity War",
        imgUrl : "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
    },
];

let idholder = [];

// to handle click events on selecting a movie to show in full description of the specific movie
function handleDivClick(link){
    console.log("Entered");
    let anchorValue = $(`#${link}`); // same as document.getElementByID(`${link}`)
    let currAnchor = anchorValue[0];

    let varname = currAnchor.attributes.name.value;
    let varimg = currAnchor.attributes.imgUrl.value;
    let varyear = currAnchor.attributes.year.value;

    let name = document.getElementById('moviename');
    let img = document.getElementById('movieImgUrl');
    let year = document.getElementById('movieyear');

    name.textContent = varname;
    img.src         = varimg;
    year.textContent = varyear;

    console.log("clicked movie btn");
    rootfav.setAttribute('style', "display:none");
    rootmovie.setAttribute('style', "display:flex");
    roothome.setAttribute('style', "display:none");
}

// to make event for sensing a division
function activeSenseOfDiv(){

    let movieArray = document.getElementsByClassName('movieContentImg');
    console.log("Array ",movieArray);
    for ( let divindex = 0; divindex < movieArray.length; divindex ++ ){
        let currentDiv = movieArray[divindex];
        console.log(currentDiv);
        let anchorLink = currentDiv.attributes.value.value;
        console.log(anchorLink);
        currentDiv.onclick = ()=>{
            handleDivClick(anchorLink);
        }    
    }

}

// make events for dislike buttons on fav page on first load
async function activateDislike ( id ) {

    console.log(id);
    let dislikeElement = await document.getElementById(`DISLIKE-${id}-s`);
    let dislikeDiv = await document.getElementById(`${id}`);

    console.log("DISLIKE ELEMENT : " , dislikeElement);
    console.log("DISLIKE DIV : " , dislikeDiv);

    // document.getElementById(`DISLIKE-${id}-s`).onclick = await function(){  
    dislikeElement.onclick = function(){  
        console.log(dislikeElement); 

        console.log("BEFORE MY FAV : ", myfav);
        for (let i=0; i<myfav.length; i++) {
            if (myfav[i].id== id){
                myfav.splice(i, 1);
                break;
            }
        }
        console.log("AFTER MY FAV : ", myfav);
        favPage();
        dislikeElement.setAttribute("style", "display:none"); 
        likeElement.setAttribute("style", "display:block"); 
    };

}

// to make events listeners on like and dislike buttons on home page divisions
async function activateLike () {

    for ( let i=0; i<idholder.length; i++){

        let id = idholder[i].id;
        let likeElement    = await document.getElementById(`LIKE-${id}`);
        let dislikeElement = await document.getElementById(`DISLIKE-${id}`);
    
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(id);
        console.log(likeElement);
        console.log(dislikeElement);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    
        // obj to use to store a fav list and enabling a like event
        likeElement.onclick = await function(){

            let obj = {
                id     : idholder[i].id, 
                name   : idholder[i].name,
                imgUrl : idholder[i].imgUrl 
            }

            myfav.push(obj); // push to favorite
            favPage();
            likeElement.setAttribute("style", "display:none"); // styling events while clicking 
            dislikeElement.setAttribute("style", "display:block"); // styling events while clicking 
            console.log(myfav)
            activateDislike(id); 

        };

        // enabling a dislike button event

        dislikeElement.onclick = await function(){  
            console.log(dislikeElement); 

            for (let i=0; i<myfav.length; i++) {
                if (myfav[i].id==id){
                    myfav.splice(i, 1);
                    break;
                }
            }

            favPage();
            dislikeElement.setAttribute("style", "display:none"); // styling events while clicking 
            likeElement.setAttribute("style", "display:block"); // styling events while clicking 
        };
    
        

    }

}

// making all dislike buttons activation which are all elements present in favorite list
function makedislikeusingmyfavArray(){
    for ( let i=0; i<myfav.length; i++ ) {
        let dislikeElement = document.getElementById(`DISLIKE-${myfav[i].id}-s`);
        let id = myfav[i].id;
        dislikeElement.onclick = function(){  
            console.log(dislikeElement); 
    
            console.log("BEFORE MY FAV : ", myfav);
            for (let i=0; i<myfav.length; i++) {
                if (myfav[i].id== id){
                    myfav.splice(i, 1);
                    break;
                }
            }
            console.log("AFTER MY FAV : ", myfav);
            favPage();
            let dislikeElementMain = document.getElementById(`DISLIKE-${id}`);
            let likeElementMain = document.getElementById(`LIKE-${id}`);
            dislikeElementMain.setAttribute("style", "display:none"); 
            likeElementMain.setAttribute("style", "display:block"); 
        };
    }
}

// on search bar change event listening for make a api call and add those elements with the rendered value on home page
async function onSearchChange(){
    let root = document.getElementById('root');    
    let searchValue = `https://www.omdbapi.com/?apikey=6b786f7b&s=avengers`;
    let searchInput = document.getElementById('searchInput');
    console.log("entered");
    idholder = []
    if (root){
        console.log(searchInput.value);
        $("#root").empty(); // // same as document.getElementByID('root') with delete child nodes.

            if (searchInput){
                searchValue = `https://www.omdbapi.com/?apikey=6b786f7b&s=${searchInput.value}`;
            }
            let request = new XMLHttpRequest();
            let movie;
            console.log(searchValue);
            request.open("GET", searchValue);
            request.send();
            request.onload = () => {
                console.log(request);
                if ( request.status === 200 ) {

                    movie = JSON.parse(request.response);    
                    console.log(request);
                    if(movie.Search == undefined) {
                        
                    }else {
                        for (let i=0; i < movie.Search.length; i++) {              

                            let movieDiv = document.createElement('div');
                            movieDiv.classList.add("movieContent");
                            movieDiv.setAttribute('value', `hiddenanchor${movie.Search[i].imdbID}` );
                            let buttonClassDiv = document.createElement('div');
                            buttonClassDiv.classList.add("buttonClass");
                            let buttonDownload = document.createElement('button');
                            buttonDownload.classList.add("download");
                            buttonDownload.textContent = "Download";

                            // like and dislike event and html elements creation
                            let like = document.createElement('button');
                            like.classList.add(`like`);
                            like.textContent = "Like";
                            like.setAttribute('id', `LIKE-${movie.Search[i].imdbID}`);

                            let dislike = document.createElement('button');
                            dislike.classList.add(`dislike`);
                            dislike.textContent = "Dislike";
                            dislike.setAttribute('id', `DISLIKE-${movie.Search[i].imdbID}`);
                            
                            // activateLike(movie.Search[i].imdbID);
                            idholder.push({
                                id : movie.Search[i].imdbID, 
                                name : movie.Search[i].Title,
                                imgUrl : movie.Search[i].Poster 
                            });

                            let movieName = document.createElement('h3');
                            movieName.classList.add('MovieName');
                            let text = document.createTextNode(`${movie.Search[i].Title}`);
                            movieName.appendChild(text);
                            movieDiv.setAttribute('value', `hiddenanchor${movie.Search[i].imdbID}` );
                            let imgLoader = document.createElement('img');
                            imgLoader.classList.add('movieContentImg');
                            imgLoader.setAttribute('src', `${movie.Search[i].Poster}`);
                            imgLoader.setAttribute('value', `hiddenanchor${movie.Search[i].imdbID}` );
                            
                            let hiddenAnchor = document.createElement('a')
                            hiddenAnchor.classList.add('hidden');
                            hiddenAnchor.setAttribute('id', `hiddenanchor${movie.Search[i].imdbID}`);
                            hiddenAnchor.setAttribute('name', `${movie.Search[i].Title}`);
                            hiddenAnchor.setAttribute('imgUrl', `${movie.Search[i].Poster}`);
                            hiddenAnchor.setAttribute('year', `${movie.Search[i].Year}`);
                            hiddenAnchor.setAttribute('imdbID', `${movie.Search[i].imdbID}`);
                            hiddenAnchor.setAttribute('href', './html/movie.html');
                            
                            movieDiv.appendChild(imgLoader);
                            movieDiv.appendChild(movieName);
                            buttonClassDiv.appendChild(buttonDownload);
                            buttonClassDiv.appendChild(like);
                            buttonClassDiv.appendChild(dislike);
                            movieDiv.appendChild(buttonClassDiv);
                            movieDiv.appendChild(hiddenAnchor);
                            root.appendChild(movieDiv);   
                        }
                        console.log("***********************");
                        activeSenseOfDiv();
                        activateLike();
                    }
                } else {
                    console.log(`Error ${request.status} : ${request.statusText} `);
                }
            
            
        }
    }
}

// fav page load with elements with their values using my fav list
function favPage () {


    $('#favRoot').empty(); // same as document.getElementByID('favroot')
    // makedislikeusingmyfavArray();
    console.log("Entered Fav page");
    let favRoot = document.getElementById('favRoot');
    if (favRoot) {
        for (let i=0; i < myfav.length; i++) {
            let root = document.getElementById('favRoot');
            const movieDiv = document.createElement('div');
            movieDiv.classList.add("movieContent");
            movieDiv.setAttribute('id', `${myfav[i].id}`);
            const buttonClassDiv = document.createElement('div');
            buttonClassDiv.classList.add("buttonClass");
            const buttonDownload = document.createElement('button');
            buttonDownload.classList.add("download");
            buttonDownload.textContent = "Download";
            const dislikebtn = document.createElement('button');
            dislikebtn.classList.add("dislikeFav");
            dislikebtn.setAttribute('id', `DISLIKE-${myfav[i].id}-s`);
            dislikebtn.textContent = "Dislike";
            const movieName = document.createElement('h3');
            movieName.classList.add('MovieName');
            let text = document.createTextNode(`${myfav[i].name}`);
            movieName.appendChild(text);
            const imgLoader = document.createElement('img');
            imgLoader.setAttribute('src', `${myfav[i].imgUrl}`);
    
            // add childs
            movieDiv.appendChild(imgLoader);
            movieDiv.appendChild(movieName);
            buttonClassDiv.appendChild(buttonDownload);
            buttonClassDiv.appendChild(dislikebtn);
            movieDiv.appendChild(buttonClassDiv);
            root.appendChild(movieDiv);
            
        }
        makedislikeusingmyfavArray();
    }
}

// on page load
favPage();
activeSenseOfDiv();

// activating favorite and home button on header and its styling events
let favbtn  = document.getElementById('favbtn');
let homebtn = document.getElementById('homebtn');
let rootfav = document.getElementById('favRoot');
let roothome = document.getElementById('root');
let rootmovie = document.getElementById('movieRoot');

rootfav.setAttribute('style', "display:none");
rootmovie.setAttribute('style', "display:none");

favbtn.onclick = function(){
    console.log("clicked fav btn");
    rootfav.setAttribute('style', "display:flex");
    roothome.setAttribute('style', "display:none");
    rootmovie.setAttribute('style', "display:none");
}

homebtn.onclick = function(){
    console.log("clicked home btn");
    rootfav.setAttribute('style', "display:none");
    rootmovie.setAttribute('style', "display:none");
    roothome.setAttribute('style', "display:flex");
}

// event on search input while typing to call a api on each key down event
let searchSubmitBtn = document.getElementById('searchSubmitBtn');
searchSubmitBtn.onclick = function(){
    let searchInput = document.getElementById('searchInput');
    if (searchInput){
        $('#root').empty(); // same as document.getElementByID('root')
        onSearchChange();
    }
}

// activating a dislike events for default list and styling
let default1Div = document.getElementById(`default1`);
let default1Btn = document.getElementById(`DISLIKE-default1-s`);
let default2Div = document.getElementById(`default2`);
let default2Btn = document.getElementById(`DISLIKE-default2-s`);

default1Btn.onclick = function(){
    default1Div.setAttribute('style', "display:none !important");
    for (let i=0; i<myfav.length; i++) {
        if(myfav[i].id == "default1"){
            myfav.splice(i,1);
            break;
        }
    }
}

default2Btn.onclick = function(){
    default2Div.setAttribute('style', "display:none !important");
    for (let i=0; i<myfav.length; i++) {
        if(myfav[i].id == "default2"){
            myfav.splice(i,1);
            break;
        }
    }
}

// search input auto event listening while key press on searching any movie
let searchInputHeader = document.getElementById('searchInput');
searchInputHeader.onkeydown = function(){
    onSearchChange();
}
