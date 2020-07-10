const remote = require('electron').remote;
const fs = require('fs');
const {createWindow} = remote.require('./index');
const path = require('path');
const { dialog, ipcRenderer } = require('electron');
const { resolve } = require('path');
let filepath = "";
// Event Listeners

document.getElementById('open').addEventListener('click', openFile);
document.getElementById('save').addEventListener('click', saveFile);



let title = document.getElementById('title');

title.innerText = "Untitled";

// Functions

function openFile() {
    console.log('File opened');
    wantToSave();
}

function newFile() {

}

async function saveFile() {
    var object = await remote.dialog.showSaveDialog(remote.getCurrentWindow);
    var filepath = await object.filePath;
    if(!object.canceled.valueOf()){
        document.getElementById('title').innerText = path.win32.basename(filepath);
        let ws = fs.createWriteStream(filepath);
        ws.write(document.getElementById('textContainer').value);
        ws.close();
    }
}

function isFileSaved() {
    var title = document.getElementById('title');
    if(filepath == "")
        return false;
    else{
        return fs.existsSync(filepath) && title==path.basename(filepath);
    }
}


async function wantToSave() {
    let saved = isFileSaved();
    if(!saved){
        let options  = {
            buttons: ["Yes","No","Cancel"],
            message: "Do you really want to quit?"
           }
        responce = await remote.dialog.showMessageBox(remote.getCurrentWindow, options);
        console.log(responce);
    }
}


