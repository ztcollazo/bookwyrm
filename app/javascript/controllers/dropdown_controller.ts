import {Controller} from '@hotwired/stimulus';

/**
 * The dropdown/disclosure controller
 * @class DropdownController
 */
export default class DropdownController extends Controller {
  hiddenClass = 'hidden';
  hiddenClasses = ['hidden'];
  declare readonly dropdownMenuTarget: HTMLElement;
  static targets = ['dropdownMenu'];
  static classes = ['hidden'];

  /**
   * Initialize the connection on DOM load
   * @method connect
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
   * @method toggle
   * @param {MouseEvent} event
   */
  toggle(event: MouseEvent) {
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
   * @method close
   */
  close() {
    if (Array.isArray(this.hiddenClasses)) {
      this.dropdownMenuTarget.classList.add(...this.hiddenClasses);
    } else {
      this.dropdownMenuTarget.classList.add(this.hiddenClass);
    }
  }
}
