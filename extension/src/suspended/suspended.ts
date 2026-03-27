const params = new URLSearchParams(window.location.search);
const originalUrl = params.get("url");
const originalTitle = params.get("title");

if (originalTitle) {
  document.getElementById("page-title")!.textContent = originalTitle;
  document.title = `(Suspended) ${originalTitle}`;
}

if (originalUrl) {
  document.getElementById("page-url")!.textContent = originalUrl;
}

// Restore tab on click
document.addEventListener("click", () => {
  if (originalUrl) {
    window.location.href = originalUrl;
  }
});

// Also restore on focus (when user switches to this tab)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && originalUrl) {
    // Small delay to avoid restore on initial load
    setTimeout(() => {
      window.location.href = originalUrl;
    }, 100);
  }
});
