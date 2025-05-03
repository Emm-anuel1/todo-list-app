// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfC4f_KzhyCf5WOa0JZJ8L45p_MBgvNuI",
  authDomain: "form-app-955ba.firebaseapp.com",
  databaseURL: "https://form-app-955ba-default-rtdb.firebaseio.com",
  projectId: "form-app-955ba",
  storageBucket: "form-app-955ba.appspot.com",
  messagingSenderId: "713386037073",
  appId: "1:713386037073:web:cb8fcba703df142003cd70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add task to Firebase
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value;
  
  if (taskName !== "") {
    const newTaskRef = ref(database, 'tasks/' + Date.now());
    set(newTaskRef, {
      name: taskName
    })
    .then(() => {
      taskInput.value = "";  // Reset input
      loadTasks();  // Refresh task list
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
  }
}

// Load tasks from Firebase
function loadTasks() {
  get(ref(database, 'tasks')).then((snapshot) => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";  // Clear existing list

    snapshot.forEach((childSnapshot) => {
      const task = childSnapshot.val();
      const taskId = childSnapshot.key;
      const listItem = document.createElement("li");
      listItem.textContent = task.name;
      
      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        deleteTask(taskId);
      };
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });
  });
}

// Delete task from Firebase
function deleteTask(taskId) {
  remove(ref(database, 'tasks/' + taskId))
  .then(() => {
    loadTasks();  // Refresh task list
  })
  .catch((error) => {
    alert("Error: " + error.message);
  });
}

// Load tasks on page load
window.onload = function() {
  loadTasks();
};
