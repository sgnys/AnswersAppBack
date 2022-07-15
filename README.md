# Opis funkcjonalności aplikacji

Stworzona aplikacja ułatwi mi wykonywanie obowiązków w obecnej pracy.
Obecnie Pracuję na I Linii Service Desk. Obsługuję zgłoszenia techniczne dla firmy telekomunikacyjnej. Dziennie to kilkadziesiąt takich zgłoszeń- często powtarzalnych.

Jeśli uda mi się rozwiązać problem, to przy zamknięciu zgłoszenia mam obowiązek udzielenia odpowiedzi  w Service Desk.
Jedno rozwiązanie zgłoszenia technicznego musi zawierać odpowiedź do Konsultanta, który wysyła zgłoszenie a druga odpowiedź jest kierowana do Klienta jako wiadomość SMS.

Aplikacja umożliwia tworzenie takich odpowiedzi a później ich wyszukiwanie po tekście.
Odpowiedź można usuwać, edytować jak i również kopiować do schowka, zmieniać ich kategorię oraz zastosowane szablony.

Często odpowiedź do Konsultanta i do Klienta jest podobna ale forma przywitania i pożegnania jest inna.
Dlatego zostały stworzone dwa szablony: Do Klienta i Do Konsultanta. Można je też modyfikować
Nie wybranie żadnego szablonu podczas tworzenia odpowiedzi traktuje jako własną notatkę.

Odpowiedzi można kategoryzować według kategorii: IT, TELCO, PREPAID, INNE oraz NAJCZĘŚCIEJ UŻYWANE.
„NAJCZĘŚCIEJ UŻYWANE” – tutaj za podnoszenie wartości odpowiada wybranie przycisku „kopiuj” w danej odpowiedzi.


## Struktura bazy danych

Struktura została również udostępniona w pliku: 
### answers_app.sql

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Lip 2022, 08:26
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `answers_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
`id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
`text` varchar(3000) COLLATE utf8mb4_unicode_ci NOT NULL,
`category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
`createdAt` datetime NOT NULL DEFAULT current_timestamp(),
`modifiedAt` date DEFAULT NULL,
`copyBtnCount` int(11) NOT NULL DEFAULT 0,
`templateId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `answers`
--

INSERT INTO `answers` (`id`, `text`, `category`, `createdAt`, `modifiedAt`, `copyBtnCount`, `templateId`) VALUES
('00f8409d-7918-4af0-854f-424202300b17', 'Testowa edytowana odpowiedź.', 'telco', '2022-07-15 08:14:47', NULL, 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('24150c83-b6c5-4705-9676-b8ae33cb8f9b', 'Szablon do Klienta', 'it', '2022-07-14 15:20:40', NULL, 0, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('2e6b8153-0654-42c5-80d0-76aa47a6c246', 'Bez szablonu. Kategoria -Inne. \nW ten sposób można tworzyć notatki i nie traktować zapisanych w ten sposób informacji jako odpowiedzi do Konsultanta czy do Klienta.', 'other', '2022-07-12 10:19:30', '2022-07-15', 0, NULL),
('399eae40-c7e7-4153-9e22-327b17a038a3', 'Usługa została wyłączona.', 'prepaid', '2022-07-12 11:29:29', NULL, 5, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('46563697-803d-48a5-a346-ee34d8b2de33', 'Będzie dobrze', 'telco', '2022-07-14 14:56:45', NULL, 1, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('4c6cc84f-3ed0-421e-b43c-321329a24901', 'Sprawdzenie daty', 'other', '2022-07-14 18:41:48', '2022-07-14', 0, NULL),
('51841ce4-36e2-465a-b091-0b83c6c47997', 'Problem został rozwiązany.\nDziękujemy za zgłoszenie.\nTa odpowiedź była testowana w JEST.', 'telco', '2022-07-13 08:32:48', NULL, 9, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('6fdc13f3-6b16-4a3f-ad67-72c931cee3f8', 'Zmiany zostały zrealizowane.', 'it', '2022-07-13 19:56:11', '2022-07-15', 25, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('793401de-6289-4635-927f-2f89c5425f1d', 'Zmiany zostały zrealizowane.', 'it', '2022-07-15 08:13:41', NULL, 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('79e98999-d276-454e-8a2e-d13eb12fac3c', 'Opłaty zostały poprawione.', 'it', '2022-07-02 10:29:36', '2022-07-12', 7, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('7ab27a2f-e57e-43cb-bc28-25f1e7d1b9cb', 'Najnowsza odpowiedź.\n', 'telco', '2022-07-13 20:51:59', NULL, 3, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('84cb3f27-15c1-47ad-a575-8bc2332cd9ef', 'Dla Pana udało isę to zrobić', 'telco', '2022-07-10 10:18:54', '2022-07-15', 1, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('867eccee-b5c1-438b-878d-bc7651fa2f2f', 'Usługa została wyłączona.', 'prepaid', '2022-07-15 08:12:29', NULL, 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('924d505b-78da-41c3-bbfa-e1c5dd3342fe', 'Następny test edytowana odpowiedź.', 'telco', '2022-07-14 15:01:30', '2022-07-15', 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('97748db9-c764-49f9-9e5e-d5894c050915', 'testowy', 'prepaid', '2022-07-14 15:20:52', '2022-07-14', 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('a0903ac6-9fce-4ddd-9608-3dd63334f23e', 'Opłaty zostały poprawione.', 'it', '2022-07-15 08:05:40', NULL, 0, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('a519cf73-c1ae-47e5-a23b-6fd85774cbb4', 'Jak zawsze dalismy radę.rt', 'other', '2022-07-12 10:20:12', '2022-07-12', 0, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('a5e37290-d339-4d92-8c24-efec1959321b', 'Kolejna testowa notatka.', 'other', '2022-07-14 14:43:38', NULL, 0, NULL),
('abfae441-0ed8-4b73-97ab-e0afb654d267', 'dużo\n...', 'other', '2022-07-13 19:59:44', '2022-07-13', 1, 'f7a9eba4-9704-11ec-b0c8-309c23e04364'),
('c0817643-182c-4d8b-befb-7f5873356591', 'Bez szablonu', 'other', '2022-07-14 15:20:27', NULL, 0, NULL),
('d1a9539f-b8d0-41b7-998f-3deda6490781', 'Karta SIM została wymieniona.', 'prepaid', '2022-07-15 08:10:33', NULL, 0, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('d86f23ac-2cb3-496e-b513-528549814a5c', 'Testowa notatka', 'other', '2022-07-14 09:07:56', NULL, 1, NULL),
('e17246b3-1a52-4228-bc3f-d1b078a13cd4', 'Testowa edytowana odpowiedź.', 'telco', '2022-07-14 09:50:25', '2022-07-15', 0, 'cb84c522-970b-11ec-b0c8-309c23e04364'),
('ec30d437-32aa-47d7-920b-f91bb535828a', 'Karta SIM została wymieniona.', 'prepaid', '2022-07-12 10:19:45', '2022-07-13', 9, 'f7a9eba4-9704-11ec-b0c8-309c23e04364');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `templates`
--

CREATE TABLE `templates` (
`id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
`name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
`firstParagraph` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
`lastParagraph` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `templates`
--

INSERT INTO `templates` (`id`, `name`, `firstParagraph`, `lastParagraph`) VALUES
('cb84c522-970b-11ec-b0c8-309c23e04364', 'customer', 'Dzień Dobry.', 'Pozdrawiamy\nZespół Obsługi Zgłoszeń Technicznych.'),
('f7a9eba4-9704-11ec-b0c8-309c23e04364', 'consultant', 'Cześć.', 'Pozdrawiam\nJan Testowy.');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `answers`
--
ALTER TABLE `answers`
ADD PRIMARY KEY (`id`),
ADD KEY `FK_answers_templates` (`templateId`);

--
-- Indeksy dla tabeli `templates`
--
ALTER TABLE `templates`
ADD PRIMARY KEY (`id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `answers`
--
ALTER TABLE `answers`
ADD CONSTRAINT `FK_answers_templates` FOREIGN KEY (`templateId`) REFERENCES `templates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

