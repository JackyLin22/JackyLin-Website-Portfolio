document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("form-message").textContent = "Thanks for your message!";
  this.reset();
});

const username = "JackyLin22"; // <-- change this

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const repoList = document.getElementById("repo-list");
    repoList.innerHTML = "";

    repos
      .filter(repo => !repo.fork) // hide forked repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6) // show top 6 projects
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "repo-card";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
        `;

        repoList.appendChild(card);
      });
  })
  .catch(error => {
    document.getElementById("repo-list").innerHTML =
      "<p>Failed to load GitHub projects.</p>";
    console.error(error);
  });