På den här webbplatsen har jag skapat en funktion för användare att registrera sig och logga in. Sidan använder olika tekniker för att säkerställa att användarnas information skyddas på bästa möjliga sätt.

När en användare registrerar sig, lagras inte deras lösenord i klartext i databasen. Istället används en teknik som kallas för hashing (specifikt med bcrypt), vilket betyder att lösenordet omvandlas till en sträng av tecken som inte kan återföras till det ursprungliga lösenordet. Detta är en viktig säkerhetsåtgärd eftersom det skyddar användarnas lösenord om någon skulle få obehörig tillgång till databasen.

För att hantera inloggningar, så används JWT (JSON Web Token) till användaren när de lyckas logga in. Denna token används sedan för att verifiera användarens identitet vid efterföljande anrop till webbservern, vilket gör att vi kan säkerställa att endast legitima användare får tillgång till skyddade sidor på webbplatsen.

Användningen av HTTPS är också viktigt eftersom det ger en säker kanal även över osäkra nätverk, som offentliga WiFi-nätverk.

Allt detta är viktigt för att skapa en trygg och säker miljö för användarna på min webbsida.

Tabell-namn	Fält
Test	    id (int(11)), "username" (varchar(256)), "password" (varchar(256)), "created" (date)

Metod	Ändpunkt	    Beskrivning
GET	    /api/users	    Hämtar alla användare. Kräver JWT för autentisering.
GET	    /api/protected	Hämtar ett meddelande om att rutan är skyddad. Kräver JWT för autentisering.
POST	/api/register	Registrerar en ny användare. Kräver användarnamn och lösenord.
POST	/api/login	    Loggar in en användare och returnerar en JWT. Kräver användarnamn och lösenord.