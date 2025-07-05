const navbar = document.querySelector(".navbar");
const themeIcon = document.querySelector("#theme");
const navbarVideo = document.querySelector(".navbar-video");
const sourceVideo = document.querySelectorAll(".light");
const footerVideo = document.querySelector(".footer-video");
let isDark = localStorage.getItem("isDark") === "true";

if (isDark) applyDarkTheme();

themeIcon.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem("isDark", isDark);

    if (isDark) 
    {
        sourceVideo.forEach(e => {
            e.setAttribute("src", "../assets/videos/dark.mp4");
        });
    } 
    else 
    {
        sourceVideo.forEach(e => {
            e.setAttribute("src", "../assets/videos/light.mp4");
        });
    }

    navbarVideo.load();
    footerVideo.load();

    toggleTheme();
});

function toggleTheme() {
    body.classList.toggle("dark-body", isDark);
    noteList.classList.toggle("dark-note-list", isDark);
    addButton.classList.toggle("dark-add-button", isDark);
    searchBar.classList.toggle("dark-search-bar", isDark);
    userInput.classList.toggle("dark-user-input", isDark);
    sortBtn.classList.toggle("dark-sort-btn", isDark);
    sortType.classList.toggle("dark-sort-type", isDark);
    footer.classList.toggle("dark-footer", isDark);
    searchResult.classList.toggle("dark-search-result", isDark);
    reloadButton.classList.toggle("dark-reload-button", isDark);

    const noteContainer = document.querySelectorAll(".note-container");
    noteContainer.forEach(e => {
        e.classList.toggle("dark-note-container", isDark);
    });

    document.querySelector(".prompt")?.classList.toggle("dark-prompt", isDark);
    document.querySelector(".info")?.classList.toggle("dark-info", isDark);
    document.querySelector(".modal-content")?.classList.toggle("dark-modal-content", isDark);
    title.classList.toggle("dark-title", isDark);
    note.classList.toggle("dark-note-content", isDark);
}

function applyDarkTheme() {
    sourceVideo.forEach(e => {
        e.setAttribute("src", "../assets/videos/dark.mp4");
    });
    toggleTheme();
    navbarVideo.load();
    footerVideo.load();
}
