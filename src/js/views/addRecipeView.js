import View from './View.js';
import { wait } from '../helpers.js';
import { MODAL_CLOSE_SEC, MODAL_RENDER_FORM_SEC } from '../config.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _formElement = document.querySelector('.upload').innerHTML;

  async closeFormWindow() {
    this.toggleWindow();
  }

  async clearRender() {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._formElement);
  }

  async renderForm() {
    try {
      await wait(MODAL_CLOSE_SEC);
      await this.closeFormWindow();
      await wait(MODAL_RENDER_FORM_SEC);
      await this.clearRender();
    } catch (err) {
      console.error(err);
    }
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
