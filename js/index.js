let formEl = elSelector('.js-form');
let elInput = elSelector('.js-input', formEl);
let elList = elSelector('.js-list');
let todoTemplate = elSelector('.todo-Template').content;

let todoArr = [];

let onEdit = (evt) => {
    todoArr.forEach((el) => {
        if(el.id == evt.target.dataset.id-0){
            let editText = prompt(el.text);
            el.text = editText;
        }
    })

    todoRender(todoArr)
}

let onDelete = (evt) => {
    delArr = []; 

    todoArr.forEach(element => {
        if(element.id != evt.target.dataset.id - 0){
            delArr.push(element);
        }
    })
    todoRender(delArr);
    todoArr = delArr;
}

let todoRender = (arr) => {

    elList.innerHTML = null;
    for(let i=0; i<arr.length; i++){

        let newTask = todoTemplate.cloneNode(true);
        
        let todoText = newTask.querySelector('.todoText');
        todoText.textContent = arr[i].text;

        let btnDelete = newTask.querySelector('.btn-delete');
        btnDelete.addEventListener('click', onDelete)
        btnDelete.dataset.id = arr[i].id

        let btnEdit = newTask.querySelector('.btn-edit');
        btnEdit.addEventListener('click', onEdit)
        btnEdit.dataset.id = arr[i].id
        
        elList.appendChild(newTask); 
        
    }
}

var onSubmit = (evt) => {
    evt.preventDefault();

    let inputValue = elInput.value.trim();

    var newTodo = {
        id: todoArr.at(0) ? todoArr.at(0)?.id + 1 : 1,
        text: inputValue,
        isCompleted: false
    }

    todoArr.unshift(newTodo);
    todoRender(todoArr);
    elInput.value = null;
    elInput.focus();
}

formEl.addEventListener('submit', onSubmit);