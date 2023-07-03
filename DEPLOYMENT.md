# Deployment

Back to Readme [here](README.md)

# Table Of Contents

- [Vite Build](#vite-build)
- [Hosting Site](#hosting-site)
- [Fork Repository](#fork-repository)
- [Workspace](#workspace)
- [Heroku Deployment](#heroku-deployment)
- [Update Repository](#update-repository)
- [Vercel Deployment](#vercel-deployment)
- [Link Vercel To GitHub](#link-vercel-to-github)

<br>

## Vite Build

Please note this project was developed with Vite rather than Create React App. This was because the for the complexity of project being built Vite was the faster more efficient build tool. However, it should be noted this does have some minor impact to the deployment steps.

## Hosting Site

Due to this React application being built with Vite it proved a challange to host it on Heroku which was not one of its prefered hosting sites which can be found [here](https://vitejs.dev/guide/static-deploy.html).

As a result Vercel was choosen to host the site.

## Fork Repository

1. Login to GitHub.
2. Access the [BitWise-Front-End](https://github.com/Joe-Collins-1986/BitWise-Front-End).
3. Click the Fork button at the top of the page.

## Workspace

1. Open your prefered workspace (Visual Studio Code, etc...).

Following instructions are for Visual Studio Code:

2.  Open the Command Palette and search Git Clone.
3.  Provide the URL of the copied BitWise-Front-End repository.
4.  Choose a directory on your local computer where you want to clone the repository.
5.  cd into project file.
6.  Install the dependencies from the package.json file:

        npm install

7.  Run on local server:

        npm run dev

8.  Make any amendments required to the file makeing sure to update the backend url location to the appropriate backend developed alongside this front end clone.

9.  When ready to deploy run:

    npm run build

## Update Repository

1. When adding a new feature create a separate branch to work in safely typing into the terminal "git branch 'name of required feature/update'".
2. Checkout the branch with "git checkout 'name of required feature/update'".
3. Make updates and test using "npm run dev".
4. Once testing is complete add to Git staging area using "git add ."
5. Commit the changes and add a useful explanation of what action was done to track the history in GitHub using "git commit -m 'explanation of update'".
6. Once the feature is complete, fully tested, and ready to be added to the main branch first go to the main branch using "git checkout main".
7. Merge the feature branch into the main using "git merge 'name of required feature/update'".
8. Confirm merge was successful and then if it is not going to be re-used delete the feature branch using "git branch -d 'name of required feature/update'". (If deleting a branch with commits not merged to main delete with -D instead of -d)
9. Use "git push" to push the commits to GitHub. These will then appear in the live website if Vercel is linked to the Github Repository (detailed below).

## Vercel Deployment

1. Sign up for Vercel. Go to the [Vercel website](https://vercel.com/) and sign up for an account. You can use your GitHub account to log in.
2. Install Vercel CLI. cd into React app and run:

   npm install -g vercel

**Note** If using a Mac you may need to prefix this with sudo:

    sudo npm install -g vercel

3. After installation run 'vercel' in terminal.
4. Select 'Continue with GitHub'
5. Hit 'Y' for Set up and deploy
6. Select account to deploy to
7. Select 'N' to link to existing project
8. Accept default project name
9. Accept default to which directory code is located
10. Select 'N' to modify build settings
11. Use link provided to access live site

## Link Vercel To GitHub

1. Login to [Vercel website](https://vercel.com/) with GitHub account
2. Select project
3. Select 'Connect Git Repository'
4. Select 'GitHub'
5. Select 'Connect' on appropriate repository
6. Now all updates to GitHub via Push requests will be reflected in live site.
