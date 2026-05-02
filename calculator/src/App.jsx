import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  const handleNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(String(num))
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperator = (op) => {
    const current = parseFloat(display)
    if (firstOperand !== null && !waitingForSecond) {
      const result = calculate(firstOperand, current, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    } else {
      setFirstOperand(current)
    }
    setOperator(op)
    setWaitingForSecond(true)
  }

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const handleEquals = () => {
    if (operator === null || waitingForSecond) return
    const current = parseFloat(display)
    const result = calculate(firstOperand, current, operator)
    setDisplay(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    { label: 'AC', action: handleClear, className: 'btn-function' },
    { label: '+/-', action: handleToggleSign, className: 'btn-function' },
    { label: '%', action: handlePercent, className: 'btn-function' },
    { label: '÷', action: () => handleOperator('÷'), className: 'btn-operator' },
    { label: '7', action: () => handleNumber('7'), className: 'btn-number' },
    { label: '8', action: () => handleNumber('8'), className: 'btn-number' },
    { label: '9', action: () => handleNumber('9'), className: 'btn-number' },
    { label: '×', action: () => handleOperator('×'), className: 'btn-operator' },
    { label: '4', action: () => handleNumber('4'), className: 'btn-number' },
    { label: '5', action: () => handleNumber('5'), className: 'btn-number' },
    { label: '6', action: () => handleNumber('6'), className: 'btn-number' },
    { label: '-', action: () => handleOperator('-'), className: 'btn-operator' },
    { label: '1', action: () => handleNumber('1'), className: 'btn-number' },
    { label: '2', action: () => handleNumber('2'), className: 'btn-number' },
    { label: '3', action: () => handleNumber('3'), className: 'btn-number' },
    { label: '+', action: () => handleOperator('+'), className: 'btn-operator' },
    { label: '0', action: () => handleNumber('0'), className: 'btn-number btn-zero' },
    { label: '.', action: handleDecimal, className: 'btn-number' },
    { label: '=', action: handleEquals, className: 'btn-operator btn-equals' },
  ]

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <div className="display">
          <span className="display-text">{display}</span>
        </div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              className={`btn ${btn.className}`}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
