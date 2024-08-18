document.addEventListener('DOMContentLoaded', function() {
    var dataInput = document.getElementById('data');
    if (dataInput) {
        var today = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', today);
    }
});

function confirmarExclusao(id) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
        window.location.href = 'excluir_consulta.php?id=' + id;
    }
}