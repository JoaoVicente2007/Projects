 const inputElement = document.querySelector(".newtask-input")
 const addTaskButton = document.querySelector(".add")

 const tasksContainer = document.querySelector('.tasks')

 addTaskButton.addEventListener("click", () => handleAddTask());

 inputElement.addEventListener("change", () => handleInputChange());

 const validateInput = () => inputElement.value.trim().length > 0;

 const handleAddTask = () => {
    const inputIsValid = validateInput();
    
    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-sharp");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItem, taskContent));

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteItem);

    tasksContainer.appendChild(taskItem);

    inputElement.value = "";

    updateLocalStorage()
 };

 const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) {
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage()
 };

 const handleDeleteClick = (taskItem, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for( const task of tasks) {
        if (task.firstChild.isSameNode(taskContent)){
            taskItem.remove()
        }
    }

    updateLocalStorage()
 };

 const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
 };

 const updateLocalStorage = () =>{
    const tasks = tasksContainer.childNodes;

    const localStoregeTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");
        
        return {description: content.innerText, isCompleted};
    });

    localStorage.setItem("tasks", JSON.stringify(localStoregeTasks));
 };

    function localRefreshTasks() {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));

    for (const task of localTasks) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener('click', () => handleClick(taskContent));

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-sharp");
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");

        deleteItem.addEventListener('click', () => handleDeleteClick(taskItem, taskContent));

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteItem);

        tasksContainer.appendChild(taskItem);
    }
}

  localRefreshTasks();