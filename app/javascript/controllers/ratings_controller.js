import { Controller } from "@hotwired/stimulus";

export default class Ratings extends Controller {
    static targets = ["1", "2", "3", "4", "5", "value"]

    connect() {
        super.connect();
        if (this.valueTarget.value) {
            this.fix({ target: this[`${this.valueTarget.value}Target`] })
        }
    }

    fix(event) {
        console.log(event);
        for (let r of Ratings.targets) {
            if (Number(event.target.getAttribute('data-ratings-target')) >= Number(r)) {
                this[`${r}Target`].style.backgroundColor = 'gold';
            } else {
                this[`${r}Target`].style.backgroundColor = 'lightgray';
            }
        }
        this.valueTarget.value = Number(event.target.getAttribute('data-ratings-target'))
    }
}
