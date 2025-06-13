//Function For Text Format
function formatText(command) {
  const editor = document.getElementById("editor-content");
  editor.focus();
  document.execCommand(command, false, null);
}
//Function For Text Heading
function insertHeading(heading) {
  const editor = document.getElementById("editor-content");
  editor.focus();
  document.execCommand("formatBlock", false, heading);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("justifyLeft").addEventListener("click", () => {
    const editor = document.getElementById("editor-content");
    editor.focus();
    document.execCommand("justifyLeft", false, null);
  });

  document.getElementById("justifyCenter").addEventListener("click", () => {
    const editor = document.getElementById("editor-content");
    editor.focus();
    document.execCommand("justifyCenter", false, null);
  });

  document.getElementById("justifyRight").addEventListener("click", () => {
    const editor = document.getElementById("editor-content");
    editor.focus();
    document.execCommand("justifyRight", false, null);
  });
});

// Function to publish the blog card
function publishBlog() {
  const title = document.getElementById("blogTitle").innerText.trim();
  const content = document.getElementById("editor-content").innerHTML.trim();

  if (!title || !content) {
    alert("Both title and content are required to publish the blog.");
    return;
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  const blogCard = {
    title: title,
    content: content,
    date: formattedDate,
  };

  let blogCards = JSON.parse(localStorage.getItem("blogCards")) || [];
  blogCards.push(blogCard);
  localStorage.setItem("blogCards", JSON.stringify(blogCards));

  appendBlogCard(blogCard);
  document.getElementById("blogTitle").innerText = "";
  document.getElementById("editor-content").innerText = "";
  localStorage.removeItem("blogDraft");
  alert("Blog successfully published!");

  const dashblog = document.querySelector(".blogno");
  let currentValue = parseInt(dashblog.textContent, 10) || 0;
  currentValue++;
  dashblog.textContent = currentValue;
}

// Function to add card to the container
function appendBlogCard(blogCard) {
  const blogContainer = document.getElementById("blog-container");
  const outerContainer = document.getElementById("outer-blog-container");

  const blogCardElement = document.createElement("div");
  blogCardElement.className = "blog-card";
  blogCardElement.innerHTML = `
    <h3>${blogCard.title}</h3>
    <p>${blogCard.content}</p>
    <p class="date">Published on: ${blogCard.date}</p>
    <i class="fa-solid fa-trash delete"></i>
  `;
  blogContainer.appendChild(blogCardElement);

  blogCardElement.querySelector(".delete").addEventListener("click", () => {
    blogCardElement.remove();
    updateContainerVisibility();

    const title = blogCard.title;
    let blogCards = JSON.parse(localStorage.getItem("blogCards")) || [];
    blogCards = blogCards.filter((card) => card.title !== title);
    localStorage.setItem("blogCards", JSON.stringify(blogCards));

    const dashblog = document.querySelector(".blogno");
    let currentValue = parseInt(dashblog.textContent, 10) || 0;
    if (currentValue > 0) {
      currentValue--;
    }
    dashblog.textContent = currentValue;
  });

  outerContainer.style.display = "block";
}

// Function to update the visibility of the outer container
function updateContainerVisibility() {
  const blogContainer = document.getElementById("blog-container");
  const outerContainer = document.getElementById("outer-blog-container");

  if (blogContainer.children.length === 0) {
    outerContainer.style.display = "none";
  } else {
    outerContainer.style.display = "block";
  }
}

// Function to load all blog cards on page load
function loadBlogCard() {
  const savedBlogCards = JSON.parse(localStorage.getItem("blogCards"));

  if (savedBlogCards && savedBlogCards.length > 0) {
    savedBlogCards.forEach((blogCard) => appendBlogCard(blogCard));
  }

  updateContainerVisibility();
}

//Function to Save Draft
function saveDraft() {
  const title = document.getElementById("blogTitle").innerText.trim();
  const content = document.getElementById("editor-content").innerText.trim();

  if (!title || !content) {
    alert("Both title and content are required to save the draft.");
    return;
  }
  const blogDraft = {
    title: title,
    content: content,
  };
  localStorage.setItem("blogDraft", JSON.stringify(blogDraft));
  alert("Draft saved successfully!");
  const dashdraft = document.querySelector(".draftno");
  let currentValue = parseInt(dashdraft.textContent, 10) || 0;
  currentValue++;
  dashdraft.textContent = currentValue;
}

//Function to Save Draft
function removeDraft() {
  const title = document.getElementById("blogTitle").innerText.trim();
  const content = document.getElementById("editor-content").innerText.trim();

  if (!title && !content) {
    alert("No draft to remove.");
    return;
  }

  const removedDraft = {
    title: title,
    content: content,
  };
  localStorage.setItem("removedDraft", JSON.stringify(removedDraft));

  document.getElementById("blogTitle").innerText = "";
  document.getElementById("editor-content").innerText = "";

  localStorage.removeItem("blogDraft");
  alert("Draft removed successfully!");

  const dashdraft = document.querySelector(".draftno");
  let currentValue = parseInt(dashdraft.textContent, 10) || 0;
  if (currentValue > 0) {
    currentValue--;
  }
  dashdraft.textContent = currentValue;
}
//Function To Load Draft
function loadDraft() {
  const savedDraft = localStorage.getItem("blogDraft");

  if (savedDraft) {
    const blogDraft = JSON.parse(savedDraft);
    document.getElementById("blogTitle").innerText = blogDraft.title || "";
    document.getElementById("editor-content").innerText =
      blogDraft.content || "";
  }
}

window.onload = () => {
  loadBlogCard();
  loadDraft();
};

const notesContainer = document.querySelector(".notes-container");
const addButton = document.querySelector(".addbtn");

//Function to Update The Storage
function updateStorage() {
  const notes = Array.from(notesContainer.children)
    .map((note) => {
      const textarea = note.querySelector("textarea");
      return textarea ? textarea.value : "";
    })
    .join("||");
  localStorage.setItem("notes", notes);
}

//Loading Notes
function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    const notes = savedNotes.split("||");
    notes.forEach((noteContent) => createNote(noteContent));
  }
}

//Creating Note Content
function createNote(content = "") {
  const inputBox = document.createElement("div");
  inputBox.className = "input-box";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Enter your note...";
  textarea.value = content;

  const deleteButton = document.createElement("button");
  deleteButton.className = "fa-solid fa-trash delete";

  const saveButton = document.createElement("button");
  saveButton.className = "save";
  saveButton.innerText = "Save";

  deleteButton.addEventListener("click", () => {
    inputBox.remove();
    updateStorage();
    const dashnotes = document.querySelector(".noteno");
    let currentValue = parseInt(dashnotes.textContent, 10) || 0;
    if (currentValue > 0) {
      currentValue--;
    }
    dashnotes.textContent = currentValue;
  });

  saveButton.addEventListener("click", () => {
    updateStorage();
    alert("Note saved!");
    const dashnotes = document.querySelector(".noteno");
    let currentValue = parseInt(dashnotes.textContent, 10) || 0;
    currentValue++;
    dashnotes.textContent = currentValue;
  });

  textarea.addEventListener("input", () => {
    updateStorage();
  });

  inputBox.appendChild(textarea);
  inputBox.appendChild(deleteButton);
  inputBox.appendChild(saveButton);
  notesContainer.appendChild(inputBox);
  updateStorage();
}

addButton.addEventListener("click", () => {
  createNote();
});

window.addEventListener("load", loadNotes);

//Hamburger Function
function toggleMenu() {
  const sidemenu = document.getElementById("sidemenu");
  const faBars = document.querySelector(".fa-bars");

  sidemenu.classList.toggle("show");

  if (sidemenu.classList.contains("show")) {
    setTimeout(() => {
      sidemenu.style.display = "none";
    }, 5000);
  } else {
    sidemenu.style.display = "block";
  }
}
