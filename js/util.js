let elSelector = function(element, parent = document){
    return parent.querySelector(element);
}

let createEl = element => document.createElement(element);

elCheckInput.addEventListener('click', onCheck = () => {
    if(elCheckInput.checked){
        elSpan.className = 'text-decoration-line-through';
    }else(elSpan.className = 'text-decoration-none');
});