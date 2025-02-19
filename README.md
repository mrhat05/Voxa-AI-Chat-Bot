# Voxa AI Chat Bot

Voxa AI is a modern, conversational AI chatbot powered by **Google's GEMINI API**. It provides an intuitive, real-time chat experience with a sleek UI, efficient state management, and dynamic response handling.

---

## 🚀 Features
- **Conversational AI**: Uses **GEMINI API** for intelligent responses.
- **Dark Theme UI**: Sleek and modern design.
- **Sidebar Chat Navigation**: Easily switch between different chat sessions.
- **Real-time Typing Indicator**: Provides a smooth chat experience.
- **Persistent Storage**: Saves user chat history for seamless experience.
- **Mobile-Friendly**: Fully responsive UI for different screen sizes.

---

## 🛠 Tech Stack & Dependencies

| Dependency  | Purpose |
|------------|---------|
| **React.js** | Frontend framework for UI components. |
| **Redux Toolkit** | State management for theme and chat history. |
| **Tailwind CSS** | Styling framework for a sleek UI. |
| **Appwrite** | Authentication and database management. |
| **Google GEMINI API** | AI-based chat responses. |
| **React Icons** | Icons for a visually appealing interface. |

---

## 🎨 Design Decisions

1. **Dark Mode First Approach**
   - Ensures a modern, eye-friendly UI.
   - Uses Redux state to toggle themes dynamically.

2. **Persistent Chat Storage**
   - Uses local storage & Appwrite for chat history.
   - Allows users to access past conversations seamlessly.

3. **Sidebar Navigation**
   - Enables switching between different chat sessions.
   - Mobile-friendly sidebar that toggles on small screens.

4. **Optimized API Calls**
   - Batched requests to **GEMINI API** to reduce latency.
   - Debounced input to prevent excessive API calls.

5. **Minimal UI for Smooth UX**
   - No unnecessary animations that slow performance.
   - Quick message rendering for fast interaction.

---

## ⚖️ Trade-offs & Limitations

### 🌍 **Real-time Communication vs Cost Efficiency**
- **Decision**: Chose HTTP-based GEMINI API calls over WebSocket-based live chat.
- **Reason**: WebSockets are resource-intensive and costly for a free-tier Appwrite setup.
- **Trade-off**: No real-time typing indicator from the AI side.

### 🔥 **State Management Complexity**
- **Decision**: Used **Redux Toolkit** instead of plain React Context.
- **Reason**: Easier state handling and scalable structure.
- **Trade-off**: Slightly increased initial learning curve.

### 📦 **Database Choice**
- **Decision**: Used **Appwrite** instead of Firebase.
- **Reason**: Better free-tier limits and security.
- **Trade-off**: Limited ecosystem compared to Firebase.

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/mrhat05/Voxa-AI-Chat-Bot.git
cd Voxa-AI-Chat-Bot
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure API Keys
Create a `.env` file in the root directory and add your **GEMINI API key**:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Start the Development Server
```sh
npm start
```

The app should now be running at `http://localhost:3000` 🚀.

---

## 💡 Future Improvements
- Add **voice-to-text** chat functionality.
- Implement **WebSocket-based real-time chat**.
- Improve AI response handling using **vector databases**.
- Expand **multi-language support**.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License
This project is licensed under the **MIT License**. See `LICENSE` for details.

---

### 🎉 Built with ❤️ by [mrhat05](https://github.com/mrhat05)
