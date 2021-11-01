const btnDelete = document.querySelectorAll('.btn-secondary')

btnDelete.forEach((btn) => {
  btn.addEventListener('click', function onDeleteButtonClicked(event) {
    event.preventDefault()
    if (confirm('確定刪除嗎？')) event.target.form.submit()
  })
})
