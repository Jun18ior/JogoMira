import { useState, useEffect } from 'react';
import './App.css'; // Estilos do jogo

function App() {
  const [score, setScore] = useState(0); // Pontuação
  const [ballPosition, setBallPosition] = useState({ top: 0, left: 0 }); // Posição da bola
  const [ballSize, setBallSize] = useState(50); // Tamanho inicial da bola
  const [gameActive, setGameActive] = useState(true); // Se o jogo está ativo
  const [timer, setTimer] = useState(30); // Tempo de jogo em segundos
  const [ballDisplayTime, setBallDisplayTime] = useState(1000); // Tempo de exibição da bola (inicialmente 1 segundo)

  // Função para gerar posição aleatória da bola
  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * 80); // Posição aleatória entre 0% e 80%
    const left = Math.floor(Math.random() * 80); // Posição aleatória entre 0% e 80%
    return { top, left };
  };

  // Função chamada quando o jogador clica na bola
  const handleBallClick = () => {
    if (!gameActive) return; // Ignorar cliques se o jogo não estiver ativo
    setScore(score + 1); // Incrementa a pontuação
    setBallPosition(generateRandomPosition()); // Gera uma nova posição para a bola
    setBallSize(ballSize > 20 ? ballSize - 2 : 20); // Diminui o tamanho da bola até 20px
  };

  // Função que começa o jogo
  const startGame = () => {
    setScore(0); // Zera a pontuação
    setGameActive(true); // Ativa o jogo
    setBallPosition(generateRandomPosition()); // Coloca a bola em uma posição inicial
    setBallSize(50); // Restaura o tamanho inicial da bola
    setBallDisplayTime(1000); // Restaura o tempo de exibição para 1 segundo
    setTimer(30); // Reinicia o tempo de jogo para 30 segundos
  };

  // Função para contar o tempo de jogo
  useEffect(() => {
    if (timer === 0) {
      setGameActive(false); // Desativa o jogo quando o tempo acabar
      return;
    }

    const interval = setInterval(() => {
      if (gameActive) {
        setTimer((prev) => prev - 1); // Diminui o tempo a cada segundo
        setBallDisplayTime((prev) => Math.max(500, prev - 100)); // Aumenta a velocidade da bola (diminui o tempo)
      }
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [gameActive, timer]);

  return (
    <div className="game-container">
      <h1>Jogo de Mira!</h1>
      <p>Pontuação: {score}</p>
      <p>Tempo: {timer}s</p>

      <div className="game-board">
        {gameActive && (
          <div
            className="target-ball"
            style={{
              top: `${ballPosition.top}%`,
              left: `${ballPosition.left}%`,
              width: `${ballSize}px`, // Tamanho da bola que vai mudar
              height: `${ballSize}px`, // Tamanho da bola que vai mudar
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'top 0.2s, left 0.2s', // Transição suave
            }}
            onClick={handleBallClick}
          ></div>
        )}
      </div>

      {!gameActive && (
        <div>
          <h2>Fim de Jogo! Sua pontuação final é {score}</h2>
          <button onClick={startGame}>Reiniciar</button>
        </div>
      )}

      {gameActive && (
        <button onClick={startGame} className="start-button">
          Iniciar Jogo
        </button>
      )}
    </div>
  );
}

export default App;
