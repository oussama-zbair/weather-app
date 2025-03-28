
# 🌦️ Weather App  
**A real-time weather application using Next.js, OpenWeatherMap API, and Mapbox.**  

![License](https://img.shields.io/badge/license-MIT-green)  ![Next.js](https://img.shields.io/badge/Next.js-15.1.4-blue)  ![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)  ![Version](https://img.shields.io/badge/version-1.0.0-yellow)  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  ![Deployed on Vercel](https://img.shields.io/badge/Deployment-Vercel-blue)  

---

## 🌟 Features  
- 🔍 **Search for Cities**: Get current weather conditions for any city worldwide.  
- 🕒 **Hourly and Weekly Forecasts**: Detailed weather trends at your fingertips.  
- 🗺️ **Interactive Map**: Explore weather markers dynamically on a map.  
- 📊 **Weather Trends**: Visualize temperature changes with interactive charts (Coming Soon).  

---

## 🚀 Live Demo  
Check out the live version: **[Weather App on Vercel](https://weatherworldview.vercel.app/)**  

---

## 🛠️ Tech Stack  
### **Frontend**  
- **Next.js**: Fast and flexible React framework.  
- **Tailwind CSS**: Modern utility-first CSS framework for styling.  

### **Backend**  
- **Node.js**: Server-side runtime.  
- **Axios**: API request handling.

### **Security**
- **HSTS**: HTTP Strict Transport Security (HSTS) informs browsers that the site should only be accessed using HTTPS.
  
### **Paas**:
- **Vercel**: Cloud platform for static frontends and serverless functions.

### **Miscellaneous**:
- **Webpack**: open-source JavaScript module bundler.

### **APIs**  
- **[OpenWeatherMap](https://openweathermap.org/)**: Weather data source.  
- **[Mapbox](https://www.mapbox.com/)**: Interactive map provider.  

---

## 📝 Setup  
Follow these steps to run the app locally:  

1. **Fork the repository**:  

2. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

3. **Install dependencies**:  
   ```bash
   npm install
   ```

4. **Add your API keys**:  
   - Create a `.env.local` file in the root directory:  
     ```env
     NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
     NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
     ```

5. **Run the development server**:  
   ```bash
   npm run dev
   ```

6. **Visit the app**:  
   Open [http://localhost:3000](http://localhost:3000) in your browser.


---

## 🧪 Testing  
- Manual testing was performed to ensure:
  - Accurate weather data fetching.
  - Smooth interactions on the map.  

**Automated Testing**: Coming Soon 🚧  

---

## 📂 Folder Structure  
```plaintext
weather-app/
├── public/             # Static assets (icons, images)
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Next.js pages
│   ├── styles/         # Tailwind CSS styles
│   └── utils/          # Helper functions and API integrations
├── .env.local          # Environment variables
├── README.md           # Documentation
└── package.json        # Project configuration
```

---

## 💻 Contributing  
We welcome contributions! To contribute:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit changes: `git commit -m "Add feature name"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Open a Pull Request.  

---

## 🛡️ License  
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.  

---
