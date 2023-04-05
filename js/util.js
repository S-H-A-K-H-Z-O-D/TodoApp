let elSelector = function(element, parent = document){
    return parent.querySelector(element);
}

let createEl = element => document.createElement(element);