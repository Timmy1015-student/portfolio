# My Profile Website

This project is a personal profile website that showcases my basic information, projects, and experiences. It is built using React and TypeScript, and is designed to provide a clean and informative interface for visitors.

## Features

- Display of personal information including:
  - Name
  - Profile photo
  - Email
  - YouTube channel link
  - University information
- List of projects with detailed links
- List of experiences with detailed links

## Project Structure

```
my-profile-website
├── public
│   ├── index.html         # Main HTML file for the website
│   └── favicon.ico        # Website icon
├── src
│   ├── assets
│   │   └── profile-photo.svg  # Profile photo asset
│   ├── components
│   │   ├── Header.tsx         # Component for the header section
│   │   ├── ProjectList.tsx     # Component for displaying project list
│   │   └── ExperienceList.tsx   # Component for displaying experience list
│   ├── pages
│   │   └── Home.tsx           # Home page component
│   ├── data
│   │   ├── projects.ts         # Data file for projects
│   │   └── experiences.ts      # Data file for experiences
│   └── types
│       └── index.ts           # Type definitions for projects and experiences
├── package.json               # NPM configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-profile-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Deployment

This project can be deployed on GitHub Pages or any other hosting service. For GitHub Pages, you can follow these steps:

1. Build the project:
   ```
   npm run build
   ```

2. Deploy the `build` folder to GitHub Pages.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.