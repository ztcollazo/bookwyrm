import {Controller} from '@hotwired/stimulus';

/**
 * The controller for Ratings (radio buttons)
 * @class RatingsController
 */
export default class RatingsController extends Controller {
  declare readonly valueTarget: HTMLInputElement;
  [key: string]: unknown;

  static targets = ['1', '2', '3', '4', '5', 'value'];

  /**
   * Callback for connecting on DOM init
   * @method connect
   */
  connect() {
    super.connect();
    if (this.valueTarget.value) {
      this.fix({target: this[`${this.valueTarget.value}Target`]} as MouseEvent);
    }
  }

  /**
   * Set the color of the stars and the value of the input
   * @method fix
   * @param {MouseEvent} event
   */
  fix(event: MouseEvent) {
    for (const r of RatingsController.targets) {
      if (
        Number((event.target as HTMLSpanElement)
            .getAttribute('data-ratings-target')) >= Number(r)
      ) {
        (this[`${r}Target`] as HTMLSpanElement).style.backgroundColor = 'gold';
      } else {
        (this[`${r}Target`] as HTMLSpanElement)
            .style.backgroundColor = 'lightgray';
      }
    }
    if (this.valueTarget) {
      this.valueTarget.value = (event.target as HTMLSpanElement)
          .getAttribute('data-ratings-target') ?? '';
    }
  }
}
