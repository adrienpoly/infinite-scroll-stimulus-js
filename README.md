# Infinite scroll 

Example for using intersection observers to create an infinite scroll in a rails App.

This demo leverage [stimulus-use](https://github.com/adrienpoly/stimulus-use) new `appear` behaviour to simplify the js controller

### Stimulus controller
```js
import { Controller } from "stimulus";
import { useIntersection } from "stimulus-use";

export default class extends Controller {
  connect() {
    useIntersection(this, {
      rootMargin: "100px",
    });
  }

  appear() {
    this.loadMore(this.nextUrl);
  }

  loadMore(url) {
    Rails.ajax({
      type: "GET",
      url: url,
      success: (_data, _status, xhr) => {
        this.element.outerHTML = xhr.response;
      },
    });
  }

  get nextUrl() {
    return this.data.get("nextUrl");
  }
}
```
