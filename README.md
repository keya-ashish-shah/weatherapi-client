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


