const storyMap = {
    v1: {
      src: '/videos/v1.mp4',
      choices: [
        { text: 'Go left', next: 'v2' },
        { text: 'Go right', next: 'v3' },
      ],
    },
    v2: {
      src: '/videos/v2.mp4',
      choices: [{text:'Go straight', next: 'v4'}],
    },
    v3: {
      src: '/videos/v3.mp4',
      choices: [{text:'Go straight', next: 'v4'}],
    },
    v4: {
      src: '/videos/v4.mp4',
      choices: [
        { text: 'Start Over', next: 'v1' }
      ]
    }
  };
  
  export default storyMap;
  