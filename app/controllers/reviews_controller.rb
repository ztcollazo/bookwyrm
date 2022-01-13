# frozen_string_literal: true

# The controller for reviews
class ReviewsController < ApplicationController
  before_action :set_book
  before_action :set_review, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[new create destroy edit update]
  before_action :correct_user, only: %i[edit update destroy]

  # GET /books/isbn/reviews
  def index
    @reviews = @book.reviews.paginate(page: params[:page], per_page: 35)
    @rating = @book.reviews.average(:rating)
    @reviews_count = @book.reviews.count
  end

  # GET /book/isbn/reviews/new
  def new
    @review = @book.reviews.new
  end

  # GET /reviews/1/edit
  def edit; end

  # POST /reviews or /reviews.json
  def create
    @review = @book.reviews.new(**review_params, user: current_user)

    if @review.save
      redirect_to book_reviews_path(@book), flash: { success: 'Review was successfully created.' }
    else
      render 'reviews/new', status: :unprocessable_entity
    end
  end

  # PATCH/PUT /book/isbn/reviews/1
  def update
    if @review.update(review_params)
      redirect_to book_reviews_path(@book, @review), flash: { success: 'Review was successfully updated.' }
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /book/isbn/reviews/1
  def destroy
    @review.destroy
    redirect_to book_reviews_path(@book.isbn_13), flash: { success: 'Review was successfully destroyed.' }
  end

  private

  # Get the book to narrow down the review results
  def set_book
    if visible_page?
      book = Book.find_by(isbn_13: params[:book_id]) || Book.find_by(isbn_10: params[:book_id])
      redirect_book book
    else
      assign_book
    end
  end

  def assign_book
    @book = Book.find_by(isbn_13: params[:book_id]) || Book.find_by(isbn_10: params[:book_id]) ||
            Book.find(params[:book_id])
  end

  def visible_page?
    bools = []

    %w[create update destroy].each do |s|
      bools.push(true) if action_name == s
    end

    !bools.include?(true)
  end

  def redirect_book(book)
    if book
      @book = book
    else
      redirect_to request.path.gsub(params[:book_id], Book.find(params[:book_id]).isbn_13.to_s)
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = @book.reviews.find_by(id: params[:id]) # Necessary to specify id for no errors
  end

  # Make sure that the current user is the user that created the review
  def correct_user
    return if @review.user == current_user

    redirect_to book_reviews_path(@book.isbn_13), flash: { warning: 'You are not authorized to perform this action.' }
  end

  # Only allow a list of trusted parameters through.
  def review_params
    params.require(:review).permit(:rating, :title, :content)
  end
end
