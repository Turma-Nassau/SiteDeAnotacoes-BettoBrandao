import { useState } from 'react';

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value || !category) return;
        console.log(value, category);
        addTodo(value, category);
        setValue("");
        setCategory("");
    };

    return ( 
    <div className='todo-form'>
        <h2>Criar tarefa:</h2>
        <form onSubmit={handleSubmit}>  
            <input type="text" placeholder="Digite o título"
            value={value}
            onChange={(e) => setValue(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Selecione a importância</option>
                <option value="Urgente!">Urgente!</option>
                <option value="Recorrente...">Recorrente...</option>
                <option value="Padrão.">Padrão.</option>
        </select>
        <button type="submit">Criar Tarefa</button>
    </form>
  </div>
    );
};

export default TodoForm;