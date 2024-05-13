# [24cast.org](https://24cast.org) Website Repository

### The complete collection of code underlying [24cast.org](https://24cast.org). 

*If you're looking for the codebase for our model, [click here](https://github.com/BPR-Data-Team/ElectionModel2024).*

This site uses next.js and React. Our backend runs on AWS with DynamoDB.

---

<details>
  <summary>How do I run a clone of this site on my system?</summary>summary>

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

If you're using GitHub pages to host your clone, you'll want to update next.config.js.
Update the appropriate line with ```basePath: isProd ? "/<your subdirectory>" : "",```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

</details>

---

## License
Shield: [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

24cast Website © 2024 by the Brown Political Review is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
