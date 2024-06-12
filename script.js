class Book {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
}

const cartBooks = [];

const deleteBook = (event) => {
  const book = event.currentTarget.parentElement;
  book.style.display = "none";
  const cart = document.getElementById("cart");

  cart.innerText = `Carrello ${cartBooks.length}`;
};

const cartGen = () => {
  const books = localStorage.getItem("Cart Books");
  const booksRetrieved = JSON.parse(books);
  const cartList = document.getElementById("cart-list");
  const cart = document.getElementById("cart");
  cart.innerText = `Carrello ${booksRetrieved.length}`;
  for (let i = 0; i < booksRetrieved.length; i++) {
    const currentBook = booksRetrieved[i];
    cartBooks.push(currentBook);
    const li = document.createElement("li");
    li.classList.add("navbar-item");
    li.innerText = currentBook.title + " " + currentBook.price;
    const delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger");
    delBtn.innerText = "c";
    delBtn.onclick = deleteBook;
    li.appendChild(delBtn);
    cartList.appendChild(li);
  }
  console.log(booksRetrieved);
};

const buyElement = (event) => {
  const cartList = document.getElementById("cart-list");
  const title = event.currentTarget.parentElement.childNodes[0].innerText;
  const price = event.currentTarget.parentElement.childNodes[1].innerText;
  const book = new Book(title, price);
  const li = document.createElement("li");
  li.classList.add("navbar-item");
  li.innerText = book.title + " " + book.price;
  cartList.appendChild(li);

  cartBooks.push(book);
  localStorage.setItem("Cart Books", JSON.stringify(cartBooks));
};

const deleteElement = (event) => {
  const currentCard = event.currentTarget.parentElement.parentElement;
  currentCard.style.display = "none";
};

const cardGen = (book, container) => {
  /* Creazione card */
  const col = document.createElement("div");
  col.classList.add("col-md-4", "col-lg-3");

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = book.img;
  img.style.height = "500px";
  img.style.objectFit = "cover";
  img.classList.add("card-img-top");

  col.appendChild(card);
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = book.title;
  h5.style.display = "-webkit-box";
  h5.style.webkitBoxOrient = "vertical";
  h5.style.webkitLineClamp = "2";
  h5.style.overflow = "hidden";

  cardBody.appendChild(h5);

  const price = document.createElement("p");
  price.classList.add("card-text");
  price.innerText = book.price + "$";

  cardBody.appendChild(price);

  const delBtn = document.createElement("a");
  delBtn.classList.add("btn", "btn-primary", "me-1");
  delBtn.innerText = "Scarta";

  delBtn.onclick = deleteElement;

  const buyBtn = document.createElement("a");
  buyBtn.classList.add("btn", "btn-primary");
  buyBtn.innerText = "Compra";

  buyBtn.onclick = buyElement;

  cardBody.append(delBtn, buyBtn);
  card.appendChild(cardBody);
  container.appendChild(col);
};

const bookGen = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((books) => {
      if (books.ok) {
        return books.json();
      } else {
        throw new Error("Errore nel reperimento dei dati");
      }
    })
    .then((booksArray) => {
      const row = document.getElementById("card-space");
      for (let i = 0; i < booksArray.length; i++) {
        const currentBook = booksArray[i];
        cardGen(currentBook, row);
      }
    })
    .catch((err) => console.log(err));
};

window.addEventListener("DOMContentLoaded", bookGen);
window.addEventListener("DOMContentLoaded", cartGen);
