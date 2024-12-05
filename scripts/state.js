function manageState(){
    if(!window.localStorage.getItem('projectob_userScore')){
        window.localStorage.setItem('projectob_userScore', JSON.stringify({
            score: 100,
        }))
    }else{
    }
}
manageState()