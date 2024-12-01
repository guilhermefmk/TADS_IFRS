import socket

# Configuração do cliente
HOST = "127.0.0.1"
PORT = 10000
BUFFER_SIZE = 1024


# Cliente
def cliente():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        try:
            client_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            client_socket.connect((HOST, PORT))
            print(f"Conectado ao servidor em {HOST}:{PORT}")

            # Recebe a mensagem para digitar o nome
            msg = client_socket.recv(BUFFER_SIZE).decode()
            print(msg, end="")  # Remover quebra de linha extra
            nome = input()
            client_socket.sendall(nome.encode())

            # Recebe mensagens do servidor
            while True:
                data = client_socket.recv(BUFFER_SIZE).decode()
                print(data)  # Exibe a mensagem do servidor

                # Se o servidor perguntar sobre a jogada
                if "Escolha uma linha e uma coluna" in data:
                    jogada = input()  # Envia a jogada
                    client_socket.sendall(jogada.encode())

                # Se o jogo terminar, com vitória ou derrota
                if "Todos os navios do adversário foram afundados" in data or "Todos os seus navios foram afundados" in data:
                    # Aguardar a pergunta de jogar novamente
                    while True:
                        data = client_socket.recv(BUFFER_SIZE).decode()
                        print(data)

                        if "Deseja jogar novamente?" in data:
                            resposta = input()  # Recebe a resposta de 's' ou 'n'
                            client_socket.sendall(resposta.encode())  # Envia a resposta
                            break

                    # Aguarda a mensagem final
                    data = client_socket.recv(BUFFER_SIZE).decode()
                    print(data)

                    # Verifica se o jogo terminou completamente
                    if "Obrigado por jogar" in data:
                        break

        except KeyboardInterrupt:
            print("\nConexão encerrada pelo jogador.")
        except Exception as e:
            print(f"Erro no cliente: {e}")


if __name__ == "__main__":
    cliente()
