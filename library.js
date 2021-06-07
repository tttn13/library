const books = document.getElementById('books');
let myLibrary = [];

class Book {
    constructor(bookID,name,author,pages,isRead) {
        this.bookID = bookID;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function book_summary(book) {
    return `Book: ${book.name} <br/> Author: ${book.author} <br/> Number of pages: ${book.pages}` ;
}

function addBookToLibrary() {
    const bookName = document.getElementById('bookName');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookPages = document.getElementById('bookPages');
   
    if ((bookName.value !== "") && (bookAuthor.value !== "") && (bookPages.value !== "")) {
        const bookID = (new Date().getMilliseconds()).toString();
        newBook = new Book(bookID,bookName.value,bookAuthor.value, bookPages.value );
        myLibrary.push(newBook);
        console.log(myLibrary);
        persistToStorage();
    } else {
        alert("Fill all fields");
    }
}

function configureViews() {
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', addBookToLibrary);
    const clearButton = document.querySelector('#clearButton');
    clearButton.addEventListener('click', clearBookInfo);
}

function clearBookInfo() {
    document.getElementById('bookName').value = "";
    document.getElementById('bookAuthor').value = "";
    document.getElementById('bookPages').value = "";
}

function setup_view(book) {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = book_summary(book);
    div.id = book.bookID;
    const div_buttons = document.createElement('div');
    div_buttons.className = 'div_buttons';
    
    div_buttons.appendChild(create_delete_button(book));
    div_buttons.appendChild(create_read_component(book));
    div.appendChild(div_buttons);
    books.appendChild(div);
}

function create_read_component(book) {
    const div = document.createElement('div');
    div.className = "readButtons"
    div.appendChild(create_read_label())
    div.appendChild(create_read_toggle(book));
    return div;
}

function create_read_label() {
    const p = document.createElement('p');
    p.innerHTML = 'Read';
    return p;
}

function create_read_toggle(book) {
    const bookIndex = myLibrary.indexOf(book);
    console.log(bookIndex)
    console.log(myLibrary)
    
    const label = document.createElement('label');
    label.className = 'readSwitch';

    const span = document.createElement('span');
    span.className = 'slider';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = myLibrary[bookIndex].isRead;

    checkbox.addEventListener('change', () => {
        check_read(book, checkbox.checked);
    })

    label.appendChild(checkbox);
    label.appendChild(span);

    return label;
}

function create_delete_button(book) {
    const deleteButton = document.createElement('button');
    deleteButton.className = "deleteButtons"
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        document.getElementById(book.bookID).remove();
        const bookIndex = myLibrary.indexOf(book);
        myLibrary.splice(bookIndex,1);
        persistToStorage()
        console.log(myLibrary)
    })
    return deleteButton;
}

function check_read(book, isRead) {
    book.isRead = isRead;
    persistToStorage()
}

function load_from_storage() {
    let myLibraryFromStorage = JSON.parse(localStorage.getItem("myLibraryStorage"));
    if (myLibraryFromStorage !== null) {
        myLibrary = myLibraryFromStorage;
    } else{
        myLibrary = [];
    }
    myLibrary.forEach((book) => {
        setup_view(book);
        clearBookInfo();
    })
}

function persistToStorage() {
    localStorage.setItem("myLibraryStorage", JSON.stringify(myLibrary));
}

load_from_storage()
configureViews()
