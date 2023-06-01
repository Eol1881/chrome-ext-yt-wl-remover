// This code will be executed when the extension's button is clicked

console.log('>>>>>>>>>>>>>>>>>> execute.js launched');

function inject() {
  const container = document.querySelector('#sort-filter-menu ~ #contents');
  if (!container) {
    // Container element not found, wait for it to be created
    setTimeout(inject, 500);
    return;
  }

  const elements = Array.from(container.children);

  elements.forEach((element) => {
    const btn = document.createElement('div');
    btn.classList.add('myBtn');
    btn.textContent = '🞭';
    element.appendChild(btn);
  })

  container.addEventListener('click', (event) => {
    if (event.target.matches('.myBtn')) {
      const block = event.target;
      const parent = block.parentNode;
      const originalBtn = parent.querySelector('#button');

      originalBtn.dispatchEvent(new MouseEvent("click"));


      const observer = new MutationObserver((mutations, observer) => {
        const popup = document.querySelector('tp-yt-iron-dropdown.style-scope.ytd-popup-container');
        if (popup) {
          const originalRemoveBtn = Array.from(popup.querySelector('tp-yt-paper-listbox').children)[2];
          originalRemoveBtn.dispatchEvent(new MouseEvent("click"));
          observer.disconnect();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    }
  });

}

inject();