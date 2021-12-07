import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['dropdownMenu', 'button']
  static classes = ['hidden']

  toggle(event) {
    event.stopPropagation();
    this.dropdownMenuTarget.classList.toggle(this.hiddenClass);
  }

  close(event) {
    if (event.currentTarget !== this.buttonTarget) {
      this.dropdownMenuTarget.classList.add(this.hiddenClass);
    }
  }
}
