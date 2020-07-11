const remote = require('electron').remote;
const fs = require('fs');
const {createWindow} = remote.require('./index');
const path = require('path');
const { dialog, clipboard } = remote;

//The file's path
let filepath;

// DOM Elements

let title = document.getElementById('title');
let textContainer = document.getElementById('textContainer');


// Event Listeners

//File Menu
document.getElementById('new').addEventListener('click', newFile);
document.getElementById('open').addEventListener('click', openFile);
document.getElementById('save').addEventListener('click', save);
document.getElementById('save-as').addEventListener('click', saveAs);

//Edit Menu

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('cut').addEventListener('click', cut);
document.getElementById('copy').addEventListener('click', copy);
document.getElementById('paste').addEventListener('click', paste);
document.getElementById('delete').addEventListener('click', deleteSelected);


//Format Menu

document.getElementById('word-wrap').addEventListener('click', changeWordWrap);

// File Functions

async function openFile() {
    let value = await dialog.showOpenDialog(remote.getCurrentWindow());
    filepath = value.filePaths[0];
    textContainer.value = "";
    let rs = fs.createReadStream(filepath);
    title.innerText = path.win32.basename(filepath);
    rs.on('data', (d) => {
        textContainer.value += d;
    });
    rs.on('end', ()=> {
        rs.close();
    });
    
}

function newFile() {
    createWindow();
}

async function saveAs() {
    var object = await remote.dialog.showSaveDialog(remote.getCurrentWindow);
    if(!object.canceled){
        filepath = await object.filePath;
        saveFile();
    }
}

async function save() {
    if (!filepath)
    {
        var object = await remote.dialog.showSaveDialog(remote.getCurrentWindow);
        filepath = await object.filePath;
    }
    if(!object || !object.canceled)
    {
        saveFile();
    }



}


async function saveFile() {
    title.innerText = path.win32.basename(filepath);
    let ws = fs.createWriteStream(filepath);
    ws.write(document.getElementById('textContainer').value);
    ws.close();
}

function isFileSaved() {
    if(filepath == "")
        return false;
    else{
        return fs.existsSync(filepath) && title==path.basename(filepath);
    }
}

async function hasDocumentChanged() {
    if(filepath)
    {
        text = textContainer.value;
        fileText = '';
        let rs = fs.createReadStream(filepath);
        rs.on('data', (chunk) => {
            fileText += chunk;
        });
        return new Promise((resolve, reject)=>{
            rs.on('close', ()=>{
                resolve(fileText != text);
            });
        });
       
        
    }
}


async function wantToSave() {
    let saved = isFileSaved();
    if(!saved || await hasDocumentChanged() ){
        dialog.showMessageBox(remote.getCurrentWindow(), {
            message: 'Do you want to save this file?',
            buttons: ['Save', "Don't save", 'Cancel']
        })
        .then((data)=>{
            if(data.response == 1) {
                saveFile();
            }
            return data.response;
        });
    }
}


//Edit functions
function undo() {
    remote.getCurrentWindow().webContents.undo();
}

function cut() {
    s = textContainer.selectionStart;
    e = textContainer.selectionEnd;
    clipboard.writeText(textContainer.value.substring(s,e));
    textContainer.value = textContainer.value.substring(0,s) + textContainer.value.substring(e);
}

function copy() {
    s = textContainer.selectionStart;
    e = textContainer.selectionEnd;
    clipboard.writeText(textContainer.value.substring(s,e));
}

function paste() {
    textContainer.setRangeText(clipboard.readText());
}

function deleteSelected() {
    console.log('wr');
    textContainer.setRangeText('',textContainer.selectionStart, textContainer.selectionEnd);
}

// Format Functions

function changeWordWrap() {
    textContainer.toggleAttribute('word-wrap');
}




title.innerText = "Untitled";
textContainer.addEventListener('blur',()=>{
    textContainer.focus();
});

