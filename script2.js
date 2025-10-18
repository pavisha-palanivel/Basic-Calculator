 const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';

    const updateDisplay = () => {
      display.textContent = currentInput || '0';
    };

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
          currentInput = '';
        } else if (value === '=') {
          try {
            const expression = currentInput
              .replace(/÷/g, '/')
              .replace(/×/g, '*')
              .replace(/−/g, '-');
            currentInput = eval(expression).toString();
          } catch {
            currentInput = 'Error';
          }
        } else {
          if (currentInput === 'Error') currentInput = '';
          currentInput += value;
        }

        updateDisplay();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key.match(/[0-9+\-*/().]/)) {
        currentInput += e.key.replace('*', '×').replace('/', '÷');
        updateDisplay();
      } else if (e.key === 'Enter') {
        try {
          const expression = currentInput
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
          currentInput = eval(expression).toString();
        } catch {
          currentInput = 'Error';
        }
        updateDisplay();
      } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      } else if (e.key.toLowerCase() === 'c') {
        currentInput = '';
        updateDisplay();
      }
    });
