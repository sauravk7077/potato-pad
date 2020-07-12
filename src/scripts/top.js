const remote = require('electron').remote;

let maxBtn = document.getElementById('maximize');

function maximize() {
    console.log(remote.getCurrentWindow().isMaximized());
    if(remote.getCurrentWindow().isMaximized()){
        console.log("D");
        remote.getCurrentWindow().unmaximize();
        maxBtn.getElementsByTagName('img')[0].src = "./assets/square.svg";
    }else{
        remote.getCurrentWindow().maximize();
        maxBtn.getElementsByTagName('img')[0].src = "./assets/screen.svg";
    }
}


function minimize() {
    remote.getCurrentWindow().minimize();
}

document.getElementById('minimize').addEventListener('click', minimize);

maxBtn.addEventListener('click', maximize);

document.getElementById('close').addEventListener('click', ()=>{
    remote.getCurrentWindow().close();
});

module.exports = remote;