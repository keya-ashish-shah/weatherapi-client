# 🌤️ WeatherAPI Client

This is the **React frontend** for the **WeatherAPI Project**, a full-stack weather dashboard that provides real-time weather updates, user authentication, and personalized search history.  
It connects to the backend (`weatherapi-server`) via RESTful APIs to fetch and display weather data.

---

##  Features

**User Authentication**
- Login and Signup functionality using React Context API.
- Secure API integration for authentication.
- Form validation and feedback messages.

 **Weather Dashboard**
- Displays live weather data (temperature, humidity, wind speed, etc.).
- Fetches weather data dynamically through backend APIs if data is cached or from the open meteo live api.


 **Search History & Caching**
- Maintains a user’s weather search history in mongo atlas.
- Reduces unnecessary API calls by caching results on the backend.

 **Responsive UI**
- Built with React and CSS for seamless mobile and desktop use.
- Sidebar layout with easy navigation.

 **Reusable Components**
- Modular components (`Sidebar`, `WeatherPage`, etc.) for easy maintenance and scalability.

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Create React App) |
| State Management | React Context API |
| Styling | CSS / Modular CSS |
| API Handling | Axios / Fetch |
| Routing | React Router |
| Authentication | Custom Auth Context integrated with backend |
| Data Source | Weather API (via backend service) |

---

## Getting Started

###  Clone the repository
```bash
git clone https://github.com/keya-ashish-shah/weatherapi-client.git
cd weatherapi-client



## Install dependencies



  "axios": "^1.6.0",                 // For making API calls to your backend
  "react": "^18.2.0",                // Core React library
  "react-dom": "^18.2.0",            // DOM rendering for React
  "react-router-dom": "^6.22.0",     // Routing between pages (Login, Weather, Home)
  "react-scripts": "5.0.1",           // Scripts used by Create React App (build/start/test)
  "recharts": "^3.7.0"

## Scripts
- \`npm install\` → Install dependencies  
- \`npm run dev\` → Run in development mode  
- \`npm start\` → Run in production
