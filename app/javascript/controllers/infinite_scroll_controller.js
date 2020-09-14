import { Controller } from "stimulus";
import { useIntersection } from "stimulus-use";

export default class extends Controller {
  connect() {
    if (this.firstPage) {
      // on the firstPage makes sure to scroll to the bottom
      document.body.scrollIntoView(false);
    }

    useIntersection(this);
  }

  appear() {
    this.loadMore(this.nextUrl);
  }

  loadMore(url) {
    Rails.ajax({
      type: "GET",
      url: url,
      success: (_data, _status, xhr) => {
        //store current position
        const heightBefore = document.body.scrollHeight;

        //insert content to the top but bellow the cursor
        this.element.outerHTML = xhr.response;

        // compute the scroll offset
        const heightAfter = document.body.scrollHeight;
        const offset = heightAfter - heightBefore;

        // remove the cursor
        window.scrollTo(0, offset);
      },
    });
  }

  get nextUrl() {
    return this.data.get("nextUrl");
  }

  get firstPage() {
    return this.data.get("page") === "1";
  }
}
