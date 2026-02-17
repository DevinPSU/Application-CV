# Academic Website - Devin J. Hendrix

This is my personal academic website built with [Quarto](https://quarto.org/), featuring my CV and blog posts about my research.

## Features

- Professional CV homepage with Because Recollection-inspired design
- Blog functionality for research updates
- Automated deployment to GitHub Pages
- Responsive, high-contrast design
- Orange (#e47839) and blue (#002fa7) accent colors
- Montserrat and Inconsolata typography

## Table of Contents

- [Creating a New Blog Post](#creating-a-new-blog-post)
- [Blog Post Structure](#blog-post-structure)
- [YAML Frontmatter Options](#yaml-frontmatter-options)
- [Adding Images to Posts](#adding-images-to-posts)
- [Local Development](#local-development)
- [Publishing Workflow](#publishing-workflow)
- [Deployment](#deployment)
- [Technologies](#technologies)

## Creating a New Blog Post

Follow these steps to create a new blog post:

### Step 1: Create a Post Directory

Each blog post should be in its own directory under `posts/`. Use a descriptive, URL-friendly name:

```bash
mkdir -p posts/my-post-title
```

**Naming conventions:**
- Use lowercase letters
- Use hyphens instead of spaces (e.g., `my-research-update` not `My Research Update`)
- Keep it concise but descriptive
- Example: `posts/cryo-em-workflow/`, `posts/protein-purification-tips/`

### Step 2: Create the Post File

Create an `index.qmd` file inside your new directory:

```bash
touch posts/my-post-title/index.qmd
```

**Why `index.qmd`?** This naming convention allows you to keep all post assets (images, data files) organized in the same directory.

### Step 3: Add YAML Frontmatter

At the top of your `index.qmd` file, add the YAML frontmatter (metadata) between `---` markers:

```yaml
---
title: "Your Post Title Here"
author: "Devin J. Hendrix"
date: "2026-02-17"
categories: [research, cryo-em, tutorial]
description: "A brief description of your post that appears in listings"
image: "thumbnail.jpg"  # optional
draft: false  # set to true to hide from listings
---
```

### Step 4: Write Your Content

After the YAML frontmatter, write your post content using Markdown:

```markdown
## Introduction

Your introduction here...

## Methods

Details about your methods...

### Subsection

More specific details...

## Results

Your findings...

## Conclusion

Wrap up your post...
```

### Step 5: Preview Your Post

Before publishing, preview your post locally:

```bash
quarto preview
```

This will open a browser window showing your website. Navigate to the Blog section to see your new post.

## Blog Post Structure

### Basic Structure

```
posts/
└── my-post-title/
    ├── index.qmd          # Main post file (required)
    ├── image1.jpg         # Post images (optional)
    ├── image2.png         # More images (optional)
    └── data.csv           # Data files (optional)
```

### Example Post Directory

```
posts/
└── cryo-em-workflow/
    ├── index.qmd          # Post content
    ├── thumbnail.jpg      # Featured image
    ├── workflow-diagram.png
    └── results-graph.png
```

## YAML Frontmatter Options

Here's a comprehensive list of YAML frontmatter fields you can use:

```yaml
---
title: "Your Post Title"                    # Required: Main title of the post
author: "Devin J. Hendrix"                  # Optional: Author name
date: "2026-02-17"                          # Required: Publication date (YYYY-MM-DD)
date-modified: "2026-02-20"                 # Optional: Last updated date
categories: [research, tutorial]            # Optional: Post categories/tags
description: "Brief summary of the post"    # Optional: Short description (recommended)
image: "featured.jpg"                       # Optional: Featured image
draft: false                                # Optional: If true, post won't appear in listings
title-block-banner: true                    # Optional: Add banner to title
title-block-banner-color: "#e47839"        # Optional: Custom banner color
---
```

### Field Descriptions

- **title**: The main headline of your post (appears large at the top)
- **author**: Your name or "Devin J. Hendrix"
- **date**: Publication date in YYYY-MM-DD format (determines sorting order)
- **categories**: List of tags in brackets `[tag1, tag2, tag3]`
- **description**: Brief summary shown in blog listing (1-2 sentences)
- **image**: Path to featured image (relative to the post directory)
- **draft**: Set to `true` to hide post from public listings while working on it

### Category Suggestions

Choose relevant categories for your posts:

- **Research areas**: `cryo-em`, `protein-purification`, `structural-biology`, `microscopy`
- **Content type**: `tutorial`, `research-update`, `conference`, `publication`
- **Techniques**: `western-blot`, `sds-page`, `itc`, `hplc`
- **General**: `lab-life`, `career`, `tips`, `troubleshooting`

## Adding Images to Posts

### Method 1: Images in Post Directory (Recommended)

1. Place images in your post directory:
   ```
   posts/my-post/
   ├── index.qmd
   └── my-image.jpg
   ```

2. Reference them in your post:
   ```markdown
   ![Description of image](my-image.jpg)
   ```

### Method 2: Central Images Directory

1. Create an images directory (if needed):
   ```bash
   mkdir -p posts/my-post/images
   ```

2. Place images there and reference:
   ```markdown
   ![Description](images/my-image.jpg)
   ```

### Image Best Practices

- **File formats**: Use `.jpg` for photos, `.png` for diagrams/screenshots
- **File size**: Optimize images (< 500KB recommended) for faster loading
- **Naming**: Use descriptive names (`protein-gel-result.jpg` not `IMG_1234.jpg`)
- **Alt text**: Always provide descriptive alt text for accessibility

### Image Example with Caption

```markdown
![Cryo-EM micrograph showing protein structure](cryo-em-result.jpg)

*Figure 1: Cryo-EM structure of the protein complex at 3.2Å resolution*
```

## Local Development

### Preview the Website

Start a local preview server that auto-refreshes:

```bash
quarto preview
```

This opens `http://localhost:XXXX` in your browser. Changes to files will automatically refresh the preview.

### Render the Website

Build the complete site without starting a server:

```bash
quarto render
```

This creates the `_site/` directory with all HTML files.

### Check a Specific Post

Preview just one post:

```bash
quarto preview posts/my-post-title/index.qmd
```

## Publishing Workflow

### Complete Workflow

1. **Create your post** following the steps above

2. **Preview locally** to check formatting:
   ```bash
   quarto preview
   ```

3. **Check your changes**:
   ```bash
   git status
   git diff posts/
   ```

4. **Stage your new post**:
   ```bash
   git add posts/your-post-title/
   ```

5. **Commit your changes**:
   ```bash
   git commit -m "Add new blog post: Your Post Title"
   ```

6. **Push to GitHub**:
   ```bash
   git push origin main
   ```

7. **Wait for deployment** (2-3 minutes):
   - GitHub Actions will automatically build and deploy your site
   - Monitor progress at: `https://github.com/DevinPSU/Application-CV/actions`

8. **View your published post**:
   - Visit: `https://devinpsu.github.io/Application-CV/blog.html`

### Quick Publish Command

For experienced users, combine steps 4-6:

```bash
git add posts/your-post-title/ && \
git commit -m "Add blog post: Your Title" && \
git push origin main
```

## Deployment

The website automatically deploys to GitHub Pages via GitHub Actions whenever changes are pushed to the main branch.

### Deployment Process

1. Push commits to `main` branch
2. GitHub Actions workflow triggers (`.github/workflows/publish.yml`)
3. Quarto renders the website
4. Built site deploys to GitHub Pages
5. Site is live at `https://devinpsu.github.io/Application-CV/`

### Monitoring Deployment

- View workflow runs: `https://github.com/DevinPSU/Application-CV/actions`
- Typical deployment time: 2-3 minutes
- Green checkmark ✓ means successful deployment
- Red X ✗ means deployment failed (click for error details)

## Technologies

- [Quarto](https://quarto.org/) - Scientific publishing system
- [GitHub Pages](https://pages.github.com/) - Hosting
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [Montserrat](https://fonts.google.com/specimen/Montserrat) - Heading font
- [Inconsolata](https://fonts.google.com/specimen/Inconsolata) - Body font

## Troubleshooting

### Post Not Appearing in Blog

- Check that `draft: false` (or omit the draft field)
- Ensure date is not in the future
- Verify file is named `index.qmd` (not `index.md`)
- Run `quarto render` to check for errors

### Images Not Loading

- Check image path is relative to post directory
- Verify image file exists and name matches exactly (case-sensitive)
- Ensure image is in the post directory, not the root

### Formatting Issues

- Validate YAML frontmatter (proper indentation, quotes)
- Check that `---` markers are on their own lines
- Ensure there's a blank line after frontmatter before content

## Additional Resources

- [Quarto Documentation](https://quarto.org/docs/guide/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Quarto Blogging Guide](https://quarto.org/docs/websites/website-blog.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages) 
