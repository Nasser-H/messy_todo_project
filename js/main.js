/*
    Attach a submit event to the form
    Prevents the default submit behavior (page reload), and instead
    calls the `addTask` function with the value from the input field
*/
document.querySelector('form').addEventListener('submit',(e)=>{e.preventDefault();addTask(e.target.taskToBeDone.value)});

// Get references to the input field and the table element

const taskToBeDone = document.getElementById("taskToBeDone");
const table = document.getElementById("table");

// Initialize the tasks array
// If localStorage already contains tasks, load them and display them
let tasks = [];
if(tasks.length == 0 && localStorage.getItem('tasks') != null){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks(tasks);
}

/*
1- Adds a new task object to the tasks array
2- Each task has content and a 'state' (true = in progress, false = done)
3- Updates localStorage, clears the form, and refreshes the task table
*/
function addTask(taskContent){
    let task = {taskContent,state:true};
    if(taskContent){
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        clearForm();
        displayTasks(tasks);
    }   
}

// Clears the input field after a task is added
function clearForm(){
    taskToBeDone.value = null;
}

// Displays the tasks in a styled table
// Loops through all tasks and creates HTML rows with content, status, and delete button
function displayTasks(arrTasks){
    let box = [];

    for(let i =0; i< arrTasks.length ; i++){
     box  += `
                    <tr
                        class="bg-white border-b border-gray-200 hover:bg-gray-50">
                        <td onClick="taskToBeDoneOrNo(${i})" class="px-6 py-4 cursor-pointer ${arrTasks[i].state ? null:"line-through"}">
                            ${arrTasks[i].taskContent}
                        </td>

                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end">
                                <div onClick="taskToBeDoneOrNo(${i})" class="cursor-pointer h-auto w-fit py-1 px-3 rounded-full text-white ${arrTasks[i].state ? "bg-orange-500 -me-6":"bg-green-500 -me-2"}">
                                ${arrTasks[i].state ? "in process":"Done"}
                                </div> 
                            </div>
                        </td>

                        <td class="px-6 py-4 text-end ">
                            <button type="button" onClick="deleteTask(${i})"
                                class="cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center -me-3 mb-2">
                                Delete
                            </button>
                        </td>
                    </tr>     
    `
    }

    if(tasks.length > 0){
        table.innerHTML = `
                <div
                class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white rounded-3xl">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-3xl overflow-hidden">
                    <thead class="text-xs text-gray-700 uppercase bg-lime-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                task
                            </th>
                            <th scope="col" class="px-6 py-3 text-end">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-end">
                                delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>   
                    ${box}     
                    </tbody>
                </table>
            </div>
        `;            
    }else{
        table.innerHTML = "";
    }
}

// change task status
function taskToBeDoneOrNo(index){
    if(tasks[index].state){
        tasks[index].state = false;
        localStorage.setItem('tasks',JSON.stringify(tasks));
        displayTasks(tasks);
    }else{
        tasks[index].state = true;
        localStorage.setItem('tasks',JSON.stringify(tasks));
        displayTasks(tasks);
    }
}

// from the name is delete task
function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    displayTasks(tasks);
}