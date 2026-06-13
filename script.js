// ===============================
// AUTHENTICATION
// ===============================

function signup() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Signup Successful");

    window.location.href = "login.html";
}

function login() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;

    let user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {
        alert("Please Signup First");
        return;
    }

    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert("Login Successful");

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Invalid Email or Password"
        );
    }
}

function logout() {

    let confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem(
        "loggedIn"
    );

    alert("Logout Successful");

    window.location.href =
        "login.html";
}

// ===============================
// SIDEBAR NAVIGATION
// ===============================

function showSection(sectionId) {

    let sections =
        document.querySelectorAll(".section");

    sections.forEach(function (section) {
        section.style.display = "none";
    });

    let current =
        document.getElementById(sectionId);

    if (current) {
        current.style.display = "block";
    }
}

// ===============================
// THEME
// ===============================

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    let mode =
        document.body.classList.contains(
            "light-mode"
        )
            ? "light"
            : "dark";

    localStorage.setItem(
        "theme",
        mode
    );
}

function loadTheme() {

    let mode =
        localStorage.getItem("theme");

    if (mode === "light") {

        document.body.classList.add(
            "light-mode"
        );
    }
}

// ===============================
// PROFILE POPUP
// ===============================

function openProfile() {

    let modal =
        document.getElementById(
            "profileModal"
        );

    if (!modal) return;

    let user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (user) {

        document.getElementById(
            "profileName"
        ).innerHTML =
            "<strong>Name:</strong> " +
            user.name;

        document.getElementById(
            "profileEmail"
        ).innerHTML =
            "<strong>Email:</strong> " +
            user.email;
    }

    modal.style.display = "block";
}

function closeProfile() {

    let modal =
        document.getElementById(
            "profileModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {

    let modal =
        document.getElementById(
            "profileModal"
        );

    if (
        modal &&
        event.target === modal
    ) {
        modal.style.display = "none";
    }
};

// ===============================
// LOGIN CHECK
// ===============================

function checkLogin() {

    let loggedIn =
        localStorage.getItem(
            "loggedIn"
        );

    if (
        window.location.pathname.includes(
            "dashboard.html"
        )
    ) {

        if (loggedIn !== "true") {

            alert(
                "Please Login First"
            );

            window.location.href =
                "login.html";
        }
    }
}

// ===============================
// DASHBOARD COUNTS
// ===============================

function updateCounts() {

    let members =
        JSON.parse(
            localStorage.getItem("members")
        ) || [];

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    let progressCount =
        tasks.filter(
            task =>
                task.status === "progress"
        ).length;

    let completedCount =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;

    if (
        document.getElementById(
            "totalMembers"
        )
    ) {
        document.getElementById(
            "totalMembers"
        ).innerHTML =
            members.length;
    }

    if (
        document.getElementById(
            "totalTasks"
        )
    ) {
        document.getElementById(
            "totalTasks"
        ).innerHTML =
            tasks.length;
    }

    if (
        document.getElementById(
            "progressTasks"
        )
    ) {
        document.getElementById(
            "progressTasks"
        ).innerHTML =
            progressCount;
    }

    if (
        document.getElementById(
            "completedTasks"
        )
    ) {
        document.getElementById(
            "completedTasks"
        ).innerHTML =
            completedCount;
    }

    if (
        document.getElementById(
            "reportMembers"
        )
    ) {
        document.getElementById(
            "reportMembers"
        ).innerHTML =
            members.length;
    }

    if (
        document.getElementById(
            "reportTasks"
        )
    ) {
        document.getElementById(
            "reportTasks"
        ).innerHTML =
            tasks.length;
    }

    if (
        document.getElementById(
            "reportCompleted"
        )
    ) {
        document.getElementById(
            "reportCompleted"
        ).innerHTML =
            completedCount;
    }
}




// ===============================
// MEMBERS MANAGEMENT
// ===============================

let members =
JSON.parse(
localStorage.getItem("members")
) || [];

// -------------------------------
// SAVE MEMBERS
// -------------------------------

function saveMembers() {

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );
}

// -------------------------------
// ADD MEMBER
// -------------------------------

function addMember() {

    let name =
    prompt("Enter Member Name");

    if (!name) {
        return;
    }

    let avatar =
    prompt(
        "Paste Avatar URL (Optional)"
    );

    if (
        !avatar ||
        avatar.trim() === ""
    ) {

        avatar =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(name) +
        "&background=22c55e&color=ffffff";
    }

    let member = {

        id: Date.now(),

        name: name,

        avatar: avatar
    };

    members.push(member);

    saveMembers();

    loadMembers();

    updateCounts();

    alert(
        "Member Added Successfully"
    );
}

// -------------------------------
// LOAD MEMBERS
// -------------------------------

function loadMembers() {

    let memberList =
    document.getElementById(
        "memberList"
    );

    if (!memberList) {
        return;
    }

    memberList.innerHTML = "";

    members =
    JSON.parse(
        localStorage.getItem(
            "members"
        )
    ) || [];

    members.forEach(function(member) {

        memberList.innerHTML += `

        <div class="member-card">

            <img
            src="${member.avatar}"
            alt="Avatar">

            <h4>${member.name}</h4>

            <div
            style="
            display:flex;
            gap:8px;
            justify-content:center;
            margin-top:10px;
            ">

                <button
                onclick="viewMember(${member.id})">
                👁️
                </button>

                <button
                onclick="editMember(${member.id})">
                ✏️
                </button>

                <button
                onclick="deleteMember(${member.id})">
                🗑️
                </button>

            </div>

        </div>

        `;
    });
}

// -------------------------------
// VIEW MEMBER
// -------------------------------

function viewMember(id) {

    let member =
    members.find(
        m => m.id === id
    );

    if (!member) {
        return;
    }

    alert(
        "Member Name: " +
        member.name
    );
}

// -------------------------------
// EDIT MEMBER
// -------------------------------

function editMember(id) {

    let member =
    members.find(
        m => m.id === id
    );

    if (!member) {
        return;
    }

    let newName =
    prompt(
        "Edit Member Name",
        member.name
    );

    if (!newName) {
        return;
    }

    member.name = newName;

    saveMembers();

    loadMembers();

    alert(
        "Member Updated Successfully"
    );
}

// -------------------------------
// DELETE MEMBER
// -------------------------------

function deleteMember(id) {

    let confirmDelete =
    confirm(
        "Delete this member?"
    );

    if (!confirmDelete) {
        return;
    }

    members =
    members.filter(
        member =>
        member.id !== id
    );

    saveMembers();

    loadMembers();

    updateCounts();

    alert(
        "Member Deleted Successfully"
    );
}

// -------------------------------
// UPDATE AVATAR
// -------------------------------

function uploadAvatar(id) {

    let url =
    prompt(
        "Paste New Avatar URL"
    );

    if (!url) {
        return;
    }

    let member =
    members.find(
        m => m.id === id
    );

    if (!member) {
        return;
    }

    member.avatar = url;

    saveMembers();

    loadMembers();

    alert(
        "Avatar Updated"
    );
}

// -------------------------------
// SEARCH MEMBERS
// -------------------------------

function searchMembers() {

    let value =
    prompt(
        "Search Member Name"
    );

    if (!value) {
        return;
    }

    let result =
    members.filter(function(member){

        return member.name
        .toLowerCase()
        .includes(
            value.toLowerCase()
        );

    });

    if (
        result.length === 0
    ) {

        alert(
            "No Member Found"
        );

        return;
    }

    let names =
    result.map(
        m => m.name
    );

    alert(
        "Found:\n\n" +
        names.join("\n")
    );
}

// -------------------------------
// TOTAL MEMBERS
// -------------------------------

function getTotalMembers() {

    return members.length;
}

// -------------------------------
// LOAD MEMBERS ON PAGE OPEN
// -------------------------------

window.addEventListener(
    "load",
    function() {

        loadMembers();

    }
);



// ===============================
// TASK BOARD MANAGEMENT
// ===============================

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

// -------------------------------
// SAVE TASKS
// -------------------------------

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// -------------------------------
// ADD TASK
// -------------------------------

function addTask() {

    let members =
    JSON.parse(
        localStorage.getItem("members")
    ) || [];

    if (members.length === 0) {

        alert(
            "Please Add Members First"
        );

        return;
    }

    let title =
    prompt(
        "Enter Task Title"
    );

    if (!title) {
        return;
    }

    let memberNames =
    members.map(
        m => m.name
    ).join(", ");

    let assigned =
    prompt(
        "Assign To:\n" +
        memberNames
    );

    if (!assigned) {
        return;
    }

    let member =
    members.find(
        m =>
        m.name.toLowerCase() ===
        assigned.toLowerCase()
    );

    if (!member) {

        alert(
            "Member Not Found"
        );

        return;
    }

    let task = {

        id: Date.now(),

        title: title,

        assignedName:
        member.name,

        status: "todo"
    };

    tasks.push(task);

    saveTasks();

    loadTasks();

    updateCounts();

    alert(
        "Task Added Successfully"
    );
}

// -------------------------------
// LOAD TASKS
// -------------------------------

function loadTasks() {

    let todo =
    document.getElementById("todo");

    let progress =
    document.getElementById("progress");

    let review =
    document.getElementById("review");

    let completed =
    document.getElementById("completed");

    if (!todo) {
        return;
    }

    todo.innerHTML = "";
    progress.innerHTML = "";
    review.innerHTML = "";
    completed.innerHTML = "";

    tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    tasks.forEach(function(task){

        let card =
        document.createElement("div");

        card.className =
        "task-card";

        card.innerHTML = `

            <h4>${task.title}</h4>

            <p>
            Assigned:
            ${task.assignedName}
            </p>

            <select
            onchange="changeTaskStatus(${task.id}, this.value)">

                <option value="todo"
                ${task.status==="todo" ? "selected" : ""}>
                To Do
                </option>

                <option value="progress"
                ${task.status==="progress" ? "selected" : ""}>
                In Progress
                </option>

                <option value="review"
                ${task.status==="review" ? "selected" : ""}>
                Review
                </option>

                <option value="completed"
                ${task.status==="completed" ? "selected" : ""}>
                Completed
                </option>

            </select>

            <br><br>

            <button
            onclick="deleteTask(${task.id})">
            Delete
            </button>

        `;

        if (task.status === "todo") {
            todo.appendChild(card);
        }

        if (task.status === "progress") {
            progress.appendChild(card);
        }

        if (task.status === "review") {
            review.appendChild(card);
        }

        if (task.status === "completed") {
            completed.appendChild(card);
        }

    });
}

// -------------------------------
// CHANGE TASK STATUS
// -------------------------------

function changeTaskStatus(
    id,
    newStatus
) {

    let task =
    tasks.find(
        t => t.id === id
    );

    if (!task) {
        return;
    }

    task.status =
    newStatus;

    saveTasks();

    loadTasks();

    updateCounts();
}

// -------------------------------
// DELETE TASK
// -------------------------------

function deleteTask(id) {

    let confirmDelete =
    confirm(
        "Delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks =
    tasks.filter(
        task =>
        task.id !== id
    );

    saveTasks();

    loadTasks();

    updateCounts();

    alert(
        "Task Deleted Successfully"
    );
}

// -------------------------------
// SEARCH TASKS
// -------------------------------

function searchTask() {

    let input =
    document.getElementById(
        "searchTask"
    );

    if (!input) {
        return;
    }

    let value =
    input.value.toLowerCase();

    let cards =
    document.querySelectorAll(
        ".task-card"
    );

    cards.forEach(function(card){

        if (
            card.innerText
            .toLowerCase()
            .includes(value)
        ) {

            card.style.display =
            "block";

        } else {

            card.style.display =
            "none";
        }

    });
}

// -------------------------------
// SEARCH EVENT
// -------------------------------

window.addEventListener(
    "load",
    function(){

        let search =
        document.getElementById(
            "searchTask"
        );

        if (search) {

            search.addEventListener(
                "keyup",
                searchTask
            );
        }

        loadTasks();

    }
);