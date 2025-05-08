import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import storyMap from '../data/storyMap';
import './vplayer.css';

const VideoPlayer = () => {
  const [current, setCurrent] = useState('v1');
  const [showChoices, setShowChoices] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResumeButton, setShowResumeButton] = useState(false);
  const playerRef = useRef();

  const segment = storyMap[current];

  // Reset overlays and autoplay when switching to new segment
  useEffect(() => {
    setShowResumeButton(false);
    setShowChoices(false);

    if (current !== 'v1') {
      setIsPlaying(true); // autoplay for v2, v3, etc.
    }
  }, [current]);

  const handleEnd = () => {
    if (segment.choices.length > 0 || current === 'v4') {
      setShowChoices(true);
    }
  };

  const handleChoice = (next) => {
    setCurrent(next); // autoplay is handled in useEffect
  };

  const handleVideoClick = () => {
    if (showResumeButton) {
      // resume from pause
      setIsPlaying(true);
      setShowResumeButton(false);
      return;
    }

    if (!isPlaying) return;

    // manual pause
    setIsPlaying(false);
    setShowResumeButton(true);
  };

  return (
    <div className="video-container" onClick={handleVideoClick}>
      <ReactPlayer
        ref={playerRef}
        url={segment.src}
        playing={isPlaying}
        muted={!isPlaying}
        controls={false}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        onEnded={handleEnd}
      />

      {/* Initial play button for v1 */}
      {!isPlaying && current === 'v1' && !showResumeButton && (
        <div className="overlay">
          <button className="play-button" onClick={() => setIsPlaying(true)}>
            ▶
          </button>
        </div>
      )}

      {/* Resume button is visual only, resumes on video click */}
      {showResumeButton && (
        <div className="overlay">
          <button className="resume-button" onClick={() => {}}>
            ▶
          </button>
        </div>
      )}

      {/* Choices or Restart */}
      {showChoices && (
        <div className="choices fade-in">
          {current === 'v4' ? (
            <button onClick={() => {
              setCurrent('v1');
              setIsPlaying(false);
            }}>
              Start from Beginning
            </button>
          ) : (
            segment.choices.map((choice, idx) => (
              <button key={idx} onClick={() => handleChoice(choice.next)}>
                {choice.text}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
