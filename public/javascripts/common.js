const formDelete = document.querySelectorAll('#form-delete')

formDelete.forEach((form) => {
  form.addEventListener('submit', function onFormSubmitted(event) {
    event.preventDefault()
    if (confirm('確定刪除嗎？')) event.target.submit()
  })
})
