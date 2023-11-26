--Criando de Tabelas
	-- Tabela Cliente
	CREATE TABLE pratica.Cliente (
			id INT IDENTITY PRIMARY KEY,
			nome VARCHAR(50) NOT NULL,
			email VARCHAR(50) NOT NULL UNIQUE,
			endereco VARCHAR(50) NOT NULL,
			senha TEXT NOT NULL,
			urlAvatar TEXT NULL,
			cargo VARCHAR(15) NOT NULL
	);

	-- Tabela Produto
	CREATE TABLE pratica.Produto (
			id INT IDENTITY PRIMARY KEY,
			criador INT FOREIGN KEY REFERENCES pratica.Cliente(id),
			nome VARCHAR(150) NOT NULL,
			descricao VARCHAR(500) NOT NULL,
			urlFoto TEXT NULL,
			valorMinimo FLOAT NOT NULL
	);

	-- Tabela Leilao
	CREATE TABLE pratica.Leilao (
			id INT IDENTITY PRIMARY KEY,
			idProduto INT NOT NULL FOREIGN KEY REFERENCES pratica.Produto(id),
			dataInicio DATETIME NOT NULL,
			dataFim DATETIME NOT NULL
	);

	-- Tabela Lance
	CREATE TABLE pratica.Lance (
			id INT IDENTITY PRIMARY KEY,
			idLeilao INT NOT NULL FOREIGN KEY REFERENCES pratica.Leilao(id),
			idCliente INT NOT NULL FOREIGN KEY REFERENCES pratica.Cliente(id),
			valor FLOAT NOT NULL,
			atualizadoEm DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
	);

--Criando Triggers
	CREATE TRIGGER tr_ValidarCargos
	ON pratica.Cliente
	INSTEAD OF INSERT, UPDATE
	AS
	BEGIN
			-- Verificar se os cargos inseridos ou atualizados são válidos
			IF EXISTS (
					SELECT 1
					FROM inserted i
					WHERE i.cargo NOT IN ('cliente', 'vendedor', 'admin')
			)
			BEGIN
					RAISERROR('Cargos permitidos são: cliente, vendedor, admin.', 16, 1);
					ROLLBACK;
					RETURN;
			END

			-- Inserir ou atualizar os registros normalmente se os cargos forem válidos
			IF (SELECT COUNT(*) FROM deleted) > 0
			BEGIN
					-- Atualização
					UPDATE c
					SET nome = i.nome,
							email = i.email,
							endereco = i.endereco,
							senha = i.senha,
							urlAvatar = i.urlAvatar,
							cargo = i.cargo
					FROM pratica.Cliente c
					INNER JOIN inserted i ON c.id = i.id;
			END
			ELSE
			BEGIN
					-- Inserção
					INSERT INTO pratica.Cliente (nome, email, endereco, senha, urlAvatar, cargo)
					SELECT nome, email, endereco, senha, urlAvatar, cargo
					FROM inserted;
			END
	END;

	CREATE TRIGGER tr_AutomaticUpdateLance
	ON pratica.Lance
	AFTER INSERT, UPDATE, DELETE
	AS
	BEGIN
			-- Impede a exclusão de registros na tabela pratica.Lance.
			IF (SELECT COUNT(*) FROM deleted) > 0
			BEGIN
					RAISERROR('Não é permitido excluir registros da tabela pratica.Lance.', 16, 1);
					ROLLBACK;
					RETURN;
			END

			-- Impede a atualização de registros na tabela pratica.Lance.
			IF (SELECT COUNT(*) FROM inserted) > 0 AND (SELECT COUNT(*) FROM deleted) > 0
			BEGIN
					RAISERROR('Não é permitido atualizar registros na tabela pratica.Lance.', 16, 1);
					ROLLBACK;
					RETURN;
			END

			-- Adiciona automaticamente o valor atualizadoEm ao inserir registros
			IF (SELECT COUNT(*) FROM inserted) > 0
			BEGIN
					UPDATE pratica.Lance
					SET atualizadoEm = CURRENT_TIMESTAMP
					FROM pratica.Lance l
					INNER JOIN inserted i ON l.id = i.id;
			END
	END;

	-- Verifica se o leilão está aberto ao inserir um lance na tabela pratica.Lance.
	CREATE TRIGGER tr_CheckLeilaoAberto
	ON pratica.Lance
	AFTER INSERT
	AS
	BEGIN
			DECLARE @LeilaoID INT;
			DECLARE @DataAtual DATETIME;

			SELECT @LeilaoID = inserted.idLeilao,
						@DataAtual = GETDATE()
			FROM inserted;

			DECLARE @DataInicio DATETIME;
			DECLARE @DataFim DATETIME;

			SELECT @DataInicio = l.dataInicio,
						@DataFim = l.dataFim
			FROM pratica.Leilao l
			WHERE l.id = @LeilaoID;

			IF @DataAtual < @DataInicio OR @DataAtual > @DataFim
			BEGIN
					RAISERROR('O leilão não está aberto para novos lances.', 16, 1);
					ROLLBACK;
			END
	END;

	-- Verifica se o valor do lance é maior ou igual ao valor mínimo do produto.
	CREATE TRIGGER tr_CheckLance
	ON pratica.Lance
	AFTER INSERT
	AS
	BEGIN
			DECLARE @ProdutoID INT;
			DECLARE @LanceValor FLOAT;

			SELECT @ProdutoID = inserted.idLeilao,
						@LanceValor = inserted.valor
			FROM inserted;

			DECLARE @ValorMinimo FLOAT;

			SELECT @ValorMinimo = p.valorMinimo
			FROM pratica.Leilao l
			INNER JOIN pratica.Produto p ON l.idProduto = p.id
			WHERE l.id = @ProdutoID;

			IF @LanceValor < @ValorMinimo
			BEGIN
					RAISERROR('O valor do lance deve ser maior ou igual ao valor mínimo do produto.', 16, 1);
					ROLLBACK;
			END
	END;

--Criando Procedures
	CREATE PROCEDURE pratica.CriarLance
			@idLeilao INT,
			@idCliente INT,
			@valor FLOAT
	AS
	BEGIN
			INSERT INTO pratica.Lance (idLeilao, idCliente, valor, atualizadoEm)
			VALUES (@idLeilao, @idCliente, @valor, CURRENT_TIMESTAMP);
	END;


	CREATE PROCEDURE pratica.CriarProduto
			@criador INT,
			@nome VARCHAR(150),
			@descricao VARCHAR(500),
			@urlFoto TEXT,
			@valorMinimo FLOAT
	AS
	BEGIN
			INSERT INTO pratica.Produto (criador, nome, descricao, urlFoto, valorMinimo)
			VALUES (@criador, @nome, @descricao, @urlFoto, @valorMinimo);
	END;

	CREATE PROCEDURE pratica.CriarVendedor
			@nome VARCHAR(50),
			@email VARCHAR(50),
			@endereco VARCHAR(50),
			@senha TEXT,
			@urlAvatar TEXT
	AS
	BEGIN
			INSERT INTO pratica.Cliente (nome, email, endereco, senha, urlAvatar, cargo)
			VALUES (@nome, @email, @endereco, @senha, @urlAvatar, 'vendedor');
	END;

	CREATE PROCEDURE pratica.CriarCliente
			@nome VARCHAR(50),
			@email VARCHAR(50),
			@endereco VARCHAR(50),
			@senha TEXT,
			@urlAvatar TEXT
	AS
	BEGIN
			INSERT INTO pratica.Cliente (nome, email, endereco, senha, urlAvatar, cargo)
			VALUES (@nome, @email, @endereco, @senha, @urlAvatar, 'cliente');
	END;

	CREATE PROCEDURE pratica.IniciarLeilao
			@idProduto INT,
			@dataInicio DATETIME = NULL
	AS
	BEGIN
			IF @dataInicio IS NULL
			BEGIN
					SET @dataInicio = CURRENT_TIMESTAMP;
			END

			INSERT INTO pratica.Leilao (idProduto, dataInicio, dataFim)
			VALUES (@idProduto, @dataInicio, NULL);
	END;

	CREATE PROCEDURE pratica.EncerrarLeilao
			@idLeilao INT,
			@dataEncerramento DATETIME = NULL
	AS
	BEGIN
			IF @dataEncerramento IS NULL
			BEGIN
					SET @dataEncerramento = CURRENT_TIMESTAMP;
			END

			UPDATE pratica.Leilao
			SET dataFim = @dataEncerramento
			WHERE id = @idLeilao;
	END;

--Criando Views
	CREATE VIEW pratica.LancesLeilao AS
			SELECT l.id, l.idLeilao, l.idCliente, l.valor, l.atualizadoEm, 
						c.nome AS nomeCliente, c.urlAvatar AS avatarCliente
			FROM pratica.Lance l
			INNER JOIN pratica.Cliente c ON l.idCliente = c.id;

	CREATE View pratica.LeiaoProduto AS
		select l.id "idLeilao", p.id "idProduto", l.dataInicio, l.dataFim, p.criador, p.nome, p.descricao, p.urlFoto, p.valorMinimo
			FROM 
				pratica.Leilao l inner join pratica.Produto p
				on p.id = l.idProduto

	CREATE VIEW pratica.ProdutoCriador AS 
		SELECT p.id, p.nome, p.descricao, p.urlFoto, c.id "id_criador", c.nome "nome_criador", c.urlAvatar "avatar_criador"
			FROM 
			pratica.Produto p 
				inner join pratica.Cliente c 
				on p.criador = c.id 
	
	CREATE VIEW pratica.Vendedores AS
		SELECT id, nome, email, endereco, urlAvatar
		FROM pratica.Cliente
		WHERE cargo = 'vendedor';

	CREATE VIEW pratica.LeiaoAbertoProduto AS
		SELECT 
				l.id AS idLeilao, 
				p.id AS idProduto, 
				l.dataInicio, 
				l.dataFim, 
				p.criador, 
				p.nome, 
				p.descricao, 
				p.urlFoto, 
				p.valorMinimo
		FROM 
				pratica.Leilao l 
		INNER JOIN 
				pratica.Produto p ON p.id = l.idProduto
		WHERE 
				GETDATE() BETWEEN l.dataInicio AND l.dataFim;

	CREATE VIEW pratica.GanhadoresLeilao AS
		SELECT
				l.idLeilao,
				l.idCliente AS idGanhador,
				c.nome AS nomeGanhador,
				MAX(l.valor) AS valorVencedor
		FROM
				pratica.Lance l
		INNER JOIN
				pratica.Cliente c ON l.idCliente = c.id
		GROUP BY
				l.idLeilao, l.idCliente, c.nome;