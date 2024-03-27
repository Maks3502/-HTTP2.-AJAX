const input = document.querySelector('#country-name');
const list = document.querySelector('#countries');
const debounced = _.debounce(() => {
  const name = input.value;
  if (!name) {
    return;
  }

  fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        PNotify.error({
          text: 'Запит занадто широкий. Будь ласка, введіть більш специфічну назву країни.'
        });
        return;
      }

      list.innerHTML = '';
      data.forEach(country => {
        const li = document.createElement('li');
        li.textContent = country.name;
        list.appendChild(li);
      });
    });
}, 500);

input.addEventListener('input', debounced);