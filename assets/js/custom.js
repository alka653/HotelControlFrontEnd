$(function() {

	$('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
	$(window).bind("load resize", function() {
		topOffset = 50;
		width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
		if (width < 768) {
			$('div.navbar-collapse').addClass('collapse');
			topOffset = 100; // 2-row-menu
		} else {
			$('div.navbar-collapse').removeClass('collapse');
		}

		height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
		height = height - topOffset;
		if (height < 1) height = 1;
		if (height > topOffset) {
			$("#page-wrapper").css("min-height", (height) + "px");
		}
	});
});
$(document).on('keypress', '.only-number', function(e){
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		return false;
	}
});
$(document).on('keypress', '.only-number-float', function(event){
	if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
});
Number.prototype.format = function(n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return '$ '+this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
var languageDataTable = {
	sProcessing: "Procesando...",
	sLengthMenu: "Mostrar _MENU_ registros",
	sZeroRecords: "No se encontraron resultados",
	sEmptyTable: "Ningún dato disponible en esta tabla",
	sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
	sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
	sInfoPostFix: "",
	sSearch: "Buscar:",
	sUrl: "",
	sInfoThousands: ",",
	sLoadingRecords: "Cargando...",
	oPaginate: {
		sFirst: "Primero",
		sLast: "Ãšltimo",
		sNext: "Siguiente",
		sPrevious: "Anterior"
	},
	oAria: {
		sSortAscending: ": Activar para ordenar la columna de manera ascendente",
		sSortDescending: ": Activar para ordenar la columna de manera descendente"
	}
};