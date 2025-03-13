# 🎭 Real-Time Thought Bubble App

A real-time facial recognition app that generates persistent thought bubbles above detected faces using **TensorFlow.js (BlazeFace)** and **React with Next.js**.

## 🚀 Features
- 🧠 **Face Tracking**: Detects multiple faces simultaneously.
- 💬 **Persistent Thought Bubbles**: Thoughts stay fixed to each person.
- 🎥 **Smooth Movement**: Uses interpolation for stable tracking.
- 🔄 **Handles Rotations**: Faces retain thoughts even when turned.
- 🌍 **Fully Browser-Based**: Runs with TensorFlow.js, no external backend needed.

## 🛠️ Tech Stack
- **Frontend**: React, Next.js
- **State Management**: useState, useRef
- **AI/ML**: TensorFlow.js (BlazeFace Model)
- **Webcam Integration**: react-webcam

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/DevFreAkeD/bubble-thought-app.git
cd thought-bubble-app

# Install dependencies
yarn install  # or npm install

# Start the development server
yarn dev  # or npm run dev
```

## 📸 How It Works
1. **Start the App** → Your webcam starts streaming.
2. **Face Detection** → BlazeFace detects faces in real time.
3. **Thought Assignment** → Each face gets a unique, persistent thought bubble.
4. **Smooth Tracking** → Thoughts stay fixed even when moving or rotating.
5. **Multiple Faces Supported** → Up to 10 faces tracked simultaneously.

## 🎯 Usage
- Open the app in your browser.
- Allow webcam access when prompted.
- Move around, rotate your head – your thought bubble stays consistent!

## 🐞 Troubleshooting
**Issue: Thought bubbles disappear or flicker?**  
🔹 Make sure there is **good lighting** for face detection.  
🔹 Avoid **low-resolution webcams** which may affect detection accuracy.

**Issue: Bubbles shrink on one side?**  
🔹 The app now normalizes bubble size – try increasing the `baseFaceSize` value in `CameraFeed.tsx`.

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Pull requests are welcome! Open an issue for bug reports or feature requests.

---

🔥 **Enjoy watching your thoughts float above your head in real-time!** 😆
