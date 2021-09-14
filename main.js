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
    displayLyrics.textContent = '';
    for(let i=0; i<data.length; i++){
        const div = document.createElement('div');
        div.classList.add('single-result','row','align-items-center','my-3','py-3')
        div.innerHTML = `
            <div class="col-md-2">
                <img class="img-fluid" src="${data[i].album.cover_medium}">
            </div>
            <div class="col-md-7">
                <h4 class="lyrics-name">${data[i].title}</h4>
                <p class="author lead">Album by <span class="fw-bold">${data[i].artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button id="lyric-btn" class="btn btn-success">Get Lyrics</button>
            </div>`;
        displayLyrics.appendChild(div);
    }
}