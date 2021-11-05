const formDelete = document.querySelectorAll('#form-delete')
formDelete.forEach((form) => {
  console.log('form')
  form.addEventListener('submit', function onFormSubmitted(event) {
    event.preventDefault()
    if (confirm('確定刪除嗎？')) event.target.submit()
  })
})

const btnDelete = document.querySelectorAll('#btn-delete')
btnDelete.forEach((btn) => {
  btn.addEventListener('click', function onButtonSubmitted(event) {
    if (confirm('確定刪除嗎？')) {
      const formDelete = document.createElement('form')
      const id = event.target.dataset.id
      formDelete.method = 'post'
      formDelete.action = `/restaurants/${id}?_method=DELETE`
      document.body.appendChild(formDelete)
      formDelete.submit()
    }
  })
})
