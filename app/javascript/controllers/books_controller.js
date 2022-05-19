import {Controller} from '@hotwired/stimulus';

const olid = (string, type = 'books') =>
  new RegExp(`/${type}/(?<olid>.+)`).exec(string).groups.olid;

const pgDate = (original) => {
  return new Date(original).toISOString().slice(0, 19).replace('T', ' ');
};

const errorMessages = (es) => {
  return new DOMParser().parseFromString(`
    <div id="error_explanation" class="alert alert-danger">
        <div class="p-4 flex border-r-1 border-white flex-col justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="p-4">
          <h2>
            ${`${es.length} error${es.length > 1 && 's'}` +
              'prevented this book from being saved:'}
          </h2>
          <ul class="list-disc px-6 py-2">
            ${es.map((error) => `<li>${error}</li>`).join('\n')}
          </ul>
        </div>
    </div>`, 'text/html').firstChild;
};

const bookPreview = (bookData) => {
  return new DOMParser().parseFromString(`
    <div
      style="max-height: 12rem;"
      id="book_preview"
      class="flex m-4 flex-row justify-between rounded-md shadow-md"
    >
        <img
          src="${bookData.cover}"
          style="height: 12rem;" class="rounded-l-md" 
          alt="${bookData.title} cover" 
        />
        <div class="flex flex-col p-4 justify-between">
            <div>
                <h1 class="text-3xl">${bookData.title}</h1>
                <h2 class="text-xl">
                  by ${bookData.authors.map((a) => a.name).join(', ')}
                </h2>
            </div>
            <div class="line-clamp-4" style="word-wrap: break-word;">
                ${bookData.description.replaceAll('(From Goodreads):\r\n', '')}
            </div>
        </div>
    </div>`, 'text/html').firstChild;
};

/**
 * Stimulus controller for creating books
 * @class
 */
export default class BooksController extends Controller {
  static values = {
    book: Object,
  };

  static targets = [
    'isbn',
    'isbn13',
    'isbn10',
    'title',
    'description',
    'cover',
    'identifiers',
    'publishDate',
    'olid',
    'publishers',
    'subtitle',
    'authors',
    'errors',
    'preview',
    'submit',
  ];

  /**
   * This is the actual logic for creating the book
   * @function
   * @param {KeyboardEvent} event
   */
  async getData(event) {
    console.log('working...');

    this.submitTarget.style.pointerEvents = 'none';
    this.submitTarget.style.opacity = '80%';

    while (this.errorsTarget.firstChild) {
      this.errorsTarget.removeChild(this.errorsTarget.firstChild);
    }

    while (this.previewTarget.firstChild) {
      this.previewTarget.removeChild(this.previewTarget.firstChild);
    }

    if (String(event.target.value).length === 10 ||
        String(event.target.value).length === 13) {
      try {
        const res = await fetch(`https://openlibrary.org/isbn/${this.isbnTarget.value}.json`);
        if (!res.ok) throw `${res.status ?? 500}::${res.statusText}`;
        const book = await res.json();
        console.log(book);

        // API only has to provide one ISBN field
        if (!book.title && !book.isbn_13 && !book.isbn_10) {
          throw `1404::No ${
            !book.title ?
              'title' :
              !book.isbn_10[0] && !book.isbn_13[0] ?
                'ISBN' :
                'essential'
          } data provided.`;
        }

        // These next two are already semi-validated
        this.isbn13Target.value = book.isbn_13[0] ?? book.isbn_10[0];
        this.isbn10Target.value = book.isbn_10 ?
          book.isbn_10[0] :
          book.isbn_13[0];
        this.titleTarget.value = book.title;
        this.coverTarget.value = `https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}.jpg` ?? '';
        this.identifiersTarget.value = JSON.stringify(book.identifiers ?? {});
        this.publishDateTarget.value = pgDate(book.publish_date) ?? null;
        this.olidTarget.value = olid(book.key, 'books');
        this.publishersTarget.value = JSON.stringify(book.publishers ?? []);
        this.subtitleTarget.value = book.subtitle ?? '';

        const wres = await fetch(`https://openlibrary.org${book.works[0].key}.json`);
        const work = await wres.json();
        this.descriptionTarget.value = typeof work.description === 'object' ?
          work.description.value :
          work.description ?? book.description ?? '';

        const contributors = book.authors ?? work.authors ?? work.contributors;
        const authors = [];
        for (const a of contributors) {
          const last = a === contributors.at(-1);
          const ares = await fetch(`https://openlibrary.org${a.key ?? a.author.key}.json`);
          // This "1" on the next line is here so that the
          // error handler can better interpret the problem
          if (!ares.ok && last) {
            throw `1${ares.status ?? 500}::${ares.statusText.toString()}`;
          }

          const author = await ares.json();
          const data = {};

          if (!author.name) throw `1404::No Name for author provided`;
          data.name = author.name;
          data.olid = olid(author.key, 'authors');
          data.bio = author.bio?.value ?? '';
          data.birth_date = pgDate(author.birth_date) ?? null;
          data.links = author.links?.map(({name, url}) => ({
            name,
            url,
          })) ?? [];
          data.photos = author.photos ?? [];

          authors.push(data);
          this.authorsTarget.value = JSON.stringify(authors ?? []);
        }

        this.bookValue = {
          title: this.titleTarget.value,
          description: this.descriptionTarget.value,
          subtitle: this.subtitleTarget.value,
          isbn10: this.isbn10Target.value,
          isbn13: this.isbn13Target.value,
          cover: this.coverTarget.value,
          identifiers: JSON.parse(this.identifiersTarget.value),
          publishDate: this.publishDateTarget.value,
          olid: this.olidTarget.value,
          publishers: JSON.parse(this.publishersTarget.value),
          authors: JSON.parse(this.authorsTarget.value),
        };

        this.previewTarget.appendChild(bookPreview(this.bookValue));
        this.submitTarget.style.pointerEvents = 'auto';
        this.submitTarget.style.opacity = '100%';

        console.log(this.bookValue);
      } catch (err) {
        console.log(err);
        const error = {
          // Server error by default
          status: parseInt(err.toString().split('::')[0] ?? 500),
          message: err.toString().split('::')[1] ?? '',
        };
        console.error(error.message);
        switch (error.status) {
          case 1404:
            this.errorsTarget.appendChild(errorMessages(['We could not find enough information about this book to keep it in our records. If you would like to continue, please search on <a target="_blank" rel="noopener noreferrer" class="underline" href="https://openlibrary.org">OpenLibrary.org</a> to find your book, and copy the ISBN into this field. We are sorry for the inconvenience.']));
            break;
          case 404:
            this.errorsTarget.appendChild(errorMessages(['This book could not be found on OpenLibrary. If you would like to continue, please search on <a target="_blank" rel="noopener noreferrer" class="underline;" href="https://openlibrary.org">OpenLibrary.org</a> to find your book, and copy the ISBN into this field. We are sorry for the inconvenience.']));
            break;
          default:
            this.errorsTarget.appendChild(errorMessages([
              'Something went wrong while fetching the book\'s information.',
            ]));
            break;
        }
      }
    }
  }
}
