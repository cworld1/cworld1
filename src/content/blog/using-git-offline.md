---
title: 'How to Use Git Offline'
description: 'Sometimes you may need to use Git offline, and build a workflow that works without a central server.'
publishDate: '2024-05-17'
updatedDate: '2024-05-18'
tags: ['git', 'offline']
language: English
---

> This is an article reffered from [/james/notes/computers](https://www.gibbard.me/using_git_offline/)

Some companies use an isolated network or even the complete lack of a network as a security measure to protect from unauthorized access. Working on these systems can be a struggle but it is still possible, and perhaps even more important, to use a proper version control tool like Git.

## Working with only one machine

By design Git works quite happily with no remote repository. You can branch, stage, and commit files just like normal.

```bash
mkdir testRepo
cd testRepo
git init
touch test.txt
git add --all
git commit -m "Initial Commit"
```

This works great if just a single machine is used for development, but this is often not the case. In the after content, we will look at how to work with multiple machines.

##  Cooperate using a USB memory stick/HDD

When security policy allows read/write access to a memory stick or portable hard drive a remote repository can be created on this device.

On one development machine mount the memory stick.

```bash
cd /path/to/memory/stick
mkdir repoName.git
cd repoName.git
git init --bare
```

Navigate to the repository that is to be shared, add the remote repository on the memory stick, and push the changes.

```bash
cd /path/to/local/repo/
git remote add origin /path/to/memory/stick/repoName.git
git push origin master
```

NB. The remote can be called anything. It doesn’t have to be called “origin”.

Unmount the memory stick and mount it on another development machine.

If the development machine does not have a copy of the repository on it already then git clone can be used.

```bash
git clone /path/to/memory/stick/repoName.git
```

If there is a copy of the repository already on the machine add the memory stick as a remote and fetch/pull the changes.

```bash
cd /path/to/local/repo/
git remote add origin /path/to/memory/stick/repoName.git
git pull origin
```

From now on use Git as normal but make sure that whenever a git pull, fetch, or push is performed the memory stick is mounted on the machine.

Ensure the memory stick is part of your backup routine.

## Cooperate  using CD/DVDs

In locked down development environments memory sticks may be blocked. Using Git is still possible, but a little be more inconvenient.

Git will happily fetch changes from one copy of a local repository to another. One option then is to simply copy the directory containing the local Git repository to another computer via CD or other media and make changes and commits like normal on both machines. When you want to combine changes select one machine to perform the merge and copy the other repository over to this machine. To pull all the changes into the current branch use:

```bash
git pull /path/to/other/repo
```

Alternatively you can fetch the changes and create a new branch to store them:

```bash
git fetch /path/to/other/repo
git checkout -b new_branch FETCH_HEAD
```

At this point create a new copy of the repository complete with merges and move it over to the other machine/s. Pull the latest changes into the other repositories or if desired simply replace the whole repository with the new copy.

Obviously this is far from optimal. Copying the whole repository directory will include personal settings and files excluded in the .gitignore file. To mitigate this Git clone could be used to duplicate the repository rather than just copying it, but a much better option is to use git bundle.

### Git bundle

A git bundle allows for part or all of a repository to be compressed into a single file in a format that git is able to clone and fetch from.

The workflow works very similar to before, but instead of copying the whole repository directory a git bundle is created. On the first machine create a bundle using:

```bash
git bundle create repoName.bundle --all
```

The `-- all` option bundles the entire repository including all branches and tags. Specific branches or tags can be selected using `-b branchName` or `-t tagName`.

Copy the repoName.bundle file to another computer. To clone the repository simply use:

```bash
git clone repoName.bundle
```

Changes and commits can be made on any of the computers then like before one machine must be selected to perform the merge. On the non-merging machine make sure all changes are committed and create a bundle using:

```bash
git bundle create repoName.bundle --all
```

For larger repositories it is a good idea to only bundle part of the repository to avoid transferring more data than needed. For example to only include the last 5 commits on the master branch use:

```bash
git bundle create repoName.bundle -5 master
```

It is important that there are no gaps between the commits in the bundle and the commits on the repository where the merging will occur or the process will fail.

Copy the bundle to the computer where the merge will occur and pull the changes using:

```bash
git pull /path/to/repoName.bundle
```

Once the merging/rebasing is done create another bundle using:

```bash
git bundle create repoName.bundle --all
```

In the above command `--all` can be replaced with the desired subset of repos/commits.

Move the bundle file to the other machine/s and update the changes there using:

```bash
git pull /path/to/repoName.bundle
```

### Creating a local remote repository

Bundles solve the problem of synchronising Git repositories without a network, but we are still left with multiple computers all likely to be slightly out of sync with each other. If a new developer joins the team who do they copy the repository from? The best option is to select one development machine that will act as the “server”. A bare Git repository can be created on this development machine in addition to a local clone of the repository where the developer will actually work.

```bash
cd /path/to/store/main/repo
mkdir remoteRepoName.git
cd remoteRepoName.git
git init --bare
```

Next navigate to the local git repository or create a new one and add the remoteRepoName.git repository as a remote repository.

```bash
cd /path/to/local/repo/
git remote add origin /path/to/store/main/repo/remoteRepoName.git
git push origin branchName
```

Changes can then be made in the local repository, or pulled from bundles created on other development machines. Whenever changes are made they can be pushed to the remote using:

```bash
git push origin branchName
```

## Summary

The distributed nature of Git allows it to work well without a central server. While the options presented will never be as convenient as just pushing to github they certainly beat the alternative of: `main_v1_final version_with_bobs_extra_patch finalfinal_version`.
