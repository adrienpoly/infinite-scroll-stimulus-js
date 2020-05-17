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
