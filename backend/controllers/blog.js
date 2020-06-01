exports.time =  (req, res) => {
  res.send({ time: Date().toString() });
}
