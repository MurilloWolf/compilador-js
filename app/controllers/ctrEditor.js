module.exports = function (application) {
    this.abrirArq = (req, res) => {
        console.log(req.body);
        res.send('chegou aqui caralho');
    }

    this.compilar = (req, res) => {

        let programa = req.body;
        let lexemas = programa.codigo.toString().split('<div>');
    

        //retirar todos os (&nbsp;) existentes

        //modificar '&gt', '&lt' e '&amp'

        //construir tabela de cadeias e tokens(para a análise lexica)

        //console.log(lexemas.length);
        console.log(lexemas);

        //console.log(application.app.classesApoio.defGeral.operadores().t_add);

        res.send('chegou aqui caralho');
    }

    return this;
}