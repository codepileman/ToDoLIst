const inputValue  = document.querySelector('.input');
const add = document.querySelector('.add');
const container = document.querySelector('.container');

let toDoList = [];

if(window.localStorage.getItem('toDoList') === null){
    window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
}else {
    toDoList = JSON.parse(window.localStorage.getItem('toDoList'));
}


const createItem = function(name){
    let item = document.createElement('div');
    item.classList.add('item');

    let input =  document.createElement('input');
    input.type = 'text';
    input.value = name;
    input.disabled = true;
    input.classList.add('item_input');

    let edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = 'EDIT';
    edit.addEventListener('click', () => {
        if(input.disabled === true){
            input.disabled = !input.disabled;
            edit.innerHTML = 'SUBMIT';
        }else {
            input.disabled = !input.disabled;
            edit.innerHTML = 'EDIT';
            let idx = toDoList.indexOf(name);
            toDoList[idx] = input.value;
            window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
        }
    })

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = 'REMOVE';
    remove.addEventListener('click', () => {
        removeItem(item, name);
    });

    item.appendChild(input);
    item.appendChild(edit);
    item.appendChild(remove);

    return item;
}

add.addEventListener('click', () => {
    if(inputValue.value){
        const inputItem = createItem(inputValue.value);
        toDoList.push(inputValue.value);
        window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
        container.appendChild(inputItem);
        inputValue.value = '';
    }
    
});

for(let i = 0; i < toDoList.length; i++){
    const inputItem = createItem(toDoList[i]);
    container.appendChild(inputItem);
}

const editItem = function(input, name){
    if(input.disabled === true){
        input.disabled = !input.disabled;
    }else {
        input.disabled = !input.disabled;
        let nextNode = input.nextSibling;
        nextNode.innerHTML = 'SUBMIT';
        nextNode.addEventListener('click', () => {
            let idx = toDoList.indexOf(name);
            toDoList[idx] = input.value;
            window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
            nextNode.innerHTML = 'EDIT';
        });
    }
    
}

const removeItem = function(item, name){
    let idx = toDoList.indexOf(name);
    toDoList.splice(idx, 1);
    window.localStorage.setItem('toDoList', JSON.stringify(toDoList));
    container.removeChild(item);
}



