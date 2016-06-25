$('.counter').countTo({
    formatter: function (value, options) {
        return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3);
    }
});

function updateCount(to)
{
    $('.counter').countTo({
        from: parseInt($('.counter').html().replace(/,/g, '')),
        to: to,
        formatter: function (value, options) {
            return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3);
        }
    });
}

function getUpdatedCount()
{
    $.getJSON("https://petition.parliament.uk/petitions/131215.json", function (data){
        updateCount(data.data.attributes.signature_count);
        console.log("+" + (data.data.attributes.signature_count - parseInt($('.counter').html().replace(/,/g, ''))) );
    });
}

function getCountryData()
{
    $.getJSON("https://petition.parliament.uk/petitions/131215.json", function (data){
      data.data.attributes.signatures_by_country.sort(function(a,b){
        if (a.signature_count > b.signature_count){
          return -1;
        } else if (a.signature_count < b.signature_count){
          return 1;
        }
        return 0;
      });
      $("#counties").html("");
      data.data.attributes.signatures_by_country.slice(0, 10).forEach(function(item, index){
        
        html = '<img class="flag flag-' + item.code.toLowerCase() + '"> <b>' + item.name + ':</b> ' + item.signature_count.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3) + '</p>';
        $("#counties").append(html);
      });
    });
}