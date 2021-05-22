const books = document.getElementById('books');
let myLibrary = [];

class Book {
    constructor(bookID,name,author,pages,read) {
        this.bookID = bookID;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = Boolean;
    }
}

function addBookToLibrary() {
    let bookName = document.getElementById('bookName').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookPages = document.getElementById('bookPages').value;
    if ((bookName !== "") && (bookAuthor !== "") && (bookPages !== "")) {
        let bookID = (new Date().getMilliseconds()).toString();
        newBook = new Book(bookID,bookName,bookAuthor, bookPages );
        myLibrary.push(newBook);
        console.log(myLibrary);
        localStorage.setItem("myLibraryStorage", JSON.stringify(myLibrary));
        setup_view(newBook);
        clearBookInfo();
    }
}


function configureViews() {
    let submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', addBookToLibrary);
    let clearButton = document.querySelector('#clearButton');
    clearButton.addEventListener('click', clearBookInfo);
}

function clearBookInfo() {
    document.getElementById('bookName').value = "";
    document.getElementById('bookAuthor').value = "";
    document.getElementById('bookPages').value = "";
}

function book_summary(book) {
    return `Book: ${book.name} <br/> Author: ${book.author} <br/> Number of pages: ${book.pages}` ;
}

function setup_view(book) {
    let div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = book_summary(book);
    div.id = book.bookID;
    let div_buttons = document.createElement('div');
    div_buttons.className = 'div_buttons';
    
    div_buttons.appendChild(create_delete_button(book, myLibrary));
    div_buttons.appendChild(create_read_component(book));
    div.appendChild(div_buttons);
    books.appendChild(div);
}

function create_read_component(book) {
    let div = document.createElement('div');

    div.className = "readButtons"

    div.appendChild(create_read_label())
    div.appendChild(create_read_toggle(book));
    return div;
}

function create_read_label() {
    let p = document.createElement('p');
    p.innerHTML = 'Read';

    return p;
}

function create_read_toggle(book) {
    let label = document.createElement('label');
    label.className = 'readSwitch';

    let span = document.createElement('span');
    span.className = 'slider';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', () => {
        check_read(book, checkbox.checked);
    })

    label.appendChild(checkbox);
    label.appendChild(span);

    return label;
}

function create_delete_button(book, book_library) {
    let deleteButton = document.createElement('button');
    deleteButton.className = "deleteButtons"
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        book_library = book_library.filter(item => item.bookID !== book.bookID);
        localStorage.setItem('myLibraryStorage', JSON.stringify(book_library)); 
        document.getElementById(book.bookID).remove();
    })
    return deleteButton;
}

function check_read(book, isRead) {
    console.log("Changing state: " + isRead)
    book.isRead = isRead;
}

function load_from_storage() {
    myLibraryFromStorage = JSON.parse(localStorage.getItem("myLibraryStorage"));
    if (myLibraryFromStorage !== null) {
        myLibrary = myLibraryFromStorage;
    } else{
        myLibrary = [];
    }

    myLibrary.forEach(setup_view);
}

load_from_storage()
configureViews()
clearBookInfo()

