import { html } from "lit";
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class SpinnersLoad extends LitWithoutShadowDom {
  constructor() {
    super();
    this.title = "";
  }

  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  render() {
    return html`
      <div id="loadingIndicator" class="text-center d-none">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }
}

customElements.define("spinners-load", SpinnersLoad);
