-- ============================================
-- SQL Practice Database: Online Bookstore
-- ============================================
-- This database contains sample data for practicing SQL queries
-- Includes: Authors, Books, Customers, Orders, Order Items, Reviews, Categories

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ============================================
-- Table: authors
-- ============================================
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birth_year INTEGER,
    country TEXT,
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO authors (name, birth_year, country, biography) VALUES
('George Orwell', 1903, 'United Kingdom', 'English novelist and essayist known for dystopian fiction'),
('J.K. Rowling', 1965, 'United Kingdom', 'British author best known for the Harry Potter series'),
('Stephen King', 1947, 'United States', 'American author of horror, supernatural fiction, and fantasy'),
('Agatha Christie', 1890, 'United Kingdom', 'The best-selling novelist of all time, known for detective novels'),
('Isaac Asimov', 1920, 'United States', 'American writer and professor of biochemistry, prolific science fiction author'),
('Jane Austen', 1775, 'United Kingdom', 'English novelist known for romantic fiction'),
('Mark Twain', 1835, 'United States', 'American writer, humorist, and lecturer'),
('Ernest Hemingway', 1899, 'United States', 'American novelist, short-story writer, and journalist'),
('Virginia Woolf', 1882, 'United Kingdom', 'English writer, considered one of the foremost modernists'),
('F. Scott Fitzgerald', 1896, 'United States', 'American novelist and short story writer');

-- ============================================
-- Table: categories
-- ============================================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO categories (category_name, description) VALUES
('Fiction', 'Literary works of imaginative narration'),
('Science Fiction', 'Fiction based on imagined future scientific or technological advances'),
('Mystery', 'Fiction dealing with the solution of a crime or the unraveling of secrets'),
('Horror', 'Fiction intended to frighten, scare, or disgust'),
('Romance', 'Fiction dealing with love in a sensational or idealized way'),
('Classic', 'Literature that has stood the test of time'),
('Fantasy', 'Fiction involving magic and adventure');

-- ============================================
-- Table: books
-- ============================================
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    category_id INTEGER,
    isbn TEXT UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    publication_year INTEGER,
    publisher TEXT,
    pages INTEGER,
    language TEXT DEFAULT 'English',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO books (title, author_id, category_id, isbn, price, stock_quantity, publication_year, publisher, pages, language) VALUES
('1984', 1, 1, '978-0451524935', 15.99, 45, 1949, 'Signet Classic', 328, 'English'),
('Animal Farm', 1, 1, '978-0451526342', 12.99, 32, 1945, 'Signet Classic', 144, 'English'),
('Harry Potter and the Sorcerer''s Stone', 2, 7, '978-0590353427', 24.99, 78, 1997, 'Scholastic', 320, 'English'),
('Harry Potter and the Chamber of Secrets', 2, 7, '978-0439064873', 24.99, 65, 1998, 'Scholastic', 352, 'English'),
('Harry Potter and the Prisoner of Azkaban', 2, 7, '978-0439136365', 25.99, 54, 1999, 'Scholastic', 448, 'English'),
('The Shining', 3, 4, '978-0307743657', 18.99, 28, 1977, 'Doubleday', 464, 'English'),
('IT', 3, 4, '978-1501142970', 22.99, 35, 1986, 'Viking', 1138, 'English'),
('The Stand', 3, 4, '978-0307743688', 21.99, 19, 1978, 'Doubleday', 1153, 'English'),
('Murder on the Orient Express', 4, 3, '978-0062693662', 14.99, 42, 1934, 'William Collins', 256, 'English'),
('And Then There Were None', 4, 3, '978-0062073488', 14.99, 38, 1939, 'William Collins', 272, 'English'),
('Foundation', 5, 2, '978-0553293357', 16.99, 25, 1951, 'Gnome Press', 255, 'English'),
('I, Robot', 5, 2, '978-0553382563', 15.99, 30, 1950, 'Gnome Press', 224, 'English'),
('Pride and Prejudice', 6, 5, '978-0141439518', 11.99, 56, 1813, 'T. Egerton', 432, 'English'),
('Sense and Sensibility', 6, 5, '978-0141439662', 11.99, 48, 1811, 'Thomas Egerton', 409, 'English'),
('Adventures of Huckleberry Finn', 7, 6, '978-0486280615', 9.99, 52, 1884, 'Chatto & Windus', 366, 'English'),
('The Adventures of Tom Sawyer', 7, 6, '978-0486400778', 9.99, 44, 1876, 'American Publishing Company', 274, 'English'),
('The Old Man and the Sea', 8, 6, '978-0684801223', 13.99, 40, 1952, 'Charles Scribner''s Sons', 127, 'English'),
('A Farewell to Arms', 8, 6, '978-0684801469', 14.99, 35, 1929, 'Charles Scribner''s Sons', 355, 'English'),
('Mrs Dalloway', 9, 1, '978-0156628709', 15.99, 28, 1925, 'Hogarth Press', 194, 'English'),
('To the Lighthouse', 9, 1, '978-0156907392', 15.99, 25, 1927, 'Hogarth Press', 209, 'English'),
('The Great Gatsby', 10, 6, '978-0743273565', 13.99, 68, 1925, 'Charles Scribner''s Sons', 180, 'English'),
('Tender Is the Night', 10, 1, '978-0684801544', 14.99, 22, 1934, 'Charles Scribner''s Sons', 320, 'English');

-- ============================================
-- Table: customers
-- ============================================
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'United States',
    postal_code TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    loyalty_points INTEGER DEFAULT 0
);

INSERT INTO customers (first_name, last_name, email, phone, address, city, state, country, postal_code, loyalty_points) VALUES
('Alice', 'Johnson', 'alice.johnson@email.com', '555-0101', '123 Maple St', 'Springfield', 'IL', 'United States', '62701', 150),
('Bob', 'Smith', 'bob.smith@email.com', '555-0102', '456 Oak Ave', 'Portland', 'OR', 'United States', '97201', 220),
('Carol', 'Williams', 'carol.williams@email.com', '555-0103', '789 Pine Rd', 'Austin', 'TX', 'United States', '73301', 85),
('David', 'Brown', 'david.brown@email.com', '555-0104', '321 Elm St', 'Seattle', 'WA', 'United States', '98101', 340),
('Emma', 'Davis', 'emma.davis@email.com', '555-0105', '654 Birch Ln', 'Boston', 'MA', 'United States', '02101', 190),
('Frank', 'Miller', 'frank.miller@email.com', '555-0106', '987 Cedar Dr', 'Denver', 'CO', 'United States', '80201', 420),
('Grace', 'Wilson', 'grace.wilson@email.com', '555-0107', '147 Spruce St', 'Miami', 'FL', 'United States', '33101', 65),
('Henry', 'Moore', 'henry.moore@email.com', '555-0108', '258 Willow Way', 'Chicago', 'IL', 'United States', '60601', 510),
('Ivy', 'Taylor', 'ivy.taylor@email.com', '555-0109', '369 Aspen Ct', 'San Francisco', 'CA', 'United States', '94101', 280),
('Jack', 'Anderson', 'jack.anderson@email.com', '555-0110', '741 Poplar Pl', 'New York', 'NY', 'United States', '10001', 95),
('Kate', 'Thomas', 'kate.thomas@email.com', '555-0111', '852 Maple Ave', 'Los Angeles', 'CA', 'United States', '90001', 175),
('Liam', 'Jackson', 'liam.jackson@email.com', '555-0112', '963 Oak Blvd', 'Phoenix', 'AZ', 'United States', '85001', 305),
('Mia', 'White', 'mia.white@email.com', '555-0113', '159 Pine St', 'Philadelphia', 'PA', 'United States', '19101', 125),
('Noah', 'Harris', 'noah.harris@email.com', '555-0114', '357 Elm Ave', 'San Diego', 'CA', 'United States', '92101', 240),
('Olivia', 'Martin', 'olivia.martin@email.com', '555-0115', '753 Birch Rd', 'Dallas', 'TX', 'United States', '75201', 440);

-- ============================================
-- Table: orders
-- ============================================
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ship_date TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT CHECK(status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
    payment_method TEXT,
    shipping_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO orders (customer_id, order_date, ship_date, total_amount, status, payment_method, shipping_address) VALUES
(1, '2024-01-15 10:23:00', '2024-01-16 14:30:00', 40.98, 'Delivered', 'Credit Card', '123 Maple St, Springfield, IL 62701'),
(2, '2024-01-18 14:45:00', '2024-01-19 09:15:00', 24.99, 'Delivered', 'PayPal', '456 Oak Ave, Portland, OR 97201'),
(3, '2024-02-03 09:12:00', '2024-02-04 11:20:00', 52.97, 'Delivered', 'Credit Card', '789 Pine Rd, Austin, TX 73301'),
(4, '2024-02-10 16:30:00', '2024-02-11 10:45:00', 76.96, 'Delivered', 'Debit Card', '321 Elm St, Seattle, WA 98101'),
(5, '2024-02-15 11:20:00', '2024-02-16 13:00:00', 29.98, 'Delivered', 'Credit Card', '654 Birch Ln, Boston, MA 02101'),
(6, '2024-03-01 13:45:00', '2024-03-02 15:30:00', 90.95, 'Delivered', 'Credit Card', '987 Cedar Dr, Denver, CO 80201'),
(7, '2024-03-05 10:15:00', '2024-03-06 12:00:00', 15.99, 'Delivered', 'PayPal', '147 Spruce St, Miami, FL 33101'),
(8, '2024-03-12 15:30:00', '2024-03-13 09:45:00', 118.93, 'Delivered', 'Credit Card', '258 Willow Way, Chicago, IL 60601'),
(9, '2024-03-20 09:00:00', '2024-03-21 11:30:00', 63.96, 'Delivered', 'Debit Card', '369 Aspen Ct, San Francisco, CA 94101'),
(10, '2024-04-02 14:20:00', '2024-04-03 10:15:00', 41.97, 'Delivered', 'Credit Card', '741 Poplar Pl, New York, NY 10001'),
(1, '2024-04-10 11:45:00', '2024-04-11 13:20:00', 75.96, 'Delivered', 'PayPal', '123 Maple St, Springfield, IL 62701'),
(2, '2024-04-15 16:10:00', NULL, 51.98, 'Processing', 'Credit Card', '456 Oak Ave, Portland, OR 97201'),
(4, '2024-04-20 10:30:00', NULL, 88.95, 'Pending', 'Credit Card', '321 Elm St, Seattle, WA 98101'),
(6, '2024-04-25 13:50:00', NULL, 45.98, 'Processing', 'Debit Card', '987 Cedar Dr, Denver, CO 80201'),
(8, '2024-05-01 09:25:00', NULL, 102.94, 'Pending', 'Credit Card', '258 Willow Way, Chicago, IL 60601'),
(11, '2024-05-05 15:40:00', '2024-05-06 11:00:00', 36.98, 'Delivered', 'PayPal', '852 Maple Ave, Los Angeles, CA 90001'),
(12, '2024-05-10 12:15:00', '2024-05-11 14:30:00', 70.97, 'Delivered', 'Credit Card', '963 Oak Blvd, Phoenix, AZ 85001'),
(13, '2024-05-15 10:50:00', '2024-05-16 09:20:00', 27.98, 'Delivered', 'Debit Card', '159 Pine St, Philadelphia, PA 19101'),
(14, '2024-05-20 14:30:00', NULL, 56.97, 'Processing', 'Credit Card', '357 Elm Ave, San Diego, CA 92101'),
(15, '2024-05-25 11:10:00', NULL, 95.95, 'Pending', 'PayPal', '753 Birch Rd, Dallas, TX 75201');

-- ============================================
-- Table: order_items
-- ============================================
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase) VALUES
(1, 1, 1, 15.99),
(1, 2, 1, 12.99),
(1, 3, 1, 24.99),
(2, 3, 1, 24.99),
(3, 6, 1, 18.99),
(3, 7, 1, 22.99),
(3, 13, 1, 11.99),
(4, 3, 1, 24.99),
(4, 4, 1, 24.99),
(4, 5, 1, 25.99),
(5, 9, 1, 14.99),
(5, 10, 1, 14.99),
(6, 3, 2, 24.99),
(6, 21, 2, 13.99),
(6, 15, 1, 9.99),
(7, 1, 1, 15.99),
(8, 3, 1, 24.99),
(8, 4, 1, 24.99),
(8, 5, 1, 25.99),
(8, 7, 1, 22.99),
(8, 11, 1, 16.99),
(9, 21, 2, 13.99),
(9, 17, 2, 13.99),
(10, 13, 1, 11.99),
(10, 14, 1, 11.99),
(10, 15, 1, 9.99),
(10, 16, 1, 9.99),
(11, 6, 2, 18.99),
(11, 7, 2, 22.99),
(12, 3, 1, 24.99),
(12, 8, 1, 21.99),
(13, 12, 1, 15.99),
(13, 11, 1, 16.99),
(13, 21, 2, 13.99),
(13, 19, 1, 15.99),
(14, 13, 1, 11.99),
(14, 14, 1, 11.99),
(15, 1, 1, 15.99),
(15, 2, 1, 12.99),
(16, 13, 2, 11.99),
(16, 15, 1, 9.99),
(17, 21, 1, 13.99),
(17, 6, 1, 18.99),
(17, 7, 1, 22.99),
(17, 10, 1, 14.99),
(18, 1, 1, 15.99),
(18, 2, 1, 12.99),
(19, 3, 1, 24.99),
(19, 4, 1, 24.99),
(20, 11, 2, 16.99),
(20, 12, 2, 15.99),
(20, 17, 2, 13.99);

-- ============================================
-- Table: reviews
-- ============================================
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL,
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    helpful_count INTEGER DEFAULT 0,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO reviews (book_id, customer_id, rating, review_text, review_date, helpful_count) VALUES
(1, 1, 5, 'A masterpiece that remains relevant today. Orwell''s vision is haunting.', '2024-01-20 10:00:00', 45),
(1, 4, 5, 'One of the best books I''ve ever read. A must-read for everyone.', '2024-02-15 14:30:00', 32),
(1, 8, 4, 'Brilliant but depressing. The world he created feels too real.', '2024-03-18 09:15:00', 28),
(3, 2, 5, 'Perfect start to an amazing series! My kids love it too.', '2024-01-25 11:20:00', 67),
(3, 4, 5, 'Magical and captivating from the first page. Rowling is a genius.', '2024-02-12 16:45:00', 54),
(3, 6, 5, 'This book changed my childhood. Still love it as an adult.', '2024-03-05 13:00:00', 89),
(3, 8, 4, 'Great book, though I prefer the later ones in the series.', '2024-03-15 10:30:00', 23),
(3, 11, 5, 'Absolutely wonderful! The perfect blend of magic and adventure.', '2024-05-10 15:20:00', 41),
(6, 3, 5, 'Terrifying! Couldn''t put it down. King at his finest.', '2024-02-08 12:40:00', 38),
(6, 11, 4, 'Scary and suspenseful. Some parts dragged a bit.', '2024-05-12 14:15:00', 19),
(7, 3, 5, 'Epic horror masterpiece. Long but worth every page.', '2024-02-10 09:30:00', 52),
(7, 8, 5, 'The scariest book I''ve ever read. Had nightmares for weeks!', '2024-03-20 11:45:00', 61),
(9, 5, 5, 'Classic Christie mystery. The twist is incredible!', '2024-02-20 10:15:00', 34),
(9, 13, 4, 'Well-crafted mystery with memorable characters.', '2024-05-18 13:30:00', 22),
(13, 10, 5, 'Beautiful romance with sharp wit. Jane Austen is timeless.', '2024-04-08 14:50:00', 71),
(13, 12, 5, 'My favorite book of all time. Elizabeth Bennet is iconic!', '2024-05-08 11:00:00', 58),
(21, 9, 5, 'The Great American Novel. Fitzgerald''s prose is stunning.', '2024-03-25 10:20:00', 92),
(21, 1, 4, 'Beautiful writing, though the characters are flawed.', '2024-04-12 15:40:00', 47),
(21, 11, 5, 'A tragic and beautiful story about the American Dream.', '2024-05-08 12:30:00', 63),
(21, 15, 4, 'Excellent novel with gorgeous descriptions of the era.', '2024-05-12 16:10:00', 35),
(11, 6, 4, 'Fascinating sci-fi with brilliant ideas about society.', '2024-03-08 13:15:00', 29),
(12, 9, 4, 'Thought-provoking collection of robot stories.', '2024-03-28 11:50:00', 26),
(17, 10, 5, 'Short but powerful. Hemingway''s best work in my opinion.', '2024-04-10 09:40:00', 44),
(17, 14, 4, 'Beautiful story about perseverance and dignity.', '2024-05-22 14:20:00', 31);

-- ============================================
-- Create Indexes for Better Performance
-- ============================================
CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_books_category ON books(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_book ON order_items(book_id);
CREATE INDEX idx_reviews_book ON reviews(book_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);


