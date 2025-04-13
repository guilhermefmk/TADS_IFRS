import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();


const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => {
    if (validate()) {
      navigation.navigate('Quiz', { name, email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Quiz de Engenharia de Dados</Text>
        <Text style={styles.subtitle}>Teste seus conhecimentos!</Text>
        
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar Quiz</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};


const QuizScreen = ({ route, navigation }) => {
  const { name, email } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const questions = [
    {
      question: 'O que é um Data Lake?',
      options: [
        'Um banco de dados tradicional para armazenar dados estruturados',
        'Um repositório centralizado que armazena dados estruturados e não estruturados em formato bruto',
        'Uma ferramenta para visualização de dados',
        'Um tipo de algoritmo de machine learning'
      ],
      correctAnswer: 1
    },
    {
      question: 'Qual dessas NÃO é uma característica do Apache Kafka?',
      options: [
        'Processamento de streams em tempo real',
        'Sistema de mensagens pub/sub',
        'Alta escalabilidade',
        'Processamento de consultas SQL complexas'
      ],
      correctAnswer: 3
    },
    {
      question: 'O que significa ETL em engenharia de dados?',
      options: [
        'Extract, Transform, Load',
        'Evaluate, Test, Launch',
        'Enterprise Technology Learning',
        'Extract, Transfer, Link'
      ],
      correctAnswer: 0
    },
    {
      question: 'Qual ferramenta é conhecida como uma solução de data warehouse na nuvem?',
      options: [
        'MongoDB',
        'Redis',
        'Snowflake',
        'Elasticsearch'
      ],
      correctAnswer: 2
    },
    {
      question: 'O que é um formato de arquivo colunar usado em big data?',
      options: [
        'JSON',
        'XML',
        'Parquet',
        'CSV'
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedOption(selectedIndex);
    
    
    const isCorrect = selectedIndex === questions[currentQuestionIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        
        navigation.navigate('Result', { 
          name, 
          email, 
          score: newScore, 
          totalQuestions: questions.length 
        });
      }
    }, 1000);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.quizContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progress, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        <Text style={styles.question}>{currentQuestion.question}</Text>
        
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && 
                (index === currentQuestion.correctAnswer 
                  ? styles.correctOption 
                  : styles.incorrectOption)
            ]}
            onPress={() => handleAnswer(index)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


const ResultScreen = ({ route, navigation }) => {  
  const { name, email, score, totalQuestions } = route.params;
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.congratsText}>Parabéns!</Text>
        <Text style={styles.resultText}>Quiz Finalizado</Text>
        
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>
            Pontuação: {score} de {totalQuestions}
          </Text>
          <Text style={styles.percentageText}>
            {percentage.toFixed(0)}%
          </Text>
          
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Nome: {name}</Text>
            <Text style={styles.userInfoText}>Email: {email}</Text>
          </View>
          
          <Text style={styles.feedbackText}>
            {percentage >= 80 ? 'Excelente! Você é um especialista em Engenharia de Dados!' :
             percentage >= 60 ? 'Muito bom! Você tem um bom conhecimento em Engenharia de Dados.' :
             percentage >= 40 ? 'Bom! Continue estudando Engenharia de Dados.' :
             'Continue estudando para melhorar seus conhecimentos em Engenharia de Dados.'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.restartButton} 
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={styles.buttonText}>Reiniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Registration"
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f5f5' }
        }}
      >
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInput: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizContainer: {
    padding: 20,
    paddingTop: 40,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  correctOption: {
    backgroundColor: '#2ecc71',
    borderColor: '#27ae60',
  },
  incorrectOption: {
    backgroundColor: '#e74c3c',
    borderColor: '#c0392b',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  congratsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  restartButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});