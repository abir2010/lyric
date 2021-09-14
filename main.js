const showLyric = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    const url = `https://api.lyrics.ovh/suggest/${searchFieldValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyric(data.data))
    searchField.value = '';
}
const displayLyric = (data) => {
    const displayLyrics = document.getElementById('display-lyric');
    if(displayLyrics != null || data){
        displayLyrics.textContent = '';
        for(let i=0; i<data.length; i++){
            const div = document.createElement('div');
            div.classList.add('single-result','row','align-items-center','my-3','py-3')
            div.innerHTML = `
            <div class="col-md-2 col-4">
                <img class="img-fluid rounded-3" src="${data[i].album.cover_medium}">
            </div>
            <div class="col-md-7 col-5">
                <h4 class="lyrics-name">${data[i].title}</h4>
                <p class="author lead">Album by <span class="fw-bold">${data[i].artist.name}</span></p>
            </div>
            <div class="col-md-3 col-3 text-md-right text-center">
                <button onclick="getlyric('${data[i].artist.name}','${data[i].title}')" class="btn btn-success">Get Lyrics</button>
            </div>`;
            displayLyrics.appendChild(div);
        }
    }
}
const getlyric = (artist,title) => {
    const url2 = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url2)
        .then(res => res.json())
        .then(data => lyrics(data,artist,title))
}
const lyrics = (data,artist,title) => {
    const displayLyrics = document.getElementById('display-lyric');
    displayLyrics.textContent = '';
    const div = document.createElement('div');
    div.classList.add('lyric-result','row','align-items-center','my-3','py-3');
    div.innerHTML = `
    <div class="text-center px-5">
        <h3>${title}</h3>
        <h5>By ${artist}</h5>
        <p>${data.lyrics}</p>
    </div>
    `;
    displayLyrics.appendChild(div);
}