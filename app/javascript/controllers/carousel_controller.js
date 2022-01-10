import { Controller } from "@hotwired/stimulus"
import Swiper, {Pagination, Navigation} from "swiper";

export default class extends Controller {
    static values = ['options']
    connect() {
        this.swiper = new Swiper(this.element, {
            ...this.optionsValue,
            modules: [Pagination, Navigation]
        })
    }
}