save.addEventListener("click", () => {
  const noteTitle = title.value;
  const noteContent = note.value;
  const noteDate = date();
  const noteTimestamps = timestamps();

  if (!noteTitle || !noteContent) {
    infoPrompt.style.display = "flex";
    return closeInfo.addEventListener("click", () => {
      infoPrompt.style.display = "none";
    });
  }

  const data = {
  'title' : noteTitle,
  'content': noteContent,
  'date': noteDate,
  'timestamps' : noteTimestamps
  }

  localStorage.setItem(noteTitle, JSON.stringify(data));
  addNote(noteTitle);

  modal.style.display = "none";
  addButton.style.display = "flex";
  copyright.style.display = "flex";
});


deleteModal.addEventListener("click", () => {
  const noteTitle = title.value;
  localStorage.removeItem(noteTitle);

  addButton.style.display = "flex";
  copyright.style.display = "flex";
  modal.style.display = "none";
});


userInput.addEventListener("keydown", (e) => {
  searchResult.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++)
  {
    const noteTitle = localStorage.key(i);
    const jsonString = localStorage.getItem(noteTitle);
    const data = JSON.parse(jsonString);
    const noteContent = data.content;

    let pattern = new RegExp(userInput.value, "di");
    if (noteTitle != "isDark" && (noteTitle.match(pattern) || noteContent.match(pattern)))
    {
      searchResult.appendChild(addNote(noteTitle));
      noteList.remove();
      searchResult.addEventListener("click", (e) => {
        openNote(e);
        deleteNote(e);
        downloadNote(e);
      });
    }
  }
  if (searchResult.innerHTML == "")
  {
    searchResult.innerHTML = `<div class="mascot-dialog">I don't see any note with that kind of pattern</div><img src="../assets/images/mascot-detective.png" class="not-found-image">`;
  }
});

reloadButton.addEventListener("click", () => {
  location.reload();
});

noteList.addEventListener("click", (e) => {
  deleteNote(e);
  downloadNote(e);
  openNote(e);
});

window.addEventListener("DOMContentLoaded", () => {
  reload();
});


addButton.addEventListener("click", () => {
  modal.style.display = "flex";
  addButton.style.display = "none";
  copyright.style.display = "none";
  title.value = "";
  note.value = "";
});


sortBtn.addEventListener("click", () => {
  sortBy(sortType.value);

  const sortedNote = document.querySelector(".sorted-note");
});

closeDeletePrompt.addEventListener("click", () => {
  deletePrompt.style.display = "none";
  toDelete = null;
});

deleteConfirmed.addEventListener("click", () => {
  if (toDelete) 
  {
    const noteTitle = toDelete.querySelector(".container-title").textContent;
    localStorage.removeItem(noteTitle);
    toDelete.remove();
    toDelete = null;
    deletePrompt.style.display = "none";
  }
});
