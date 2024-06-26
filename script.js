const rotateBtn = document.querySelector(".rotate-btn");
const slides = document.querySelectorAll(".bg-slide");
const totalSlides = slides.length;
let index = 0;

rotateBtn.addEventListener("click", () => {
  rotateBtn.classList.add("active");
  setTimeout(() => {
    rotateBtn.classList.remove("active");
  }, 2100);

  slides.forEach((slide) => {
    if (slide.classList.contains("active")) {
      slide.classList.add("after-active");
    } else {
      slide.classList.remove("after-active");
    }
  });

  slides[index].classList.remove("active");

  index++;

  if (index == totalSlides) {
    index = 0;
  }

  slides[index].classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      navLinks.forEach((link) => link.classList.remove("active"));

      this.classList.add("active");

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  function updateActiveSection() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const targetId = section.getAttribute("id");
        const correspondingLink = document.querySelector(
          `.navbar a[href="#${targetId}"]`
        );

        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection);

  updateActiveSection();
});

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Subject: ${subject.value}<br> Message: ${mess.value}<br>`;

  Email.send({
    SecureToken: "2683f32f-02fe-46f5-8df4-0b48857154f6",
    To: "jedesguerra37@gmail.com",
    From: "jedesguerra37@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
        customClass: {
          popup: "swal-custom-size",
        },
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});

function openPopup(popupId) {
  var popup = document.getElementById(popupId);
  var overlay = document.getElementById("overlay");
  popup.style.display = "block";
  overlay.style.display = "block";
}

window.onclick = function (event) {
  var overlay = document.getElementById("overlay");
  if (event.target == overlay) {
    closePopup();
  }
};

document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    closePopup();
  }
};

function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  var overlay = document.getElementById("overlay");
  popup.style.display = "none";
  overlay.style.display = "none";
}
