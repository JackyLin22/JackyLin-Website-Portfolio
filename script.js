const username = "YOUR_GITHUB_USERNAME";

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