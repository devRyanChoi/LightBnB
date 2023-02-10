-- SELECT around(average(*)) 
-- FROM reservations
-- LIMIT 1;


SELECT avg(end_date - start_date) as average_duration
FROM reservations;