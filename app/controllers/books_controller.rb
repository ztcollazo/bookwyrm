# frozen_string_literal: true

# The controller for the books
class BooksController < ApplicationController
  before_action :set_book, only: %i[show update destroy]
  before_action :authenticate_user!, only: %i[new create destroy index]

  # GET /books
  # we need this rescue so that disco does not throw "comparison of float with 0 failed"
  def index
    bin = File.binread('tmp/recommender.bin')
    # rubocop:disable Security/MarshalLoad
    recommender = Marshal.load(bin)
    # rubocop:enable Security/MarshalLoad
    @books = Book.find(recommender.top_items(count: 10).map { |i| i[:item_id] })
  rescue StandardError
    @books = Book.includes(:reviews).order('reviews.rating ASC').limit(10)
  end

  # GET /books/recommended
  def recommended
    @books = current_user.recommended_books
  end

  # GET /books/1
  def show
    @rating = @book.reviews.average(:rating)
    @reviews_count = @book.reviews.count
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # POST /books
  def create
    @book = Book.create(book_params)
    @authors = create_authors

    if @book.save
      redirect_to @book, flash: { success: 'Book was successfully created.' }
    else
      render :new, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    if current_user.admin? # we don't want just anyone to delete books
      @book.destroy if current_user.admin?
      redirect_to root_url, flash: { success: 'Book was successfully destroyed.' }
    else
      redirect_to root_url,
                  flash: { warning: 'You are not authorized to perform this action.' }
    end
  end

  private

  # Separate the author creation logic from the books
  def create_authors
    if author_params.is_a?(Array)
      author_params.each do |author|
        create_author author
      end
    else
      @book.errors.add(:base, 'Could not create authors')
    end
  end

  def create_author(author)
    a = Author.find_by_olid(author[:olid]) || Author.create(author)
    if a.save
      @book.authors << a
      a
    else
      @book.errors.add(:base, 'Could not create authors')
      render :new
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_book
    return if params[:id] == 'recommended'

    set_book_for_destroy
    return if @dont_redirect

    find_book
  end

  def find_book
    book = Book.find_by(isbn_13: params[:id]) || Book.find_by(isbn_10: params[:id])
    if book
      @book = book
    else
      new_book = Book.find(params[:id])
      redirect_to book_path(new_book.isbn_13 || new_book.isbn_10)
    end
  end

  def set_book_for_destroy
    return unless action_name == 'destroy'

    @book = Book.find_by(isbn_13: params[:id]) || Book.find_by(isbn_10: params[:id]) || Book.find(params[:id])
    @dont_redirect = true
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
