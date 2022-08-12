import {Controller} from '@hotwired/stimulus';

/**
 * This controls autocomplete for search
 * @class AutocompleteController
 * */
export default class AutocompleteController extends Controller {
  declare readonly formTarget: HTMLFormElement;
  declare readonly inputTarget: HTMLInputElement;
  declare readonly hiddenTarget: HTMLInputElement;
  static targets = ['input', 'hidden', 'form'];
  /**
   * Update is the action that requests the autocomplete update
   * @method update
   * */
  async update() {
    this.hiddenTarget.value = this.inputTarget.value;
    this.formTarget.requestSubmit();
  }
}
