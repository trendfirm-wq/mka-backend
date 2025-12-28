const express = require('express');
const router = express.Router();

// TEMP in-memory store (works immediately)
// Later we can replace with MongoDB
let likes = [];
// shape: { userId, itemKey }

/**
 * TOGGLE LIKE / UNLIKE
 */
router.post('/toggle', (req, res) => {
  const { userId, itemKey } = req.body;

  if (!userId || !itemKey) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const index = likes.findIndex(
    l => l.userId === userId && l.itemKey === itemKey
  );

  if (index > -1) {
    likes.splice(index, 1); // UNLIKE
  } else {
    likes.push({ userId, itemKey }); // LIKE
  }

  const count = likes.filter(l => l.itemKey === itemKey).length;
  res.json({ count });
});

/**
 * GET ALL LIKE COUNTS
 */
router.get('/', (req, res) => {
  const userId = req.query.userId;

  const counts = {};
  const userLikes = {};

  likes.forEach(like => {
    // count likes
    counts[like.itemKey] = (counts[like.itemKey] || 0) + 1;

    // track THIS user's likes
    if (like.userId === userId) {
      userLikes[like.itemKey] = true;
    }
  });

  res.json({ counts, userLikes });
});

module.exports = router;
