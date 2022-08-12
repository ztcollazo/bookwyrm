import {Controller} from '@hotwired/stimulus';

interface BookData {
  authors: {
    name: string
  }[],
  cover: string,
  title: string,
  description: string,
  subtitle: string,
  isbn10: number,
  isbn13: number,
  identifiers: Record<string, string>[],
  publishDate: string,
  olid: string,
  publishers: string[],
}

const olid = (string: string, type = 'books') =>
  new RegExp(`/${type}/(?<olid>.+)`).exec(string)?.groups?.olid;

const pgDate = (original: string) => {
  return new Date(original).toISOString().slice(0, 19).replace('T', ' ');
};

const errorMessages = (es: string[]) => {
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

const bookPreview = (bookData: BookData) => {
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
 * @class BooksController
 */
export default class BooksController extends Controller {
  declare bookValue: BookData;
  declare readonly isbnTarget: HTMLInputElement;
  declare readonly isbn13Target: HTMLInputElement;
  declare readonly isbn10Target: HTMLInputElement;
  declare readonly titleTarget: HTMLInputElement;
  declare readonly descriptionTarget: HTMLInputElement;
  declare readonly coverTarget: HTMLInputElement;
  declare readonly identifiersTarget: HTMLInputElement;
  declare readonly publishDateTarget: HTMLInputElement;
  declare readonly olidTarget: HTMLInputElement;
  declare readonly publishersTarget: HTMLInputElement;
  declare readonly subtitleTarget: HTMLInputElement;
  declare readonly authorsTarget: HTMLInputElement;
  declare readonly errorsTarget: HTMLDivElement;
  declare readonly previewTarget: HTMLDivElement;
  declare readonly submitTarget: HTMLButtonElement;

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
   * @method getData
   * @param {KeyboardEvent} event
   */
  async getData(event: KeyboardEvent) {
    console.log('working...');

    if (this.submitTarget) {
      this.submitTarget.style.pointerEvents = 'none';
      this.submitTarget.style.opacity = '80%';
    }

    while (this.errorsTarget.firstChild) {
      this.errorsTarget.removeChild(this.errorsTarget.firstChild);
    }

    while (this.previewTarget.firstChild) {
      this.previewTarget.removeChild(this.previewTarget.firstChild);
    }

    if (String((event.target as HTMLInputElement).value).length === 10 ||
        String((event.target as HTMLInputElement).value).length === 13) {
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

        if (this.isbn10Target &&
            this.isbn13Target &&
            this.titleTarget &&
            this.olidTarget) {
          // These next two are already semi-validated
          this.isbn13Target.value = book.isbn_13[0] ?? book.isbn_10[0];
          this.isbn10Target.value = book.isbn_10 ?
              book.isbn_10[0] :
              book.isbn_13[0];
          this.titleTarget.value = book.title;
          if (this.coverTarget) {
            this.coverTarget.value = `https://covers.openlibrary.org/b/isbn/${book.isbn_13[0]}.jpg` ?? '';
          }
          if (this.identifiersTarget) {
            this.identifiersTarget.value = JSON.stringify(
                book.identifiers ?? {},
            );
          }
          if (this.publishDateTarget) {
            this.publishDateTarget.value = pgDate(book.publish_date) ?? null;
          }
          this.olidTarget.value = olid(book.key, 'books') ?? '';
          if (this.publishersTarget) {
            this.publishersTarget.value = JSON.stringify(book.publishers ?? []);
          }
          if (this.subtitleTarget) {
            this.subtitleTarget.value = book.subtitle ?? '';
          }
        }

        const wres = await fetch(`https://openlibrary.org${book.works[0].key}.json`);
        const work = await wres.json();
        if (this.descriptionTarget) {
          this.descriptionTarget.value = typeof work.description === 'object' ?
              work.description.value :
              work.description ?? book.description ?? '';
        }

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
          if (!author.name) throw `1404::No Name for author provided`;
          const data: {
            name: string,
            olid: string,
            bio: string,
            birth_date: string,
            links: {
              name: string,
              url: string
            }[],
            photos: string[]
          } = {
            name: author.name,
            olid: olid(author.key, 'authors') ?? '',
            bio: author.bio.value ?? '',
            birth_date: pgDate(author.birth_date) ?? null,
            links: author.links.map(({
              name,
              url,
            }: {
              name: string,
              url: string,
            }) => ({
              name,
              url,
            })) ?? [],
            photos: author.photos ?? [],
          };

          authors.push(data);
          if (this.authorsTarget) {
            this.authorsTarget.value = JSON.stringify(authors ?? []);
          }
        }

        this.bookValue = {
          title: this.titleTarget.value,
          description: this.descriptionTarget.value,
          subtitle: this.subtitleTarget.value,
          isbn10: Number(this.isbn10Target.value),
          isbn13: Number(this.isbn13Target.value),
          cover: this.coverTarget.value,
          identifiers: JSON.parse(this.identifiersTarget.value ?? ''),
          publishDate: this.publishDateTarget.value,
          olid: this.olidTarget.value,
          publishers: JSON.parse(this.publishersTarget.value ?? ''),
          authors: JSON.parse(this.authorsTarget.value ?? ''),
        } as BookData;

        this.previewTarget.appendChild(
            bookPreview(this.bookValue) ??
            document.createElement('div'),
        );
        if (this.submitTarget) {
          this.submitTarget.style.pointerEvents = 'auto';
          this.submitTarget.style.opacity = '100%';
        }

        console.log(this.bookValue);
      } catch (err: unknown) {
        console.log(err);
        const error = {
          // Server error by default
          status: parseInt((err as string | Error)
              .toString()
              .split('::')[0] ?? 500),
          message: (err as string | Error).toString().split('::')[1] ?? '',
        };
        console.error(error.message);
        switch (error.status) {
          case 1404:
            this.errorsTarget.appendChild(errorMessages(['We could not find enough information about this book to keep it in our records. If you would like to continue, please search on <a target="_blank" rel="noopener noreferrer" class="underline" href="https://openlibrary.org">OpenLibrary.org</a> to find your book, and copy the ISBN into this field. We are sorry for the inconvenience.']) ?? document.createElement('div'));
            break;
          case 404:
            this.errorsTarget.appendChild(errorMessages(['This book could not be found on OpenLibrary. If you would like to continue, please search on <a target="_blank" rel="noopener noreferrer" class="underline;" href="https://openlibrary.org">OpenLibrary.org</a> to find your book, and copy the ISBN into this field. We are sorry for the inconvenience.']) ?? document.createElement('div'));
            break;
          default:
            this.errorsTarget.appendChild(errorMessages([
              'Something went wrong while fetching the book\'s information.',
            ]) ?? document.createElement('div'));
            break;
        }
      }
    }
  }
}
