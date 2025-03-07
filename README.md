# 📝 MERN Blogging Platform

A full-stack **blogging platform** built using the **MERN (MongoDB, Express.js, React, Node.js) stack**. Users can **create, edit, delete, like, and comment** on blog posts with an intuitive UI and a rich text editor.

## 🚀 Tech Stack

### **Frontend:**
- ⚡ **Vite** – Fast build tool for modern React apps  
- ⚛ **React.js** – Component-based UI development  
- 🌍 **React Router** – Client-side routing    
- 🎨 **Tailwind CSS / Custom CSS** – Styling   

### **Backend:**
- 🛠 **Node.js** – JavaScript runtime for the server  
- 🚀 **Express.js** – Lightweight web framework  
- 🗄 **MongoDB & Mongoose** – NoSQL database for scalable data storage   
---

## Database Models (Schemas)
### **Blog Schema** 
- **content** - String
- **author** - mongoose.Schema.Types.ObjectId
- **likes** - mongoose.Schema.Types.ObjectId
- **comments** - [user- mongoose.Schema.Types.ObjectId, test - String, createdAt - Date]
- **shares** - mongoose.Schema.Types.ObjectId
- **createdAt** - Date

### **User Schema** -
- **username** - String
- **email** - String
- **passward** - String
- **createdAt** - Date


## 🌍 API Routes: 
- 🔹 **Create User** - POST /createuser
- 🔹 **Get All Users** - GET /users
- 🔹 **Get User by Username** - GET /users/byUsername/:username
- 🔹 **Create Blog Post** - POST /addblog
- 🔹 **Get All Blog Posts** - GET /blogs
