let ulElement = document.getElementById('list')
let a = document.getElementById('list').children;
let list = Array(...a)
let addBtn = document.getElementById('liveToastBtn');
let inputBox = document.getElementById('task');
let closeBtn;
let listId;
var checkedOnes = [];


function createCheckedList(){
        if (localStorage.length <= 1) {
            localStorage.setItem('checkedOnes', JSON.stringify(checkedOnes));
        } else {
            checkedOnes = JSON.parse(localStorage.getItem('checkedOnes'))
        }
    }


function liFunctions(exp, chk) {
    listId = Math.round(Math.random() * 9999);
    let newListEl = document.createElement('li');
    closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'x';
    closeBtn.classList.add('close');
    closeBtn.style.margin = '10px';
    closeBtn.onclick = () => {
        deleteEl(newListEl)
    }
    newListEl.onclick = () => {
        if (ulElement.contains(newListEl)) {
            checkEl(newListEl, false);
        }
    }
    
    if (exp === 'new') {
        localStorage.setItem(listId, inputBox.value);
        newListEl.innerHTML = localStorage.getItem(`${listId}`);
        newListEl.id = `${listId}`
        closeBtn.id = `${listId}`
    }
    else {
        newListEl.id = `${exp}`
        newListEl.innerHTML = localStorage.getItem(`${exp}`);
        closeBtn.id = `${exp}`
        if (chk) {
            newListEl.classList.add('checked');
        }
    }
    
    inputBox.value = '';
    ulElement.appendChild(newListEl);
    newListEl.appendChild(closeBtn);
}

addBtn.onclick = () => {
    if (inputBox.value === "" || inputBox.value == !String) {
        $(`.error`).toast("show")
    } else {
        liFunctions('new');
        $(`.success`).toast("show")
    }
}


function getLocalItems() {
    let regex = /[0-9]/
    for (let i = 0; i < localStorage.length; i++) {
        if (regex.test(localStorage.key(i))) {
            if (checkedOnes.indexOf(`${localStorage.key(i)}`) > -1) {
                liFunctions(localStorage.key(i), true);
            } else {
                liFunctions(localStorage.key(i), false);
            }
        }
    }
}


function deleteEl(e) {
    for (let i = 0; i < localStorage.length; i++){
        let a = window.localStorage.key(i)
        if (a === e.id) {
            localStorage.removeItem(a)
            ulElement.removeChild(e)
        }
    }
    checkEl(e, true)
}

function checkEl(e, boo) {
    if (e.classList[0] !== 'checked') {
        e.classList.add('checked');
        checkedOnes.push(e.id)
        
    } else if(e.classList[0] === 'checked' || boo) {
        e.classList.remove('checked');
        let index = checkedOnes.indexOf(e.id);
        if (index > -1) {
            checkedOnes.splice(index, 1);
        }
    }
    localStorage.setItem('checkedOnes', JSON.stringify(checkedOnes))
}


window.addEventListener("load", function(){ createCheckedList(), getLocalItems() }, false)
