const textarea = document.querySelector(".textbox textarea");

  function autoResize() {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  textarea.addEventListener("input", autoResize);

  autoResize();
