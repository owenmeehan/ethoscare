(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  const form = document.querySelector("#enquiry");
  if (!form) return;

  const status = document.querySelector("#form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);

    if (String(data.get("website") || "").trim() !== "") {
      return;
    }

    const required = ["name", "organisation", "role", "email", "phone", "audience", "topic", "message"];
    let invalid = false;
    required.forEach(function (name) {
      const field = form.elements[name];
      const empty = !String(data.get(name) || "").trim();
      field.setAttribute("aria-invalid", empty ? "true" : "false");
      if (empty) invalid = true;
    });

    const consent = form.elements.consent;
    if (!consent.checked) {
      consent.setAttribute("aria-invalid", "true");
      invalid = true;
    } else {
      consent.setAttribute("aria-invalid", "false");
    }

    if (invalid) {
      status.textContent = "Add the missing details, including the confirmation that this message does not name a young person.";
      return;
    }

    const lines = [
      "Enquiry from the Ethos Care website.",
      "This message should not contain a young person's case details.",
      "",
      "Name: " + data.get("name"),
      "Organisation: " + data.get("organisation"),
      "Role: " + data.get("role"),
      "Email: " + data.get("email"),
      "Phone: " + data.get("phone"),
      "I am: " + data.get("audience"),
      "About: " + data.get("topic"),
      "",
      String(data.get("message")).trim()
    ];

    const href =
      "mailto:info@ethoscare.org.uk?subject=" +
      encodeURIComponent("Placement enquiry for Ethos Care") +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    status.textContent =
      "Your email app should open with this enquiry. If it does not, write to info@ethoscare.org.uk or call 023 9355 2871.";
    window.location.href = href;
  });
})();
