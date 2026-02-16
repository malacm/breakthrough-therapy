# Push to GitHub - Quick Guide

After creating your GitHub repository, run these commands:

```bash
# Add the remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Example:
If your GitHub username is `johndoe` and repo name is `breakthrough-therapy`:

```bash
git remote add origin https://github.com/johndoe/breakthrough-therapy.git
git branch -M main
git push -u origin main
```

After pushing, you can deploy to Vercel by:
1. Going to vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"


