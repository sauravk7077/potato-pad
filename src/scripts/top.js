const remote = require('electron').remote;

let maxBtn = document.getElementById('maximize');

function maximize() {
    let itag = document.createElement('i');
    maxBtn.getElementsByTagName('svg')[0].remove();
    if(remote.getCurrentWindow().isMaximized()){
        remote.getCurrentWindow().unmaximize();
        itag.classList.add('fas', 'fa-window-maximize');
    }else{
        remote.getCurrentWindow().maximize();
        itag.classList.add('fas', 'fa-window-restore');
    }
    maxBtn.append(itag);
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