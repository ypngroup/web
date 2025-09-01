(function($) {

	$('#cp-ga-auth-type').on( 'change', function() {
		
		var $this = $(this);
		var opt_val = $this.val();

		$(".cp-settings-row").each( function() {
			var $this_elem = $(this);
			var has_dependency = $this_elem.data('dep-element');
			if( 'undefined' != typeof has_dependency ) {
				$this_elem.hide();
			}
		});

		$(".cp-settings-row[data-dep-val='"+ opt_val +"']").show();

	});

	$( document ).ready(function() {

		var opt_val = $('#cp-ga-auth-type').val();

		$(".cp-settings-row").each( function() {
			var $this_elem = $(this);
			var has_dependency = $this_elem.data('dep-element');
			if( 'undefined' != typeof has_dependency ) {
				$this_elem.hide();
			}
		});

		$(".cp-settings-row[data-dep-val='"+ opt_val +"']").show();

		/* Datewise Analytics START. */
		var start = moment().subtract(29, 'days');
		var end   = moment();

		function cproPopupsAnalytics( start, end ) {
			var startFormat = start.format('MMMM D, YYYY');
			var endFormat   = end.format('MMMM D, YYYY');
			$( '#cpro-reportrange span' ).html( startFormat + ' - ' + endFormat );
			$( '#cpro-analytics-dates' ).val( startFormat + ' => ' + endFormat );
			$( '#cpro-analytics-dates' ).attr( 'data-start-date' ,startFormat );
			$( '#cpro-analytics-dates' ).attr( 'data-end-date' ,endFormat );
			$( '#cpro-analytics-dates' ).trigger( 'change', [startFormat, endFormat] );
		}

	    $('#cpro-reportrange').daterangepicker({
	        startDate: start,
	        endDate: end,
	        ranges: {
	           'Today': [moment(), moment()],
	           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	           'This Month': [moment().startOf('month'), moment().endOf('month')],
	           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        }
	    }, cproPopupsAnalytics);

		cproPopupsAnalytics(start, end);
		/* Datewise Analytics END. */
	});	

	// Google analytics modal
	$(document).on( "click", ".cp-ga-modal-link", function(){

		$( '.cp-notification-message' ).find( 'label' ).html( '' ).removeClass( 'cpro-open' );
		$( 'input[name=cp-ga-access-code]' ).val( '' );
	    $( '.cp-ga-modal' ).addClass("cp-show");
    	$( '.cp-md-overlay' ).addClass("cp-show");
	    $( '.cp-ga-modal' ).find(".cp-save-animate-container").removeClass("cp-zoomOut").addClass(" cp-animated cp-zoomIn");

	});

	$(".cp-ga-access-code").on( "focus", function() {
		$( '.cp-notification-message' ).find( 'label' ).html( '' ).removeClass( 'cpro-open' );
	} );

	$(document).on( "click", ".cp-auth-ga-access", function() {

		var access_code = jQuery(".cp-ga-access-code").val();

		if( access_code.trim() == '' ) {
			jQuery( '.cp-notification-message' ).find( 'label' ).html( cp_ga_object.no_ga_code ).addClass( 'cpro-open' );
			return;
		}
		jQuery( this ).text( cp_ga_object.authorizing );
		jQuery.ajax({
			url:cp_ajax.url,
			data: { 
				action: 'cp_get_ga_token_details',
				access_code: access_code,
				cp_security_nonce: jQuery("#cp-ga-save-nonce").val()
			},
			type: 'POST',
			dataType:'JSON',
			success:function(result){

				if( result.success && true == Boolean( result.success ) ) {
					var accounts = result.accounts;

					$( '.accounts-option' ).show();
					$( '.cp-auth-ga-access' ).hide();
					$( '.cp-save-ga-details' ).show();

					$.each(accounts, function (i, item ) {
					    $('#cp-ga-profile').append($('<option>', { 
					        value: i,
					        text : item.name
					    }));
					});

				} else {
					jQuery( ".cp-auth-ga-access" ).text( 'Authorize' );
					jQuery( '.cp-notification-message' ).find( 'label' ).html( result.msg ).addClass( 'cpro-open' );
				}

				jQuery(".cp-auth-ga-access").removeClass( 'cp-loading' );
				

			},
			error:function(err){
				console.log(err);
			}
		});
	});


	$(document).on( "click", ".cp-save-ga-details", function() {

		var profile  = $("#cp-ga-profile").val();
		var timezone = $("#cp-ga-profile").find(':selected').data('timezone');
		var $this    = $(this);

		$this.text( $this.data('inprogress') );
		$this.attr( 'disabled', true );

		jQuery.ajax({
			url:cp_ajax.url,
			data: { 
				action: 'cp_save_ga_details',
				profile: profile,
				timezone: timezone,
				security: jQuery( '#cp_save_ga_details_nonce' ).val()
			},
			type: 'POST',
			dataType:'JSON',
			success:function(result){

				$this.prop( 'disabled', false );

				if( Boolean( result.success ) == true ) {

					jQuery( '.cp-notification-message' ).find( 'label' ).html( '' ).removeClass( 'cpro-open' );
					setTimeout(function() {
		                jQuery(".cp-save-ga-details").text( result.msg );
		                jQuery('.cp-save-ga-details').append('<span class="dashicons-yes dashicons"></span>');
		            }, 300);
					setTimeout(function() {
						location.reload();
					}, 300 );
				} else {
					$this.text( $this.data('title') );
					jQuery( '.cp-notification-message' ).find( 'label' ).html( result.msg ).addClass( 'cpro-open' );
				}

			}
		});

	});

})(jQuery);