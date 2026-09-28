/* =========================================
   MODERN SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       DARK MODE
    ===================================== */

    const modeButton = document.getElementById("modeButton");

    // Load saved theme
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
        document.body.classList.add("dark-mode");
    }

    updateModeButton();

    // Dark mode button
    if (modeButton) {
        modeButton.addEventListener("click", changeMode);
    }


    /* =====================================
       SCROLL ANIMATION
    ===================================== */

    const animatedElements =
        document.querySelectorAll(".card, section, form");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach((element) => {

        element.classList.add("animate");

        observer.observe(element);

    });


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm =
        document.querySelector("form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            submitForm
        );

    }


    /* =====================================
       SMOOTH NAVIGATION
    ===================================== */

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const target =
                link.getAttribute("href");

            if (
                target &&
                target.startsWith("#")
            ) {

                const section =
                    document.querySelector(target);

                if (section) {

                    event.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });

});


/* =========================================
   DARK MODE FUNCTION
========================================= */

function changeMode() {

    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");

    // Save preference
    localStorage.setItem(
        "darkMode",
        darkMode
    );

    updateModeButton();

    // Show notification
    showNotification(
        darkMode
            ? "Dark mode enabled 🌙"
            : "Light mode enabled ☀️"
    );
}


/* =========================================
   UPDATE DARK MODE BUTTON
========================================= */

function updateModeButton() {

    const button =
        document.getElementById("modeButton");

    if (!button) return;

    const darkMode =
        document.body.classList.contains("dark-mode");

    button.innerHTML =
        darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";

}


/* =========================================
   HOME PAGE MESSAGE
========================================= */

function changeMessage() {

    const message =
        document.getElementById("message");

    if (!message) return;

    // Fade out
    message.style.opacity = "0";

    setTimeout(() => {

        message.innerHTML =
            "✨ Thank you for visiting our dynamic website!";

        message.style.opacity = "1";

    }, 300);

    showNotification(
        "Message updated successfully!"
    );

}


/* =========================================
   SERVICE ALERT
========================================= */

function showAlert(service) {

    showNotification(
        `✨ You selected: ${service}`,
        "success"
    );

}


/* =========================================
   MODERN NOTIFICATION
========================================= */

function showNotification(
    message,
    type = "info"
) {

    // Remove existing notification
    const oldNotification =
        document.querySelector(".notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    // Create notification
    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;


    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;


    document.body.appendChild(
        notification
    );


    // Show animation
    setTimeout(() => {

        notification.classList.add("active");

    }, 50);


    // Automatically remove
    setTimeout(() => {

        notification.classList.remove("active");

        setTimeout(() => {

            notification.remove();

        }, 400);

    }, 3000);

}


/* =========================================
   CONTACT FORM
========================================= */

function submitForm(event) {

    event.preventDefault();


    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const messageInput =
        document.getElementById("messageInput");


    const result =
        document.getElementById("result");


    // Get name
    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    // Get email
    const email =
        emailInput
            ? emailInput.value.trim()
            : "";


    // Get message
    const message =
        messageInput
            ? messageInput.value.trim()
            : "";


    /* =====================================
       VALIDATION
    ===================================== */

    if (name.length < 2) {

        showNotification(
            "Please enter a valid name.",
            "error"
        );

        nameInput.focus();

        return;
    }


    if (
        email &&
        !isValidEmail(email)
    ) {

        showNotification(
            "Please enter a valid email address.",
            "error"
        );

        emailInput.focus();

        return;
    }


    if (
        messageInput &&
        message.length < 5
    ) {

        showNotification(
            "Please enter a longer message.",
            "error"
        );

        messageInput.focus();

        return;
    }


    /* =====================================
       SUCCESS MESSAGE
    ===================================== */

    if (result) {

        result.innerHTML =
            `🎉 Thank you, <strong>${escapeHTML(name)}</strong>! 
            Your message has been submitted successfully.`;

        result.style.color =
            "#16a34a";

        result.style.opacity = "0";


        setTimeout(() => {

            result.style.transition =
                "opacity 0.5s ease";

            result.style.opacity = "1";

        }, 50);

    }


    showNotification(
        "Your message was submitted successfully! 🎉",
        "success"
    );


    // Reset form
    event.target.reset();

}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================
   SECURITY HELPER
========================================= */

function escapeHTML(text) {

    const element =
        document.createElement("div");

    element.textContent = text;

    return element.innerHTML;

}


/* =========================================
   BUTTON RIPPLE EFFECT
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;


        const ripple =
            document.createElement("span");

        ripple.classList.add("ripple");

        button.appendChild(ripple);


        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(
                rect.width,
                rect.height
            );


        ripple.style.width =
            `${size}px`;

        ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
            `${event.clientY - rect.top - size / 2}px`;


        setTimeout(() => {

            ripple.remove();

        }, 600);

    }
);
