let formEl = elSelector('.js-form');
let elInput = elSelector('.js-input', formEl);
let elList = elSelector('.js-list');
let todoTemplate = elSelector('.todo-Template').content;
let elCount = elSelector('.count');
let elDayTime = elSelector('.dayTime');
let elNightTime = elSelector('.nightTime');
let elBg = elSelector('.bgImg');
let elTodoBtns = elSelector('.todoBtns');
        

let data = JSON.parse(localStorage.getItem('todoArr')) || [];
let todoArr = data;
console.log(data)

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
    elCount.textContent = delArr.length;
    localStorage.setItem('todoArr', JSON.stringify(delArr))
}

let onAll = () => {
    todoArr = data;
    todoRender(todoArr);
    elCount.textContent = todoArr.length;
}

let onActive = () => {
    todoArr = data;
    let activeArr = [];

    todoArr.forEach(el => {
        if(!el.isCompleted){
            activeArr.push(el);
        }
    })

    todoRender(activeArr);
    todoArr = activeArr;
    elCount.textContent = activeArr.length
}

let onCompleted = () => {
    todoArr = data;
    let completedArr = [];

    todoArr.forEach(el => {
        if(el.isCompleted){
            completedArr.push(el);
        }
    })

    todoRender(completedArr);
    todoArr = completedArr;
    elCount.textContent = completedArr.length
}

let todoRender = (arr) => {

    elList.innerHTML = null;
    for(let i=0; i<arr.length; i++){

        let newTask = todoTemplate.cloneNode(true);
        let elLi = newTask.querySelector('.todoLi');
        let todoText = newTask.querySelector('.todoText');
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

let btnsEventDelegation = (evt) => {
    if(evt.target.matches('.allTodo')){
        onAll();
    }else if(evt.target.matches('.activeTodo')){
        onActive();
    }else if(evt.target.matches('.completedTodo')){
        onCompleted();
    }
}

let changeDayTime = () => {
    elNightTime.classList.remove('d-none')
    elDayTime.classList.add('d-none')
    elBg.classList.add('bg-dark');
    elInput.classList.add('bg-dark');
    elInput.classList.add('text-white');
    document.querySelectorAll('.todoLi').forEach(li => {
        li.classList.add('bg-dark')
        li.classList.add('text-white')
    })
}

let changeNightTime = () => {
    elNightTime.classList.add('d-none')
    elDayTime.classList.remove('d-none')
    elBg.classList.remove('bg-dark');
    elInput.classList.remove('bg-dark');
    elInput.classList.remove('text-white');
    document.querySelectorAll('.todoLi').forEach(li => {
        li.classList.remove('bg-dark')
        li.classList.remove('text-white')
    })
}

todoRender(todoArr);

formEl.addEventListener('submit', onSubmit);
elList.addEventListener('click', eventDelegation);
elTodoBtns.addEventListener('click', btnsEventDelegation)
elDayTime.addEventListener('click', changeDayTime);
elNightTime.addEventListener('click', changeNightTime);