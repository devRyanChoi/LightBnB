INSERT INTO users (name, email, password)
VALUES ('Mingun Choi', 'ryanchoi100826@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),
('Jungwon Yoo', 'jungding423@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('yerin choi', 'cmgg919@gail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties ( title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code, active )
VALUES ( 'Speed lamp', 'description', 1, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 930.61, 6, 4, 8, 'Quebec', 'Sotboske', 'Canada', '536 Namsub Highway', 28142, true),
( 'Blank corner', 'description', 1, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',  'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 85234, 6, 6, 7, 'Alberta', 'Bohbatev', 'Canada', '651 Nami Road', 83680, true),
( 'Habit mix', 'description', 2, 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',  'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 46058, 0, 5, 6, 'Newfoundland And Labrador', 'Genwezuj', 'Canada', '1650 Hejto Center', 44583, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 8, 3, 'messages'),
(2, 2, 7, 4, 'messages'),
(3, 1, 9, 4, 'messages');