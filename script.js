/* ===========================
   IMAGE LIGHTBOX
=========================== */

const images = document.querySelectorAll(".case-image");

const lightbox = document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightbox-image");

const lightboxCaption =
document.getElementById("lightbox-caption");

const closeButton =
document.querySelector(".close-lightbox");

images.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightboxCaption.textContent =
            image.alt;

        document.body.style.overflow = "hidden";

    });

});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function(event){

    if(event.target === lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        closeLightbox();

    }

});

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}

const username = "JackyLin22";

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {

    const repoList =
      document.getElementById("repo-list");

    repoList.innerHTML = "";

    repos
      .filter(repo => !repo.fork)
      .sort((a, b) =>
        b.stargazers_count - a.stargazers_count
      )
      .slice(0, 6)
      .forEach(repo => {

        const card =
          document.createElement("div");

        card.className = "repo-card";

        card.innerHTML = `
          <h3>${repo.name}</h3>

          <p>
            ${repo.description ||
            "Project repository"}
          </p>

          <p>
            <strong>
              ${repo.language || "Code"}
            </strong>
          </p>

          <a
            href="${repo.html_url}"
            target="_blank"
          >
            View Repository →
          </a>
        `;

        repoList.appendChild(card);

      });

  })
  .catch(error => {

    document.getElementById(
      "repo-list"
    ).innerHTML =
      "<p>Unable to load GitHub projects.</p>";

    console.error(error);

  });