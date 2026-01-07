CREATE DATABASE library_db;

\c library_db;

-- 1. Users Table (Staff and Students)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- In a real app, hash this!
    role VARCHAR(20) CHECK (role IN ('student', 'staff')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Books Table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) UNIQUE,
    subject VARCHAR(100),
    volume VARCHAR(50), -- e.g., "Vol 1", "Vol 2"
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    location VARCHAR(50), -- Shelf location
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Transactions Table (Borrowing/Returning)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    book_id INT REFERENCES books(id),
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('borrowed', 'returned', 'overdue')) DEFAULT 'borrowed',
    fine_amount DECIMAL(10, 2) DEFAULT 0.00
);

-- Seed Data (Optional)
INSERT INTO users (name, email, password, role) VALUES
('Admin Staff', 'admin@library.edu', 'admin123', 'staff'),
('John Doe', 'john@student.edu', 'student123', 'student');

INSERT INTO books (title, author, isbn, subject, volume, total_copies, available_copies) VALUES
('Introduction to Algorithms', 'Corman', '9780262033848', 'Computer Science', '3rd Ed', 5, 5),
('Clean Code', 'Robert C. Martin', '9780132350884', 'Software Engineering', NULL, 3, 3),
('Physics for Scientists', 'Serway', '9781133947271', 'Physics', 'Vol 1', 2, 2);
