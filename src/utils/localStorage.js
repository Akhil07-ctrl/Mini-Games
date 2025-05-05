// Local storage utility functions

// Save data to local storage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get data from local storage
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
};

// Clear specific data from local storage
export const clearFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing from localStorage:', error);
    return false;
  }
};

// Clear all game data from local storage
export const clearAllGameData = () => {
  try {
    // List of all game data keys
    const gameKeys = [
      'cardFlipMemoryGame',
      'rockPaperScissor',
      'memoryMatrix',
      'emojiGame'
    ];
    
    gameKeys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing all game data:', error);
    return false;
  }
};