# CLAUDE.md - Code Quality Guidelines

## Project Context
This is the xtool project repository.

## Code Quality Standards

### General Principles
- Write code that is simple, readable, and maintainable
- Follow DRY (Don't Repeat Yourself) principle
- Use descriptive variable and function names
- Keep functions small and focused on a single responsibility
- Handle errors gracefully and provide meaningful error messages

### Before Writing Code
- Always check existing code patterns and conventions in the codebase
- Verify which libraries and frameworks are already in use
- Read relevant files to understand the current implementation
- Check package.json, requirements.txt, or similar dependency files

### Code Style
- Follow the existing code style and formatting in the project
- Use consistent indentation (check existing files for tabs vs spaces)
- Keep line lengths reasonable (typically under 80-120 characters)
- Group related imports together
- Remove unused imports and variables

### Error Handling
- Always validate input parameters
- Use try-catch blocks for operations that might fail
- Provide helpful error messages that explain what went wrong
- Log errors appropriately
- Never expose sensitive information in error messages

### Testing
- Write code with testability in mind
- Check for existing test patterns before writing new tests
- Run tests before considering a feature complete
- Ensure new code doesn't break existing functionality

### Security
- Never hardcode credentials or API keys
- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Follow the principle of least privilege
- Keep dependencies up to date

### Performance
- Avoid premature optimization
- Use efficient data structures
- Minimize API calls and database queries
- Consider caching for expensive operations
- Profile before optimizing

### Version Control
- Make small, focused commits
- Write clear commit messages
- Test code before committing
- Never commit sensitive data or credentials

### Documentation
- Write self-documenting code
- Add comments only when necessary to explain "why" not "what"
- Keep README and documentation up to date
- Document complex algorithms or business logic

## Project-Specific Commands

### Development
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend (port 5173)
- `npm run dev:backend` - Start only backend (port 3001)
- `npm run install:all` - Install dependencies for root, frontend, and backend

### Frontend (React + TypeScript + Tailwind)
- `cd frontend && npm run dev` - Start Vite development server
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run preview` - Preview production build

### Backend (Node.js + Express)
- `cd backend && npm run dev` - Start with nodemon (auto-reload)
- `cd backend && npm start` - Start production server

### Testing
- Tests not yet implemented

### Building
- `npm run build` - Build frontend for production

## Common Pitfalls to Avoid
- Modifying global state unexpectedly
- Not handling edge cases (null, undefined, empty arrays)
- Ignoring async/await and Promise handling
- Memory leaks from unclosed connections or event listeners
- Race conditions in concurrent code
- Off-by-one errors in loops and array access
- Not validating external data (API responses, user input)

## File Organization
- Keep related files close together
- Use clear, consistent naming conventions
- Separate concerns (business logic, UI, data access)
- Avoid deeply nested directory structures

## Before Submitting Code
- [ ] Run linting and fix any issues
- [ ] Run type checking (if applicable)
- [ ] Run all tests
- [ ] Review your changes for potential bugs
- [ ] Ensure no debugging code or console.logs remain
- [ ] Verify no sensitive data is exposed
- [ ] Check that error handling is comprehensive