/* ==========================================================
   Jacky Lin Portfolio
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeLightbox();
    loadGitHubProjects();
});

/* ==========================================================
   IMAGE LIGHTBOX
========================================================== */

function initializeLightbox() {

    const images = document.querySelectorAll(".case-image");

    if (images.length === 0) return;

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.querySelector(".close-lightbox");

    if (!lightbox || !lightboxImage || !closeButton) return;

    images.forEach(image => {

        image.addEventListener("click", () => {

            lightbox.classList.add("active");

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightboxCaption.textContent = image.alt;

            document.body.style.overflow = "hidden";

        });

    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";

    }

}

/* ==========================================================
   GITHUB PROJECTS
========================================================== */

async function loadGitHubProjects() {

    const repoList = document.getElementById("repo-list");

    // Don't run on pages without the GitHub section
    if (!repoList) return;

    const username = "JackyLin22";

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );

        if (!response.ok) {
            throw new Error("Unable to load GitHub repositories.");
        }

        const repos = await response.json();

        repoList.innerHTML = "";

        repos
            .filter(repo => !repo.fork)
            .sort((a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, 6)
            .forEach(repo => {

                const card = createRepoCard(repo);

                repoList.appendChild(card);

            });

    }

    catch (error) {

        console.error(error);

        repoList.innerHTML = `
            <p>
                Unable to load GitHub projects.
            </p>
        `;

    }

}

/* ==========================================================
   CREATE REPOSITORY CARD
========================================================== */

function createRepoCard(repo) {

    const card = document.createElement("article");

    card.className = "repo-card";

    card.innerHTML = `

        <h3>${repo.name}</h3>

        <p>
            ${repo.description || "No description available."}
        </p>

        <p>
            <strong>Language:</strong>
            ${repo.language || "N/A"}
        </p>

        <p>
            ⭐ ${repo.stargazers_count}
        </p>

        <a
            href="${repo.html_url}"
            target="_blank"
            rel="noopener noreferrer"
        >
            View Repository →
        </a>

    `;

    return card;

}