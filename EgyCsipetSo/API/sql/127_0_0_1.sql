-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Feb 27. 12:30
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `2123szft_1css`
--
CREATE DATABASE IF NOT EXISTS `2123szft_1css` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `2123szft_1css`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptek`
--

CREATE TABLE `receptek` (
  `ID` int(11) NOT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `elkeszites` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `hozzavalok` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `mennyisegek` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `receptek`
--

INSERT INTO `receptek` (`ID`, `nev`, `elkeszites`, `hozzavalok`, `mennyisegek`) VALUES
(14, 'Pica fish', ' fisht fogd meg majd susd\r\nmeg', 'pica,fish', '1 pici,1 fishy'),
(23, 'Cica mica', 'simi', 'mica', 'Cica'),
(24, 'Fishy', '', '', ''),
(31, 'Halas spenot', '', '', ''),
(32, 'Paradicsomleves', 'Ízlés szerint öntsünk vizet a tányérba, és már kész is.', 'tányér,meleg víz', '1 vörös,1 liter '),
(33, 'Sablon recept', '', '', ''),
(34, 'Béka láb', '', '', ''),
(35, 'Kárbonara', 'Keverjük össze a tejfölt a tésztával.', 'tészta,tejföl,megyegybambi', '1/2 kiló,200g ,ennyi');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `receptek`
--
ALTER TABLE `receptek`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
