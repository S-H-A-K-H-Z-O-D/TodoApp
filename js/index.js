let formEl = elSelector('.js-form');
let elInput = elSelector('.js-input', formEl);
let elList = elSelector('.js-list');
let todoTemplate = elSelector('.todo-Template').content;
let elCount = elSelector('.count');
        

let data = JSON.parse(localStorage.getItem('todoArr')) || [];
let todoArr = data;

elCount.textContent = todoArr.length

let onCheck = (Id, isCompleted) => {
    todoArr.forEach(elem => {
        if(elem.id == Id){
            elem.isCompleted = isCompleted;
        }
    })

    localStorage.setItem('todoArr', JSON.stringify(todoArr));
    todoRender(todoArr);
}

let onEdit = (Id) => {
    todoArr.forEach((el) => {
        if(el.id == Id){
            let editText = prompt(el.text);
            el.text = editText;
        }
    })

    todoRender(todoArr)
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
}

let onDelete = (Id) => {
    delArr = []; 

    todoArr.forEach(element => {
        if(element.id != Id){
            delArr.push(element);
        }
    })
    todoRender(delArr);
    todoArr = delArr;
    elCount.textContent = delArr.length
    localStorage.setItem('todoArr', JSON.stringify(delArr))
}

let todoRender = (arr) => {

    elList.innerHTML = null;
    for(let i=0; i<arr.length; i++){

        let newTask = todoTemplate.cloneNode(true);
        let elLi = newTask.querySelector('.todoLi');
        let todoText = newTask.querySelector('.todoText');
        let btnDelete = newTask.querySelector('.btn-delete');
        let btnEdit = newTask.querySelector('.btn-edit');
        let elCheck = newTask.querySelector('.checkInput');

        if(arr[i].isCompleted){
            todoText.classList.add('text-decoration-line-through');
        }
        
        elCheck.checked = arr[i].isCompleted;
        todoText.textContent = arr[i].text;
        elLi.dataset.id = arr[i].id;
        
        elList.appendChild(newTask); 
        
    }
}

let onSubmit = (evt) => {
    evt.preventDefault();

    let inputValue = elInput.value.trim();

    if(!inputValue){
        return alert('Input task!')
    }

    var newTodo = {
        id: todoArr.at(0) ? todoArr.at(0)?.id + 1 : 1,
        text: inputValue,
        isCompleted: false
    }

    todoArr.unshift(newTodo);
    todoRender(todoArr);
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    elCount.textContent = todoArr.length
    elInput.value = null;
    elInput.focus();
}

let eventDelegation = (evt) => {
    let parentElement = evt.target.closest('.todoLi');
    elId = Number(parentElement.dataset.id);

    if(evt.target.matches('.btn-delete')){
        onDelete(elId);
    }else if(evt.target.matches('.btn-edit')){
        onEdit(elId);
    }else if(evt.target.matches('.checkInput')){
        onCheck(elId, evt.target.checked);
    }
}

todoRender(todoArr);

formEl.addEventListener('submit', onSubmit);
elList.addEventListener('click', eventDelegation)