# Contributing

:wave: Hi there!
We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

## Submitting a pull request

[Pull Requests][pulls] are used for adding new playbooks, roles, and documents to the repository, or editing the existing ones.

**With write access**

1. Open a issue
2. After some discussion, label your issue with `WIP`
3. Clone the repository (only if you have write access)
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your change
6. Is super important to use `npm run commit` to commit your files because we use [semantic-commit](https://www.npmjs.com/package/semantic-release), so this script force you to use linter and wil format your commit message to semantic-release bot can publish your new feature. 
7. Push and [submit a pull request][pr]
8. Pat yourself on the back and wait for your pull request to be reviewed and merged.

**Without write access**

1. Open a issue
2. After some discussion, label your issue with `WIP`
3. [Fork][fork] and clone the repository
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your change
6. Is super important to use `npm run commit` to commit your files because we use [semantic-commit](https://www.npmjs.com/package/semantic-release), so this script force you to use linter and wil format your commit message to semantic-release bot can publish your new feature. 
7. Push to your fork and [submit a pull request][pr]
8. Pat your self on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Draft pull requests are also welcome to get feedback early on, or if there is something blocking you.

- Create a branch with a name that identifies the user and nature of the changes (similar to `user/branch-purpose`)

**Commit Structure**
All the Herbs organization libraries uses [seemantic release](https://www.npmjs.com/package/semantic-release) and commitizen to :

- Generate changelog
- Control version
- Publish to npm via github actions
Please use `mpm run commit` for commit .


## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)