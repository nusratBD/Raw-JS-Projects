const webTech = [
    "HTML", "CSS", "JavaScript", "React", "Angular", "Vue", "Svelte", "Next.js", "Nuxt.js", "Gatsby",
    "Tailwind CSS", "Bootstrap", "Material UI", "SASS", "LESS", "PostCSS", "jQuery", "TypeScript", "Redux", "MobX",
    "Node.js", "Express.js", "NestJS", "Fastify", "Koa", "MongoDB", "Mongoose", "MySQL", "PostgreSQL", "SQLite",
    "Firebase", "Supabase", "GraphQL", "Apollo Client", "REST API", "JSON", "AJAX", "XML", "WebSockets", "Socket.IO",
    "Webpack", "Vite", "Parcel", "Babel", "ESLint", "Prettier", "Jest", "Mocha", "Chai", "Cypress",
    "Vitest", "Storybook", "React Testing Library", "CI/CD", "Git", "GitHub", "GitLab", "Bitbucket", "Netlify", "Vercel",
    "Heroku", "Render", "Docker", "Kubernetes", "Nginx", "Apache", "OAuth", "JWT", "Cookies", "LocalStorage",
    "SessionStorage", "Service Workers", "WebAssembly", "PWA", "SEO", "Accessibility", "WAI-ARIA", "Lighthouse", "Core Web Vitals", "Performance Optimization",
    "Responsive Design", "Media Queries", "Viewport", "DOM", "BOM", "Canvas", "SVG", "Three.js", "D3.js", "Chart.js",
    "Contentful", "Sanity", "Strapi", "Headless CMS", "CMS", "WCAG", "CDN", "CORS", "SSL", "TLS"
  ];
  const searchBox=document.getElementById("search");
  const suggesstion=document.getElementById("suggesstion");
  const handlePress=(e)=>{
    suggesstion.innerHTML="";
    const searchVlue=searchBox.value.trim().toLowerCase().replace(/\s+/g, ' ');
    let searchResult=webTech.filter(data=>data.toLowerCase().startsWith(searchVlue));
    // console.log(searchResult.sort((a,b)=>a.localeCompare(b)));
    searchResult.forEach(data=>suggesstion.innerHTML+=`
        <p><a href="google.com" style="text-decoration: none; color:black">${data}</a></p>
        `)
  }
