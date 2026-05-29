const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const imageInput = document.getElementById("image-input");
const chatBox = document.getElementById("chat-box");

let currentUser = 1;

function selectUser(id){
    currentUser = id;
    loadMessages();
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const message = input.value.trim();

    const formData = new FormData();

    formData.append("message", message);
    formData.append("receiver_id", currentUser);

    if(imageInput.files[0]){
        formData.append("image", imageInput.files[0]);
    }

    await fetch("api/send.php", {
        method: "POST",
        body: formData
    });

    input.value = "";
    imageInput.value = "";

    loadMessages();
});

async function loadMessages(){

    const response = await fetch(
        "api/fetch.php?user_id=" + currentUser
    );

    const data = await response.text();

    chatBox.innerHTML = data;

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function loadUsers(){

    const response = await fetch("api/users.php");

    const data = await response.text();

    document.getElementById("users-list").innerHTML = data;
}

async function updateOnline(){

    await fetch("api/online.php");
}

setInterval(loadMessages,1000);
setInterval(loadUsers,3000);
setInterval(updateOnline,5000);

loadMessages();
loadUsers();
updateOnline();