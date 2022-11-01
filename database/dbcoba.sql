-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2022 at 10:02 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcoba`
--

-- --------------------------------------------------------

--
-- Table structure for table `cek_email`
--

CREATE TABLE `cek_email` (
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cek_email`
--

INSERT INTO `cek_email` (`email`) VALUES
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa'),
('aaaa');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id`, `nama`, `email`, `role`, `password`, `status`) VALUES
(39, 'coba', '123@aa.com', 'user', '$2b$10$LdVwOKHKOuKxZrNaodll..m/imkzvF7Jv8JoUXW.e9wDUGCSo08d6', 'aktif'),
(40, 'admin', 'admin@admin.com', 'admin', '$2b$10$WoJ.5MkfUsmGEfnpnOB6IuB0mHX1UHjzw6ygDSSUkFqK.9vZACKZW', 'aktif'),
(41, 'anshard', 'muh.ansharibrahim@gmail.com', 'admin', '$2b$10$1KX0BJUsM4yRSIHa8ua6w.E7RvLIdwjRnM4UC8z1utI13yTUIzUle', 'aktif'),
(42, 'a', 'an@t.com', 'user', '$2b$10$NNFpcDwWPQuVOZbSxr8FmuR9vR8XXG4E.a2f/oV3EyO9ZpooojCo6', 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`email`) VALUES
('coba'),
('hehe'),
('hehe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
