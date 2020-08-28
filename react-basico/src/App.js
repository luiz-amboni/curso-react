import React, { Component } from 'react';
import './App.css';

import Comentario from './components/Comentario'

class App extends Component {

  state = {
    comentarios: [
      {
        nome: 'João',
        email: 'joao@gmail.com',
        data: new Date(2020, 8, 26),
        mensagem: 'Olá, tudo bem?'
      },
      {
        nome: 'Pedro',
        email: 'pedro@gmail.com',
        data: new Date(2020, 8, 27),
        mensagem: 'Olá, tudo sim...'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = evento => {
    evento.preventDefault();
    console.log("Adiconando comentário")

    const novoComentario = {...this.state.novoComentario, data: new Date()}

    this.setState({
      comentarios: [ ...this.state.comentarios, novoComentario ],
      novoComentario: { nome: '', email: '', mensagem: ''}
    })
  }

  reomverComentario = comentario => {
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario)
    this.setState({ comentarios: lista })
  }

  digitacao = evento => {
    const {name, value} = evento.target;
    this.setState({ novoComentario: { ...this.state.novoComentario, [name]: value}})
  }


  render() {
    return (
      <div className="App">
        <h1>test project</h1>

        {this.state.comentarios.map((comentario, indice) => (
          <Comentario 
            key={indice}
            nome={comentario.nome} 
            email={comentario.email}
            data={comentario.data}
            onRemove={this.reomverComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method="post" onSubmit={this.adicionarComentario} className="Novo-Comentario">
          <h2>Adiconar Comentário</h2>
          <div>
            <input 
              type="text"
              name="nome"
              value={this.state.novoComentario.nome}
              onChange={this.digitacao}
              required
              placeholder="Digite seu nome"/>
          </div>
          <div>
            <input 
              type="email"
              name="email"
              value={this.state.novoComentario.email}
              onChange={this.digitacao}
              required
              placeholder="Digite seu email"/>
          </div>
          <div>
            <textarea 
              name="mensagem" 
              value={this.state.novoComentario.mensagem}
              onChange={this.digitacao}
              required
              rows="4"
            />
          </div>
          <button type="submit"> Adicionar Comentário</button>
        </form>
      </div>
    );
  }
}

export default App;
