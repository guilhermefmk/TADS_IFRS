import random
import socket
import threading

# Configuração do servidor
HOST = "127.0.0.1"
PORT = 10000
BUFFER_SIZE = 1024


# Geração do tabuleiro com navios posicionados aleatoriamente
def gerar_tabuleiro():
    tabuleiro = [["~"] * 6 for _ in range(6)]
    navios = 0
    while navios < 3:
        x, y = random.randint(0, 5), random.randint(0, 5)
        if tabuleiro[x][y] == "~":
            tabuleiro[x][y] = "N"
            navios += 1
    return tabuleiro


# Função para formatar o tabuleiro como string com legendas
def formatar_tabuleiro(tabuleiro):
    colunas = "  " + " ".join(map(str, range(6)))  # Cabeçalho das colunas
    linhas = [f"{i} " + " ".join(linha) for i, linha in enumerate(tabuleiro)]  # Linhas com legenda
    return "\n".join([colunas] + linhas)


# Função para verificar se todos os navios de um jogador foram afundados
def verificar_vitoria(tabuleiro):
    for linha in tabuleiro:
        if "N" in linha:
            return False  # Se ainda houver navios
    return True  # Se não houver mais navios


def processar_jogada(jogador, tabuleiro_oponente):
    while True:
        jogador.sendall("Sua vez! Escolha uma linha e uma coluna (ex: 2 3): ".encode())
        jogada = jogador.recv(BUFFER_SIZE).decode().strip()
        print(f"Jogada recebida: {jogada}")  # Adicionando depuração
        try:
            linha, coluna = map(int, jogada.split())
            if 0 <= linha < 6 and 0 <= coluna < 6:
                if tabuleiro_oponente[linha][coluna] == "N":
                    tabuleiro_oponente[linha][coluna] = "X"  # Acertou um navio
                    jogador.sendall(f"Você acertou o navio em {linha} {coluna}!\n".encode())
                    return True
                elif tabuleiro_oponente[linha][coluna] == "~":
                    tabuleiro_oponente[linha][coluna] = "O"  # Errou
                    jogador.sendall(f"Você errou a jogada em {linha} {coluna}.\n".encode())
                    return False
                else:
                    jogador.sendall("Você já atirou nesta posição. Tente novamente.\n".encode())
            else:
                jogador.sendall("Coordenadas inválidas. Tente novamente (0 a 5).\n".encode())
        except ValueError:
            jogador.sendall("Entrada inválida. Digite duas coordenadas separadas por espaço.\n".encode())


def reiniciar_jogo(jogador1, jogador2, nome1, nome2):
    # Enviar pergunta de reinício para ambos jogadores
    jogador1.sendall("Deseja jogar novamente? (s/n): ".encode())
    jogador2.sendall("Deseja jogar novamente? (s/n): ".encode())

    # Usar um timeout para garantir que ambos respondam
    jogador1.settimeout(10)  # 5 minutos de timeout
    jogador2.settimeout(10)

    try:
        # Receber respostas
        resposta1 = jogador1.recv(1024).decode().strip().lower()
        resposta2 = jogador2.recv(1024).decode().strip().lower()

        # Verificar se ambos querem continuar
        if resposta1 == "s" and resposta2 == "s":
            jogador1.sendall("Reiniciando jogo...\n".encode())
            jogador2.sendall("Reiniciando jogo...\n".encode())
            return True
        else:
            # Se um dos jogadores não quiser continuar
            jogador1.sendall(f"Resultado: {nome2} {'não' if resposta1 == 's' else ''} quer jogar novamente.\nObrigado por jogar! Até a próxima.\n".encode())
            jogador2.sendall(f"Resultado: {nome1} {'não' if resposta2 == 's' else ''} quer jogar novamente.\nObrigado por jogar! Até a próxima.\n".encode())
            return False
    except socket.timeout:
        # Se algum jogador não responder no tempo limite
        jogador1.sendall("Tempo de resposta esgotado. Encerrando o jogo.\n".encode())
        jogador2.sendall("Tempo de resposta esgotado. Encerrando o jogo.\n".encode())
        return False
    finally:
        # Restaurar configurações de socket
        jogador1.settimeout(None)
        jogador2.settimeout(None)


def gerenciar_jogo(jogador1, jogador2, nome1, nome2):
    try:
        continuar = True
        while continuar:
            # Gerar tabuleiros para cada jogador
            tabuleiro1 = gerar_tabuleiro()
            tabuleiro2 = gerar_tabuleiro()

            # Definir o jogador inicial aleatoriamente
            jogador_atual, jogador_adversario = random.choice([(jogador1, jogador2), (jogador2, jogador1)])

            # Mensagem inicial para ambos os jogadores
            jogador1.sendall(f"Seu oponente é: {nome2}\nSeu tabuleiro:\n{formatar_tabuleiro(tabuleiro1)}\n".encode())
            jogador2.sendall(f"Seu oponente é: {nome1}\nSeu tabuleiro:\n{formatar_tabuleiro(tabuleiro2)}\n".encode())

            # Começar o jogo
            while True:
                # Enviar apenas o tabuleiro do adversário após a jogada do atual
                jogador_adversario.sendall(f"Vez de {nome1 if jogador_atual == jogador2 else nome2}, aguarde!\n".encode())

                # O jogador realiza a jogada
                acertou = processar_jogada(jogador_atual, tabuleiro2 if jogador_atual == jogador1 else tabuleiro1)

                # Atualizar o tabuleiro do jogador atual
                jogador_atual.sendall(f"Seu tabuleiro atualizado:\n{formatar_tabuleiro(tabuleiro1 if jogador_atual == jogador1 else tabuleiro2)}\n".encode())

                # Enviar o tabuleiro do adversário atualizado após a jogada
                jogador_adversario.sendall(
                    f"Tabuleiro de {nome1 if jogador_atual == jogador2 else nome2} atualizado:\n{formatar_tabuleiro(tabuleiro2 if jogador_atual == jogador1 else tabuleiro1)}\n".encode()
                )

                # Verificar se algum jogador venceu
                if verificar_vitoria(tabuleiro2 if jogador_atual == jogador1 else tabuleiro1):
                    jogador_atual.sendall("Você venceu! Todos os navios do adversário foram afundados!\n".encode())
                    jogador_adversario.sendall(f"{nome1 if jogador_atual == jogador2 else nome2} venceu! Todos os seus navios foram afundados.\n".encode())
                    break

                # Trocar de turno
                jogador_atual, jogador_adversario = jogador_adversario, jogador_atual

            # Perguntar se os jogadores querem jogar novamente
            continuar = reiniciar_jogo(jogador1, jogador2, nome1, nome2)

    except Exception as e:
        print(f"Erro no jogo: {e}")
    finally:
        jogador1.close()
        jogador2.close()


# Função para o servidor
def servidor():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_socket.bind((HOST, PORT))
        server_socket.listen(2)
        print(f"Servidor iniciado e aguardando conexões na porta {PORT}...")

        while True:
            try:
                # Aguarda dois jogadores se conectarem
                jogador1, addr1 = server_socket.accept()
                print(f"Jogador 1 conectado: {addr1}")
                jogador1.sendall("Digite seu nome: ".encode())
                nome1 = jogador1.recv(BUFFER_SIZE).decode().strip()

                jogador2, addr2 = server_socket.accept()
                print(f"Jogador 2 conectado: {addr2}")
                jogador2.sendall("Digite seu nome: ".encode())
                nome2 = jogador2.recv(BUFFER_SIZE).decode().strip()

                # Inicia uma thread para gerenciar o jogo entre os dois jogadores
                thread = threading.Thread(target=gerenciar_jogo, args=(jogador1, jogador2, nome1, nome2))
                thread.start()
            except Exception as e:
                print(f"Erro ao conectar jogadores: {e}")


if __name__ == "__main__":
    servidor()
