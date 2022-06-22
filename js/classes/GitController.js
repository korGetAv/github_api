'use strict';

class GitController {
    async userPromise(nickname) {
        const userUrl = `https://api.github.com/users/${nickname}`;
        const reposUrl = `https://api.github.com/users/${nickname}/repos`;

        const userPromise = await fetch(userUrl);
        const reposPromise = await fetch(reposUrl);

        if (userPromise.ok && reposPromise.ok) {
            const user = await userPromise.json();
            const reposes = await reposPromise.json();

            const gitUser = this._createUserHTML(user.avatar_url, user.login, user.name, user.id, reposes);
            return gitUser;
        } else if (userPromise.status == '403') {
            alert('The server was closed, try again later');
        } else if (userPromise.status == '404') {
            alert('Not Found');
        }
    }

    _createUserHTML(avatar_url, login, name, id, reposes) {
        let reposesHTML = '';

        reposes.forEach(repos => {
            let reposHTML = `
            <li class="git-user__repository">
                <a target="_blank" href="${repos.html_url}">${repos.name}</a>
            </li>`;

            reposesHTML += reposHTML;
        })

        let userHTML = `
            <div class="git-user" id="user_${id}">
                <div class="git-user__image">
                    <img src="${avatar_url}" alt="github avatar">
                </div>
                <div class="git-user__login"><span>Login:</span> ${login}</div>
                <div class="git-user__name"><span>Name:</span> ${name}</div>
                <nav class="git-user__nav">
                    <h2>
                        Repositories
                        <img src="img/more.svg" alt="more icon">
                    </h2>
                    <ul class="git-user__repositories">
                    ${reposesHTML}
                    </ul>
                </nav>
            </div>`;

        return { userHTML, id };
    }
}

export default GitController;