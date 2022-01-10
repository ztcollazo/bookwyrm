# frozen_string_literal: true

# The controller for the books
class BooksController < ApplicationController
  before_action :set_book, only: %i[show update destroy]
  before_action :signed_in?, only: %i[new create destroy]

  # GET /books/1 or /books/1.json
  def show; end

  # GET /books/new
  def new
    @book = Book.new
  end

  # POST /books or /books.json
  def create
    @book = Book.create(book_params)
    @authors = create_authors

    if @book.save
      redirect_to @book, notice: 'Book was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  # DELETE /books/1 or /books/1.json
  def destroy
    @book.destroy
    redirect_to books_url, notice: 'Book was successfully destroyed.'
  end

  private

  # Separate the author creation logic from the books
  def create_authors
    if author_params.is_a?(Array)
      author_params.each do |author|
        create_author author
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def create_author(author)
    a = Author.find_by_olid(author[:olid]) || Author.create(author)
    if a.save
      @book.authors << a
      a
    else
      @book.errors.add(:base, 'Could not create authors')
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_book
    book = Book.find_by(isbn_13: params[:id]) || Book.find_by(isbn_10: params[:id])
    if book
      @book = book
    else
      redirect_to book_path(Book.find(params[:id]).isbn_13 || Book.find(params[:id]).isbn_10)
    end
  end

  # Only allow a list of trusted parameters through.
  def book_params
    bps = params.require(:book).permit(:publishers, :isbn_10, :isbn_13, :title, :identifiers, :publish_date, :olid,
                                       :description, :subtitle, :cover)

    bps[:identifiers] = JSON.parse(bps[:identifiers].to_s) if bps[:identifiers]
    bps[:publish_date] = Date.parse(bps[:publish_date])
    bps
  end

  def author_params
    data = []
    data = JSON.parse(params.require(:book).require(:authors_data)) if params.require(:book).require(:authors_data)
    au = unless data.empty?
           data.each do |author|
             author.slice(:name, :birth_date, :bio,
                          :olid, :links, :photos)
           end
         end

    au || @book.errors.add(:base, 'Could not create authors')
  end
end
