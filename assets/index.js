const getBooks = function () {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((risposta) => {
      console.log('RISPOSTA', risposta)
      if (risposta.ok) {
        return risposta.json()
      } else {
        throw new Error('Errore nel recupero dei dati dei libri')
      }
    })
    .then((bookobj) => {
      console.log(bookobj)
      const row = document.getElementById('card-section')
      row.innerHTML = ''

      bookobj.forEach((book) => {
        row.innerHTML += `
          <div class="col col-sm-6 col-md-4 col-lg-3 h-100 my-2 book-card">
            <div class="card shadow-lg border-0" style="min-height: 700px;">
              <img src="${book.img}" class="card-img-top" style="min-height: 400px; max-height: 400px;" alt="book-img" />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><span class="fw-bold">Prezzo:</span> ${book.price} €</p>
                <p class="card-text"><span class="fw-bold">ASIN:</span> ${book.asin}</p>
                <p class="card-text"><span class="fw-bold">Categoria:</span> ${book.category}</p>
                <div class="mt-auto">
                  <a href="#" class="btn btn-danger ms-auto delete-btn">Elimina</a>
                </div> 
              </div>
            </div>
          </div>
        `
      })
      row.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
          event.preventDefault()
          const cardToHide = event.target.closest('.book-card')

          if (cardToHide) {
            cardToHide.classList.add('d-none')
          }
        }
      })
    })
    .catch((error) => {
      console.error('Si è verificato un errore:', error)
    })
}

getBooks()
