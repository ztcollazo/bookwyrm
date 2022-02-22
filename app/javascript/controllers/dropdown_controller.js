import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['dropdownMenu']
  static classes = ['hidden']

  connect() {
    super.connect();
    document.body.onclick = (event) => {
      if (this.dropdownMenuTarget.getAttribute('data-click-outside') || this.dropdownMenuTarget.getAttribute('data-click-outside') === true) return;
      event.stopPropagation();
    }
  }

  toggle(event) {
    event.stopPropagation();
    if (Array.isArray(this.hiddenClasses)) {
      for (let cls of this.hiddenClasses) {
        this.dropdownMenuTarget.classList.toggle(cls);
      }
    } else {
      this.dropdownMenuTarget.classList.toggle(this.hiddenClass)
    }
  }

  close(event) {
    if (Array.isArray(this.hiddenClasses)) {
      this.dropdownMenuTarget.classList.add(...this.hiddenClasses);
    } else {
      this.dropdownMenuTarget.classList.add(this.hiddenClass)
    }
  }
}
