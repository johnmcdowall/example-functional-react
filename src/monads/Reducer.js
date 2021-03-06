const Reducer = f => ({
  fold: (acc, x) => f(acc, x),

  map: g => Reducer((acc, x) => g(f(acc, x))),

  contramap: g => Reducer((acc, x) => f(g(acc, x), x)),

  concat: other => Reducer((acc, x) => other.fold(f(acc, x), x))
})

export default Reducer
