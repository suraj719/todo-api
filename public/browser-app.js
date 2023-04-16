const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form")
const taskInputDOM = document.querySelector(".taskinput")
const totaltasks = document.querySelector('.total')
const popDOM = document.querySelector('.pop')
const editbtn = document.querySelector('.edit-task')
const poptask = document.querySelector('.poptask')
const container = document.querySelector('.container')
const popcompleted = document.querySelector('.popcompleted')
const epro = document.querySelector('.epro')
//to show all tasks
const showtasks = async () => {
  try {
    const data = await axios.get("/api/v1/tasks");
    const allTasks = data.data.task;
    // console.log(allTasks)
    if(allTasks.length<1) {
        totaltasks.innerHTML="no tasks found" 
        
    } else {
        totaltasks.innerHTML=`total tasks: ${allTasks.length}`
    }
    tasksDOM.innerHTML = allTasks 
        .map((task) => {
        return `
            <div class="rounded-pill text-center pb-2">
                <span class="task-name" style="textdecoration:${task.completed==true}?line-through:none">${task.name}</span>
                <lord-icon
                src="https://cdn.lordicon.com/jmkrnisz.json"
                trigger="hover"
                style="width:32px;height:32px"
                class="delete-btn"
                onclick="removetask('${task._id}')"
                >
                </lord-icon>
                <i class="fa-solid fa-pen-to-square edit-task" onclick="updatetask('${task._id}','${task.name}')"></i>
            </div>
        `;
      })
      .join("");
        // const lineth = document.querySelectorAll(".task-name")
        
        //     allTasks.forEach(j => {
        //         lineth.forEach(e => {
        //         if(j.completed==true) {
        //             e.style.textDecoration="line-through"
        //         }
        //     })
        // })
        
  } catch (error) {
    
    console.log(error);
  }
};

showtasks();




//to create a task
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
  
    try {
      await axios.post('/api/v1/tasks', { name })
      showtasks()
      taskInputDOM.value = ''
    } catch (error) {
        swal("nothing extra added", "enter some text");
    }
  })

//to update a task

const updatetask = async (taskid,name) => {
    // try { 
    popDOM.style.display="block"
    container.style.opacity="0.5"
    poptask.value=`${name}`
    console.log(poptask.value,popcompleted.checked);
    // await axios.patch(`/api/v1/tasks/${taskid}`, {
    //     name:poptask.value,
    //     completed:popcompleted
    // })
    // } catch (error) {
        
    // }
    epro.innerHTML = `
        <button class='btn btn-success' onclick="save('${taskid}')">save</button>
        <button class='btn ms-3 btn-secondary' onclick="cancel()">cancel</button>
    `

}

const save = async (taskid) => {
    try {
        await axios.patch(`/api/v1/tasks/${taskid}`, {
                name:poptask.value,
                completed:popcompleted.checked
        })
        
        popDOM.style.display="none"
        container.style.opacity="1"
        showtasks()
    } catch (error) {
        
    }
}

function cancel() {
    popDOM.style.display="none"
    container.style.opacity="1"
}
 
//removing a task
const  removetask = async (taskid) => {
    try {
        await axios.delete(`/api/v1/tasks/${taskid}`)
        showtasks();
    } catch (error) {
        console.log("task not found")
    }
    
}


