/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/packs and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

/*#__PURE__*/ //= require rails-ujs
/*#__PURE__*/ //= require jquery
/*#__PURE__*/ //= require jquery_ujs

// import Rails from "@rails/ujs"
// import Turbolinks from "turbolinks"
// import * as ActiveStorage from "@rails/activestorage"
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import {} from "jquery-ujs"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import "swiper/css/bundle"

Rails.start()
Turbolinks.start()
// ActiveStorage.start()
const application = Application.start()
const context = require.context("../../javascript/controllers", true, /\.js$/);
window.Stimulus = application
application.load(definitionsFromContext(context))

export { application }
