let formEl = elSelector('.js-form');
let elInput = elSelector('.js-input', formEl);
let elList = elSelector('.js-list');

let todoArr = [];

let onEdit = () => {
    console.log('Edit');
}

let onDelete = () => {
    console.log('Delete');
}

let todoRender = () => {

    elList.innerHTML = null;
    for(let i=0; i<todoArr.length; i++){

        let elLi = createEl('li');
        let elCheckInput = createEl('input');
        let elSpan = createEl('span');
        let elBtnWrapper = createEl('div');
        let elEditBtn = createEl('button');
        let elDeleteBtn = createEl('button');

        elLi.className = 'd-flex list-group-item align-items-center';
        elCheckInput.className = 'form-check-input me-2';
        elCheckInput.type = 'checkbox';
        elSpan.textContent = todoArr[i].text;
        elBtnWrapper.className = 'ms-auto';
        elEditBtn.className = 'btn btn-success';
        elEditBtn.textContent = 'Edit';
        elDeleteBtn.className = 'btn btn-danger ms-2';
        elDeleteBtn.textContent = 'Delete';
        
        
        elList.appendChild(elLi); 
        elLi.appendChild(elCheckInput);
        elLi.appendChild(elSpan);
        elLi.appendChild(elBtnWrapper);
        elBtnWrapper.appendChild(elEditBtn);
        elBtnWrapper.appendChild(elDeleteBtn);   

        elEditBtn.addEventListener('click', onEdit);
        elDeleteBtn.addEventListener('click', onDelete);
        elCheckInput.addEventListener('click', onCheck = () => {
            if(elCheckInput.checked){
                elSpan.className = 'text-decoration-line-through';
            }else(elSpan.className = 'text-decoration-none');
        });
    }
}

var onSubmit = (evt) => {
    evt.preventDefault();

    let inputValue = elInput.value.trim();

    if(!(inputValue)){
        alert('Input todo');
    }

    var newTodo = {
        id: todoArr.length + 1,
        text: inputValue,
        isCompleted: false
    }

    todoArr.unshift(newTodo);
    todoRender();
    elInput.value = null;
    elInput.focus();
}

formEl.addEventListener('submit', onSubmit);