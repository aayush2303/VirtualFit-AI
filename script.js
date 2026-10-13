/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("open");


    const icon =
        menuBtn.querySelector("i");


    if (mobileMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

        menuBtn.setAttribute(
            "aria-label",
            "Close navigation"
        );

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation"
        );

    }

});


/* Close menu after clicking a link */

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", function () {

        mobileMenu.classList.remove("open");


        const icon =
            menuBtn.querySelector("i");


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});

/* =========================
   ELEMENTS
========================= */

const personUpload =
    document.getElementById("personUpload");

const uploadCard =
    document.getElementById("uploadCard");

const generateBtn =
    document.getElementById("generateBtn");

const previewArea =
    document.getElementById("previewArea");

const processing =
    document.getElementById("processing");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const selectedGarment =
    document.getElementById("selectedGarment");

const selectedPrice =
    document.getElementById("selectedPrice");

const toast =
    document.getElementById("toast");


/* =========================
   IMAGE UPLOAD
========================= */

personUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        showToast("Please upload an image.");

        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        uploadCard.style.backgroundImage =
            `url(${event.target.result})`;

        uploadCard.style.backgroundSize =
            "cover";

        uploadCard.style.backgroundPosition =
            "center";

        uploadCard.style.color = "white";

        uploadCard.innerHTML = `

            <div style="
                background:rgba(0,0,0,.55);
                padding:25px;
                border-radius:12px;
            ">

                <i class="fa-solid fa-circle-check"
                   style="font-size:28px;"></i>

                <h4 style="margin-top:10px;">
                    Photo uploaded
                </h4>

                <p style="color:#eee;">
                    ${file.name}
                </p>

                <button
                    class="secondary-btn"
                    onclick="document.getElementById('personUpload').click()">

                    Change Photo

                </button>

            </div>
        `;

        showToast("Photo uploaded successfully.");

    };

    reader.readAsDataURL(file);

});


/* =========================
   GARMENT SELECTION
========================= */

const garments =
    document.querySelectorAll(".garment-card");


garments.forEach(card => {

    card.addEventListener("click", function () {

        garments.forEach(item => {

            item.classList.remove("selected");

        });

        this.classList.add("selected");

        const name =
            this.dataset.name;

        const price =
            this.dataset.price;

        selectedGarment.textContent =
            name;

        selectedPrice.textContent =
            price;

        showToast(`${name} selected.`);

    });

});


/* =========================
   GENERATE TRY-ON
========================= */

generateBtn.addEventListener("click", function () {

    const selected =
        document.querySelector(".garment-card.selected");

    if (!selected) {

        showToast("Please select a garment.");

        return;
    }


    /* Show processing */

    const placeholder =
        document.querySelector(".preview-placeholder");

    placeholder.style.display = "none";

    processing.classList.add("active");

    generateBtn.disabled = true;

    generateBtn.style.opacity = ".6";


    let progress = 0;


    const interval =
        setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 3;

            if (progress >= 100) {

                progress = 100;

                clearInterval(interval);

                setTimeout(() => {

                    finishGeneration();

                }, 500);

            }

            progressBar.style.width =
                progress + "%";

            progressText.textContent =
                progress + "%";

        }, 250);

});


/* =========================
   FINISH GENERATION
========================= */

function finishGeneration() {

    processing.classList.remove("active");

    generateBtn.disabled = false;

    generateBtn.style.opacity = "1";


    /*
       Demo result.

       Replace this section later
       with the actual AI API response.
    */

    previewArea.innerHTML = `

        <div class="generated-result">

            <div style="
                width:100%;
                height:100%;
                min-height:470px;
                display:flex;
                align-items:center;
                justify-content:center;
                position:relative;
                overflow:hidden;
                background:#e9e7e2;
            ">

                <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                    alt="Virtual try-on result">

                <div style="
                    position:absolute;
                    bottom:18px;
                    left:18px;
                    padding:9px 13px;
                    background:rgba(255,255,255,.9);
                    border-radius:20px;
                    font-size:9px;
                    backdrop-filter:blur(10px);
                ">

                    <i class="fa-solid fa-wand-magic-sparkles"></i>

                    AI Generated Preview

                </div>

            </div>

        </div>
    `;


    showToast(
        "Your virtual look is ready!"
    );

}


/* =========================
   FAVORITE
========================= */

const favoriteBtn =
    document.querySelector(".favorite-btn");

favoriteBtn.addEventListener("click", function () {

    this.classList.toggle("active");

    const icon =
        this.querySelector("i");

    if (this.classList.contains("active")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        showToast("Added to favorites.");

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        showToast("Removed from favorites.");

    }

});


/* =========================
   DOWNLOAD
========================= */

document
    .getElementById("downloadBtn")
    .addEventListener("click", function () {

        showToast(
            "Download feature ready for AI output."
        );

    });


/* =========================
   SHARE
========================= */

document
    .getElementById("shareBtn")
    .addEventListener("click", async function () {

        if (navigator.share) {

            try {

                await navigator.share({

                    title: "My VirtualFit Look",

                    text: "Check out my AI virtual try-on look!"

                });

            } catch (error) {

                console.log(error);

            }

        } else {

            showToast(
                "Share link copied."
            );

        }

    });


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.querySelector("span")
        .textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* =========================================================
   RESPONSIVE MOBILE / TABLET NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    const menuIcon = menuBtn.querySelector("i");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    function closeMenu() {
        mobileMenu.classList.remove("open");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");
    }

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle("open");

        if (isOpen) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
            menuBtn.setAttribute("aria-expanded", "true");
            menuBtn.setAttribute("aria-label", "Close navigation");
        } else {
            closeMenu();
        }
    }

    menuBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleMenu();
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    /* Close when clicking outside the menu */
    document.addEventListener("click", function (event) {
        if (
            mobileMenu.classList.contains("open") &&
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMenu();
        }
    });

    /* Close when pressing Escape */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    /* If browser is resized back to desktop, close mobile menu */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
});