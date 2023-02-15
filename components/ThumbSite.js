class ThumbSite extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .image {
        width: 100%;
        aspect-ratio: 4 / 3.2;
        position: relative;
      }

      .overlay {
        width: 100%;
        aspect-ratio: 4 / 3.2;
        background: linear-gradient(#0002, transparent);
        background-blend-mode: multiply;
        position: absolute;
        top: 0;
        clip-path: polygon(0 0, 100% 100%, 0 100%);
      }

      img, .image {
        width: 100%;
        box-shadow: 2px 4px 8px #0006;
        transition: all 0.5s;
      }

      .image {
        opacity: 0.9;
      }

      .image:hover {
        translate: 0 -6px;
        box-shadow:
          0 0 20px hotpink,
          2px 10px 8px #0006;
        opacity: 1;
      }

      h3 {
        color: gold;
        text-transform: uppercase;
        font-family: Orbitron;
        font-size: 1.5rem;
        text-align: center;
      }

      a {
        text-decoration: none;
      }

      p {
        font-family: Chilanka;
        font-size: 1.75rem;
        color: #eee;
        text-align: center;
      }
    `;
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.url = this.getAttribute("url");
    this.description = this.getAttribute("description");
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ThumbSite.styles}</style>
    <div class="container">
      <a href="${this.url}">
        <div class="image">
          <img src="images/${this.name}.png" alt="${this.name}">
          <div class="overlay"></div>
        </div>
        <h3>${this.name}</h3>
      </a>
      <p>${this.description}</p>
    </div>`;
  }
}

customElements.define("thumb-site", ThumbSite);
