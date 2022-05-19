import {Controller} from '@hotwired/stimulus';

/**
 * The dropdown/disclosure controller
 * @class
 */
export default class DropdownController extends Controller {
  static targets = ['dropdownMenu'];
  static classes = ['hidden'];

  /**
   * Initialize the connection on DOM load
   * @function
   */
  connect() {
    super.connect();
    if (!this.dropdownMenuTarget.dataset['click-outside']) {
      document.body.onclick = (event) => {
        event.stopPropagation();
      };
    }
  }

  /**
   * Toggle the disclosure
   * @function
   * @param {MouseEvent} event
   */
  toggle(event) {
    event.stopPropagation();
    if (Array.isArray(this.hiddenClasses)) {
      for (const cls of this.hiddenClasses) {
        this.dropdownMenuTarget.classList.toggle(cls);
      }
    } else {
      this.dropdownMenuTarget.classList.toggle(this.hiddenClass);
    }
  }

  /**
   * Flat out close the disclosure
   * @function
   */
  close() {
    if (Array.isArray(this.hiddenClasses)) {
      this.dropdownMenuTarget.classList.add(...this.hiddenClasses);
    } else {
      this.dropdownMenuTarget.classList.add(this.hiddenClass);
    }
  }
}
