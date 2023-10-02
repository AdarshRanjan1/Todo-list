//In this case the tasks will get deleted after reloading
// const ToDo = [{name:'study', dueDate:'2022-12-06'},{name: 'relax', dueDate:'2022-12-06'}];

//Here we are storing in local storage so tasks won't get deleted unless we do it.
const ToDo = JSON.parse(localStorage.getItem('ToDo')) || [{name:'study', dueDate:'2022-12-06'},{name: 'relax', dueDate:'2022-12-06'}];

displayToDoList();

function displayToDoList(){
    let listHTML = '';

    ToDo.forEach((todo, index) => {
        const { name, dueDate } = todo;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-button js-delete-button">Delete</button>
        `;
        listHTML += html;
    })
    document.querySelector('.js-list').innerHTML = listHTML;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            ToDo.splice(index, 1);
            displayToDoList();
            saveToStorage();
        });
    });
}

document.querySelector('.js-add-button').addEventListener('click', () =>{
    addToDo();
})

function addToDo(){
    const inputElement = document.querySelector('.js-task');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-dateInput');
    const dueDate = dateInputElement.value;

    ToDo.push({name,dueDate});

    inputElement.value = '';

    displayToDoList();

    //Whenever we update the list save it in local storage 
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('ToDo', JSON.stringify(ToDo));
}

function handleKeydown(event){
    if(event.key === 'Enter'){
        addToDo();
    }
}
