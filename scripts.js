import { BOOKS_PER_PAGE,books,authors,genres } from "./data.js"; // The script imports constants (BOOKS_PER_PAGE, books, authors, genres) from a separate data script.


//object literal to reference elementsdata
/*Object that contains references to various HTML elements organized by different sections like header, list, search, and settings.*/

const dataObject = {
    
    header: {search: document.querySelector("[data-header-search]"),
             settings: document.querySelector("[data-header-settings]"),
             help: document.querySelector("[data-header-help]"),
             add: document.querySelector("[data-header-add]"),
             order: document.querySelector("[data-header-order]"),
             grid: document.querySelector("[data-header-grid]"),
             list: document.querySelector("[data-header-list]"),
             title: document.querySelector("[data-header-title]"),
             subtitle: document.querySelector("[data-header-subtitle]"), },
    list: {items: document.querySelector("[data-list-items]"),
           button: document.querySelector("[data-list-button]"),
           message: document.querySelector("[data-list-message]"),
           active: document.querySelector("[data-list-active]"),
           close: document.querySelector("[data-list-close]"),
           blur: document.querySelector("[data-list-blur]"),
           image: document.querySelector("[data-list-image]"),
           title: document.querySelector("[data-list-title]"),
           subtitle: document.querySelector("[data-list-subtitle]"),
           description: document.querySelector("[data-list-description]"),},
    search: {overlay: document.querySelector("[data-search-overlay]"),
             form: document.querySelector("[data-search-form]"),
             cancel: document.querySelector("[data-search-cancel]"),
             title: document.querySelector("[data-search-title]"),
             genres: document.querySelector("[data-search-genres]"),
             authors: document.querySelector("[data-search-authors]"),},
    settings: {overlay: document.querySelector("[data-settings-overlay]"),
               form: document.querySelector("[data-settings-form]"),
               cancel: document.querySelector("[data-settings-cancel]"),
               theme: document.querySelector("[data-settings-theme]"), },
  };
//preview creates a button for books available
/**createBookElement that takes an object with book details (author, image, title, id) and creates a button element with the book's information */
  const createBookElement = ({ author, image, title, id }) => {
    const preview = document.createElement("button");
    preview.classList = "preview";
    preview.setAttribute("book-id", id);
    preview.innerHTML = /* html */ `
    <img class="preview__image" src="${image}"/>
  
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>`;
  
    return preview;
  };

  //display results to the user (0 to 36 BOOKS_PER_PAGE)

  let pageDisplay = [];
  /** 
   * @param {object} object - object that you want to extract the initial results from.
   * @returns {array} - Returns the  results 
   */
  /*extractDisplay function takes an array of objects and extracts the initial results to be displayed, limited by the BOOKS_PER_PAGE constant. */
  //display results to the user (0 to 36 BOOKS_PER_PAGE)
  const extractDisplay = (object) => {
    pageDisplay = object.slice(0, BOOKS_PER_PAGE);
    return pageDisplay;
  };
  
  extractDisplay(books);
let pageBooks = books.slice(0, BOOKS_PER_PAGE);
const listFragment = document.createDocumentFragment();

const bookList = (object, fragment) => { 
    for (let { author, image, title, id } of object) {
      const preview = createBookElement({
        author,
        image,
        title,
        id,
      });
  
      fragment.appendChild(preview);
      dataObject.list.items.appendChild(fragment);
    }
};

bookList(pageBooks, listFragment); // Display the books on the first page


  //genre
  const authorFragment = document.createDocumentFragment();
  const genreFragment = document.createDocumentFragment();
  const genresOptionsDisplay = document.createElement("option");
  genresOptionsDisplay.value = "any";
  genresOptionsDisplay.textContent = "All Genres";
  genreFragment.appendChild(genresOptionsDisplay);

  for (let [id, genre] of Object.entries(genres)) {
    let genreSelectedOption = document.createElement("option");
    genreSelectedOption.value = id;
    genreSelectedOption.textContent = genre;
    genreFragment.appendChild(genreSelectedOption);
  }
  dataObject.search.genres.appendChild(genreFragment);

  const authorsOptionDisplay = document.createElement("option");
  authorsOptionDisplay.value = "any";
  authorsOptionDisplay.textContent = "All Authors";
  authorFragment.appendChild(authorsOptionDisplay);
 
  for (let [id, author] of Object.entries(authors)) {
    let authorSelectedOption = document.createElement("option");
    authorSelectedOption.value = id;
    authorSelectedOption.textContent = author;
    authorFragment.appendChild(authorSelectedOption);
  }
  dataObject.search.authors.appendChild(authorFragment);


//theme

const day = {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  };
  
  const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  };
  dataObject.settings.theme.value === window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";
  dataObject.settings.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const Day = dataObject.settings.theme.value === "day";
    const Night = dataObject.settings.theme.value === "night";
  
    if (Day) {
      document.documentElement.style.setProperty("--color-dark", day.dark);
      document.documentElement.style.setProperty("--color-light", day.light);
    } else if (Night) {
      document.documentElement.style.setProperty("--color-dark", night.dark);
      document.documentElement.style.setProperty("--color-light", night.light);
    }
  
    dataObject.settings.overlay.close();
  });


  /** `page` represents the 'page' that we are on relating to the `BOOKS_PER_PAGE`.
 * This is used for pagination when it comes to the `showMoreHandler`(Show more button).
 * @example If we are on page 1, show the first 36 books.
 * If we are on page 2, show the next 36 books.
 */
  let page = 1;

const remainingBooks = (object) => {
const nonZero = object.length - [page * BOOKS_PER_PAGE] > 0;
  if (nonZero) {
    dataObject.list.button.disabled = false;
    const booksLeft = object.length - [page * BOOKS_PER_PAGE];// check remaining books
    return booksLeft;
  } else {
    dataObject.list.button.disabled = true;
    return 0;
  }
};

const showMoreButton = (object) => {
  dataObject.list.button.innerHTML =
    /* html */
    `<span>Show more</span>
      <span class="list__remaining"> (${remainingBooks(object)})</span>`;
};

showMoreButton(books);

//event listerners
dataObject.header.settings.addEventListener("click", (event) => {
    dataObject.settings.overlay.show();
  });
  
  dataObject.settings.cancel.addEventListener("click", (event) => {
    dataObject.settings.overlay.close();
  });


//showMoreButton
  let searchResults = [];
  let remainingBooksResults = [];
  const searchFragment = document.createDocumentFragment();
  
  /** 
   * @param {object} object - The object that you want to extract the remaining results from.
   * @returns {array} 
   */
  const remainingResults = (object) => {
    const start = page * BOOKS_PER_PAGE;
    const end = (page + 1) * BOOKS_PER_PAGE;
    remainingBooksResults = object.slice(start, end);
    page++;
    return remainingBooksResults;
  };
  

  const showMoreHandler = () => {
    if (searchResults.length > 0) {
      remainingResults(searchResults);
      bookList(remainingBooksResults, searchFragment);
      showMoreButton(searchResults);
    } else {
      remainingResults(books);
      bookList(remainingBooksResults,listFragment);
      showMoreButton(books);
    }
  };
  
  /** Show more button event listener */
  dataObject.list.button.addEventListener("click", showMoreHandler);

  
/** Filters the books based on the user's search form entries.
 * @param {array} books - 
 * @param {object} filters 
 */
 /** Checks to see if the user's entry in the title field matches any of the book's titles.
       * @returns {boolean} - Returns true or false based on whether the title matches or not.
       */
const filterDisplay = (books, filters) => {
    for (let book of books) {
      let titleMatches =filters.title.trim() === "" || book.title.toLowerCase().includes(filters.title.toLowerCase());
      let authorMatches =filters.author === "any" || book.author === filters.author;
      let genreMatches = filters.genre === "any";
      for (let singleGenre of book.genres) {
        if (singleGenre === filters.genre) {
          genreMatches = true;
        }
      }
  
      if (titleMatches && authorMatches && genreMatches) {
        searchResults.push(book);
      }
    }
  };
  
  const noResults = () => {
    searchResults.length < 1
      ? dataObject.list.message.classList.add("list__message_show")
      : dataObject.list.message.classList.remove("list__message_show");
  };
  
  /** `searchResultsHandler` handles the search form submission and results event.
   * @param {target} event - The form that the user has clicked on. (See related event listener below)
   */
  const searchResultsHandler = (event) => {
    event.preventDefault();
    page = 1;
    searchResults.length = 0;
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    filterDisplay(books, filters);
    noResults();
    dataObject.list.items.innerHTML = "";
    extractDisplay(searchResults);
    bookList(pageDisplay, searchFragment);
    showMoreButton(searchResults);
    dataObject.search.overlay.close();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  dataObject.search.form.addEventListener("submit", searchResultsHandler);
  
  /** Search button event listener */
  dataObject.header.search.addEventListener("click", (event) => {
    dataObject.search.overlay.show();
    dataObject.search.title.focus();
  });
  
  /** Search overlay close button event listener */
  dataObject.search.cancel.addEventListener("click", (event) => {
    dataObject.search.overlay.close();
  });
  
  let actBook = "";
  
  /** 
   * @param {target} event - The event target that the user has clicked on
   */
  const getBook = (event) => {
    let previewId = event.target.closest("[book-id]").getAttribute("book-id");
  
   
    for (let singleBook of books) {
      if (singleBook.id === previewId) {
        actBook = singleBook;
      }
    }
  };
  
  /** Populates the preview overlay 
   * @param {object} actBook - The object containing the data of the unique book that the user has clicked on
   */
  const PreviewOverlay = (actBook) => {
    dataObject.list.image.setAttribute("src", actBook.image);
    dataObject.list.blur.setAttribute("src", actBook.image);
    dataObject.list.title.innerHTML = actBook.title;
  
    dataObject.list.subtitle.innerHTML = `${authors[actBook.author]} (${new Date(
      actBook.published
    ).getFullYear()})`;
    dataObject.list.description.innerHTML = actBook.description;
  };
  
  dataObject.list.items.addEventListener("click", (event) => {
    getBook(event);
    PreviewOverlay(actBook);
    dataObject.list.active.show();
  });
  dataObject.list.close.addEventListener("click", (event) => {
    dataObject.list.active.close();
  });




  