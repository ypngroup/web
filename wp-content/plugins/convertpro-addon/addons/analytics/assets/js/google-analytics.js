// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['bar']});

function drawChart( style, startDate = '', endDate = '' ) {

    var jsonData = jQuery.ajax({
        url: cp_ajax.url,
        method: 'post',
        data: {
            action: 'cp_get_ga_data',
            style_id: style,
            sdate: startDate,
            edate: endDate,
            security: jQuery( '#cp_get_ga_data_chart_nonce' ).val()
        },
        dataType: "json",
        async: false
    }).responseText;

    var parseData      = JSON.parse( jsonData );
    var analyticsCount = parseData.analytics_count;
    var analyticsData  = parseData.analytics_data;
    
    jQuery.each( analyticsData, function( index, value ) {
        // convert date format
        value[0] = new Date( value[0] );
        analyticsData[index] = value;
    }); 

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Impressions');
    data.addColumn('number', 'Conversions');
    data.addRows( analyticsData );

    // Set chart options

    var options = {
        'title':'Analytics',
        'width': 1250,
        'height': 350,
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Impressions'
        },
        colors: [ '#236477', '#74a94a' ],
        legend: {
            position: 'none',
        },
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Bar(document.getElementById('cp_ga_chart_div'));
    chart.draw( data, options );
    jQuery('#cpro-impressions-count span').html( analyticsCount.impressions );
    jQuery('#cpro-conversions-count span').html( analyticsCount.conversions );
}

jQuery( document ).on( 'click', '.cp-delete-ga-integration', function( e ) {

    if( confirm( cp_ga_object.confirm_delete_ga ) ) {
        
        jQuery.ajax({
            url: cp_ajax.url,
            data: {
                action : 'cp_delete_ga_integration',
                security: jQuery( '#cp_delete_ga_integration_nonce' ).val()
            },
            type: 'POST',
            dataType:'JSON',
            success:function( result ){

                if( result.success == true ) {
                    location.reload();
                }
            },
            error:function(){
                console.log( 'Error' );
            }
        });
    }
} );


jQuery(document).on( "click", ".cp-style-analytics", function(e) {
    e.preventDefault();

    var parentDiv = jQuery("#cp-ga-dashboard-modal");


    parentDiv.addClass("cp-show");
    jQuery(".cp-md-overlay").addClass("cp-show");

 
    parentDiv.find(".cp-save-animate-container").removeClass("cp-zoomOut").addClass(" cp-animated cp-zoomIn");

    var style = jQuery(this).data("style");
    jQuery( '#cpro-reportrange' ).data( 'style', style );

    // Get the start and end date.
    var sdate = jQuery( '#cpro-analytics-dates' ).attr( 'data-start-date' );
    var edate = jQuery( '#cpro-analytics-dates' ).attr( 'data-end-date' );

    drawChart( style, sdate, edate );
});


// Fire this event when date is changed.
jQuery( '#cpro-analytics-dates' ).on( 'change', function( e, sdate, edate ) {
    var style = jQuery( '#cpro-reportrange' ).data( 'style' );
    if ( "undefined" !== typeof style ) {
        drawChart( style, sdate, edate );
    }
} );


jQuery(document).on( "click", ".cp-close-wrap", function(e) {
    jQuery(".cp-md-overlay").trigger('click');
});

jQuery(document).on( "click", "#cp-resync-ga", function(e) {

    e.preventDefault();

    var $this = jQuery( this );
    $this.addClass( 'cp-resync-progress' );
    $this.before( '<h5 class="cp-resync-notice">' + cp_ga_object.ga_resync + '</h5>' );

    var action_data = { action: "cp_resync_ga_data", security: jQuery( '#cp_update_analytics_data_nonce' ).val() }

    jQuery(this).attr( "disabled", "disabled" );

    jQuery.ajax({
        url: cp_ajax.url,
        data: action_data,
        type: 'POST',
        dataType:'JSON',
        success:function( result ){
            if( result.success == true ) {
                setTimeout(
                    function() {
                        $this.removeClass( 'cp-resync-progress' );
                        jQuery( 'h5.cp-resync-notice' ).text( cp_ga_object.ga_resync_done );
                    },
                    200
                );
                setTimeout(
                    function() {
                        jQuery( 'h5.cp-resync-notice' ).remove();
                    },
                    600
                );
                setTimeout(
                    function() {
                        location.reload();
                    },
                    1000
                );
            }
        },
        error:function(){
            console.log( 'Error' );
        }
    });
});