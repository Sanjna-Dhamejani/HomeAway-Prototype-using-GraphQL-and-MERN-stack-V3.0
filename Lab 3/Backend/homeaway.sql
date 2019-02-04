-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 07:37 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `owneremail` varchar(255) NOT NULL,
  `useremail` varchar(255) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `bookingid` int(255) NOT NULL,
  `bookingflag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`owneremail`, `useremail`, `startdate`, `enddate`, `bookingid`, `bookingflag`) VALUES
('harry@gmail.com', 'steve@gmail.com', '2018-10-03', '2018-10-28', 22, 1),
('milony@gmail.com', 'steve@gmail.com', '2018-10-06', '2018-10-31', 23, 1),
('hugh@gmail.com', 'krishna@gmail.com', '2018-10-07', '2018-10-22', 24, 1),
('milony@gmail.com', 'krishna@gmail.com', '2018-10-06', '2018-10-31', 25, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ownerdetails`
--

CREATE TABLE `ownerdetails` (
  `ownerID` int(255) NOT NULL,
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ownerdetails`
--

INSERT INTO `ownerdetails` (`ownerID`, `firstname`, `lastname`, `email`, `password`) VALUES
(14, 'Harry', 'Gray', 'harry@gmail.com', '$2a$10$yKodYxZWNPIWRgccQYkrJexlgxYvwYeE467i7WmW7BVFtBWatE2lq'),
(15, 'Hugh', 'Grant', 'hugh@gmail.com', '$2a$10$CEJqQRIqZ62Bq1qdV771BOg2JcdrzNZRRcyk7EbCcPejdJKXdWV7S'),
(11, 'Milony', 'Mehta', 'milony@gmail.com', '$2a$10$zuCtOV.HvEOaYx1lxjKZ1ehG4Tl1XXAiEGTp7oEZ5IxinTeGi.7Ym');

-- --------------------------------------------------------

--
-- Table structure for table `ownerpricing`
--

CREATE TABLE `ownerpricing` (
  `email` varchar(500) NOT NULL,
  `propertyid` int(255) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `currency` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ownerpricing`
--

INSERT INTO `ownerpricing` (`email`, `propertyid`, `startdate`, `enddate`, `currency`) VALUES
('harry@gmail.com', 6, '2018-10-03', '2018-10-28', '120'),
('hugh@gmail.com', 7, '2018-10-07', '2018-10-22', '350'),
('milony@gmail.com', 8, '2018-10-06', '2018-10-31', '90');

-- --------------------------------------------------------

--
-- Table structure for table `propertydescription`
--

CREATE TABLE `propertydescription` (
  `email` varchar(500) NOT NULL,
  `propertyid` int(255) NOT NULL,
  `headline` varchar(500) NOT NULL,
  `descript` varchar(500) NOT NULL,
  `propertytype` varchar(500) NOT NULL,
  `bedrooms` varchar(500) NOT NULL,
  `accomodates` varchar(500) NOT NULL,
  `bathrooms` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propertydescription`
--

INSERT INTO `propertydescription` (`email`, `propertyid`, `headline`, `descript`, `propertytype`, `bedrooms`, `accomodates`, `bathrooms`) VALUES
('harry@gmail.com', 7, 'Spacious House in Downtown', 'Beautiful 1400 Sq.Ft.', 'Townhouse', '2', '5', '2.5'),
('hugh@gmail.com', 8, 'Victorian House ', 'Elegant walls 2100 Sq.Ft', 'Bungalow', '4', '8', '4'),
('milony@gmail.com', 9, 'Lakeview Apartment', 'Serene 900 Sq.Ft.', 'Apartment', '3', '6', '2');

-- --------------------------------------------------------

--
-- Table structure for table `propertylocation`
--

CREATE TABLE `propertylocation` (
  `email` varchar(500) NOT NULL,
  `propertyid` int(255) NOT NULL,
  `city` varchar(500) NOT NULL,
  `state` varchar(500) NOT NULL,
  `country` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propertylocation`
--

INSERT INTO `propertylocation` (`email`, `propertyid`, `city`, `state`, `country`) VALUES
('harry@gmail.com', 8, 'San Jose', 'CA', 'USA'),
('hugh@gmail.com', 9, 'San Jose', 'California', 'USA'),
('milony@gmail.com', 10, 'San Jose', 'CA', 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `proppics`
--

CREATE TABLE `proppics` (
  `email` varchar(255) NOT NULL,
  `propertyid` int(255) NOT NULL,
  `picname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proppics`
--

INSERT INTO `proppics` (`email`, `propertyid`, `picname`) VALUES
('harry@gmail.com', 26, '1538957069267-11.jpg'),
('harry@gmail.com', 27, '1538957069282-images.jpg'),
('harry@gmail.com', 28, '1538957069287-t1.jpg'),
('harry@gmail.com', 29, '1538957069277-75-Bedford-Street-1.jpg'),
('hugh@gmail.com', 30, '1538961808293-2.jpg'),
('hugh@gmail.com', 31, '1538961808309-4.jpg'),
('hugh@gmail.com', 32, '1538961808324-adb5530a-cfe4-4adf-8e4f-7fa071bfdc6d.c10.jpg'),
('hugh@gmail.com', 33, '1538961808324-3.jpg'),
('milony@gmail.com', 34, '1538965067762-1.jpg'),
('milony@gmail.com', 35, '1538965067765-download.jpg'),
('milony@gmail.com', 36, '1538965067769-images.jpg'),
('milony@gmail.com', 37, '1538965067773-Lakeview015(2).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `uemail` varchar(500) NOT NULL,
  `upassword` varchar(500) NOT NULL,
  `ufirstname` varchar(500) NOT NULL,
  `ulastname` varchar(500) NOT NULL,
  `aboutme` varchar(500) NOT NULL,
  `citycountry` varchar(500) NOT NULL,
  `company` varchar(500) NOT NULL,
  `school` varchar(500) NOT NULL,
  `hometown` varchar(500) NOT NULL,
  `phone` int(255) NOT NULL,
  `languages` varchar(500) NOT NULL,
  `gender` varchar(500) NOT NULL,
  `userid` int(255) NOT NULL,
  `profilepicname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`uemail`, `upassword`, `ufirstname`, `ulastname`, `aboutme`, `citycountry`, `company`, `school`, `hometown`, `phone`, `languages`, `gender`, `userid`, `profilepicname`) VALUES
('krishna@gmail.com', '$2a$10$D1BRGpFbyGXG67ZMivMudezanNL7FL7NWN0BoHqTyam9Dz18VwLl.', 'Krishna', 'Jawahiry', '', '', '', '', '', 0, '', '', 9, ''),
('steve@gmail.com', '$2a$10$uL8eUSE3ut7GJGZDco4Q0eMyh/e1FuIqa0NF/F3xkmzhKD1UQGVvC', 'Steve', 'Jobs', 'Spine Doctor in New York', 'Buffalo, New York', 'St. Anthony\'s Hospital', 'Mary Angel High School', 'Rochestor', 2147483647, 'English, French', 'Male', 11, '1538963164697-profile-talent-ant-simpson-feature.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingid`),
  ADD KEY `owneremail` (`owneremail`),
  ADD KEY `useremail` (`useremail`);

--
-- Indexes for table `ownerdetails`
--
ALTER TABLE `ownerdetails`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `UNIQUE` (`ownerID`);

--
-- Indexes for table `ownerpricing`
--
ALTER TABLE `ownerpricing`
  ADD PRIMARY KEY (`propertyid`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- Indexes for table `propertydescription`
--
ALTER TABLE `propertydescription`
  ADD PRIMARY KEY (`propertyid`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- Indexes for table `propertylocation`
--
ALTER TABLE `propertylocation`
  ADD PRIMARY KEY (`propertyid`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- Indexes for table `proppics`
--
ALTER TABLE `proppics`
  ADD PRIMARY KEY (`propertyid`),
  ADD UNIQUE KEY `picname` (`picname`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`uemail`),
  ADD KEY `INDEX` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `ownerdetails`
--
ALTER TABLE `ownerdetails`
  MODIFY `ownerID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ownerpricing`
--
ALTER TABLE `ownerpricing`
  MODIFY `propertyid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `propertydescription`
--
ALTER TABLE `propertydescription`
  MODIFY `propertyid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `propertylocation`
--
ALTER TABLE `propertylocation`
  MODIFY `propertyid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `proppics`
--
ALTER TABLE `proppics`
  MODIFY `propertyid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `userid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`owneremail`) REFERENCES `ownerdetails` (`email`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`useremail`) REFERENCES `userdetails` (`uemail`);

--
-- Constraints for table `ownerpricing`
--
ALTER TABLE `ownerpricing`
  ADD CONSTRAINT `ownerpricing_ibfk_1` FOREIGN KEY (`email`) REFERENCES `ownerdetails` (`email`);

--
-- Constraints for table `propertydescription`
--
ALTER TABLE `propertydescription`
  ADD CONSTRAINT `propertydescription_ibfk_1` FOREIGN KEY (`email`) REFERENCES `ownerdetails` (`email`);

--
-- Constraints for table `propertylocation`
--
ALTER TABLE `propertylocation`
  ADD CONSTRAINT `propertylocation_ibfk_1` FOREIGN KEY (`email`) REFERENCES `ownerdetails` (`email`);

--
-- Constraints for table `proppics`
--
ALTER TABLE `proppics`
  ADD CONSTRAINT `proppics_ibfk_1` FOREIGN KEY (`email`) REFERENCES `ownerdetails` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
