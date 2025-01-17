    // Check if the current page URL includes the .html extension
    if (window.location.pathname.endsWith(".html")) {
      // Remove .html from the URL
      var newUrl = window.location.pathname.replace(".html", "");
      // Use replaceState to update the URL without reloading the page
      window.history.replaceState({}, "", newUrl);
    }