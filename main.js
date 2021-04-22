const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

const allElements = [username, pass, pass2, email]

const showError = (input, msg) => {
  //argument INPUT przechowuje nasze Inputy
  //argument MSG przechowuje placeholder

  const formBox = input.parentElement
  const errorMsg = formBox.querySelector('.error-text')

  formBox.classList.add('error')
  errorMsg.textContent = msg
}

const clearError = input => {
  const formBox = input.parentElement
  formBox.classList.remove('error')
}

// sprawdzamy czy inputy są uzupełnione
const checkForm = input => {
  input.forEach(el => {
    if (el.value === '') {
      //   console.log(el.placeholder)
      showError(el, el.placeholder)
    } else {
      clearError(el)
    }
  })
}

// sprawdzanie dlugości wpisanych danych w ipnucie
const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} musi składać się z min. ${min} znaków`
    )
  }
}
// sprawdzanie czy hasła są takie same
const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, 'Hasłą do siebie nie pasują')
  }
}
// sprawdzamy poprawność email
const checkEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(email.value)) {
    clearError(email)
  } else {
    showError(email, 'Email jest niepoprawny')
  }
}

//argument INPUT z funkcji 'checkform' przeochowuje tablice z naszymi inputami
//argument El odnosi się do każdej zmiennej, którą umieścimy w tablicy

sendBtn.addEventListener('click', e => {
  //blokujemy przeładowywanie się strony
  e.preventDefault()
  //zamiast wypisywać każdy input odwołujemy się do tablicy
  checkForm(allElements)
  checkLength(username, 6)
  checkLength(pass, 8)
  checkPassword(pass, pass2)
  checkEmail(email)
  checkErrors()
})

// sprawdzamy ilość blędów przed wysłaniem formularza
const checkErrors = () => {
  const allInputs = document.querySelectorAll('.form-box')
  let errorCount = 0

  allInputs.forEach(el => {
    if (el.classList.contains('error')) {
      errorCount++
    }
  })

  if (errorCount === 0) {
    popup.classList.add('show-popup')
  }

  console.log(errorCount)
}

// ustawiamy pusty string na każdym el tablicy czyli inpucie
clearBtn.addEventListener('click', e => {
  e.preventDefault()
  allElements.forEach(el => {
    el.value = ''
    clearError(el)
  })
})
