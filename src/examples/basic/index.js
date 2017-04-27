import ReactDOM from 'react-dom'
import React from 'react'
import View from '../../react/View'
import Reader from '../../monads/Reader'
import Monad from '../../monads/Monad'
import { liftN } from 'ramda'

const Heading = ({ name, greeting }) => <h1>{greeting}, {name}!</h1>
const Message = ({ message }) => <p>{message}</p>
const Footer = ({ author, year }) => <p>© {author} {year}</p>

const HeadingCmp = Monad.do(function*() {
  const greeting = yield Reader.asks(ctx => ctx.greeting)
  return Reader.of(View(Heading).contramap(({ name }) => ({ name, greeting })))
})

const FooterCmp = Monad.do(function*() {
  const { author, year } = yield Reader.ask()
  return Reader.of(View(Footer).contramap(() => ({ author, year })))
})

const MessageCmp = Reader.of(
  View(Message).contramap(({ message }) => ({
    message: <span>👏 {message} 👏</span>
  }))
)

const mconcat3 = liftN(3, (x, y, z) =>
  Monad.do(function*() {
    const a = yield x
    const b = yield y
    const c = yield z
    return View.of(
      <div>
        {a} {b} {c}
      </div>
    )
  })
)

const wrap = Type => m => m.map(a => <Type>{a}</Type>)

const App = mconcat3(
  HeadingCmp.map(wrap('header')),
  MessageCmp.map(wrap('main')),
  FooterCmp.map(wrap('footer'))
)

export default element => {
  ReactDOM.render(
    App.runReader({ greeting: 'Hello', author: 'Bob McBob', year: 2017 }).fold({
      name: 'Alice',
      message: 'Now this is composable react'
    }),
    element
  )
}