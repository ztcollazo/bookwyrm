import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['dropdownMenu']
  static classes = ['hidden']

  connect() {
    super.connect();
    document.onclick = (event) => {
      event.stopPropagation();
    }
  }

  toggle(event) {
    event.stopPropagation();
    this.dropdownMenuTarget.classList.toggle(this.hiddenClass);
  }

  close(event) {
    this.dropdownMenuTarget.classList.add(this.hiddenClass);
  }
}
