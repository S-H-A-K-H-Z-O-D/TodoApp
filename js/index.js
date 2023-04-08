let formEl = elSelector('.js-form');
let elInput = elSelector('.js-input', formEl);
let elList = elSelector('.js-list');
let todoTemplate = elSelector('.todo-Template').content;
        

let data = JSON.parse(localStorage.getItem('todoArr'))
let todoArr = data ? data : [];


let onEdit = (evt) => {
    todoArr.forEach((el) => {
        if(el.id == evt.target.dataset.id-0){
            let editText = prompt(el.text);
            el.text = editText;
        }
    })

    todoRender(todoArr)
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
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
    localStorage.setItem('todoArr', JSON.stringify(delArr))
}



let todoRender = (arr) => {

    elList.innerHTML = null;
    for(let i=0; i<arr.length; i++){

        let newTask = todoTemplate.cloneNode(true);
        
        let todoText = newTask.querySelector('.todoText');
        todoText.textContent = arr[i].text;

        let btnDelete = newTask.querySelector('.btn-delete');
        btnDelete.addEventListener('click', onDelete);
        btnDelete.dataset.id = arr[i].id

        let btnEdit = newTask.querySelector('.btn-edit');
        btnEdit.addEventListener('click', onEdit);
        btnEdit.dataset.id = arr[i].id

        let elCheck = newTask.querySelector('.checkInput');

        let onCheck = evt => {
            localStorage.setItem('todoArr', JSON.stringify(todoArr))
            todoArr.forEach(element => {
                if(element.id == evt.target.dataset.id - 0){
                    if(elCheck.checked){
                        element.isCompleted = true;
                        todoText.classList.add('text-decoration-line-through')
                    }else{
                        element.isCompleted = false;
                        todoText.classList.remove('text-decoration-line-through')
                    }
                }
            })
            localStorage.setItem('todoArr', JSON.stringify(todoArr))
        }

        
        if(arr[i].isCompleted == true){
            todoText.classList.add('text-decoration-line-through');
            elCheck.checked = true;
        }
        

        elCheck.addEventListener('click', onCheck); 
        elCheck.dataset.id = arr[i].id;
        
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
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    elInput.value = null;
    elInput.focus();
}

todoRender(todoArr);

formEl.addEventListener('submit', onSubmit);