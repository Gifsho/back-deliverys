>
    git add .
>
    git commit -m "My Comment to Add File"
>
    git push -u origin main


> Run DB
> 
    npm start
>
> AND
> 
    node index dev

> -- ผู้ใช้ #เสร็จ
> 
    CREATE TABLE Users (
    UserID     INT AUTO_INCREMENT PRIMARY KEY,
    Username   VARCHAR(50) UNIQUE NOT NULL,
    Password   VARCHAR(255) NOT NULL,
    Email      VARCHAR(100) UNIQUE NOT NULL,
    );

> -- เป๋าตังส์ #เสร็จ
> 
    CREATE TABLE Wallets (
    WalletID   INT AUTO_INCREMENT PRIMARY KEY,
    UserID     INT NOT NULL,
    Balance    DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

> -- ลอตโต้ #เสร็จ
> 
    CREATE TABLE Lotto (
    LottoID       INT AUTO_INCREMENT PRIMARY KEY,
    LottoNumber   VARCHAR(6) NOT NULL,
    DrawDate      DATE NOT NULL,
    Price         DECIMAL(10, 2) NOT NULL
    Amount        DECIMAL(10, 2) NOT NULL
    );

> -- ลอตโต้ของผู้ใช้ #เสร็จ
> 
    CREATE TABLE Tickets (
    TicketID       INT AUTO_INCREMENT PRIMARY KEY,
    UserID         INT,
    LottoID        INT,
    PurchaseDate   DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (LottoID) REFERENCES Lotto(LottoID)
    );

> -- สุ่มเลข&ผลรางวัลประจำงวด #เสร็จ
> 
    CREATE TABLE WinningNumbers (
    DrawID       INT AUTO_INCREMENT PRIMARY KEY,
    DrawDate     DATE NOT NULL,
    LottoNumber  INT
    );

> -- งวดที่
> 
    CREATE TABLE Lessons (
    LessonID     INT AUTO_INCREMENT PRIMARY KEY,
    DrawID       INT
    Lessonsdes   VARCHAR(6) NOT NULL
    );

> -- ผู้ใช้ที่ถูกรางวัล #เสร็จ
> 
    CREATE TABLE Prizes (
    PrizeID         INT AUTO_INCREMENT PRIMARY KEY, 
    DrawID          INT,
    UserID          INT,
    TicketID        INT,
    ##PrizeAmount   DECIMAL(10, 2) NOT NULL, 	-- (1) fix เอาเอง	-- (2) ตั้งไว้ 1000 เมื่อสุ่มลดลงทีละ 200
    
    FOREIGN KEY (DrawID) REFERENCES WinningNumbers(DrawID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID)
    );
