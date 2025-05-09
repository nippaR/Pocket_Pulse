module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: err.message || 'Server error' });
  };
  