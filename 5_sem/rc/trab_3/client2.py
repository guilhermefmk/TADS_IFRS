import socket

# Configuração do cliente
HOST = "127.0.0.1"
PORT = 10000
BUFFER_SIZE = 1024


def cliente():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        try:
            client_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            client_socket.connect((HOST, PORT))
            print(f"Conectado ao servidor em {HOST}:{PORT}")

            # Recebe a mensagem para digitar o nome
            msg = client_socket.recv(BUFFER_SIZE).decode()
            print(msg, end="")
            nome = input()
            client_socket.sendall(nome.encode())

            # Recebe mensagens do servidor
            while True:
                data = client_socket.recv(BUFFER_SIZE).decode()
                print(data)

                # Se o servidor perguntar sobre a jogada
                if "Escolha uma linha e uma coluna" in data:
                    jogada = input()
                    client_socket.sendall(jogada.encode())

                # Se o jogo terminar, com vitória ou derrota
                if "Todos os navios do adversário foram afundados" in data or "Todos os seus navios foram afundados" in data:
                    # Espera pergunta de reinício
                    restart_data = client_socket.recv(BUFFER_SIZE).decode()
                    print(restart_data)

                    # Verifica se é pergunta de reinício
                    if "Deseja jogar novamente?" in restart_data:
                        resposta = input().strip().lower()
                        client_socket.sendall(resposta.encode())

                    # Recebe mensagem final
                    final_message = client_socket.recv(BUFFER_SIZE).decode()
                    print(final_message)

                    # Verifica se o jogo terminou
                    if "Encerrando o jogo" in final_message or "Obrigado por jogar" in final_message:
                        break

        except KeyboardInterrupt:
            print("\nConexão encerrada pelo jogador.")
        except Exception as e:
            print(f"Erro no cliente: {e}")


if __name__ == "__main__":
    cliente()
