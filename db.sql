CREATE TABLE Usuario(ID SERIAL PRIMARY KEY,login VARCHAR(10) NOT NULL,senha VARCHAR(10) NOT NULL);

CREATE TABLE Role(ID SERIAL PRIMARY KEY, nome TEXT NOT NULL);

CREATE TABLE Usuario_Role(ID_USUARIO INT NOT NULL, ID_ROLE INT NOT NULL, PRIMARY KEY (ID_USUARIO, ID_ROLE),
FOREIGN KEY (ID_USUARIO) REFERENCES Usuario(ID), FOREIGN KEY (ID_ROLE) REFERENCES Role(ID));

CREATE TABLE Jogo(ID SERIAL PRIMARY KEY, duracao INT NOT NULL);

CREATE TABLE Time (ID SERIAL PRIMARY KEY, nome TEXT NOT NULL, sigla VARCHAR(3) NOT NULL);

CREATE TABLE Time_Jogo (ID_TIME INT NOT NULL, ID_JOGO INT NOT NULL, PRIMARY KEY (ID_TIME, ID_JOGO),
pontuacao INT NOT NULL, vencedor BOOLEAN NOT NULL,
FOREIGN KEY (ID_TIME) REFERENCES Time(ID), FOREIGN KEY (ID_JOGO) REFERENCES Jogo(ID));

CREATE TABLE Jogador (ID SERIAL PRIMARY KEY, nome TEXT NOT NULL, ID_TIME INT NOT NULL, carteira_stellar VARCHAR(56) UNIQUE DEFAULT NULL,
FOREIGN KEY (ID_TIME) REFERENCES Time(ID));

CREATE TABLE Jogador_Jogo (
    ID_JOGADOR INT NOT NULL,
    ID_JOGO INT NOT NULL,
    pontos_marcados INT DEFAULT 0,
    PRIMARY KEY (ID_JOGADOR, ID_JOGO),
    FOREIGN KEY (ID_JOGADOR) REFERENCES Jogador(ID),
    FOREIGN KEY (ID_JOGO) REFERENCES Jogo(ID)
);


CREATE TABLE Transacao_Recompensa (
    ID SERIAL PRIMARY KEY,
    ID_JOGADOR INT NOT NULL,
    ID_JOGO INT NOT NULL,
    valor_pago NUMERIC(19, 7) NOT NULL, -- Stellar utiliza 7 casas decimais de precisão
    hash_transacao VARCHAR(64) UNIQUE,
    status VARCHAR(20) DEFAULT 'PENDENTE', -- Ex: PENDENTE, SUCESSO, FALHA
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_JOGADOR) REFERENCES Jogador(ID),
    FOREIGN KEY (ID_JOGO) REFERENCES Jogo(ID)
);

INSERT INTO Usuario (login, senha) VALUES
('admin', '12345678'),
('player1', 'pass123'),
('coach_x', 'secret99');

INSERT INTO Role (nome) VALUES
('Administrador'),
('Jogador'),
('Analista');

INSERT INTO Usuario_Role (ID_USUARIO, ID_ROLE) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO Time (nome, sigla) VALUES
('Alpha Warriors', 'ALW'),
('Beta Strikers', 'BTS'),
('Gamma Titans', 'GMT');

INSERT INTO Jogador (nome, ID_TIME) VALUES
('Alice Silva', 1),
('Bob Santos', 1),
('Charlie Costa', 2),
('David Oliveira', 2),
('Eve Lima', 3);

INSERT INTO Jogo (duracao) VALUES
(90),
(120),
(15);

INSERT INTO Time_Jogo (ID_TIME, ID_JOGO, pontuacao, vencedor) VALUES
(1, 1, 3, TRUE),
(2, 1, 1, FALSE),
(2, 2, 0, FALSE),
(3, 2, 2, TRUE),
(1, 3, 1, FALSE),
(3, 3, 1, FALSE);

INSERT INTO Jogador_Jogo (ID_JOGADOR, ID_JOGO, pontos_marcados) VALUES
(1, 1, 3),
(2, 1, 1),
(2, 2, 0),
(3, 2, 2),
(1, 3, 1),
(3, 3, 1);
