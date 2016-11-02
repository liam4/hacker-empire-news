const CORS = 'https://crossorigin.me/'

const words = ['russia', 'nsa', 'stolen', 'secret', 'code', 'spy']

let query = 'hacker '
for (let i = 0; i < 10; i++) {
  query += words[Math.floor(Math.random() * words.length)] + ' '
}

fetchNewsDocument(query)
  .then(rss => {
    for (let item of rss.querySelectorAll('item')) {
      handleNewsItem(item)
    }

    console.log('For the hackers out there: We\'re tracking you with this')
    console.log('SPOOOKY code: ' + query)
  })

// ----

function fetchNewsDocument(query) {
  return fetch(CORS + `https://news.google.com/news?q=${query}&output=rss`)
    .then(res => res.text())
    .then(text => new DOMParser().parseFromString(text, 'text/xml'))
}

function handleNewsItem(item) {
  const title = item.querySelector('title').innerHTML
  const link = item.querySelector('link').innerHTML.match(/;url=(.*)/)[1]
  
  const p = document.createElement('p')
  const a = document.createElement('a')
  a.href = link
  a.appendChild(document.createTextNode(title))
  p.appendChild(a)

  document.body.appendChild(p)
  document.body.appendChild(document.createElement('hr'))

  if (Math.round(Math.random())) {
    document.title = title
  }
}
