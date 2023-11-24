import { BOOKS_PER_PAGE,books,authors,genres } from "./data.js"; // The script imports constants (BOOKS_PER_PAGE, books, authors, genres) from a separate data script.


//object literal to reference elements

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
const extractDisplay = (object) => {
  pageDisplay = object.slice(0, BOOKS_PER_PAGE);
  return pageDisplay;
};

extractDisplay(books);

let pageBooks = books.slice(0, BOOKS_PER_PAGE);// books displayed on current page
const listFragment = document.createDocumentFragment();

const renderBookList = (object, fragment) => { //try change render
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
  renderBookList(pageBooks, listFragment);// first page to load



/*
if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for ({ author, image, title, id }; extracted; i++) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

data-list-items.appendChild(fragment)

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name];Object.entries(authors); id++) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}

data-search-authors.appendChild(authors)

data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

documentElement.style.setProperty('--color-dark', css[v].dark);
documentElement.style.setProperty('--color-light', css[v].light);
data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

data-list-button.innerHTML = /* html *//* [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

data-search-cancel.click() { data-search-overlay.open === false }
data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
data-settings-form.submit() { actions.settings.submit }
data-list-close.click() { data-list-active.open === false }

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
}

data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html *//* `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html *//* `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}*/
