import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const BOOK_KEY = 'booksDB'
_initBooks()

export const booksService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getDefaultFilter,
  addReview,
  getEmptyReview,
  deleteReview,
  getPrevBookId,
  addGoogleBook,
}

function query(filterBy) {
  return asyncStorageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (filterBy.maxPrice) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.maxPrice)
    }
    if (filterBy.maxPageCount) {
      books = books.filter((book) => book.pageCount <= filterBy.maxPageCount)
    }
    return books
  })
}

function get(bookId) {
  return asyncStorageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return asyncStorageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return asyncStorageService.put(BOOK_KEY, book)
  } else {
    return asyncStorageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(
  title = '',
  price = utilService.getRandomIntInclusive(20, 200),
  publishedDate = utilService.getRandomIntInclusive(1950, 2024),
  pageCount = utilService.getRandomIntInclusive(20, 1000),
  language = 'en',
  isOnSale = Math.random() > 0.7
) {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

  return {
    id: '',
    title,
    subtitle: utilService.makeLorem(8),
    authors: [utilService.makeLorem(2)],
    publishedDate,
    description: utilService.makeLorem(15),
    pageCount,
    categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length)]],
    thumbnail: `./assets/img/${utilService.getRandomIntInclusive(1, 21)}.jpg`,
    language,
    listPrice: {
      amount: price,
      currencyCode: 'EUR',
      isOnSale,
    },
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: Infinity, maxPageCount: Infinity }
}

function getNextBookId(bookId) {
  return asyncStorageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function getPrevBookId(bookId) {
  return asyncStorageService.query(BOOK_KEY).then((books) => {
    let prevBookIdx = books.findIndex((book) => book.id === bookId) - 1
    if (prevBookIdx === -1) prevBookIdx = books.length - 1
    return books[prevBookIdx].id
  })
}

function addReview(bookId, review) {
  return get(bookId)
    .then((book) => {
      if (!book.reviews || !book.reviews.length) book.reviews = []
      review.id = utilService.makeId()
      book.reviews.unshift(review)
      return save(book)
    })
    .catch((err) => console.log('err:', err))
}

function deleteReview(bookId, reviewId) {
  return get(bookId)
    .then((book) => {
      const reviewIdx = book.reviews.findIndex(
        (review) => review.id === reviewId
      )
      book.reviews.splice(reviewIdx, 1)
      return save(book)
    })
    .catch((err) => console.log('err:', err))
}

function getEmptyReview() {
  return { fullName: '', rating: 5, readAt: utilService.formatDate(new Date()) }
}

function addGoogleBook(googleBook) {
  return get(googleBook.id)
    .then(() => {
      return Promise.reject('Book Already Exists')
    })
    .catch((err) => {
      if (err === 'Book Already Exists') return Promise.reject(err)

      const book = getEmptyBook(
        googleBook.volumeInfo.title,
        undefined,
        googleBook.volumeInfo.publishedDate,
        googleBook.volumeInfo.pageCount,
        googleBook.volumeInfo.language
      )

      book.id = googleBook.id
      book.authors = googleBook.volumeInfo.authors
      book.thumbnail = googleBook.volumeInfo.imageLinks.thumbnail
      book.description = googleBook.volumeInfo.description
      book.categories = googleBook.volumeInfo.categories
      return postGoogleBook(BOOK_KEY, book)
    })
}

function postGoogleBook(entityType, newEntity) {
  return asyncStorageService.query(entityType).then((entities) => {
    entities.unshift(newEntity)
    localStorage.setItem(entityType, JSON.stringify(entities))
    return newEntity
  })
}

function _initBooks() {
  let books = storageService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    storageService.saveToStorage(BOOK_KEY, _createBooks())
  }
}

function _createBooks() {
  return [
    {
      id: 'OXeMG8wNskc',
      title: 'metus hendrerit',
      subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
      authors: ['Barbara Cartland'],
      publishedDate: 1999,
      description:
        'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
      pageCount: 713,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/20.jpg',
      language: 'en',
      listPrice: {
        amount: 109,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: 'JYOJa2NpSCq',
      title: 'morbi',
      subtitle: 'lorem euismod dictumst inceptos mi',
      authors: ['Barbara Cartland'],
      publishedDate: 1978,
      description:
        'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
      pageCount: 129,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/14.jpg',
      language: 'sp',
      listPrice: {
        amount: 44,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: '1y0Oqts35DQ',
      title: 'at viverra venenatis',
      subtitle: 'gravida libero facilisis rhoncus urna etiam',
      authors: ['Dr. Seuss'],
      publishedDate: 1999,
      description:
        'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
      pageCount: 972,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/2.jpg',
      language: 'he',
      listPrice: {
        amount: 108,
        currencyCode: 'ILS',
        isOnSale: false,
      },
    },
    {
      id: 'kSnfIJyikTP',
      title: 'dictum',
      subtitle:
        'augue eu consectetur class curabitur conubia ligula in ullamcorper',
      authors: ['Danielle Steel'],
      publishedDate: 1978,
      description:
        'interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam',
      pageCount: 303,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/16.jpg',
      language: 'en',
      listPrice: {
        amount: 30,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: 'f4iuVmbuKCC',
      title: 'sem himenaeos aptent',
      subtitle: 'interdum per habitasse luctus purus est',
      authors: ['Dr. Seuss'],
      publishedDate: 2011,
      description:
        'et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed',
      pageCount: 337,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/12.jpg',
      language: 'sp',
      listPrice: {
        amount: 19,
        currencyCode: 'USD',
        isOnSale: false,
      },
    },
    {
      id: 'U2rfZO6oBZf',
      title: 'mi ante posuere',
      subtitle:
        'sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus',
      authors: ['Leo Tolstoy'],
      publishedDate: 1978,
      description:
        'senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in',
      pageCount: 748,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/1.jpg',
      language: 'en',
      listPrice: {
        amount: 91,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: 'xI0wrXaaAcq',
      title: 'non',
      subtitle:
        'leo tortor per dapibus mattis ut conubia porttitor ligula viverra',
      authors: ['Leo Tolstoy'],
      publishedDate: 2011,
      description:
        'nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque',
      pageCount: 65,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/14.jpg',
      language: 'he',
      listPrice: {
        amount: 90,
        currencyCode: 'USD',
        isOnSale: false,
      },
    },
    {
      id: '9laHCEdSpFy',
      title: 'tristique',
      subtitle: 'consectetur a eu tincidunt condimentum amet nisi',
      authors: ['Dr. Seuss'],
      publishedDate: 1999,
      description:
        'magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem',
      pageCount: 299,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/11.jpg',
      language: 'he',
      listPrice: {
        amount: 176,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: 'nGhVwZvGCGp',
      title: 'urna ornare gravida',
      subtitle: 'sem vestibulum semper convallis pharetra tempor himenaeos ut',
      authors: ['Jin Yong'],
      publishedDate: 2011,
      description:
        'porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla',
      pageCount: 803,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/10.jpg',
      language: 'sp',
      listPrice: {
        amount: 116,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: 'Q8Q9Lsd03BD',
      title: 'consequat neque volutpat',
      subtitle: 'vel quis taciti fermentum feugiat ullamcorper curae praesent',
      authors: ['Dr. Seuss'],
      publishedDate: 1978,
      description:
        'curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare',
      pageCount: 891,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/5.jpg',
      language: 'en',
      listPrice: {
        amount: 145,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: 'bd7a76kARao',
      title: 'risus',
      subtitle: 'pretium bibendum pharetra curabitur quisque dictumst',
      authors: ['Danielle Steel'],
      publishedDate: 2018,
      description:
        'auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus',
      pageCount: 86,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/16.jpg',
      language: 'sp',
      listPrice: {
        amount: 157,
        currencyCode: 'ILS',
        isOnSale: true,
      },
    },
    {
      id: 'qKyG0vqeO3e',
      title: 'interdum etiam vulputate',
      subtitle: 'velit sapien eget tincidunt nunc tortor',
      authors: ['Danielle Steel'],
      publishedDate: 2018,
      description:
        'aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad',
      pageCount: 882,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/17.jpg',
      language: 'sp',
      listPrice: {
        amount: 57,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: '2RvT48ZNInj',
      title: 'sagittis justo',
      subtitle: 'etiam primis proin praesent placerat nisi fermentum nisi',
      authors: ['Agatha Christie'],
      publishedDate: 2011,
      description:
        'nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus',
      pageCount: 598,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/8.jpg',
      language: 'en',
      listPrice: {
        amount: 167,
        currencyCode: 'ILS',
        isOnSale: false,
      },
    },
    {
      id: '5z2s9pDXAYj',
      title: 'quam ullamcorper himenaeos',
      subtitle: 'ut placerat eu dapibus sapien sodales laoreet',
      authors: ['Danielle Steel'],
      publishedDate: 1999,
      description:
        'etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam',
      pageCount: 608,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/3.jpg',
      language: 'he',
      listPrice: {
        amount: 150,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: 'zBZu5cDEWha',
      title: 'quis',
      subtitle: 'suscipit turpis etiam turpis libero lobortis',
      authors: ['Jin Yong'],
      publishedDate: 2011,
      description:
        'etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor',
      pageCount: 583,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/6.jpg',
      language: 'en',
      listPrice: {
        amount: 58,
        currencyCode: 'ILS',
        isOnSale: true,
      },
    },
    {
      id: 'aOI7tQuPZ2f',
      title: 'aliquam aliquet dapibus',
      subtitle:
        'neque eu purus euismod placerat adipiscing odio egestas consequat',
      authors: ['Leo Tolstoy'],
      publishedDate: 2011,
      description:
        'dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt',
      pageCount: 497,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/7.jpg',
      language: 'en',
      listPrice: {
        amount: 78,
        currencyCode: 'USD',
        isOnSale: false,
      },
    },
    {
      id: 'WBooB82Uvwu',
      title: 'class',
      subtitle:
        'elit enim ultricies amet imperdiet a molestie class elementum venenatis',
      authors: ['Danielle Steel'],
      publishedDate: 1999,
      description:
        'rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla',
      pageCount: 804,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/10.jpg',
      language: 'en',
      listPrice: {
        amount: 118,
        currencyCode: 'ILS',
        isOnSale: false,
      },
    },
    {
      id: 'xm1z5bbZjlS',
      title: 'vitae',
      subtitle: 'class habitant at commodo semper ligula a bibendum',
      authors: ['Leo Tolstoy'],
      publishedDate: 1999,
      description:
        'himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus',
      pageCount: 231,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/12.jpg',
      language: 'he',
      listPrice: {
        amount: 60,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: 'u3j6QIKLlJb',
      title: 'rhoncus vivamus',
      subtitle: 'nullam class risus amet senectus scelerisque etiam curabitur',
      authors: ['Agatha Christie'],
      publishedDate: 1978,
      description:
        'torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis',
      pageCount: 652,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/20.jpg',
      language: 'he',
      listPrice: {
        amount: 110,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: 'vxYYYdVlEH3',
      title: 'donec mi ullamcorper',
      subtitle:
        'varius malesuada augue molestie sollicitudin faucibus mi eu tempus',
      authors: ['William Shakespeare'],
      publishedDate: 2011,
      description:
        'aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed',
      pageCount: 904,
      categories: ['Computers', 'Hack'],
      thumbnail: './assets/img/2.jpg',
      language: 'sp',
      listPrice: {
        amount: 186,
        currencyCode: 'ILS',
        isOnSale: true,
      },
    },
  ]
}
