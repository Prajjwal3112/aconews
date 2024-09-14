

# ACONEWS

ACONEWS is a news application that allows users to search and browse news articles across various categories. The app features a dynamic welcome section with animated text and a responsive design to accommodate various devices.

## Project Setup

To set up the ACONEWS project on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (includes npm)
- [React](https://reactjs.org/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/aconews.git
cd aconews
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

### API Setup

The project assumes a backend API is running locally on `http://localhost:3001/news`. If you have a different backend setup, update the API endpoint in the `fetchNews` function in `App.js`.

## Overview of the Approach

### Frontend

- **React**: Used for building the user interface with component-based architecture.
- **Tailwind CSS**: Utilized for styling to ensure a responsive and modern design.
- **Typed.js**: Implemented for animated text in the welcome section, though it's used in a custom manner with CSS for dynamic text changes.
- **Intersection Observer**: Applied for lazy-loading and animating news cards as they come into view.

### Key Features

- **Search and Filter**: Users can search for news articles and filter them by categories.
- **Infinite Scroll**: Implements pagination for loading news articles as the user scrolls.
- **Dynamic Welcome Text**: The welcome section features a fixed background image and dynamic text animations.

## Challenges and Solutions

### Challenge 1: Background Image Handling

**Issue**: Ensuring the background image behind the welcome text stayed fixed and did not interfere with other content.

**Solution**: Applied CSS properties `background-attachment: fixed` and `z-index` to the `welcome-text` section, ensuring the background image remains fixed while text and news cards stay properly layered.

### Challenge 2: Animated Text

**Issue**: Implementing dynamic text changes in the welcome section with animation.

**Solution**: Used a combination of CSS animations and React's state management to achieve a typewriter effect with text transitions between "you" and "everyone". Ensured compatibility by incorporating CSS keyframes and transition effects.

### Challenge 3: Handling Large Data and Pagination

**Issue**: Efficiently handling large sets of news articles and ensuring smooth pagination.

**Solution**: Used React's `useState` and `useEffect` hooks along with Intersection Observer API to manage infinite scrolling. Added debouncing to prevent excessive API calls and optimized rendering performance.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss the changes with the team.


