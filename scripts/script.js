// declare
let inputField = document.querySelector(".main-create-input");
let themeIcon = document.getElementById("change-theme");

let listContainer = document.getElementById("main-list-container");
let footCountElement = document.querySelector('.main-list-footer-count');
let footerClicks = document.querySelectorAll('[class^="main-list-footer-"]');

let activeDisplay = document.querySelector('.main-list-footer-display-active');
let allDisplay = document.querySelector('.main-list-footer-display-all');
let completedDisplay = document.querySelector('.main-list-footer-display-completed');
let completedClearButton = document.querySelector('.main-list-footer-clear');

let taskCount = 0;
let doneTaskCount = 0;
let removeCuteGifYet = false;



// add event listener
inputField.addEventListener("keyup", (e) => addTask(e));
activeDisplay.addEventListener("click", (e) => displayActiveTask(e));
allDisplay.addEventListener("click", e => displayAllTask(e));
completedDisplay.addEventListener("click", e => displayCompletedTask(e));
completedClearButton.addEventListener("click", e => clearCompleted(e));
themeIcon.addEventListener("click", e => changeTheme(e));

// activeDisplay.addEventListener("click", displayActiveTask);



// functions
function addTask(event) {
    if (event.code == "Enter") {
        // if users dont input anything -> dont create new task
        if (event.target.value.trim() === "")
            return;
            
            // if they do
        taskCount++;
        // remove cute gif if there is any task  in container
        if (taskCount != 0 && !removeCuteGifYet) {
            listContainer.querySelector("#main-list-container-cutegif").classList.add("hide");
            removeCuteGifYet = true;
        } 
        listContainer.insertAdjacentHTML("beforeend", `
        <div class="main-list-content-task text-display-wrapper">
            <div id="task${taskCount}" class="circle" onclick="handleClickCircle(this.id)">
                <img class="circle-click-check hide" src="./assets/images/icon-check.svg" alt="Check Icon"/>
            </div>
            <div class="main-list-content-task-text text-display">${event.target.value}</div>
            <img class="main-list-content-task-cross" id="cross${taskCount}" src="assets/images/icon-cross.svg" alt="Cross Icon" onclick="handleClickCross(this.id)"/>
        </div>`);

        // get child element count
        // footCountElement.innerHTML = `${listContainer.childElementCount - 1}`;
        
        // reset input value
        event.target.value = "";
        updateTaskCount();

    }
}

function handleClickCircle(clickedId) {
    const item = document.getElementById(clickedId);
    const temp = item.firstElementChild.classList.contains('hide');
    const temp1 = item.classList.contains("circle-click");

    if (!temp1) {
        item.classList.add("circle-click");
        item.nextElementSibling.classList.add("done-text");
        doneTaskCount ++;
    }
    else {
        item.classList.remove("circle-click");
        item.nextElementSibling.classList.remove("done-text");
        doneTaskCount --;
    }

    if (temp)
        item.firstElementChild.classList.remove("hide")
    else
        item.firstElementChild.classList.add("hide")

    updateTaskCount();
}
function handleClickCross(clickedCross) {
    const item = document.getElementById(clickedCross);
    // check done state -> update task count
    if (item.parentNode.querySelector(".circle").classList.contains("circle-click"))
        doneTaskCount --;
    taskCount --;
    
    // remove element
    item.parentNode.remove();
    updateTaskCount();
    
}

function removeAllClickStyle() {
    footerClicks.forEach(clickElement => {
        if (clickElement.classList.contains("main-list-footer-click"))
            clickElement.classList.remove("main-list-footer-click");
    })
}
function displayActiveTask(event) {
    // change style
    removeAllClickStyle();
    event.target.classList.add("main-list-footer-click");

    // start display all active tasks
    Array.from(document.querySelectorAll(".main-list .main-list-content .main-list-content-task .circle")).map(element => {
        if (element.classList.contains("circle-click"))
            element.parentNode.classList.add("hide");
        else if (element.parentNode.classList.contains("hide"))
            element.parentNode.classList.remove("hide");
    });
}
function displayAllTask(event) {
    // change style 
    removeAllClickStyle();
    event.target.classList.add("main-list-footer-click");

    // display all tasks
    Array.from(document.querySelectorAll(".main-list .main-list-content .main-list-content-task")).map(element => {
        if (element.classList.contains("hide"))
            element.classList.remove("hide");
    });
}
function displayCompletedTask(event) {
    // change style 
    removeAllClickStyle();
    event.target.classList.add("main-list-footer-click");

    // display completed tasks
    Array.from(document.querySelectorAll(".main-list .main-list-content .main-list-content-task .circle")).map(element => {
        if (!element.classList.contains("circle-click"))
            element.parentNode.classList.add("hide");
        else if (element.parentNode.classList.contains("hide"))
            element.parentNode.classList.remove("hide");
    });
}
function updateTaskCount() {
    footCountElement.innerHTML = `${taskCount - doneTaskCount} ${(taskCount - doneTaskCount) <= 1? "item" : "items"} left`;
    if (taskCount == 0 && doneTaskCount == 0) {
        listContainer.querySelector("#main-list-container-cutegif").classList.remove("hide");
        removeCuteGifYet = false;
    }
}
function clearCompleted(event) {
     // display completed tasks
     Array.from(document.querySelectorAll(".main-list .main-list-content .main-list-content-task .circle")).map(element => {
         if (element.classList.contains("circle-click"))
             element.parentNode.remove();
     });
     taskCount -= doneTaskCount;
     doneTaskCount = 0;
     updateTaskCount();
}


// change theme
function changeTheme() {
    if (themeIcon.src.includes("icon-sun")) {
        themeIcon.src = "./assets/images/icon-moon.svg";
        document.documentElement.removeAttribute("data-theme");
    }
    else {
        themeIcon.src = "./assets/images/icon-sun.svg";
        document.documentElement.setAttribute("data-theme", "dark");
    }
}