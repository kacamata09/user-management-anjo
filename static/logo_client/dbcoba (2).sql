-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2022 at 05:04 AM
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
('aaaa'),
('muh.ansharibrahim@gmail.com'),
('muh.ansharibrahim@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `clientconfig`
--

CREATE TABLE `clientconfig` (
  `client_id` varchar(255) NOT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `nama_client` varchar(255) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clientconfig`
--

INSERT INTO `clientconfig` (`client_id`, `client_secret`, `nama_client`, `redirect_uri`) VALUES
('3Wd37hFq6mRCU0cw3637FmDhgXN', 'QH2OJ1yxI8TpPOZ81cdqsz3QGBa', 'client2', 'http://localhost:2000/auth/login/callback'),
('6lLg8ZQbItsQdbnrmkbiu35AJsZ', 'gWvWEi4E3kDzbYCaZaUBbH0wazD', 'test ubah', 're'),
('bNxuuHXCen8h7dzqT3ZDl3REeXm', '7vpvI54oqjh17HKpYyuxF0pjC5y', 'client3', 'http://localhost:8080/auth/login/callback'),
('KyV3S7dLxbVgg10B0cVN7Fi8JDD', 'NlLMpdXu8OkAS9uOVbCSg9ipFIx', 'node web', 'http://localhost:8080/auth/login/callback'),
('pgduvnp3Cm1DAyguWKAbJmSWjO7', 'BUQjFykcWlJFtWQ1EJiQVQhWIaI', 'client1', 'http://localhost:1000/auth/login/callback'),
('vyTYXCtCMai8UC1gJpIwDcDi8Cb', 'cdLgXzUow8mOdp3TIV0vSlM872v', 'flask web', 'http://localhost:1000/auth');

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
(40, 'admin', 'admin@admin.com', 'admin', '$2b$10$UK04pdvn5oMTQyhlOBUldOsjDs8tDvyI6gqQ.j1yRhlp7xmLO7ixW', 'aktif'),
(46, 'coba', 'test@test.com', 'user', '$2b$10$Md2dcKcDx.T6R4Va4SxdhOnvNy5hZevSltFv01dGgX1GSCNrCL4KW', 'aktif'),
(47, 'kehapus ya', '123@12.com', 'user', '$2b$10$s6kjIebwZSIAYHR0U8EqduaEVua3WJXLEdpIJNS6NXQAZWSnd/Fma', 'aktif'),
(49, 'anshar', 'muh.ansharibrahim@gmail.com', 'user', '$2b$10$9umUX6wqHnvGXzZV/ufD/O7dWLbG24Jkj.EbCETLAjBoRshNtD1ky', 'aktif'),
(51, 'asdfasdf', 'asdf@sdfsdf.com', 'user', '$2b$10$NXoUgEFLKSh5Lkk/fw880uwiZa4co3A5zVY.JeP5T6mWGkmHbvoMe', 'aktif'),
(52, 'testing_user1', 'test@test.co.id', 'user', '$2b$10$BvIZ0XD35YBaz7arCeewsuV5.kfvPbQb6CIWdnyGLfomE0ugUs4qG', 'aktif');

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
-- Indexes for table `clientconfig`
--
ALTER TABLE `clientconfig`
  ADD PRIMARY KEY (`client_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
