# News Dashboard Application

A responsive web application that provides a dashboard for viewing news articles and managing payouts. The application features user authentication, search and filter capabilities, and export functionality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Authentication**:
  - Secure login functionality using email-password authentication or third-party tools (e.g., Google, GitHub OAuth).
- **News and Blog Data Integration**:

  - Fetch data from free third-party news APIs (e.g., News API, Guardian API).
  - Display article/blog counts with details like author, date, and type.

- **Filtering and Search**:

  - Implement filters to allow users to search by:
    - Author
    - Date range
    - Type (e.g., news, blogs)
  - Global search bar for quick keyword searches.

- **Responsive Design**:

  - Fully responsive UI compatible with both mobile and desktop devices.

- **Payout Calculator**:

  - Admins can set a payout per article/blog value.
  - Store payout data in local storage.
  - Automatically calculate total payouts based on the number of articles/blogs and their rates.

- **Export Functionality**:

  - Enable users to export payout reports as:
    - PDF
    - CSV
    - Google Sheets integration.

- **Dark Mode**:

  - Toggle between light and dark themes for better user experience.

- **Error Handling**:
  - Graceful fallback for API failures (e.g., display a message if the news API is unreachable).

## Technologies Used

- **Frontend Frameworks**: React.js
- **State Management**: Context API
- **APIs and Integration**: Fetching and handling data from third-party REST APIs
- **Responsive Design**: CSS, Tailwind CSS
- **Build Tools**: Webpack, Babel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/news-dashboard.git

   ```

2. Navigate to the project directory:

````bash
cd news-dashboard
3. Install the dependencies:
```bash
npm install
4. Start the development server:
```bash
npm start
5. Open your browser and go to `http://localhost:3000`.

## Usage

- **Login**: Use your credentials to log in to the application.

- **Search Articles**: Use the search bar to find articles by keywords.

- **Filter Articles**: Apply filters to narrow down the articles based on:
- Author
- Date range
- Type (e.g., news, blogs)

- **View Payouts**: Check the calculated payouts based on the articles viewed.

- **Export Reports**: Export the payout reports in your desired format:
- PDF
- CSV
- Google Sheets

- **Toggle Dark Mode**: Switch between light and dark themes for better visibility.
````
