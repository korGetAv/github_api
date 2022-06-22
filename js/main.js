'use strict';
import GitController from "./classes/GitController.js";

// Controller
const gitController = new GitController();
// DOM Variables
const headerButton = document.querySelector('.header__button');
const headerInput = document.querySelector('.header__input');
const gitUsers = document.querySelector('.git-users');

headerButton.addEventListener('click', main);
headerInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        main()
    }
});

function main() {
    let nickname = headerInput.value;

    if (nickname.length > 0) {
        let userPromise = gitController.userPromise(nickname);
        userPromise.then(
            user => {
                const userHTML = user.userHTML;
                const userId = user.id;
                gitUsers.insertAdjacentHTML('beforeend', userHTML);

                const gitUser = gitUsers.querySelector(`#user_${userId}`);
                addClickListener(gitUser);
            });
    } else {
        alert('Incorrect request');
    }
}

function addClickListener(gitUser) {
    let title = gitUser.querySelector('h2');
    let icon = title.querySelector('img');
    let reposes = gitUser.querySelector('.git-user__repositories');

    if (reposes) {
        let reposesHeight = reposes.offsetHeight;
        reposes.style.height = '0px';

        title.addEventListener('click', () => {
            if (reposes.classList.contains('_active')) {
                reposes.style.height = '0px';
            } else {
                reposes.style.height = `${reposesHeight}px`;
            }
            reposes.classList.toggle('_active');
            icon.classList.toggle('_active');
        });

        window.addEventListener('click', (e) => {
            let target = e.target.closest('.git-user__nav');

            if (!target && reposes.classList.contains('_active')) {
                reposes.style.height = '0px';
                reposes.classList.remove('_active');
                icon.classList.remove('_active');
            }
        });
    }
}