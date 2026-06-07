// =====================================
// VIDEO MODAL
// =====================================

const pillButton = document.getElementById("pillButton");
const videoModal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const laughVideo = document.getElementById("laughVideo");

pillButton.addEventListener("click", () => {
    videoModal.style.display = "flex";
    laughVideo.play();
});

closeModal.addEventListener("click", () => {
    videoModal.style.display = "none";
    laughVideo.pause();
    laughVideo.currentTime = 0;
});

window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = "none";
        laughVideo.pause();
        laughVideo.currentTime = 0;
    }
});


// =====================================
// STRENGTH SECTION
// =====================================

const strengthMessage =
    document.getElementById("strengthMessage");

async function sendStrengthChoice(choice) {

    try {

        await fetch(
            "https://backend-n3il.onrender.com/api/strength-choice",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    choice
                })
            }
        );

    } catch (err) {

        console.log(err);

    }

}

function showStrengthMessage(type) {

    if (type === "fighter") {

        strengthMessage.innerHTML = `
            <div class="message-card">

                <p>

                    I know you want to fight
                    your own battles.

                    <br><br>

                    And honestly,
                    I'm proud of that.

                    <br><br>

                    Life has thrown a lot at you
                    recently, yet every day you
                    still get up and keep going.

                    <br><br>

                    Even when it feels messy.
                    Even when it feels unfair.

                    <br><br>

                    That strength is something
                    I admire more than I can
                    explain.

                    ❤️

                </p>

            </div>
        `;

        sendStrengthChoice(
            "FIGHTING_THROUGH_IT"
        );

    }

    else {

        strengthMessage.innerHTML = `
            <div class="message-card">

                <p>

                    And if there ever comes
                    a day when carrying
                    everything alone feels
                    too heavy...

                    <br><br>

                    You don't have to.

                    <br><br>

                    Not because you're weak.

                    Not because you're incapable.

                    <br><br>

                    But because nobody is meant
                    to carry every burden alone.

                    <br><br>

                    If you ever need me,
                    I'll be here.

                    ❤️

                </p>

            </div>
        `;

        sendStrengthChoice(
            "OPEN_TO_SUPPORT"
        );

    }

}

// =====================================
// DATE BUTTONS
// =====================================

const yesBtn = document.getElementById("yesBtn");
const notNowBtn = document.getElementById("notNowBtn");
const responseMessage = document.getElementById("responseMessage");

// Replace later with your deployed backend URL
const API_URL =
    "https://backend-n3il.onrender.com/api/date-response";

// =====================================
// SEND RESPONSE TO BACKEND
// =====================================

async function sendResponse(choice) {

    try {

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                response: choice,
                timestamp: new Date().toISOString()
            })
        });

    } catch (error) {

        console.log(
            "Notification service unavailable:",
            error
        );

        // User never sees this
    }
}

// =====================================
// YES BUTTON
// =====================================

yesBtn.addEventListener("click", async () => {


    responseMessage.innerHTML = `
        <div class="response-card success">
            ❤️ That made me smile.
            <br><br>
            Looking forward to it.
        </div>
    `;

    await sendResponse("YES");

});

// =====================================
// NOT RIGHT NOW BUTTON
// =====================================

notNowBtn.addEventListener("click", async () => {

    responseMessage.innerHTML = `
        <div class="response-card neutral">
            ❤️ That's completely okay.
            <br><br>
            Thank you for answering.
        </div>
    `;

    await sendResponse("NOT_RIGHT_NOW");

});

// =====================================
// SIMPLE SCROLL REVEAL
// =====================================

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".note-card, .gallery-card, .proud-card, .date-card, .final-card"
).forEach(card => {

    card.classList.add("hidden");
    observer.observe(card);

});

// =====================================
// HERO IMAGE AUTO SCROLL
// =====================================

const heroSlider = document.querySelector(".photo-slider");

let scrollDirection = 1;

setInterval(() => {

    if (!heroSlider) return;

    const maxScroll =
        heroSlider.scrollWidth -
        heroSlider.clientWidth;

    if (heroSlider.scrollLeft >= maxScroll) {
        scrollDirection = -1;
    }

    if (heroSlider.scrollLeft <= 0) {
        scrollDirection = 1;
    }

    heroSlider.scrollLeft +=
        300 * scrollDirection;

}, 40000);

// =====================================
// GALLERY FULLSCREEN VIEW
// =====================================

const galleryImages =
    document.querySelectorAll(".gallery-card img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const overlay =
            document.createElement("div");

        overlay.className = "image-overlay";

        overlay.innerHTML = `
            <img src="${image.src}" alt="">
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });

    });

});

// =====================================
// BIRTHDAY CONFETTI EFFECT
// =====================================

function createSparkle() {

    const sparkle =
        document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
        Math.random() * window.innerWidth + "px";

    sparkle.style.top =
        window.scrollY + window.innerHeight + "px";

    sparkle.innerHTML = "✨";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 5000);

}

setInterval(createSparkle, 1500);

// =====================================
// AGE CHECK (OPTIONAL)
// =====================================

function calculateAge() {

    const birthDate =
        new Date("2003-06-07");

    const today =
        new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDiff =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (
            monthDiff === 0 &&
            today.getDate() <
            birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}

console.log(
    `Happy ${calculateAge()}rd Birthday Shreeya ❤️`
);

// =====================================
// PAGE LOADED
// =====================================

window.addEventListener("load", async () => {

    document.body.classList.add("loaded");

    console.log(
        "Birthday website loaded successfully ❤️"
    );

    // Send notification only once per browser

    if (
        localStorage.getItem(
            "siteOpenedNotification"
        )
    ) {
        return;
    }

    localStorage.setItem(
        "siteOpenedNotification",
        "true"
    );

    try {

        await fetch(
            "https://backend-n3il.onrender.com/api/site-opened",
            {
                method: "POST"
            }
        );

        console.log(
            "Site open ❤️"
        );

    } catch (err) {

        console.log(
            "failed:",
            err
        );

    }

});
