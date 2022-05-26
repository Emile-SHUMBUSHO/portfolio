let themeDotes = document.getElementsByClassName('theme-dot')
for(let i=0; i<themeDotes.length; i++){
    themeDotes[i].addEventListener('click', function(){
        let mode = this.dataset.mode
        console.log('button clicked:', mode)
        setTheme(mode)
    })
}

function setTheme(mode){
    if(mode == 'light'){
        document.getElementById('theme-style').href = './default-css.css'
    }
    if(mode == 'blue'){
        document.getElementById('theme-style').href = './blue.css'
    }
    if(mode == 'green'){
        document.getElementById('theme-style').href = './green.css'
    }
    if(mode == 'purple'){
        document.getElementById('theme-style').href = './purple.css'
    }
}