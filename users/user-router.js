const express = require("express");
const users = require('./user-model')

const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  users.findById(id)
    .then(user => {

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.get('/:id/posts', (req, res) => {
  const {id} = req.params
  users.findPosts(id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'DB Error' })
    })
})


router.get('/:id/posts', async (req, res) => {

  const {id} = req.params

  try {
    const posts = await db('posts').whece({ user_id:id })
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error', error:error })
  }
})

router.post("/", (req, res) => {
  const userData = req.body;

  db("users")
    .insert(userData, "id")
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
