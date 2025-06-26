# 🌱 Community Event Platform - Frontend

This is the frontend client of a community-driven event management platform built with **React**, **TailwindCSS**, and **JWT Authentication**. Users can create, manage, view, and join events such as cleanups, donations, and tree plantations.

## 🚀 Features

### 🌐 Navbar
- App logo and navigation links.
- Conditional Login/Logout:
  - If not logged in, displays `Login`.
  - If logged in, shows user profile picture and Logout button.
- Profile dropdown includes:
  - Create Event (Private)
  - Manage Events (Private)
  - Joined Events (Private)

### 🏠 Home Page (Public)
- **Banner** — Themed visual section.
- **Features** — Highlights platform benefits.
- **Gallery** — Static images from real events.
- **Newsletter** — Styled section for future subscription (non-functional).

### ✍️ Create Event (Private)
- Logged-in users can create events with:
  - Title, Description, Type, Image URL, Location, Event Date
  - Date must be future-only (via `react-datepicker`)
- Stores creator email.
- Redirects with a success message after submission.

### 📅 Upcoming Events (Public)
- Grid layout for events.
- Only **future events** shown.
- Includes:
  - Thumbnail, Title, Location, Type, Date, `View Event` button
- `View Event` leads to private **Event Details Page** with `Join Event` functionality.

### 🤝 Joined Events (Private)
- Displays events joined by the logged-in user.
- Sorted by event date (ascending).

### ⚙️ Manage Events (Private)
- Shows events created by the logged-in user.
- Allows updating (and optionally deleting) their own events only.

### 🧪 Extra Features
- Full form validations (Auth, Create/Update).
- **Search and Filter** in Upcoming Events via title and type.
- JWT authentication with protected routes.
- Dark/Light mode toggle (Tailwind-based theme switch).

---

## 📁 Technologies Used

- React
- React Router DOM
- Tailwind CSS
- React DatePicker
- SweetAlert2
- Lucide React / React Icons
- JWT (with cookie-based storage)
- Framer Motion

---


