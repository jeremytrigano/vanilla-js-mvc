import App from "./lib/App.js";
import Router from "./lib/Router.js";

const items = [
  {
    id: 1,
    name: "item1",
  },
  {
    id: 2,
    name: "item2",
  },
  {
    id: 3,
    name: "item3",
  },
];

const app = new App("#app");
const router = new Router(app);

const itemTemplate = (item) => `
<section class="item-listing">
  <a href="#/items/${item.id}">
    <h3 class="name">${item.name}</h3>
  </a>
</section>
`;

app.addComponent({
  name: "items",
  model: {
    items: [],
  },
  view(model) {
    return `
    <ul class="items">
      ${model.items.map((item) => `<li>${itemTemplate(item)}</li>`).join("")}
    </ul>
    `;
  },
  controller(model) {
    model.items = items;
  },
});

app.addComponent({
  name: "item",
  model: {
    item: {},
  },
  view(model) {
    return itemTemplate(model.item);
  },
  controller(model) {
    model.item = items[router.params[1] - 1];
  },
});

router.addRoute("items", "^#/items$");
router.addRoute("item", "^#/items/([0-9]+)$");
