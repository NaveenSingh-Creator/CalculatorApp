const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currOperandTextElement = document.querySelector('[data-curr-operand]');
const allClearButton = document.querySelector('[data-all-clear]');


class Calculator{

    constructor(prevOperandTextElement,currOperandTextElement)
    {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();
    }

    clear()
    {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number)
    {
        if(number ==='.' && this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    chooseOperation(operation)
    {
        if(this.currentOperand ==='')return;
        if(this.previousOperand !=='')
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute()
    {
        let computation;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current))return;

        switch(this.operation)
        {   
            case '+':
                computation = prev + current;
                break;
            case  '-':
                computation = prev - current;
                break;
            case  '*':
                computation = prev * current;
                break;
            case  '÷':
                computation = prev / current;
            default:
                break;
        }   

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        
    }

    updateDisplay()
    {
        this.currOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null)
        {
            this.prevOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else
        {
            this.prevOperandTextElement.innerText = '';
        }
    }


}


    let calculator = new Calculator(prevOperandTextElement,currOperandTextElement)

    numberButtons.forEach(button => {
        button.addEventListener('click',() => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay();
        })
    })

     operationButtons.forEach(button => {
        button.addEventListener('click',() => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay();
        })
    })

   equalsButton.addEventListener('click',(button)=> {
        calculator.compute();
        calculator.updateDisplay();
   })

   allClearButton.addEventListener('click',(button) => {
        calculator.clear();
        calculator.updateDisplay();
   })   

    deleteButton.addEventListener('click',(button) => {
            calculator.delete();
            calculator.updateDisplay();
        })


