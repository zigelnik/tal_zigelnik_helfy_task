# Task Manager App

## Backend Setup
1. cd task-manager/backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup
1. cd task-manager/frontend
2. npm install
3. npm start (runs on port 3000)

## API Endpoints

### GET /api/tasks
Get all tasks
- **Response**: Array of task objects
- **Example Response**:
```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /api/tasks
Create a new task
- **Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description"
}
```
- **Response**: Created task object with ID and timestamps

### PUT /api/tasks/:id
Update an existing task
- **Request Body**:
```json
{
  "title": "Updated Task",
  "description": "Updated description"
}
```
- **Response**: Updated task object

### DELETE /api/tasks/:id
Delete a task
- **Response**: Success message or 404 if not found

### PATCH /api/tasks/:id/toggle
Toggle task completion status
- **Response**: Updated task object with toggled completion status

## Design Decisions

### Component Architecture
- **TaskList**: Main container component that manages task state and filtering
- **TaskItem**: Individual task display with inline editing capabilities
- **TaskForm**: Modal/popup form for creating and editing tasks
- **TaskFilter**: Dropdown/filter bar for task status filtering (All, Active, Completed)

### Layout Assumptions
- **Responsive Design**: Mobile-first approach with flexible grid layouts
- **Task List**: Vertical scrollable list with consistent spacing between items
- **Task Items**: Card-based layout with title, description, and action buttons
- **Form Layout**: Centered modal with form fields and action buttons
- **Filter Bar**: Horizontal layout above the task list for easy access

### UI/UX Decisions
- **Visual Hierarchy**: Clear distinction between completed and active tasks
- **Interactive Elements**: Hover states and smooth transitions for better user experience
- **Form Validation**: Real-time validation with clear error messaging

