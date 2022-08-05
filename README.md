![Ruby](https://github.com/ztcollazo/bookwyrm/actions/workflows/rubyonrails.yml/badge.svg)
![JS](https://github.com/ztcollazo/bookwyrm/actions/workflows/javascript.yml/badge.svg)
![Ruby](https://github.com/ztcollazo/bookwyrm/actions/workflows/codeql-analysis.yml/badge.svg)
![Heroku](https://pyheroku-badge.herokuapp.com/?app=bookwyrm-app)


# Welcome to BookWyrm!

## About

Bookwyrm is a platform for book reviews and recommendations. It is written in Ruby on Rails,
and uses artificial intelligence to give recommendations. You can review books, add books,
search books and authors, and view other users.

## Development

This application uses ruby version 2.7.3, with rbenv for management.

### Contributing

Please read the [contribution guidelines](./CONTRIBUTING.md) before opening an issue
or pull request.

### To run locally:

0. Make sure that you have postgres installed. On a mac, the easiest way to get started is [Postgres.app](https://postgresapp.com).
1. Run `git clone https://github.com/ztcollazo/bookwyrm.git`
2. Start the postgres server.
3. Run `rails db:migrate`
4. Run `bin/dev`. Bookwyrm uses `vite_ruby` to bundle javascript along with the rails app, so `bin/dev` runs a foreman
process alongside the server.

### Testing

Bookwyrm uses RSpec for tests. `bin/rspec` will run the tests.
