const playButton = () => {
    let playBtn = document.querySelector('#btn-play')
    playBtn.addEventListener('click', playClicked)
}

const playClicked = (event) => {
    let playBtn = document.createElement('iframe')

    let playBtnContent = `
                            <iframe width="1063" height="608" src="https://www.youtube.com/embed/h0I2hITH5uM" 
                                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        `
                        playButton();
}
playButton();