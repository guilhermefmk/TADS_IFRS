#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 7
#define MAX_IP_LENGTH 16
#define MAX_DOMAIN_LENGTH 50

// Estrutura para cada elemento da tabela
typedef struct Element {
    char domain[MAX_DOMAIN_LENGTH];
    char ip[MAX_IP_LENGTH];
    struct Element* next;
} Element;

// Tabela hash (array de ponteiros para Element)
Element* hashTable[TABLE_SIZE];

// Função hash para domínio
int hash(char* domain) {
    /* Esta função calcula um valor hash para um dado domínio.
     * O algoritmo soma os valores ASCII de todos os caracteres no domínio
     * e então usa o operador módulo para garantir que o resultado
     * esteja dentro do intervalo válido da tabela hash.
     *
     * Passos:
     * 1. Inicializa uma variável 'sum' com 0.
     * 2. Percorre cada caractere do domínio.
     * 3. Adiciona o valor ASCII de cada caractere à 'sum'.
     * 4. Retorna o resto da divisão de 'sum' por TABLE_SIZE
     */
    int sum = 0;
    for (int i = 0; domain[i] != '\0'; i++) {
        sum += domain[i];
    }
    return sum % TABLE_SIZE;
}

// Função para criar um novo elemento
Element* createElement(char* domain, char* ip) {
    Element* newElement = (Element*)malloc(sizeof(Element));
    strcpy(newElement->domain, domain);
    strcpy(newElement->ip, ip);
    newElement->next = NULL;
    return newElement;
}

// Função para verificar se um domínio já existe na tabela
int domainExists(char* domain) {
    int index = hash(domain); // Calcula o índice do domínio
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista encadeada
    
    while (current != NULL) { // Percorre a lista encadeada
        if (strcmp(current->domain, domain) == 0) { // Compara o domínio atual com o domínio desejado
            return 1; // Domínio encontrado
        }
        current = current->next; // Avança para o próximo elemento da lista
    }
    
    return 0; // Domínio não encontrado
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
void insert(char* domain, char* ip) {
    if (domainExists(domain)) { // Verifica se o domínio já existe na tabela
        printf("Erro: Dominio %s ja existe na tabela.\n", domain);
        return;
    }

    int index = hash(domain); // Calcula o índice do domínio


    // Verifica se o índice já tem 7 elementos
    if (countElementsInIndex(index) >= 7) {
        printf("Erro: O indice %d ja contem o maximo de 7 elementos. Nao e possivel inserir mais.\n", index);
        return;
    }


    Element* newElement = createElement(domain, ip); // Cria um novo elemento
    
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
void remove_element(char* domain) {
    int index = hash(domain); // Calcula o índice do domínio
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista
    Element* prev = NULL; // Inicializa o ponteiro para o elemento anterior

    while (current != NULL && strcmp(current->domain, domain) != 0) { // Percorre a lista até encontrar o domínio
        prev = current; // Atualiza o ponteiro para o elemento anterior
        current = current->next; // Avança para o próximo elemento
    }

    if (current == NULL) { // Se o domínio não foi encontrado
        printf("Dominio nao encontrado.\n");
        return;
    }

    if (prev == NULL) { // Se o domínio está no início da lista
        hashTable[index] = current->next; // Atualiza o ponteiro para o início da lista
    } else {
        prev->next = current->next; // Remove o elemento da lista
    }

    free(current); // Libera a memória alocada para o elemento
    printf("Elemento removido com sucesso.\n");
}

// Função para buscar um domínio na tabela
char* search(char* domain) {
    int index = hash(domain); // Calcula o índice do domínio
    Element* current = hashTable[index]; // Inicializa o ponteiro para o início da lista
    
    while (current != NULL) { // Percorre a lista encadeada
        if (strcmp(current->domain, domain) == 0) { // Compara o domínio atual com o domínio desejado
            return current->ip; // Retorna o IP correspondente
        }
        current = current->next; // Avança para o próximo elemento da lista
    }
    
    return NULL; // Domínio não encontrado
}

// Função para imprimir a tabela
void printTable() {
    for (int i = 0; i < TABLE_SIZE; i++) { // Percorre a tabela hash
        printf("Index %d: ", i); // Imprime o índice
        Element* current = hashTable[i]; // Inicializa o ponteiro para o início da lista
        while (current != NULL) { // Percorre a lista encadeada
            printf("(%s, %s) -> ", current->domain, current->ip); // Imprime o domínio e o IP
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
    insert("google.com", "172.217.16.142");
    insert("youtube.com", "172.217.16.14");
    insert("facebook.com", "31.13.72.36");
    insert("amazon.com", "176.32.103.205");
    insert("twitter.com", "104.244.42.193");
    insert("instagram.com", "34.198.117.75");
    insert("linkedin.com", "108.174.10.10");
    insert("netflix.com", "54.237.226.164");
    insert("microsoft.com", "40.76.4.15");
    insert("apple.com", "17.253.144.10");
    insert("github.com", "140.82.121.4");
    insert("wikipedia.org", "91.198.174.192");
    insert("yahoo.com", "74.6.231.21");
    insert("twitch.tv", "151.101.66.167");
    insert("reddit.com", "151.101.65.140");
    insert("ebay.com", "66.211.181.123");
    insert("cnn.com", "151.101.3.5");
    insert("nytimes.com", "151.101.1.164");
    insert("bbc.com", "151.101.0.81");
    insert("spotify.com", "35.186.224.25");

    // Menu principal
    char domain[MAX_DOMAIN_LENGTH];
    char ip[MAX_IP_LENGTH];
    int choice;

    do {
        printf("\n1. Inserir dominio e IP\n");
        printf("2. Remover elemento por dominio\n");
        printf("3. Buscar IP por dominio\n");
        printf("4. Imprimir tabela\n");
        printf("5. Sair\n");
        printf("Escolha uma opcao: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Digite o dominio: ");
                scanf("%s", domain);
                if (!domainExists(domain)) {
                    printf("Digite o IP: ");
                    scanf("%s", ip);
                    insert(domain, ip);
                } else {
                    printf("Erro: Dominio %s ja existe na tabela.\n", domain);
                }
                break;
            case 2:
                printf("Digite o dominio a ser removido: ");
                scanf("%s", domain);
                remove_element(domain);
                break;
            case 3:
                printf("Digite o dominio para buscar: ");
                scanf("%s", domain);
                char* result = search(domain);
                if (result != NULL) {
                    printf("IP encontrado: %s\n", result);
                } else {
                    printf("Dominio nao encontrado. Deseja adicionar? (1-Sim, 0-Nao): ");
                    int addChoice;
                    scanf("%d", &addChoice);
                    if (addChoice == 1) {
                        printf("Digite o IP para %s: ", domain);
                        scanf("%s", ip);
                        insert(domain, ip);
                    }
                }
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