-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL, -- Array of image URLs
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial categories
INSERT INTO categories (name, slug, description) VALUES
('Rakhi', 'rakhi', 'Handcrafted designer Rakhis made with love and premium yarn.'),
('Couple Rakhi', 'couple-rakhi', 'Beautiful matching Rakhi sets for couples.'),
('Earrings', 'earrings', 'Elegant handmade earrings and crochet statement pieces.'),
('Accessories', 'accessories', 'Handcrafted crochet and yarn accessories.'),
('Hair Accessories', 'hair-accessories', 'Cute pastel scrunchies, clips, and hair ornaments.'),
('Keychains', 'keychains', 'Charming handmade miniature keychains and bag charms.');
