const body = document.querySelector("body");
const userInput = document.querySelector(".user-input");
const searchBar = document.querySelector(".search-bar");
const addButton = document.querySelector(".add-button");
const footer = document.querySelector("footer");
const content = document.querySelector(".content");
const noteList = document.querySelector(".note-list");
const note = document.querySelector(".note-content");
const title = document.querySelector(".note-title");
const searchIcon = document.querySelector(".search");
const searchResult = document.querySelector(".search-result");
const submitBtn = document.querySelector(".submit-btn");
const sortType = document.querySelector(".sort");
const copyright = document.querySelector("footer");
const sortBtn = document.querySelector(".sort-btn");
const deleteModal = document.querySelector(".delete-modal");
const reloadButton = document.querySelector(".reload-button");

const deletePrompt = document.querySelector(".delete-prompt");
const closeDeletePrompt = document.querySelector(".close-delete-prompt");
const deleteConfirmed = document.querySelector(".delete-confirmed");

const infoPrompt = document.querySelector(".info-prompt");
const closeInfo = document.querySelector(".close-info");


const modal = document.querySelector(".modal");
const save = document.querySelector(".close");


function date()
{
  let now = new Date();
  let displayTime = document.querySelector(".time");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let today = now.getDate();
  const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let month = monthList[now.getMonth()];
  let year = now.getFullYear();
  return displayTime.innerHTML = `${hour}:${minutes} ${today} ${month} ${year}`;
}

function timestamps(){
  let now = new Date();
  let timestamps = now.getTime();
  return timestamps;
}

setInterval(date, 1000);
setInterval(timestamps, 1000);

function sortBy(pattern){
  let List = [];
  const sortedNote = create("sorted-note", "div");

  if (pattern == "a-z")
  {
    for (let i = 0; i < localStorage.length; i++){
      const noteTitle = localStorage.key(i);
      List.push(noteTitle);
    }
    List.sort();
    noteList.remove();
    
    content.appendChild(sortedNote);
    for (let i = 0; i < localStorage.length; i++)
    {
      const noteTitle = List[i];
      if (noteTitle != "isDark")
      {
        sortedNote.appendChild(addNote(noteTitle));
      }
    }
  }

  if (pattern == "ascending-date")
  {
    for (let i = 0; i < localStorage.length; i++){
      const noteTitle = localStorage.key(i);
      const jsonString = localStorage.getItem(noteTitle);
      const data = JSON.parse(jsonString);
      List.push(data);
    }
    List.sort((a, b) => a.timestamps - b.timestamps);
    noteList.remove();

    content.appendChild(sortedNote);
    for (let i = 0; i < localStorage.length; i++)
    {
      const noteTitle = List[i].title;
      if (noteTitle != "isDark")
      {
        sortedNote.appendChild(addNote(noteTitle));
      }
    }
  }

  if (pattern == "descending-date")
  {
    for (let i = 0; i < localStorage.length; i++){
      const noteTitle = localStorage.key(i);
      const jsonString = localStorage.getItem(noteTitle);
      const data = JSON.parse(jsonString);
      List.push(data);
    }
    List.sort((a, b) => b.timestamps - a.timestamps);
    noteList.remove();

    content.appendChild(sortedNote);
    for (let i = 0; i < localStorage.length; i++)
    {
      const noteTitle = List[i].title;
      if(noteTitle != "isDark")
      {
        sortedNote.appendChild(addNote(noteTitle));
      }
    }
  }
  sortedNote.addEventListener("click", (e) => {
    openNote(e);
    deleteNote(e);
    downloadNote(e); 
  });
}


function create(Class, tag){
  const container = document.createElement(tag);
  container.classList.add(Class);
  return container;
}

function addNote(noteTitle) {
  const noteContainer = create("note-container", "div");

  const containerParameters = create("parameters", "div");
  
  const titleContainer = create("container-title", "h2");
  titleContainer.textContent = noteTitle;

  if (noteTitle != "isDark")
  {
    const jsonString = localStorage.getItem(noteTitle);
    const data = JSON.parse(jsonString);
    const noteDate = data.date;
    const containerDate = create("container-date", "div");
    containerDate.textContent = noteDate;

    const containerSetting = create("note-settings", "div");
    containerSetting.innerHTML = `
      <div class="download">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9FEF00">
          <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
        </svg>
      </div>
      <div class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aa0000">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
      </div>
    `;
    containerParameters.appendChild(titleContainer);
    containerParameters.appendChild(containerDate);
    noteContainer.appendChild(containerParameters);
    noteContainer.appendChild(containerSetting);
    return noteList.appendChild(noteContainer);
  }
}

function openNote(e)
{
    if (e.target.closest(".note-container") && !e.target.closest(".note-settings")) {
    const noteContainer = e.target.closest(".note-container");
    const noteTitle = noteContainer.querySelector(".container-title").textContent;
    const noteDate = noteContainer.querySelector(".container-date").textContent;
    noteContainer.remove();

    const jsonString = localStorage.getItem(noteTitle);
    const data = JSON.parse(jsonString);

    note.value = data.content;
    title.value = noteTitle;
    data.date = date();

    modal.style.display = "flex";
    addButton.style.display = "none";
    copyright.style.display = "none";
  }
}


let toDelete = null; 

function deleteNote(e) {
  if (e.target.closest(".delete")) {
    toDelete = e.target.closest(".note-container");

    if (toDelete) 
    {
      deletePrompt.style.display = "flex";
    }
  }
}
    

function downloadNote(e)
{
  if (e.target.closest(".download")) {
    const noteContainer = e.target.closest(".note-container");
    const noteTitle = noteContainer.querySelector(".container-title").textContent;
    const jsonString = localStorage.getItem(noteTitle);
    const data = JSON.parse(jsonString);

    const blob = new Blob([data.content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${noteTitle}.txt`;
    link.click();
  }
}


function reload(){
  for (let i = 0; i < localStorage.length; i++) {
    const noteTitle = localStorage.key(i);
    const noteContent = localStorage.getItem(noteTitle);
    addNote(noteTitle, noteContent);
  }
}


