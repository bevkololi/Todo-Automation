# Todo Frontend

A modern React application for managing todos with a beautiful green and white design. Built to demonstrate Playwright testing capabilities.

## Features

- 🎨 **Modern UI Design** - Clean green and white color scheme
- 📱 **Responsive Layout** - Works on desktop, tablet, and mobile
- 🔐 **Authentication** - Simple login system with token-based auth
- 📝 **CRUD Operations** - Create, read, update, and delete todos
- ✅ **Completion Tracking** - Mark todos as complete/incomplete
- 🔄 **Real-time Updates** - Instant feedback for all actions
- 📊 **Statistics Dashboard** - Quick overview of todo status
- 🎯 **Confirmation Banners** - Success and error notifications
- 🎨 **Side Navigation** - Easy navigation between different views

## Screenshots

### Login Screen
- Clean authentication form with demo credentials
- Gradient background with green theme
- Form validation and loading states

### Main Dashboard
- Side menu with navigation options
- Todo list with inline editing
- Statistics cards showing progress
- Add new todo functionality

## Quick Start

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

4. **Login with demo credentials:**
   - Username: `admin`
   - Password: `admin`

## Project Structure

```
src/
├── components/
│   ├── Banner.js          # Notification banners
│   ├── Login.js           # Authentication form
│   ├── SideMenu.js        # Navigation sidebar
│   ├── TodoItem.js        # Individual todo component
│   └── TodoList.js        # Main todo list container
├── App.js                 # Main application component
├── App.css               # Global styles
└── index.js              # Application entry point
```

## Components Overview

### App.js
Main application component that handles:
- Authentication state management
- API communication with backend
- Global state for todos and UI
- Banner notifications

### SideMenu.js
Navigation sidebar featuring:
- App branding and description
- Navigation items with icons
- Todo count badge
- Logout functionality

### Login.js
Authentication component with:
- Username and password fields
- Form validation
- Loading states
- Demo credentials display

### TodoList.js
Main todo management interface:
- Add new todos
- Display todo statistics
- Clear all todos functionality
- Empty state handling

### TodoItem.js
Individual todo component with:
- Inline editing capability
- Completion toggle
- Delete functionality
- Timestamp display

### Banner.js
Notification system for:
- Success messages
- Error notifications
- Auto-dismiss functionality
- Manual close option

## API Integration

The frontend communicates with the backend API at `http://localhost:3001`:

- **Authentication**: `POST /login`
- **Get Todos**: `GET /items`
- **Create Todo**: `POST /items`
- **Update Todo**: `PUT /items/:id`
- **Toggle Todo**: `PATCH /items/:id/toggle`
- **Delete Todo**: `DELETE /items/:id`
- **Clear All**: `DELETE /items`

## Styling

The application uses a custom CSS design with:
- **Primary Colors**: Green (#28a745) and White
- **Gradients**: Green gradient backgrounds
- **Shadows**: Subtle box shadows for depth
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## Key Features for Testing

### Playwright-Friendly Elements
- **Consistent selectors**: Well-structured class names
- **Stable IDs**: Predictable element identification
- **Loading states**: Clear loading indicators
- **Error handling**: Comprehensive error messages
- **Form validation**: Input validation feedback

### User Interactions
- **Click events**: Buttons, checkboxes, navigation
- **Form submissions**: Login and todo creation
- **Keyboard navigation**: Enter/Escape for editing
- **Hover effects**: Interactive elements
- **Responsive behavior**: Mobile and desktop layouts

## Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

### Environment Setup
- Node.js 14+ required
- React 19.1.0
- Modern browser support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing Considerations

This frontend is designed to be easily testable with Playwright:

1. **Authentication Flow**: Login/logout functionality
2. **CRUD Operations**: Full todo lifecycle testing
3. **UI Interactions**: Form submissions, button clicks
4. **State Management**: Todo list updates and persistence
5. **Error Handling**: Network errors and validation
6. **Responsive Design**: Mobile and desktop layouts

## Notes

- Data is stored in browser localStorage for authentication
- All API calls include proper error handling
- The UI provides immediate feedback for all actions
- The design is optimized for both desktop and mobile use
- Demo credentials are displayed on the login screen for easy testing
