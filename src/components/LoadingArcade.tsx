import React, { useEffect, useMemo, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type LoadingArcadeProps = {
  mode?: 'loading' | 'play';
};

const createRandomPosition = (): Position => ({
  x: 14 + Math.random() * 72,
  y: 18 + Math.random() * 64,
});

const LoadingArcade: React.FC<LoadingArcadeProps> = ({ mode = 'loading' }) => {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [position, setPosition] = useState<Position>(() => createRandomPosition());
  const isLoadingMode = mode === 'loading';

  const tier = Math.min(7, Math.floor(score / 4) + 1);
  const hopDelay = Math.max(440, 1100 - (tier - 1) * 110);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPosition(createRandomPosition());
    }, hopDelay);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hopDelay]);

  useEffect(() => {
    if (score > best) {
      setBest(score);
    }
  }, [best, score]);

  const paceLabel = useMemo(() => {
    console.log(`Hop delay : ${hopDelay}`)
    if (hopDelay <= 440) return 'TURBO';
    else if (hopDelay <= 550) return 'Fastest';
    else if (hopDelay <= 880) return 'Faster';
    return 'Slow';
  }, [hopDelay]);

  const handleCatch = () => {
    setScore((current) => current + 1);
    setPosition(createRandomPosition());
  };

  const kickerText = isLoadingMode ? 'Loading profile' : 'Arcade mode';
  const headingText = isLoadingMode
    ? 'Catch the ball while the profile loads.'
    : 'Catch the ball.';
  const bodyText = isLoadingMode
    ? 'The portfolio content is loading. Catch the ball while you wait!'
    : 'This is the same mini-game from the loading screen, but now you can play it whenever you want.';

  return (
    <section
      className="loading-arcade container"
      aria-busy={isLoadingMode}
      aria-labelledby="loading-arcade-title"
    >
      <div className="loading-arcade-copy">
        <div className="loading-arcade-kicker">
          <span className="loading-arcade-kicker-dot" aria-hidden="true" />
          {kickerText}
        </div>
        <h1 id="loading-arcade-title">{headingText}</h1>
        <p>{bodyText}</p>
      </div>

      <div className="loading-arcade-panel">
        <div className="loading-arcade-scoreboard" aria-label="Mini game score">
          <div className="loading-arcade-stat">
            <span className="loading-arcade-stat-label">Score</span>
            <strong>{score}</strong>
          </div>
          <div className="loading-arcade-stat">
            <span className="loading-arcade-stat-label">Best</span>
            <strong>{best}</strong>
          </div>
          <div className="loading-arcade-stat">
            <span className="loading-arcade-stat-label">Pace</span>
            <strong>{paceLabel}</strong>
          </div>
        </div>

        <div className="loading-arcade-stage">
          <div className="loading-arcade-grid" aria-hidden="true" />
          <button
            type="button"
            className="loading-arcade-target"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={handleCatch}
            tabIndex={-1}
            aria-label="Catch the comet"
          >
            <span className="sr-only">Catch the comet</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoadingArcade;
