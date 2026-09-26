let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

window.onload = () => renderTasks();

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (!text) return;

    tasks.push({ text, completed: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(t => {
        if (currentFilter === "pending") return !t.completed;
        if (currentFilter === "completed") return t.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            ${task.text}
        `;

        if (task.completed) span.classList.add("completed");

        span.querySelector("input").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        let del = document.createElement("button");
        del.textContent = "X";
        del.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
    });

    updateStats();
}

function filterTask(type) {
    currentFilter = type;
    renderTasks();
}

function updateStats() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText =
        tasks.filter(t => t.completed).length;
    document.getElementById("pending").innerText =
        tasks.filter(t => !t.completed).length;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}