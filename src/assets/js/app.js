import { LitElement, html, css, nothing } from "lit";

class AppElement extends LitElement {
  render() {
    return html`<div
      class="container"
    >
      <header class="header">
        <a href="/" aria-label="Return home">Home</a>
      </header>
      <main><slot></slot></main>
      <footer>Footer</footer>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      width: 100% !important;
      height: auto !important;
    }
  `;
}
customElements.define("docs-app", AppElement);
