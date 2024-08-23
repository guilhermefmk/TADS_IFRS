#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Definir o tamanho da tabela hash e o tamanho máximo de IP e domínio
#define TABLE_SIZE 7
#define MAX_IP_LENGTH 16
#define MAX_DOMAIN_LENGTH 50

// Estrutura para cada elemento da tabela
typedef struct Element {
    char ip[MAX_IP_LENGTH];
    char domain[MAX_DOMAIN_LENGTH];
    struct Element* next;
} Element;

// Tabela hash (array de ponteiros para Element)
Element* hashTable[TABLE_SIZE];



int hash(char* ip) {
    /* Esta função calcula um valor hash para um dado ip.
     * O algoritmo soma os valores ASCII de todos os caracteres no ip
     * e então usa o operador módulo para garantir que o resultado
     * esteja dentro do intervalo válido da tabela hash.
     *
     * Passos:
     * 1. Inicializa uma variável 'sum' com 0.
     * 2. Percorre cada caractere do ip.
     * 3. Adiciona o valor ASCII de cada caractere à 'sum'.
     * 4. Retorna o resto da divisão de 'sum' por TABLE_SIZE
     */
    int sum = 0;
    for (int i = 0; ip[i] != '\0'; i++) {
        sum += ip[i];
    }
    return sum % TABLE_SIZE;
}

// Função para criar um novo elemento
Element* createElement(char* ip, char* domain) {
    Element* newElement = (Element*)malloc(sizeof(Element));
    strcpy(newElement->ip, ip);
    strcpy(newElement->domain, domain);
    newElement->next = NULL;
    return newElement;
}

// Função para verificar se um IP já existe na tabela
int ipExists(char* ip) {
    int index = hash(ip); // Calcula o índice do IP
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista encadeada
    
    while (current != NULL) { // Percorre a lista encadeada
        if (strcmp(current->ip, ip) == 0) { // Compara o IP atual com o IP desejado
            return 1; // IP encontrado
        }
        current = current->next; // Avança para o próximo elemento da lista
    }
    
    return 0; // IP não encontrado
}

// Função para contar o número de elementos em um índice
int countElementsInIndex(int index) {
    int count = 0;
    Element* current = hashTable[index];
    while (current != NULL) {
        count++;
        current = current->next;
    }
    return count;
}

// Função para inserir um elemento na tabela
void insert(char* ip, char* domain) {
    if (ipExists(ip)) { // Verifica se o IP já existe na tabela
        printf("Erro: IP %s ja existe na tabela.\n", ip);
        return;
    }

    int index = hash(ip); // Calcula o índice do IP

    // Verifica se o índice já tem 7 elementos
    if (countElementsInIndex(index) >= 7) {
        printf("Erro: O indice %d ja contem o maximo de 7 elementos. Nao e possivel inserir mais.\n", index);
        return;
    }

    Element* newElement = createElement(ip, domain); // Cria um novo elemento
    
    if (hashTable[index] == NULL) { // Se a lista encadeada estiver vazia
        hashTable[index] = newElement; // Insere o novo elemento no início da lista
    } else {
        Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista
        while (current->next != NULL) { // Percorre a lista até o último elemento
            current = current->next;
        }
        current->next = newElement; // Insere o novo elemento no final da lista
    }
    printf("Elemento inserido com sucesso.\n");
}

// Função para remover um elemento da tabela
void removeElement(char* ip) {
    int index = hash(ip); // Calcula o índice do IP
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista
    Element* prev = NULL; // Inicializa o ponteiro para o elemento anterior

    while (current != NULL && strcmp(current->ip, ip) != 0) { // Percorre a lista até encontrar o IP
        prev = current; // Atualiza o ponteiro para o elemento anterior
        current = current->next; // Avança para o próximo elemento
    }

    if (current == NULL) { // Se o IP não foi encontrado
        printf("IP nao encontrado.\n");
        return;
    }

    if (prev == NULL) { // Se o IP é o primeiro elemento da lista
        hashTable[index] = current->next;
    } else { // Se o IP não é o primeiro elemento da lista
        prev->next = current->next;
    }

    free(current); // Libera a memória alocada para o elemento
    printf("Elemento removido com sucesso.\n");
}

// Função para buscar um IP na tabela
char* search(char* ip) {
    int index = hash(ip); // Calcula o índice do IP
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista
    
    while (current != NULL) { // Percorre a lista encadeada
        if (strcmp(current->ip, ip) == 0) { // Compara o IP atual com o IP desejado
            return current->domain; // Retorna o domínio correspondente
        }
        current = current->next; // Avança para o próximo elemento da lista
    }
    
    return NULL;
}

// Função para imprimir a tabela
void printTable() {
    for (int i = 0; i < TABLE_SIZE; i++) { // Percorre cada índice da tabela
        printf("Index %d: ", i); // Imprime o índice atual
        Element* current = hashTable[i]; // Inicializa o ponteiro para o início da lista encadeada
        while (current != NULL) { // Percorre a lista encadeada
            printf("(%s, %s) -> ", current->ip, current->domain); // Imprime o IP e o domínio do elemento atual
            current = current->next; // Avança para o próximo elemento
        }
        printf("NULL\n");
    }
}

// Função principal
int main() {
    // Inicializar a tabela
    for (int i = 0; i < TABLE_SIZE; i++) {
        hashTable[i] = NULL;
    }

    // 20 inserções fixas
    insert("192.168.1.1", "router.local");
    insert("8.8.8.8", "dns.google");
    insert("172.217.16.142", "google.com");
    insert("31.13.72.36", "facebook.com");
    insert("199.232.69.194", "github.com");
    insert("151.101.65.140", "reddit.com");
    insert("104.244.42.193", "twitter.com");
    insert("172.217.16.14", "youtube.com");
    insert("151.101.193.69", "imgur.com");
    insert("151.101.1.140", "stackoverflow.com");
    insert("151.101.129.69", "spotify.com");
    insert("13.33.131.6", "amazon.com");
    insert("104.16.80.166", "cloudflare.com");
    insert("157.240.221.35", "instagram.com");
    insert("104.244.42.129", "api.twitter.com");
    insert("172.217.16.238", "mail.google.com");
    insert("157.240.221.34", "whatsapp.com");
    insert("151.101.1.69", "twitch.tv");
    insert("151.101.193.140", "github.io");
    insert("151.101.65.69", "medium.com");

    // Menu principal
    char ip[MAX_IP_LENGTH];
    char domain[MAX_DOMAIN_LENGTH];
    int choice;

    do {
        printf("\n1. Inserir IP e dominio\n");
        printf("2. Buscar dominio por IP\n");
        printf("3. Remover registro por IP\n");
        printf("4. Imprimir tabela\n");
        printf("5. Sair\n");
        printf("Escolha uma opcao: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Digite o IP: ");
                scanf("%s", ip);
                if (!ipExists(ip)) {
                    printf("Digite o dominio: ");
                    scanf("%s", domain);
                    insert(ip, domain);
                } else {
                    printf("Erro: IP %s ja existe na tabela.\n", ip);
                }
                break;
            case 2:
                printf("Digite o IP para buscar: ");
                scanf("%s", ip);
                char* result = search(ip);
                if (result != NULL) {
                    printf("Dominio encontrado: %s\n", result);
                } else {
                    printf("IP nao encontrado. Deseja adicionar? (1-Sim, 0-Nao): ");
                    int addChoice;
                    scanf("%d", &addChoice);
                    if (addChoice == 1) {
                        printf("Digite o dominio para %s: ", ip);
                        scanf("%s", domain);
                        insert(ip, domain);
                    }
                }
                break;
            case 3:
                printf("Digite o IP para remover: ");
                scanf("%s", ip);
                removeElement(ip);
                break;
            case 4:
                printTable();
                break;
            case 5:
                printf("Saindo...\n");
                break;
            default:
                printf("Opcao invalida!\n");
        }
    } while (choice != 5);

    return 0;
}