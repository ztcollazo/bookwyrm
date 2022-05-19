import {Controller} from '@hotwired/stimulus';

/**
 * The controller for Ratings (radio buttons)
 * @class
 */
export default class RatingsController extends Controller {
  static targets = ['1', '2', '3', '4', '5', 'value'];

  /**
   * Callback for connencting on DOM init
   * @function
   */
  connect() {
    super.connect();
    if (this.valueTarget.value) {
      this.fix({target: this[`${this.valueTarget.value}Target`]});
    }
  }

  /**
   * Set the color of the stars and the value of the input
   * @function
   * @param {MouseEvent} event
   */
  fix(event) {
    for (const r of RatingsController.targets) {
      if (
        Number(event.target.getAttribute('data-ratings-target')) >= Number(r)
      ) {
        this[`${r}Target`].style.backgroundColor = 'gold';
      } else {
        this[`${r}Target`].style.backgroundColor = 'lightgray';
      }
    }
    this.valueTarget.value = Number(
        event.target.getAttribute('data-ratings-target'),
    );
  }
}
